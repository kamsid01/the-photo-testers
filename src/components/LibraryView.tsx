"use client";

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getSiteData, ArticleSummary } from '@/lib/site-data';
import { SERIF } from './ui';

const site = getSiteData();

const TYPE_ORDER: [string, string][] = [
  ['review', 'Reviews'],
  ['comparison', 'Comparisons'],
  ['guide', 'Buying guides'],
  ['alternatives', 'Alternatives'],
  ['editorial', 'Editorial'],
];

function SearchParamsHandler({
  onParams,
}: {
  onParams: (params: { q: string | null; cat: string | null; type: string | null; sort: string | null }) => void;
}) {
  const searchParams = useSearchParams();
  useEffect(() => {
    onParams({
      q: searchParams?.get('q') ?? null,
      cat: searchParams?.get('category') ?? null,
      type: searchParams?.get('type') ?? null,
      sort: searchParams?.get('sort') ?? null,
    });
  }, [searchParams, onParams]);
  return null;
}

export function LibraryView() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const [type, setType] = useState('all');
  const [sort, setSort] = useState<'newest' | 'title'>('newest');

  const syncToUrl = useCallback((newQ: string, newCat: string, newType: string, newSort: string) => {
    if (typeof window === 'undefined') return;
    const sp = new URLSearchParams();
    const cleanQ = newQ.trim();
    if (cleanQ) sp.set('q', cleanQ);
    if (newCat && newCat !== 'all') sp.set('category', newCat);
    if (newType && newType !== 'all') sp.set('type', newType);
    if (newSort && newSort !== 'newest') sp.set('sort', newSort);

    const qs = sp.toString();
    const nextUrl = qs ? `/blog?${qs}` : '/blog';
    const currentUrl = window.location.pathname + window.location.search;
    if (currentUrl !== nextUrl) {
      window.history.replaceState(null, '', nextUrl);
    }
  }, []);

  const handleParams = useCallback(
    (params: { q: string | null; cat: string | null; type: string | null; sort: string | null }) => {
      setQ(params.q || '');
      setCat(params.cat || 'all');
      setType(params.type || 'all');
      setSort(params.sort === 'title' ? 'title' : 'newest');
    },
    []
  );

  useEffect(() => {
    const onPopState = () => {
      if (typeof window === 'undefined') return;
      const sp = new URLSearchParams(window.location.search);
      setQ(sp.get('q') || '');
      setCat(sp.get('category') || 'all');
      setType(sp.get('type') || 'all');
      const s = sp.get('sort');
      setSort(s === 'title' ? 'title' : 'newest');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const onSelectType = (val: string) => {
    setType(val);
    syncToUrl(q, cat, val, sort);
  };

  const onSelectCat = (val: string) => {
    setCat(val);
    syncToUrl(q, val, type, sort);
  };

  const onSearchChange = (val: string) => {
    setQ(val);
    syncToUrl(val, cat, type, sort);
  };

  const onSortChange = (val: 'newest' | 'title') => {
    setSort(val);
    syncToUrl(q, cat, type, val);
  };

  const qq = q.trim().toLowerCase();
  const matchQ = (a: ArticleSummary) =>
    !qq || `${a.title} ${a.summary}`.toLowerCase().includes(qq);

  const base = site.articles.filter(matchQ);
  let res = base.filter(
    (a) => (cat === 'all' || a.cat === cat) && (type === 'all' || a.type === type)
  );

  res = res.slice().sort((x, y) =>
    sort === 'title' ? x.title.localeCompare(y.title) : y.date.localeCompare(x.date)
  );

  const byCat = base.filter((a) => cat === 'all' || a.cat === cat);
  const typeOpts = [
    { value: 'all', label: 'All types', count: byCat.length },
    ...TYPE_ORDER.map(([v, l]) => ({
      value: v,
      label: l,
      count: byCat.filter((a) => a.type === v).length,
    })),
  ];

  const byType = base.filter((a) => type === 'all' || a.type === type);
  const catOpts = [
    { value: 'all', label: 'All categories', count: byType.length },
    ...site.navCategories.map((c) => ({
      value: c.slug,
      label: c.name,
      count: byType.filter((a) => a.cat === c.slug).length,
    })),
  ];

  const filtered = !!qq || cat !== 'all' || type !== 'all';
  const showFeatured = false;
  const list = res;
  const n = res.length;

  const countLabel =
    n === site.articles.length
      ? `All ${n} published articles`
      : `${n} ${n === 1 ? 'article' : 'articles'} found${qq ? ` for “${q.trim()}”` : ''}`;

  const resetAll = () => {
    setQ('');
    setCat('all');
    setType('all');
    setSort('newest');
    syncToUrl('', 'all', 'all', 'newest');
  };

  return (
    <div
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: 'clamp(32px,5vw,56px) clamp(16px,4vw,40px) clamp(56px,7vw,96px)',
      }}
    >
      <Suspense fallback={null}>
        <SearchParamsHandler onParams={handleParams} />
      </Suspense>
      <header
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'end',
          gap: '20px 48px',
          paddingBottom: '28px',
          borderBottom: '1px solid #20221F',
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <h1
            style={{
              margin: '0 0 12px',
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: 'clamp(36px,4.4vw,52px)',
              lineHeight: 1.05,
              letterSpacing: '-0.015em',
            }}
          >
            Reviews &amp; Guides
          </h1>
          <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.55, color: '#4A4E49' }}>
            Every review, comparison, and buying guide we have published, with the date it was published and what its findings are based on.
          </p>
        </div>
        <form role="search" onSubmit={(e) => e.preventDefault()} style={{ flex: '1 1 320px', maxWidth: '440px' }}>
          <label htmlFor="lib-q" style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
            Search titles and summaries
          </label>
          <div style={{ position: 'relative' }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              aria-hidden="true"
              style={{ position: 'absolute', left: '14px', top: '16px', color: '#60645F' }}
            >
              <circle cx="7" cy="7" r="5.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <input
              id="lib-q"
              type="search"
              value={q}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Product, workflow, or topic"
              autoComplete="off"
              style={{
                width: '100%',
                height: '48px',
                padding: '0 14px 0 40px',
                border: '1px solid #B9BDB4',
                borderRadius: '4px',
                background: '#FFFFFF',
                fontSize: '16px',
              }}
            />
          </div>
        </form>
      </header>

      <div className="flex flex-col min-[980px]:flex-row gap-7 min-[980px]:gap-14 pt-7">
        {/* Left Filter Column */}
        <div className="w-full min-[980px]:w-[240px] min-[980px]:max-w-[260px] shrink-0">
          <fieldset style={{ border: 0, margin: '0 0 24px', padding: 0, minWidth: 0 }}>
            <legend
              style={{
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '.05em',
                textTransform: 'uppercase',
                marginBottom: '10px',
                padding: 0,
              }}
            >
              Content type
            </legend>
            <div className="flex flex-row flex-wrap min-[980px]:flex-col gap-1.5">
              {typeOpts.map((o) => {
                const on = type === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => onSelectType(o.value)}
                    className="inline-flex min-[980px]:flex justify-between items-center gap-3.5 min-h-[40px] px-3 rounded text-[15px] font-medium cursor-pointer text-left transition-colors"
                    style={{
                      border: `1px solid ${on ? '#20221F' : '#DFE2DB'}`,
                      background: on ? '#20221F' : '#FFFFFF',
                      color: on ? '#FFFFFF' : '#20221F',
                    }}
                  >
                    <span>{o.label}</span>
                    <span style={{ fontSize: '13px', opacity: 0.8, fontVariantNumeric: 'tabular-nums' }}>
                      {o.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset style={{ border: 0, margin: '0 0 24px', padding: 0, minWidth: 0 }}>
            <legend
              style={{
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '.05em',
                textTransform: 'uppercase',
                marginBottom: '10px',
                padding: 0,
              }}
            >
              Category
            </legend>
            <div className="flex flex-row flex-wrap min-[980px]:flex-col gap-1.5">
              {catOpts.map((o) => {
                const on = cat === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => onSelectCat(o.value)}
                    className="inline-flex min-[980px]:flex justify-between items-center gap-3.5 min-h-[40px] px-3 rounded text-[15px] font-medium cursor-pointer text-left transition-colors"
                    style={{
                      border: `1px solid ${on ? '#20221F' : '#DFE2DB'}`,
                      background: on ? '#20221F' : '#FFFFFF',
                      color: on ? '#FFFFFF' : '#20221F',
                    }}
                  >
                    <span>{o.label}</span>
                    <span style={{ fontSize: '13px', opacity: 0.8, fontVariantNumeric: 'tabular-nums' }}>
                      {o.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, color: '#60645F' }}>
            Looking for something else? <Link href="/contact?topic=suggestion">Suggest a tool</Link>.
          </p>
        </div>

        {/* Right Results Section */}
        <section aria-labelledby="results-h" style={{ flex: '3 1 560px', minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px 24px',
              marginBottom: '8px',
            }}
          >
            <h2 id="results-h" aria-live="polite" style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
              {countLabel}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              {filtered && (
                <button
                  type="button"
                  onClick={resetAll}
                  style={{
                    background: 'none',
                    border: 0,
                    padding: '6px 0',
                    color: '#2A4EC2',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '15px',
                  }}
                >
                  Reset filters
                </button>
              )}
              <label htmlFor="lib-sort" style={{ fontSize: '14px', color: '#60645F' }}>
                Sort by
              </label>
              <select
                id="lib-sort"
                value={sort}
                onChange={(e) => onSortChange(e.target.value as 'newest' | 'title')}
                style={{
                  height: '40px',
                  padding: '0 10px',
                  border: '1px solid #B9BDB4',
                  borderRadius: '4px',
                  background: '#FFFFFF',
                  fontSize: '15px',
                }}
              >
                <option value="newest">Published date (newest first)</option>
                <option value="title">Title, A to Z</option>
              </select>
            </div>
          </div>

          {/* Results List */}
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid #20221F' }}>
            {list.map((a) => (
              <li key={a.slug} style={{ borderBottom: '1px solid #DFE2DB' }}>
                <article
                  style={{
                    display: 'flex',
                    gap: '16px 24px',
                    padding: '20px 0',
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                    <p
                      style={{
                        margin: '0 0 6px',
                        fontSize: '14px',
                        color: '#60645F',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '2px 12px',
                      }}
                    >
                      <span style={{ fontWeight: 600, color: '#20221F' }}>{a.typeLabel}</span>
                      <span>{a.catName}</span>
                      <span>
                        {a.updatedDateLabel && a.updatedDateLabel !== a.dateLabel
                          ? `Published ${a.dateLabel} · Updated ${a.updatedDateLabel}`
                          : `Published ${a.dateLabel}`}
                      </span>
                    </p>
                    <h3
                      style={{
                        margin: '0 0 6px',
                        fontSize: 'clamp(18px,1.6vw,20px)',
                        fontWeight: 600,
                        lineHeight: 1.3,
                      }}
                    >
                      <Link
                        href={a.href}
                        className="pt-hover-blue"
                        style={{ color: '#20221F', textDecoration: 'none' }}
                      >
                        {a.title}
                      </Link>
                    </h3>
                    <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.55, color: '#4A4E49', maxWidth: '44em' }}>
                      {a.summary}
                    </p>
                  </div>
                  {a.img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={a.img}
                      alt=""
                      width={240}
                      height={160}
                      loading="lazy"
                      style={{
                        flex: '0 0 auto',
                        width: 'clamp(84px, 14vw, 150px)',
                        aspectRatio: '3/2',
                        objectFit: 'cover',
                        objectPosition: a.imgPos || '50% 30%',
                        borderRadius: '3px',
                        border: '1px solid #DFE2DB',
                        background: '#F3F2EE',
                        display: 'block',
                      }}
                    />
                  )}
                </article>
              </li>
            ))}
          </ul>

          {/* Empty State */}
          {n === 0 && (
            <div role="status" style={{ padding: '36px 0', borderBottom: '1px solid #DFE2DB' }}>
              <p style={{ margin: '0 0 8px', fontFamily: SERIF, fontSize: '26px', lineHeight: 1.2 }}>
                {qq
                  ? `No articles match “${q.trim()}”${
                      filtered && (cat !== 'all' || type !== 'all') ? ' with these filters' : ''
                    }`
                  : 'No articles match these filters'}
              </p>
              <p style={{ margin: '0 0 18px', fontSize: '16px', color: '#4A4E49', maxWidth: '38em' }}>
                Search covers article titles and summaries. Try a product name such as Pixieset or HoneyBook, a broader word such as “culling”, or remove a filter.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <button
                  type="button"
                  onClick={resetAll}
                  style={{
                    height: '44px',
                    padding: '0 18px',
                    background: '#20221F',
                    color: '#FFFFFF',
                    border: 0,
                    borderRadius: '4px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Reset filters and search
                </button>
                <Link
                  href="/contact?topic=suggestion"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    whiteSpace: 'nowrap',
                    height: '44px',
                    padding: '0 18px',
                    border: '1px solid #B9BDB4',
                    borderRadius: '4px',
                    color: '#20221F',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Suggest a topic
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
