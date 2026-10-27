import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSiteData } from '@/lib/site-data';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SERIF } from '@/components/ui';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = getSiteData();
  const c = site.catBy[slug];
  if (!c) return {};

  const isDeveloping = !c.published;

  return {
    title: `${c.name} — Reviews, Comparisons & Guides | The Photo Testers`,
    description: c.desc || c.liveDesc,
    robots: isDeveloping ? { index: false, follow: true } : { index: true, follow: true },
    alternates: {
      canonical: `/category/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const site = getSiteData();
  return site.categories.map((c) => ({
    slug: c.slug,
  }));
}

const TOOLS_BY: Record<string, { href: string; name: string; line: string; cta: string }> = {
  'pricing-calculator': {
    href: '/tools/pricing-calculator',
    name: 'Photography Pricing Calculator',
    line: 'Set a price per shoot that covers your costs, tax, and the hours you don’t bill for.',
    cta: 'Open the calculator',
  },
  'culling-tool-finder': {
    href: '/tools/culling-tool-finder',
    name: 'AI Culling Tool Finder',
    line: 'Five questions about your volume, budget, and workflow, with a suggested starting point.',
    cta: 'Take the quiz',
  },
  'gallery-cost-calculator': {
    href: '/tools/gallery-cost-calculator',
    name: 'Gallery Cost Calculator',
    line: 'See which plan your delivery volume needs on six gallery platforms.',
    cta: 'Compare costs',
  },
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const site = getSiteData();
  const c = site.catBy[slug];

  if (!c) {
    notFound();
  }

  const arts = c.articles || [];
  const start = site.bySlug[c.startHere || ''] || arts[0];

  const typeOrder: [string, string][] = [
    ['comparison', 'Head-to-head comparisons'],
    ['review', 'Individual reviews'],
    ['guide', 'Buying guides for specific needs'],
    ['alternatives', 'Alternatives'],
    ['editorial', 'Editorial'],
  ];

  const groups = typeOrder
    .map(([t, title]) => {
      const items = arts.filter((a) => a.type === t && (!start || a.slug !== start.slug));
      return { title, items, count: items.length };
    })
    .filter((g) => g.items.length > 0);

  const lowerName =
    c.slug === 'ai-culling-editing'
      ? 'AI culling and editing software'
      : c.slug === 'client-crms'
      ? 'a photography CRM'
      : c.slug === 'gallery-delivery'
      ? 'client gallery software'
      : `${c.name.toLowerCase()} tools`;

  const lede = c.published ? c.desc : c.liveDesc || c.desc;
  const latest = arts[0];
  const statusLine = c.published
    ? `${c.count} published articles · Last updated ${latest ? latest.dateLabel : ''}`
    : 'Coverage in development';
  const statusColor = c.published ? '#3159D7' : '#8A5A14';

  const tools = (c.tools || []).map((t) => TOOLS_BY[t]).filter(Boolean);
  const relatedCats = (c.related || []).map((s) => site.catBy[s]).filter(Boolean);
  const elsewhere = (c.elsewhere || []).map((s) => site.bySlug[s]).filter(Boolean);

  return (
    <div
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '24px clamp(16px,4vw,40px) clamp(56px,7vw,96px)',
      }}
    >
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Reviews & Guides', href: '/blog' },
          { label: c.name },
        ]}
      />

      <header
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'end',
          gap: '16px 48px',
          paddingBottom: '24px',
          borderBottom: '1px solid #20221F',
        }}
      >
        <div style={{ maxWidth: '720px' }}>
          <p style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: statusColor }}>
            {statusLine}
          </p>
          <h1
            style={{
              margin: '0 0 12px',
              fontFamily: SERIF,
              fontWeight: 500,
              fontSize: 'clamp(34px,4.2vw,50px)',
              lineHeight: 1.06,
              letterSpacing: '-0.015em',
              textWrap: 'balance',
            }}
          >
            {c.title}
          </h1>
          <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.55, color: '#4A4E49' }}>{lede}</p>
        </div>
      </header>

      {/* Populated Category Layout */}
      {c.published && (
        <>
          {start && (
            <section
              aria-labelledby="start-h"
              style={{
                padding: '32px 0',
                borderBottom: '1px solid #DFE2DB',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '24px 40px',
                alignItems: 'center',
              }}
            >
              <Link
                href={start.href}
                tabIndex={-1}
                aria-hidden="true"
                style={{ flex: '1 1 300px', maxWidth: '560px', display: 'block' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={start.img || ''}
                  alt=""
                  width={1120}
                  height={700}
                  style={{
                    width: '100%',
                    aspectRatio: '16/10',
                    objectFit: 'cover',
                    objectPosition: start.imgPos || '0 0',
                    borderRadius: '3px',
                    border: '1px solid #DFE2DB',
                    background: '#F3F2EE',
                    display: 'block',
                  }}
                />
              </Link>
              <div style={{ flex: '1 1 300px', minWidth: 0 }}>
                <h2
                  id="start-h"
                  style={{
                    margin: '0 0 10px',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '.05em',
                    textTransform: 'uppercase',
                    color: '#3159D7',
                  }}
                >
                  Start here
                </h2>
                <p style={{ margin: '0 0 6px', fontSize: '14px', color: '#60645F' }}>
                  <span style={{ fontWeight: 600, color: '#20221F' }}>{start.typeLabel}</span> · Updated{' '}
                  {start.dateLabel} · {start.evidenceLabel}
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
                    href={start.href}
                    className="pt-hover-blue"
                    style={{ color: '#20221F', textDecoration: 'none' }}
                  >
                    {start.title}
                  </Link>
                </h3>
                <p style={{ margin: '0 0 16px', fontSize: '16px', lineHeight: 1.55, color: '#4A4E49' }}>
                  {start.summary}
                </p>
                <Link href={start.href} style={{ fontWeight: 600, fontSize: '15px' }}>
                  Read the guide
                </Link>
              </div>
            </section>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px 64px', paddingTop: '36px' }}>
            <div style={{ flex: '3 1 560px', minWidth: 0 }}>
              {groups.map((g) => (
                <section key={g.title} style={{ marginBottom: '40px' }}>
                  <h2
                    style={{
                      margin: '0 0 4px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid #20221F',
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '12px',
                      fontSize: '14px',
                      fontWeight: 600,
                      letterSpacing: '.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>{g.title}</span>
                    <span
                      style={{
                        fontWeight: 500,
                        color: '#60645F',
                        letterSpacing: 0,
                        textTransform: 'none',
                      }}
                    >
                      {g.count}
                    </span>
                  </h2>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {g.items.map((a) => (
                      <li key={a.slug} style={{ borderBottom: '1px solid #DFE2DB' }}>
                        <article style={{ padding: '18px 0' }}>
                          <h3
                            style={{
                              margin: '0 0 6px',
                              fontSize: '19px',
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
                          <p
                            style={{
                              margin: '0 0 6px',
                              fontSize: '15px',
                              lineHeight: 1.55,
                              color: '#4A4E49',
                              maxWidth: '46em',
                            }}
                          >
                            {a.summary}
                          </p>
                          <p style={{ margin: 0, fontSize: '14px', color: '#60645F' }}>
                            Updated {a.dateLabel} · {a.evidenceLabel}
                          </p>
                        </article>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}

              {c.intro && c.intro.length > 0 && (
                <section
                  aria-labelledby="explain-h"
                  style={{ marginTop: '8px', paddingTop: '24px', borderTop: '1px solid #DFE2DB' }}
                >
                  <h2
                    id="explain-h"
                    style={{
                      margin: '0 0 14px',
                      fontFamily: SERIF,
                      fontWeight: 500,
                      fontSize: 'clamp(24px,2.3vw,30px)',
                      lineHeight: 1.15,
                    }}
                  >
                    What to look for in {lowerName}
                  </h2>
                  <div style={{ maxWidth: '700px', fontSize: '17px', lineHeight: 1.68 }}>
                    {c.intro.map((t, idx) => (
                      <p key={idx} style={{ margin: '0 0 1em' }}>
                        {t}
                      </p>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside
              style={{
                flex: '1 1 260px',
                maxWidth: '320px',
                minWidth: 0,
                display: 'grid',
                gap: '28px',
                alignContent: 'start',
              }}
            >
              {tools.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="pt-hover-tool-banner"
                  style={{
                    display: 'block',
                    padding: '20px',
                    background: '#EEF1F9',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    color: '#20221F',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 600,
                      letterSpacing: '.04em',
                      textTransform: 'uppercase',
                      color: '#3159D7',
                      marginBottom: '6px',
                    }}
                  >
                    Related tool
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontWeight: 600,
                      fontSize: '18px',
                      lineHeight: 1.3,
                      marginBottom: '6px',
                    }}
                  >
                    {t.name}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '15px',
                      lineHeight: 1.5,
                      color: '#4A4E49',
                      marginBottom: '10px',
                    }}
                  >
                    {t.line}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: '15px', color: '#2A4EC2' }}>
                    {t.cta} →
                  </span>
                </Link>
              ))}

              {relatedCats.length > 0 && (
                <div>
                  <h2
                    style={{
                      margin: '0 0 4px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid #20221F',
                      fontSize: '14px',
                      fontWeight: 600,
                      letterSpacing: '.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Related categories
                  </h2>
                  {relatedCats.map((r) => (
                    <Link
                      key={r.slug}
                      href={r.href}
                      className="pt-hover-blue"
                      style={{
                        display: 'block',
                        padding: '12px 0',
                        borderBottom: '1px solid #DFE2DB',
                        textDecoration: 'none',
                        color: '#20221F',
                      }}
                    >
                      <span style={{ display: 'block', fontWeight: 600 }}>{r.name}</span>
                      <span style={{ display: 'block', fontSize: '14px', color: r.statusColor }}>
                        {r.statusLabel}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </aside>
          </div>
        </>
      )}

      {/* Developing Category Layout */}
      {!c.published && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px 64px', paddingTop: '32px' }}>
          <div style={{ flex: '3 1 520px', minWidth: 0 }}>
            <section
              aria-labelledby="dev-h"
              style={{
                padding: '24px',
                border: '1px dashed #C9B48F',
                background: '#FBF7EF',
                borderRadius: '4px',
                marginBottom: '36px',
              }}
            >
              <h2 id="dev-h" style={{ margin: '0 0 8px', fontSize: '19px', fontWeight: 600 }}>
                Coverage for this category is being developed
              </h2>
              <p
                style={{
                  margin: '0 0 16px',
                  fontSize: '16px',
                  lineHeight: 1.6,
                  color: '#4A4E49',
                  maxWidth: '40em',
                }}
              >
                We haven’t published any reviews, comparisons, or guides on {lowerName} yet, so there are no recommendations here. Until there are, the coverage below may help, and you can tell us which tools you’d like to see covered first.
              </p>
              <Link
                href="/contact?topic=suggestion"
                className="pt-hover-btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  height: '44px',
                  padding: '0 18px',
                  background: '#20221F',
                  color: '#FFFFFF',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '15px',
                }}
              >
                Suggest a tool to cover
              </Link>
            </section>

            {elsewhere.length > 0 && (
              <section aria-labelledby="else-h">
                <h2
                  id="else-h"
                  style={{
                    margin: '0 0 6px',
                    fontFamily: SERIF,
                    fontWeight: 500,
                    fontSize: 'clamp(24px,2.3vw,30px)',
                  }}
                >
                  Related coverage elsewhere
                </h2>
                <p style={{ margin: '0 0 12px', fontSize: '16px', color: '#4A4E49' }}>
                  {c.elsewhereNote}
                </p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid #20221F' }}>
                  {elsewhere.map((a) => (
                    <li key={a.slug} style={{ borderBottom: '1px solid #DFE2DB' }}>
                      <Link
                        href={a.href}
                        className="pt-hover-blue"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '110px 1fr',
                          gap: '16px',
                          padding: '16px 0',
                          textDecoration: 'none',
                          color: '#20221F',
                        }}
                      >
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#60645F' }}>
                          {a.typeLabel}
                        </span>
                        <span>
                          <span style={{ display: 'block', fontWeight: 600, lineHeight: 1.35 }}>
                            {a.title}
                          </span>
                          <span style={{ display: 'block', fontSize: '14px', color: '#60645F', marginTop: '2px' }}>
                            {a.catName}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside style={{ flex: '1 1 260px', maxWidth: '320px', minWidth: 0 }}>
            <h2
              style={{
                margin: '0 0 4px',
                paddingBottom: '10px',
                borderBottom: '1px solid #20221F',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '.04em',
                textTransform: 'uppercase',
              }}
            >
              Categories with coverage
            </h2>
            {site.navCategories.map((r) => (
              <Link
                key={r.slug}
                href={r.href}
                className="pt-hover-blue"
                style={{
                  display: 'block',
                  padding: '12px 0',
                  borderBottom: '1px solid #DFE2DB',
                  textDecoration: 'none',
                  color: '#20221F',
                }}
              >
                <span style={{ display: 'block', fontWeight: 600 }}>{r.name}</span>
                <span style={{ display: 'block', fontSize: '14px', color: '#60645F' }}>
                  {r.statusLabel}
                </span>
              </Link>
            ))}
          </aside>
        </div>
      )}
    </div>
  );
}
