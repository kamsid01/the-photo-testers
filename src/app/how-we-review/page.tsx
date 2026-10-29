import { Metadata } from 'next';
import Link from 'next/link';
import { InfoLayout } from '@/components/info/InfoLayout';

export const metadata: Metadata = {
  title: 'How We Review Software | The Photo Testers',
  description:
    'Every comparison on this site follows the same process. We wrote it down so you know exactly what is behind the recommendations.',
  alternates: {
    canonical: 'https://www.thephototesters.com/how-we-review',
  },
  openGraph: {
    title: 'How We Review Software | The Photo Testers',
    description:
      'Every comparison on this site follows the same process. We wrote it down so you know exactly what is behind the recommendations.',
    url: 'https://www.thephototesters.com/how-we-review',
    type: 'website',
    images: [
      {
        url: '/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'How We Review Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How We Review Software | The Photo Testers',
    description:
      'Every comparison on this site follows the same process. We wrote it down so you know exactly what is behind the recommendations.',
    images: ['/og/default.jpg'],
  },
};

const HOW_SECTIONS = [
  {
    n: '01',
    title: 'We evaluate via structured research and verified testing',
    text: 'We never review solely from vendor marketing copy. Our assessments draw on structured research across official technical documentation, verified vendor specifications, customer billing terms, and documented real-world workflows from professional photographers. Where an evaluation is research-based, we explicitly badge it as Research-based so readers know exactly what evidence supports our analysis. Every article transparently discloses which evidence basis was used.',
  },
  {
    n: '02',
    title: 'We run real photography workflows',
    text: 'When testing hands-on, we do not just click around. We load test clients with real session details and run the jobs a photographer actually runs: booking a consultation, sending a contract, raising an invoice, delivering a gallery, or culling a 3,000-frame RAW shoot. We test whether the tool works under real working conditions, not whether the feature bullet points look good.',
  },
  {
    n: '03',
    title: 'We keep pricing verified and dated',
    text: 'Software pricing changes often, and stale pricing is the single most common way software reviews mislead photographers. We verify current tier pricing at the time of publication and regularly audit our tables. Every price listed on the site carries the month it was checked.',
  },
  {
    n: '04',
    title: 'We list limitations as openly as advantages',
    text: 'No software is right for everyone. We say what is genuinely good and what is genuinely frustrating about each platform, including tools we recommend. If a tool lacks essential features like EU GDPR compliance, automated sales tax, or RAW support, we say so plainly.',
  },
  {
    n: '05',
    title: 'We update as platforms evolve',
    text: 'An article is not finished when it is published. When software vendors add features, overhaul their pricing structure, or deprecate integrations, we revise the guide. The “Updated” date at the top of each piece reflects the most recent editorial check.',
  },
];

export default function HowWeReviewPage() {
  const schemaBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thephototesters.com' },
      { '@type': 'ListItem', position: 2, name: 'How We Review', item: 'https://www.thephototesters.com/how-we-review' },
    ],
  };

  const schemaAbout = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'How We Review Software | The Photo Testers',
    description: 'Every comparison on this site follows the same process. We wrote it down so you know exactly what is behind the recommendations.',
    url: 'https://www.thephototesters.com/how-we-review',
    isPartOf: {
      '@type': 'WebSite',
      name: 'The Photo Testers',
      url: 'https://www.thephototesters.com',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaAbout) }} />
    <InfoLayout currentPage="how-we-review">
      <header className="mb-7">
        <h1 className="m-0 mb-3.5 font-serif font-medium text-[clamp(36px,4.4vw,52px)] leading-[1.05] tracking-[-0.015em] text-[#20221F]">
          How we review
        </h1>
        <p className="m-0 font-serif text-[clamp(20px,1.9vw,23px)] leading-[1.4] text-[#4A4E49]">
          Every comparison and guide on this site follows the same editorial process. We wrote it down so you know exactly what is behind our recommendations.
        </p>
      </header>

      {/* The Evidence Labels Box */}
      <section
        aria-labelledby="ev-h"
        className="mb-9 bg-white border border-[#DFE2DB] border-t-2 border-t-[#20221F] p-5 sm:p-7 rounded"
      >
        <h2 id="ev-h" className="m-0 mb-1.5 text-[19px] font-semibold text-[#20221F]">
          The evidence labels you’ll see
        </h2>
        <p className="m-0 mb-4 text-[15px] leading-[1.55] text-[#4A4E49]">
          Each article clearly states what its findings rest on, and specific figures indicate who measured them:
        </p>
        <dl className="m-0 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7 text-[15px] leading-[1.5]">
          <div>
            <dt className="font-semibold text-[#20221F] mb-1">Hands-on</dt>
            <dd className="m-0 text-[#4A4E49]">
              We used the tool directly on an active account and ran actual photography workflows through it.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-[#20221F] mb-1">Research-based</dt>
            <dd className="m-0 text-[#4A4E49]">
              Drawn from official documentation, vendor specifications, and verified reports from active professional photographers.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-[#20221F] mb-1">Vendor claim</dt>
            <dd className="m-0 text-[#4A4E49]">
              A specification or marketing claim stated by the software company itself, noted where independent verification is not possible.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-[#20221F] mb-1">Third-party benchmark</dt>
            <dd className="m-0 text-[#4A4E49]">
              A test or comparison published by an independent third party or community benchmark. We always cite the source.
            </dd>
          </div>
        </dl>
      </section>

      {/* Steps List */}
      <div className="text-[17.5px] leading-[1.68] text-[#20221F] font-sans">
        {HOW_SECTIONS.map((s) => (
          <section
            key={s.n}
            className="grid grid-cols-[48px_minmax(0,1fr)] gap-x-4 py-5 border-t border-[#DFE2DB]"
          >
            <span
              aria-hidden="true"
              className="font-serif text-[22px] text-[#3159D7] leading-[1.3]"
            >
              {s.n}
            </span>
            <div>
              <h2 className="m-0 mb-2 text-[20px] font-semibold leading-[1.3] text-[#20221F]">
                {s.title}
              </h2>
              <p className="m-0 text-[#4A4E49]">{s.text}</p>
            </div>
          </section>
        ))}

        <section className="grid grid-cols-[48px_minmax(0,1fr)] gap-x-4 py-5 border-t border-[#DFE2DB]">
          <span
            aria-hidden="true"
            className="font-serif text-[22px] text-[#3159D7] leading-[1.3]"
          >
            06
          </span>
          <div>
            <h2 className="m-0 mb-2 text-[20px] font-semibold leading-[1.3] text-[#20221F]">
              How we make money, plainly
            </h2>
            <p className="m-0 text-[#4A4E49]">
              We earn affiliate commissions when you sign up through our links, at no extra cost to you. This never dictates our recommendations. We regularly recommend cheaper tools, free utilities, or alternative workflows over higher-paying affiliate partners because editorial honesty is the only way a review publication survives long term. Read our full policy on our{' '}
              <Link href="/affiliate-disclosure" className="text-[#3159D7] underline hover:text-[#20221F]">
                Affiliate disclosure
              </Link>{' '}
              page.
            </p>
          </div>
        </section>

        {/* Corrections CTA */}
        <section className="py-6 border-t-2 border-[#20221F] mt-2">
          <h2 className="m-0 mb-2 text-[20px] font-semibold text-[#20221F]">Corrections</h2>
          <p className="m-0 mb-4 text-[#4A4E49]">
            Spotted something out of date, an inaccurate pricing tier, or a changed feature? Tell us and we will promptly investigate and update it.
          </p>
          <Link
            href="/contact?topic=correction"
            className="inline-flex items-center whitespace-nowrap h-11 px-5 bg-[#20221F] text-white rounded font-semibold text-[15px] no-underline hover:bg-[#3159D7] transition-colors"
          >
            Send a correction
          </Link>
        </section>
      </div>
    </InfoLayout>
    </>
  );
}
