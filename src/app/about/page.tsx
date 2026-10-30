import { Metadata } from 'next';
import Link from 'next/link';
import { InfoLayout } from '@/components/info/InfoLayout';
import { getSiteData } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'About The Photo Testers: Independent Photography Software Evaluation',
  description:
    'An independent publication helping photographers choose the software behind their bookings, editing, delivery, and sales.',
  alternates: {
    canonical: 'https://www.thephototesters.com/about',
  },
  openGraph: {
    title: 'About The Photo Testers: Independent Photography Software Evaluation',
    description:
      'An independent publication helping photographers choose the software behind their bookings, editing, delivery, and sales.',
    url: 'https://www.thephototesters.com/about',
    type: 'website',
    images: [
      {
        url: '/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'About The Photo Testers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About The Photo Testers: Independent Photography Software Evaluation',
    description:
      'An independent publication helping photographers choose the software behind their bookings, editing, delivery, and sales.',
    images: ['/og/default.jpg'],
  },
};

export default function AboutPage() {
  const site = getSiteData();
  const categories = site.categories;

  const schemaBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thephototesters.com' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://www.thephototesters.com/about' },
    ],
  };

  const schemaAbout = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About The Photo Testers: Independent Photography Software Evaluation',
    description: 'An independent publication helping photographers choose the software behind their bookings, editing, delivery, and sales.',
    url: 'https://www.thephototesters.com/about',
    isPartOf: {
      '@type': 'WebSite',
      name: 'The Photo Testers',
      url: 'https://www.thephototesters.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaAbout) }}
      />
      <InfoLayout currentPage="about">
      <header className="mb-7">
        <h1 className="m-0 mb-3.5 font-serif font-medium text-[clamp(36px,4.4vw,52px)] leading-[1.05] tracking-[-0.015em] text-[#20221F]">
          About The Photo Testers
        </h1>
        <p className="m-0 font-serif text-[clamp(20px,1.9vw,23px)] leading-[1.4] text-[#4A4E49]">
          An independent publication helping photographers choose the software behind their bookings, editing, delivery, and sales.
        </p>
      </header>

      <div className="text-[17.5px] leading-[1.68] text-[#20221F] font-sans">
        <p className="m-0 mb-4">
          We are called The Photo Testers because our mission is practical, evidence-based evaluation. We examine photography software through structured research: analyzing official vendor documentation, verifying pricing and subscription terms, examining technical capabilities, and evaluating real photographer workflows across booking, contracts, invoices, galleries, and culling. Then we write down what works, what falls short, and what gets in the way.
        </p>
        <p className="m-0 mb-4">
          Most software reviews online are either rewritten marketing copy or quick impressions from someone who only tried a single tool. Both leave photographers guessing when deciding which software to rely on for their business.
        </p>
        <p className="m-0 mb-4">
          We take a more rigorous approach. We verify feature sets against official technical specifications and support documentation, clearly disclose the evidence basis on every article, and keep pricing updated. When a platform changes its plans or limits, we revise the guide. When something is frustrating, we say so plainly, even for tools we recommend overall.
        </p>

        <h2 className="mt-[1.8em] mb-[0.5em] font-serif font-medium text-[clamp(26px,2.5vw,32px)] leading-[1.15] text-[#20221F]">
          What we cover
        </h2>
        <p className="m-0 mb-4">
          Six parts of running a photography business. In-depth coverage is currently published in three, with remaining categories in development.
        </p>

        <ul className="list-none m-0 mb-6 p-0 border-t border-[#DFE2DB] text-[16px]">
          {categories.map((c) => (
            <li key={c.slug} className="border-b border-[#DFE2DB]">
              <Link
                href={c.href}
                className="flex justify-between items-center gap-4 py-3 no-underline text-[#20221F] hover:text-[#3159D7]"
              >
                <span className="font-medium">{c.name}</span>
                <span
                  className={`text-[15px] ${
                    c.published ? 'text-[#1F6B3A] font-medium' : 'text-[#60645F]'
                  }`}
                >
                  {c.published ? `${c.count} ${c.count === 1 ? 'article' : 'articles'}` : 'In development'}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-[1.8em] mb-[0.5em] font-serif font-medium text-[clamp(26px,2.5vw,32px)] leading-[1.15] text-[#20221F]">
          How we make money
        </h2>
        <p className="m-0 mb-4">
          We earn through affiliate links. When you sign up for a tool through one of our links, we may receive a commission at no extra cost to you. That is worth knowing up front.
        </p>
        <p className="m-0 mb-4">
          It does not change what we write. A review that pushes the wrong tool is a review nobody comes back to read, and this publication only works if you can trust it. The honest version is the only version that makes sense long term, for you and for us.
        </p>
        <p className="m-0 mb-4">
          You can read more about exactly how we evaluate software on our{' '}
          <Link href="/how-we-review" className="text-[#3159D7] underline hover:text-[#20221F]">
            How we review
          </Link>{' '}
          page, and about the affiliate side on our{' '}
          <Link href="/affiliate-disclosure" className="text-[#3159D7] underline hover:text-[#20221F]">
            Affiliate disclosure
          </Link>{' '}
          page.
        </p>

        <h2 className="mt-[1.8em] mb-[0.5em] font-serif font-medium text-[clamp(26px,2.5vw,32px)] leading-[1.15] text-[#20221F]">
          Who writes this
        </h2>
        <p className="m-0 mb-4">
          <strong className="font-semibold text-[#20221F]">The Photo Testers team.</strong> We are independent researchers focused on cutting through vendor marketing. We set out to give professional and emerging photographers clear, transparent, and thoroughly verified evaluations without spin.
        </p>
        <p className="m-0">
          Questions, corrections, or a tool we should evaluate?{' '}
          <Link href="/contact" className="text-[#3159D7] underline hover:text-[#20221F]">
            Contact us
          </Link>
          .
        </p>
      </div>
    </InfoLayout>
    </>
  );
}
