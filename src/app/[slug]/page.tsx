import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { buildArticlePageData, getSiteData, RenderedRun } from '@/lib/site-data';
import { ArticleDesktopToc, ArticleMobileToc } from '@/components/article/ArticleToc';
import { ArticleBlocks, InlineRuns } from '@/components/article/ArticleBody';
import { Breadcrumb } from '@/components/Breadcrumb';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = getSiteData();
  const a = site.bySlug[slug];

  if (!a) {
    return {};
  }

  const canonicalUrl = `https://www.thephototesters.com/${slug}`;

  return {
    title: a.title,
    description: a.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: a.title,
      description: a.summary,
      type: 'article',
      url: canonicalUrl,
      images: [
        {
          url: a.img ? (a.img.startsWith('/') ? a.img : `/${a.img}`) : `/og/default.jpg`,
          width: 1200,
          height: 630,
          alt: a.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: a.title,
      description: a.summary,
      images: [a.img ? (a.img.startsWith('/') ? a.img : `/${a.img}`) : `/og/default.jpg`],
    },
  };
}

export async function generateStaticParams() {
  const site = getSiteData();
  return site.articles.map((a) => ({
    slug: a.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const pageData = buildArticlePageData(slug);

  if (!pageData) {
    notFound();
  }

  const {
    a,
    blocks,
    toc,
    faq,
    hasFaq,
    standfirst,
    byline,
    evidenceLabel,
    evidenceText,
    hasDisclosure,
    disclosure,
    editorial,
    hasHero,
    heroAlt,
    heroCaption,
    heroPos,
    hasVerdict,
    verdict,
    hasPricing,
    pricing,
    pricingNote,
    hasDecision,
    hasDecisionLead,
    decisionLead,
    decisionParas,
    chooseIf,
    hasAssumption,
    pricingAssumption,
    hasShortlist,
    shortlist,
    shortlistTitle,
    hasGenericBox,
    boxParas,
    boxTitle,
    hasAlts,
    alts,
    related,
    hasTool,
    tool,
    typeLower,
    hasChecked,
    commercialText,
    hasDisclaimerNote,
    disclaimerNote,
  } = pageData;

  const showSidebar = !editorial && toc.length > 2;

  // Schemas
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': editorial ? 'Article' : 'TechArticle',
    headline: a.title,
    description: a.summary,
    image: a.img ? `https://www.thephototesters.com${a.img.startsWith('/') ? a.img : '/' + a.img}` : 'https://www.thephototesters.com/og/default.jpg',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.thephototesters.com/${a.slug}`,
    },
    author: {
      '@type': 'Organization',
      name: 'The Photo Testers team',
      url: 'https://www.thephototesters.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Photo Testers',
      url: 'https://www.thephototesters.com/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.thephototesters.com/logo.svg',
      },
    },
    datePublished: a.date,
    dateModified: a.updated || a.date,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.thephototesters.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: a.catName,
        item: `https://www.thephototesters.com${a.catHref}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: a.title,
        item: `https://www.thephototesters.com/${a.slug}`,
      },
    ],
  };

  const faqJsonLd = hasFaq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.runs.map((r) => r.t).join(''),
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <article className="bg-[#FAF9F6]">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 md:px-10 pt-6 pb-16 md:pb-24">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: a.catName, href: a.catHref },
              { label: a.typeLabel },
            ]}
          />

          {/* Main Layout Grid */}
          <div
            className={`grid gap-8 md:gap-12 lg:gap-16 items-start ${
              showSidebar ? 'lg:grid-cols-[210px_minmax(0,1fr)]' : 'grid-cols-1'
            }`}
          >
            {/* Desktop TOC Sidebar */}
            {showSidebar && (
              <ArticleDesktopToc
                toc={toc}
                evidenceLabel={evidenceLabel}
                checked={a.checked}
              />
            )}

            {/* Article Content Column */}
            <div
              className={`min-w-0 w-full ${
                editorial
                  ? 'max-w-[700px] mx-auto'
                  : showSidebar
                  ? 'max-w-[740px]'
                  : 'max-w-[740px] mx-auto'
              }`}
            >
              {/* Header */}
              <header className="mb-7">
                <p className="m-0 mb-3.5 text-[14px] font-semibold text-[#3159D7]">
                  {a.typeLabel} ·{' '}
                  <Link href={a.catHref} className="text-[#3159D7] no-underline hover:underline">
                    {a.catName}
                  </Link>
                </p>
                <h1 className="m-0 mb-4 font-serif font-medium text-[clamp(32px,4.4vw,52px)] leading-[1.06] tracking-[-0.018em] text-[#20221F] text-balance">
                  {a.title}
                </h1>
                <p className="m-0 mb-5 font-serif text-[clamp(20px,1.9vw,23px)] leading-[1.4] text-[#4A4E49] text-pretty">
                  {standfirst}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 items-center text-[15px] text-[#60645F] py-3.5 border-t border-b border-[#DFE2DB]">
                  <span>
                    By{' '}
                    <Link href="/about" className="text-[#20221F] font-semibold no-underline hover:underline">
                      {byline}
                    </Link>
                  </span>
                  {a.updated ? (
                    <>
                      <span>
                        Published <time dateTime={a.date}>{a.dateLabel}</time>
                      </span>
                      <span>
                        Updated <time dateTime={a.updated}>{a.updatedDateLabel}</time>
                      </span>
                    </>
                  ) : (
                    <span>
                      Published <time dateTime={a.date}>{a.dateLabel}</time>
                    </span>
                  )}
                  <span>{a.readLabel}</span>
                  <span className="text-[#20221F] font-medium">{evidenceLabel}</span>
                </div>
                {hasDisclosure && (
                  <div className="mt-4 text-[15px] leading-[1.55] text-[#4A4E49]">
                    <p className="m-0">
                      <strong className="text-[#20221F]">How this was assessed.</strong> {disclosure}
                    </p>
                  </div>
                )}
              </header>

              {/* Mobile TOC Details */}
              {showSidebar && <ArticleMobileToc toc={toc} />}

              {/* Review Hero Image */}
              {hasHero && a.img && (
                <figure className="m-0 mb-8">
                  <div className="bg-[#1B1C1A] rounded overflow-hidden aspect-[16/9] border border-[#DFE2DB] relative">
                    <img
                      src={a.img}
                      alt={heroAlt}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: heroPos,
                      }}
                    />
                  </div>
                  {heroCaption && (
                    <figcaption className="mt-2.5 text-[14px] leading-[1.5] text-[#60645F]">
                      {heroCaption}
                    </figcaption>
                  )}
                </figure>
              )}

              {/* Verdict Box */}
              {hasVerdict && verdict && verdict.bestFor && verdict.elsewhere && verdict.bottom && (
                <section
                  aria-labelledby="verdict-h"
                  className="bg-white border border-[#DFE2DB] border-t-2 border-t-[#20221F] p-5 sm:p-7 mb-7"
                >
                  <h2
                    id="verdict-h"
                    className="m-0 mb-3 text-[13px] font-semibold tracking-[0.05em] uppercase text-[#3159D7]"
                  >
                    Our verdict
                  </h2>
                  <p className="m-0 mb-5 font-serif text-[clamp(21px,2vw,25px)] leading-[1.32] text-[#20221F] text-pretty">
                    {verdict.headline}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7 pt-4 border-t border-[#DFE2DB]">
                    <div>
                      <h3 className="m-0 mb-1.5 text-[15px] font-semibold text-[#20221F]">
                        Best suited to
                      </h3>
                      <p className="m-0 text-[16px] leading-[1.55] text-[#4A4E49]">
                        {verdict.bestFor}
                      </p>
                    </div>
                    <div>
                      <h3 className="m-0 mb-1.5 text-[15px] font-semibold text-[#20221F]">
                        Consider alternatives if
                      </h3>
                      <p className="m-0 text-[16px] leading-[1.55] text-[#4A4E49]">
                        {verdict.elsewhere}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 pt-4 border-t border-[#DFE2DB] text-[16px] leading-[1.55] text-[#20221F]">
                    <strong>Bottom line:</strong> {verdict.bottom}
                  </p>
                </section>
              )}

              {/* Pricing Glance Table */}
              {hasPricing && pricing.length > 0 && (
                <section aria-labelledby="pricing-glance" className="mb-9">
                  <h2 id="pricing-glance" className="m-0 mb-0.5 text-[17px] font-semibold text-[#20221F]">
                    Pricing at a glance
                  </h2>
                  <p className="m-0 mb-2.5 text-[14px] text-[#60645F]">
                    Checked {a.checked} · USD
                  </p>
                  <table className="w-full border-collapse text-[15px] tabular-nums">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="text-left py-2 pr-3 pl-0 border-b border-[#20221F] font-semibold text-[#20221F]"
                        >
                          Plan
                        </th>
                        <th
                          scope="col"
                          className="text-left py-2 px-3 border-b border-[#20221F] font-semibold text-[#20221F]"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="text-left py-2 pl-3 pr-0 border-b border-[#20221F] font-semibold text-[#20221F]"
                        >
                          Billing basis
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricing.map((p, pi) => (
                        <tr key={pi}>
                          <th
                            scope="row"
                            className="text-left py-2.5 pr-3 pl-0 border-b border-[#DFE2DB] font-medium text-[#20221F]"
                          >
                            {p.plan}
                          </th>
                          <td className="py-2.5 px-3 border-b border-[#DFE2DB] text-[#20221F]">
                            {p.price}
                          </td>
                          <td className="py-2.5 pl-3 pr-0 border-b border-[#DFE2DB] text-[#4A4E49]">
                            {p.basis}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-2.5 text-[14px] text-[#60645F]">
                    {pricingNote} Confirm current pricing on the vendor’s site.
                  </p>
                </section>
              )}

              {/* Quick Decision Grid (Comparisons) */}
              {hasDecision && chooseIf.length > 0 && (
                <section aria-labelledby="decision-h" className="mb-9">
                  <h2
                    id="decision-h"
                    className="m-0 mb-3.5 text-[13px] font-semibold tracking-[0.05em] uppercase text-[#3159D7]"
                  >
                    Quick decision
                  </h2>
                  {hasDecisionLead && (
                    <p className="m-0 mb-4 font-serif text-[clamp(21px,2vw,25px)] leading-[1.32] text-[#20221F]">
                      {decisionLead}
                    </p>
                  )}
                  {decisionParas && decisionParas.length > 0 && (
                    <div className="mb-5 space-y-3">
                      {decisionParas.map((dp, dpi) => (
                        <p key={dpi} className="m-0 text-[16px] leading-[1.6] text-[#4A4E49]">
                          <InlineRuns runs={dp.runs} />
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-[#DFE2DB] border border-[#DFE2DB]">
                    {chooseIf.map((c, ci) => (
                      <div key={ci} className="bg-white p-4 sm:p-5">
                        <h3 className="m-0 mb-2 text-[17px] font-semibold text-[#20221F]">
                          Choose {c.name} if
                        </h3>
                        <p className="m-0 text-[15px] leading-[1.55] text-[#4A4E49]">
                          {c.text}
                        </p>
                        {c.href && (
                          <Link
                            href={c.href}
                            className="inline-block mt-2.5 text-[14px] font-semibold text-[#3159D7] hover:underline"
                          >
                            {c.linkLabel}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                  {hasAssumption && (
                    <p className="mt-3 text-[14px] leading-[1.55] text-[#60645F]">
                      <strong className="text-[#20221F]">Pricing basis:</strong> {pricingAssumption}
                    </p>
                  )}
                </section>
              )}

              {/* Shortlist / Quick Picks */}
              {hasShortlist && (
                <section aria-labelledby="shortlist-h" className="mb-9">
                  <h2
                    id="shortlist-h"
                    className="m-0 mb-1 text-[13px] font-semibold tracking-[0.05em] uppercase text-[#3159D7]"
                  >
                    {shortlistTitle}
                  </h2>
                  <ol className="list-none m-0 p-0">
                    {shortlist.map((s, si) => (
                      <li
                        key={si}
                        className="grid grid-cols-1 sm:grid-cols-[minmax(0,180px)_minmax(0,1fr)] gap-1 sm:gap-6 py-4 border-b border-[#DFE2DB]"
                      >
                        <p className="m-0 text-[14px] font-semibold text-[#60645F] pt-0.5">
                          {s.label}
                        </p>
                        <div className="min-w-0">
                          <p className="m-0 mb-1 font-serif text-[22px] leading-[1.2]">
                            {s.href ? (
                              <a
                                href={s.href}
                                className="text-[#20221F] no-underline hover:text-[#3159D7]"
                              >
                                {s.tool}
                              </a>
                            ) : (
                              <span className="text-[#20221F]">{s.tool}</span>
                            )}
                          </p>
                          <p className="m-0 text-[15px] leading-[1.55] text-[#4A4E49]">
                            {s.text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* Generic Box / Short Answer */}
              {hasGenericBox && (
                <section
                  aria-label="Summary"
                  className="bg-white border border-[#DFE2DB] border-t-2 border-t-[#20221F] p-5 sm:p-7 mb-8"
                >
                  <p className="m-0 mb-3 text-[13px] font-semibold tracking-[0.05em] uppercase text-[#3159D7]">
                    {boxTitle}
                  </p>
                  {boxParas.map((bp, bpi) => (
                    <p key={bpi} className="m-0 mb-3 text-[16px] leading-[1.6] text-[#20221F]">
                      <InlineRuns runs={bp.runs} />
                    </p>
                  ))}
                </section>
              )}

              {/* Main Body Blocks */}
              <div
                className={`text-[#20221F] ${
                  editorial
                    ? 'font-serif text-[clamp(19px,1.5vw,21px)] leading-[1.72]'
                    : 'font-sans text-[17.5px] leading-[1.68]'
                }`}
              >
                <ArticleBlocks blocks={blocks} />
              </div>

              {/* FAQs */}
              {hasFaq && (
                <section id="faq" aria-labelledby="faq-h" className="mt-12 scroll-mt-24">
                  <h2
                    id="faq-h"
                    className="m-0 mb-2 font-serif font-medium text-[clamp(26px,2.5vw,32px)] leading-[1.15] text-[#20221F]"
                  >
                    Frequently asked questions
                  </h2>
                  <dl className="m-0">
                    {faq.map((f, fi) => (
                      <div key={fi} className="py-4 border-b border-[#DFE2DB]">
                        <dt className="font-semibold text-[17px] leading-[1.4] mb-1.5 text-[#20221F]">
                          {f.q}
                        </dt>
                        <dd className="m-0 text-[16px] leading-[1.6] text-[#4A4E49]">
                          <InlineRuns runs={f.runs} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {/* Disclaimer Note (Software not tax advice) */}
              {disclaimerNote && (
                <aside className="mt-8 p-4 sm:p-5 bg-[#FBF7EF] border border-[#E7D9BC] rounded text-[15px] leading-[1.55] text-[#4F3A12]">
                  <p className="m-0 font-medium">
                    <InlineRuns runs={disclaimerNote.runs} />
                  </p>
                </aside>
              )}

              {/* If [Product] isn't the right fit */}
              {hasAlts && alts.length > 0 && (
                <section aria-labelledby="alts-h" className="mt-12">
                  <h2
                    id="alts-h"
                    className="m-0 mb-2 font-serif font-medium text-[clamp(24px,2.3vw,28px)] text-[#20221F]"
                  >
                    If {a.product} isn’t the right fit
                  </h2>
                  <ul className="list-none m-0 p-0 border-t border-[#20221F]">
                    {alts.map((r, ri) => (
                      <li key={ri} className="border-b border-[#DFE2DB]">
                        <Link
                          href={`/${r.slug}`}
                          className="grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-1 sm:gap-4 py-3.5 no-underline text-[#20221F] hover:text-[#3159D7]"
                        >
                          <span className="text-[14px] font-semibold text-[#60645F]">
                            {r.typeLabel}
                          </span>
                          <span className="font-medium">{r.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* About this article Box */}
              <section
                aria-labelledby="about-article"
                className="mt-12 bg-white border border-[#DFE2DB] rounded p-5 sm:p-7 text-[15px] leading-[1.55]"
              >
                <h2 id="about-article" className="m-0 mb-3.5 text-[17px] font-semibold text-[#20221F]">
                  About this {typeLower}
                </h2>
                <dl className="m-0 grid grid-cols-1 sm:grid-cols-[minmax(0,150px)_minmax(0,1fr)] gap-x-5 gap-y-2.5">
                  <dt className="font-semibold text-[#20221F]">Written by</dt>
                  <dd className="m-0 text-[#4A4E49]">
                    {byline}, the publication’s editorial team.
                  </dd>

                  <dt className="font-semibold text-[#20221F]">Evidence basis</dt>
                  <dd className="m-0 text-[#4A4E49]">
                    <strong className="text-[#20221F] font-semibold">{evidenceLabel}.</strong>{' '}
                    {evidenceText}
                  </dd>

                  {hasChecked && (
                    <>
                      <dt className="font-semibold text-[#20221F]">Pricing checked</dt>
                      <dd className="m-0 text-[#4A4E49]">
                        {a.checked}. Prices are in USD unless stated and change often.
                      </dd>
                    </>
                  )}

                  <dt className="font-semibold text-[#20221F]">Commercial links</dt>
                  <dd className="m-0 text-[#4A4E49]">
                    {commercialText}{' '}
                    <Link href="/affiliate-disclosure" className="text-[#3159D7] underline">
                      Affiliate disclosure
                    </Link>
                  </dd>

                  <dt className="font-semibold text-[#20221F]">Corrections</dt>
                  <dd className="m-0 text-[#4A4E49]">
                    Spotted something out of date?{' '}
                    <Link href="/contact?topic=correction" className="text-[#3159D7] underline">
                      Send a correction
                    </Link>
                    .
                  </dd>
                </dl>
                <p className="mt-4 m-0">
                  <Link href="/how-we-review" className="font-semibold text-[#3159D7] hover:underline">
                    How we review
                  </Link>
                </p>
              </section>

              {/* Related Reading & Tool */}
              <section aria-labelledby="related-h" className="mt-12">
                <h2
                  id="related-h"
                  className="m-0 mb-1 pb-2.5 border-b border-[#20221F] text-[14px] font-semibold tracking-[0.04em] uppercase text-[#20221F]"
                >
                  Related reading
                </h2>
                <ul className="list-none m-0 p-0">
                  {related.map((r, ri) => (
                    <li key={ri} className="border-b border-[#DFE2DB]">
                      <Link
                        href={`/${r.slug}`}
                        className="grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-1 sm:gap-4 py-3.5 no-underline text-[#20221F] group"
                      >
                        <span className="text-[14px] font-semibold text-[#60645F]">
                          {r.typeLabel}
                        </span>
                        <span>
                          <span className="block font-medium leading-[1.4] group-hover:text-[#3159D7]">
                            {r.title}
                          </span>
                          <span className="block text-[14px] text-[#60645F] mt-0.5">
                            {r.summary}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {hasTool && tool && (
                  <Link
                    href={tool.href}
                    className="mt-6 grid grid-cols-[1fr_auto] gap-4 items-center p-5 bg-[#EEF1F9] rounded no-underline text-[#20221F] hover:bg-[#E4E9F7] transition-colors"
                  >
                    <span>
                      <span className="block text-[13px] font-semibold tracking-[0.04em] uppercase text-[#3159D7] mb-1">
                        Free tool
                      </span>
                      <span className="block font-semibold text-[17px]">{tool.name}</span>
                      <span className="block text-[15px] text-[#4A4E49]">{tool.line}</span>
                    </span>
                    <span aria-hidden="true" className="text-xl">
                      →
                    </span>
                  </Link>
                )}
              </section>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
