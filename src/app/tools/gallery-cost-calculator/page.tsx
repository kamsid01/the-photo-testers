import { Metadata } from 'next';
import Link from 'next/link';
import { GalleryCostCalculator } from '@/components/GalleryCostCalculator';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Gallery Cost Calculator: Compare Pixieset, ShootProof & More',
  description:
    'Enter your annual shoot volume to see the plan you need across six client gallery platforms, and what it costs at published prices.',
  alternates: {
    canonical: 'https://www.thephototesters.com/tools/gallery-cost-calculator',
  },
};

export default function GalleryCostCalculatorPage() {
  return (
    <div className="bg-[#FAF9F6] min-h-[calc(100vh-200px)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 py-6 md:py-10 pb-16 md:pb-24">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Free Tools', href: '/tools' },
            { label: 'Gallery Cost Calculator' },
          ]}
        />

        {/* Header */}
        <header className="max-w-[760px] mb-8">
          <h1 className="m-0 mb-3 font-serif font-medium text-[clamp(34px,4.2vw,50px)] leading-[1.06] tracking-[-0.015em] text-[#20221F]">
            Gallery Cost Calculator
          </h1>
          <p className="m-0 text-[18px] leading-[1.55] text-[#4A4E49]">
            Enter your annual shoot volume to see the plan you would likely need on six client gallery platforms, and what it would cost at published prices.
          </p>
        </header>

        {/* Interactive Calculator */}
        <GalleryCostCalculator />

        {/* Editorial Context & Related Guides */}
        <section
          aria-labelledby="works-h"
          className="mt-14 pt-8 border-t border-[#20221F] flex flex-col lg:flex-row gap-8 lg:gap-16"
        >
          <div className="flex-1 min-w-0 max-w-[700px]">
            <h2
              id="works-h"
              className="m-0 mb-3.5 font-serif font-medium text-[clamp(24px,2.3vw,30px)] text-[#20221F]"
            >
              How gallery pricing works
            </h2>
            <div className="text-[16px] leading-[1.65] text-[#20221F] space-y-4">
              <p className="m-0">
                Client gallery platforms structure their pricing around storage volume (gigabytes or terabytes) and feature tiers. Storage-based plans limit the total capacity you can host across active galleries. High-resolution JPEGs average around 5MB each, so high-volume wedding and portrait photographers reach entry limits quickly. All major platforms—including ShootProof, Pixieset, Pic-Time, and CloudSpot—scale primarily by storage capacity, with higher tiers unlocking additional video storage, client management tools, or zero store commissions.
              </p>
              <p className="m-0">
                Store commission is another critical cost lever. Free or entry-level plans often take 15% of print sales made through the gallery store. If you sell a significant volume of albums and prints, that commission percentage can rapidly outstrip the cost of upgrading to a higher-tier, zero-commission plan.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[360px] shrink-0">
            <p className="m-0 mb-1.5 text-[14px] font-semibold text-[#20221F]">
              Related guides
            </p>
            <ul className="list-none m-0 p-0 border-t border-[#DFE2DB]">
              <li className="border-b border-[#DFE2DB]">
                <Link
                  href="/best-client-gallery-software"
                  className="block py-3 no-underline text-[#20221F] font-medium hover:text-[#3159D7]"
                >
                  Best client gallery software
                  <span className="block text-[14px] font-normal text-[#60645F] mt-0.5">
                    How the platforms compare beyond price
                  </span>
                </Link>
              </li>
              <li className="border-b border-[#DFE2DB]">
                <Link
                  href="/pic-time-vs-pixieset-vs-shootproof"
                  className="block py-3 no-underline text-[#20221F] font-medium hover:text-[#3159D7]"
                >
                  Pic-Time vs Pixieset vs ShootProof
                  <span className="block text-[14px] font-normal text-[#60645F] mt-0.5">
                    The three most popular platforms, side by side
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
