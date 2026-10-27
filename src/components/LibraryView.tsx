"use client";

import React, { useState, useEffect } from 'react';
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

export function LibraryView() {
  const searchParams = useSearchParams();
  const initialQ = searchParams?.get('q') || '';
  const initialCat = searchParams?.get('category') || 'all';
  const initialType = searchParams?.get('type') || 'all';

  const [q, setQ] = useState(initialQ);
  const [cat, setCat] = useState(initialCat);
  const [type, setType] = useState(initialType);
  const [sort, setSort] = useState<'newest' | 'title'>('newest');

  useEffect(() => {
    if (searchParams) {
      const paramQ = searchParams.get('q');
      const paramCat = searchParams.get('category');
      const paramType = searchParams.get('type');
      if (paramQ !== null) setQ(paramQ);
      if (paramCat !== null) setCat(paramCat);
      if (paramType !== null) setType(paramType);
    }
  }, [searchParams]);

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
  const showFeatured = !filtered && sort === 'newest';
  const featured = site.bySlug['aftershoot-review'];
  const list = showFeatured ? res.filter((a) => a.slug !== featured.slug) : res;
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
  };

  return (
    <div
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: 'clamp(32px,5vw,56px) clamp(16px,4vw,40px) clamp(56px,7vw,96px)',
      }}
    >
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
            Every review, comparison, and buying guide we have published, with the date it was last updated and what its findings are based on.
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
              onChange={(e) => setQ(e.target.value)}
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

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px 56px', paddingTop: '28px' }}>
        {/* Left Filter Column */}
        <div style={{ flex: '1 1 240px', maxWidth: '260px', minWidth: 0 }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {typeOpts.map((o) => {
                const on = type === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setType(o.value)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '14px',
                      minHeight: '40px',
                      padding: '0 12px',
                      border: `1px solid ${on ? '#20221F' : '#DFE2DB'}`,
                      background: on ? '#20221F' : '#FFFFFF',
                      color: on ? '#FFFFFF' : '#20221F',
                      borderRadius: '4px',
                      fontSize: '15px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      textAlign: 'left',
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {catOpts.map((o) => {
                const on = cat === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setCat(o.value)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '14px',
                      minHeight: '40px',
                      padding: '0 12px',
                      border: `1px solid ${on ? '#20221F' : '#DFE2DB'}`,
                      background: on ? '#20221F' : '#FFFFFF',
                      color: on ? '#FFFFFF' : '#20221F',
                      borderRadius: '4px',
                      fontSize: '15px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      textAlign: 'left',
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
                onChange={(e) => setSort(e.target.value as 'newest' | 'title')}
                style={{
                  height: '40px',
                  padding: '0 10px',
                  border: '1px solid #B9BDB4',
                  borderRadius: '4px',
                  background: '#FFFFFF',
                  fontSize: '15px',
                }}
              >
                <option value="newest">Newest first</option>
                <option value="title">Title, A to Z</option>
              </select>
            </div>
          </div>

          {/* Featured Latest Review Card */}
          {showFeatured && featured && (
            <article
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px 32px',
                padding: '24px 0 28px',
                borderTop: '1px solid #20221F',
                borderBottom: '1px solid #DFE2DB',
              }}
            >
              <Link
                href={featured.href}
                tabIndex={-1}
                aria-hidden="true"
                style={{ flex: '1 1 280px', maxWidth: '460px', display: 'block' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.img || ''}
                  alt=""
                  width={920}
                  height={575}
                  style={{
                    width: '100%',
                    aspectRatio: '16/10',
                    objectFit: 'cover',
                    objectPosition: featured.imgPos || '50% 50%',
                    borderRadius: '3px',
                    background: '#1B1C1A',
                    display: 'block',
                  }}
                />
              </Link>
              <div style={{ flex: '1 1 280px', minWidth: 0 }}>
                <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#60645F' }}>
                  <span style={{ fontWeight: 600, color: '#3159D7' }}>Latest review</span> · {featured.catName} ·{' '}
                  {featured.dateLabel}
                </p>
                <h3
                  style={{
                    margin: '0 0 10px',
                    fontFamily: SERIF,
                    fontWeight: 500,
                    fontSize: 'clamp(26px,2.4vw,32px)',
                    lineHeight: 1.12,
                  }}
                >
                  <Link
                    href={featured.href}
                    className="pt-hover-blue"
                    style={{ color: '#20221F', textDecoration: 'none' }}
                  >
                    {featured.title}
                  </Link>
                </h3>
                <p style={{ margin: '0 0 12px', fontSize: '16px', lineHeight: 1.55, color: '#4A4E49' }}>
                  {featured.summary}
                </p>
                <p style={{ margin: 0, fontSize: '14px', color: '#60645F' }}>
                  {featured.evidenceLabel} · {featured.readLabel}
                </p>
              </div>
            </article>
          )}

          {/* Results List */}
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: showFeatured ? 0 : '1px solid #20221F' }}>
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
                      <span>{a.dateLabel}</span>
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
