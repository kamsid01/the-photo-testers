import { Metadata } from 'next';
import Link from 'next/link';
import { CullingToolFinder } from '@/components/CullingToolFinder';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'AI Culling Tool Finder: Which Tool Fits Your Workflow?',
  description:
    'Five quick questions about your volume, priorities, and workflow point to a sensible culling tool to trial first, with a runner-up.',
  alternates: {
    canonical: 'https://www.thephototesters.com/tools/culling-tool-finder',
  },
  openGraph: {
    title: 'AI Culling Tool Finder: Which Tool Fits Your Workflow?',
    description:
      'Five quick questions about your volume, priorities, and workflow point to a sensible culling tool to trial first, with a runner-up.',
    url: 'https://www.thephototesters.com/tools/culling-tool-finder',
    type: 'website',
    images: [
      {
        url: '/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Culling Tool Finder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Culling Tool Finder: Which Tool Fits Your Workflow?',
    description:
      'Five quick questions about your volume, priorities, and workflow point to a sensible culling tool to trial first, with a runner-up.',
    images: ['/og/default.jpg'],
  },
};

export default function CullingToolFinderPage() {
  const schemaBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thephototesters.com' },
      { '@type': 'ListItem', position: 2, name: 'Free Tools', item: 'https://www.thephototesters.com/tools' },
      { '@type': 'ListItem', position: 3, name: 'AI Culling Tool Finder', item: 'https://www.thephototesters.com/tools/culling-tool-finder' },
    ],
  };

  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AI Culling Tool Finder',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    url: 'https://www.thephototesters.com/tools/culling-tool-finder',
    description: 'Five quick questions about your volume, priorities, and workflow point to a sensible culling tool to trial first, with a runner-up.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <div className="bg-[#FAF9F6] min-h-[calc(100vh-200px)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaApp) }} />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 py-6 md:py-10 pb-16 md:pb-24">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Free Tools', href: '/tools' },
            { label: 'AI Culling Tool Finder' },
          ]}
        />

        {/* Top Split Layout: Intro on Left, Quiz on Right */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          <header className="w-full lg:w-[420px] shrink-0">
            <h1 className="m-0 mb-3 font-serif font-medium text-[clamp(34px,4.2vw,50px)] leading-[1.06] tracking-[-0.015em] text-[#20221F]">
              Which AI culling tool should you try first?
            </h1>
            <p className="m-0 mb-4 text-[18px] leading-[1.55] text-[#4A4E49]">
              Five questions about your volume, priorities, and budget. The answers point to a sensible starting tool and a runner-up to trial alongside it.
            </p>
            <p className="m-0 text-[15px] leading-[1.55] text-[#60645F]">
              It’s a simple points system, not a definitive match. Every tool here offers a trial or free tier, so test your top two on a real shoot.
            </p>
          </header>

          <section aria-label="Culling tool quiz" className="flex-1 min-w-0 w-full">
            <CullingToolFinder />
          </section>
        </div>

        {/* Bottom Editorial Context & Reading List */}
        <section
          aria-labelledby="choose-h"
          className="mt-14 pt-8 border-t border-[#20221F] flex flex-col lg:flex-row gap-8 lg:gap-16"
        >
          <div className="flex-1 min-w-0 max-w-[700px]">
            <h2
              id="choose-h"
              className="m-0 mb-3.5 font-serif font-medium text-[clamp(24px,2.3vw,30px)] text-[#20221F]"
            >
              How to choose a culling tool
            </h2>
            <div className="text-[16px] leading-[1.65] text-[#20221F] space-y-4">
              <p className="m-0">
                Choosing culling software depends heavily on your post-production philosophy. If you shoot high-volume weddings and want selection and color editing handled in one continuous run, an all-in-one AI tool like Aftershoot or Imagen AI is often the most cost-effective and time-saving route. If you want strict personal control over which images make the final cut, you may prefer an assist-first tool like Narrative Select that flags blinks and missed focus but leaves keepers up to you.
              </p>
              <p className="m-0">
                Consider your hardware and connectivity too. Several AI tools rely on cloud compute, requiring a reliable broadband connection. If offline travel culling (on flights or remote locations) is mandatory, look at Photo Mechanic or tools whose machine learning models execute locally on your laptop GPU.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[360px] shrink-0">
            <p className="m-0 mb-1.5 text-[14px] font-semibold text-[#20221F]">
              Read more before you decide
            </p>
            <ul className="list-none m-0 p-0 border-t border-[#DFE2DB]">
              <li className="border-b border-[#DFE2DB]">
                <Link
                  href="/best-ai-culling-editing-software"
                  className="block py-3 no-underline text-[#20221F] font-medium hover:text-[#3159D7]"
                >
                  Best AI culling and editing software
                  <span className="block text-[14px] font-normal text-[#60645F] mt-0.5">
                    All-in-one platforms like Aftershoot and Imagen
                  </span>
                </Link>
              </li>
              <li className="border-b border-[#DFE2DB]">
                <Link
                  href="/best-photo-culling-software"
                  className="block py-3 no-underline text-[#20221F] font-medium hover:text-[#3159D7]"
                >
                  Best photo culling software
                  <span className="block text-[14px] font-normal text-[#60645F] mt-0.5">
                    Dedicated culling with Narrative Select and Photo Mechanic
                  </span>
                </Link>
              </li>
              <li className="border-b border-[#DFE2DB]">
                <Link
                  href="/aftershoot-vs-imagen"
                  className="block py-3 no-underline text-[#20221F] font-medium hover:text-[#3159D7]"
                >
                  Aftershoot vs Imagen
                  <span className="block text-[14px] font-normal text-[#60645F] mt-0.5">
                    Flat fee or per photo, and where the cost lines cross
                  </span>
                </Link>
              </li>
              <li className="border-b border-[#DFE2DB]">
                <Link
                  href="/filterpixel-alternatives"
                  className="block py-3 no-underline text-[#20221F] font-medium hover:text-[#3159D7]"
                >
                  FilterPixel alternatives
                  <span className="block text-[14px] font-normal text-[#60645F] mt-0.5">
                    How budget options compare with the rest of the field
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
