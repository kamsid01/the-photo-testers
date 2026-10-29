import { Metadata } from 'next';
import Link from 'next/link';
import { PricingCalculator } from '@/components/PricingCalculator';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Photography Pricing Calculator: What Should You Charge?',
  description:
    'Most photographers undercharge because they only count camera hours. Work backwards from your desired salary to find what you actually need to charge.',
  alternates: {
    canonical: 'https://www.thephototesters.com/tools/pricing-calculator',
  },
  openGraph: {
    title: 'Photography Pricing Calculator: What Should You Charge?',
    description:
      'Most photographers undercharge because they only count camera hours. Work backwards from your desired salary to find what you actually need to charge.',
    url: 'https://www.thephototesters.com/tools/pricing-calculator',
    type: 'website',
    images: [
      {
        url: '/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'Photography Pricing Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Photography Pricing Calculator: What Should You Charge?',
    description:
      'Most photographers undercharge because they only count camera hours. Work backwards from your desired salary to find what you actually need to charge.',
    images: ['/og/default.jpg'],
  },
};

export default function PricingCalculatorPage() {
  return (
    <div className="bg-[#FAF9F6] min-h-[calc(100vh-200px)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 py-6 md:py-10 pb-16 md:pb-24">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Free Tools', href: '/tools' },
            { label: 'Pricing Calculator' },
          ]}
        />

        {/* Header */}
        <header className="max-w-[760px] mb-8">
          <h1 className="m-0 mb-3 font-serif font-medium text-[clamp(34px,4.2vw,50px)] leading-[1.06] tracking-[-0.015em] text-[#20221F]">
            Photography Pricing Calculator
          </h1>
          <p className="m-0 text-[18px] leading-[1.55] text-[#4A4E49]">
            Most photographers undercharge because they only count the hours they spend holding a camera. Work backwards from your desired salary to find out what you actually need to charge to run a sustainable business.
          </p>
        </header>

        {/* Interactive Calculator */}
        <PricingCalculator />

        {/* Editorial Explanation Sections */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mt-14 pt-8 border-t border-[#20221F]">
          <section aria-labelledby="how-h" className="flex-1 min-w-0">
            <h2
              id="how-h"
              className="m-0 mb-3.5 font-serif font-medium text-[clamp(24px,2.3vw,30px)] text-[#20221F]"
            >
              How the estimate works
            </h2>
            <ol className="m-0 mb-4 pl-5 text-[16px] leading-[1.6] text-[#20221F] space-y-2 list-decimal">
              <li>Pre-tax income = desired take-home ÷ (1 − estimated tax rate)</li>
              <li>Required revenue = annual business costs + pre-tax income</li>
              <li>Price per shoot = required revenue ÷ shoots per year</li>
              <li>Hourly rates divide the price, and the take-home share, by shoot hours plus hidden hours.</li>
            </ol>
            <p className="m-0 text-[15px] leading-[1.6] text-[#4A4E49]">
              It applies one flat tax rate to your take-home. It does not model tax bands, personal allowances, VAT or sales tax, pension contributions, or seasonal cash flow. The currency switch changes the symbol only; no exchange rates are applied.
            </p>
          </section>

          <section aria-labelledby="why-h" className="flex-1 min-w-0">
            <h2
              id="why-h"
              className="m-0 mb-3.5 font-serif font-medium text-[clamp(24px,2.3vw,30px)] text-[#20221F]"
            >
              Why most photographers undercharge
            </h2>
            <div className="text-[16px] leading-[1.65] text-[#20221F] space-y-4">
              <p className="m-0">
                The most common pricing mistake in the photography industry is the “hidden hours” trap. When you look at an 8-hour wedding or a 1-hour portrait session, it is easy to multiply that by a standard hourly rate and feel good about the resulting price.
              </p>
              <p className="m-0">
                But the actual time you spend on a client includes emails, consultations, travel, culling, editing, exporting, and delivering the gallery. When you factor in business costs (insurance, CRM software, gallery hosting, camera depreciation, marketing), your true effective hourly rate drops fast.
              </p>
              <p className="m-0">
                Working backward from the take-home salary you want gives you the baseline price per shoot. If the result is higher than you expected, you can raise prices, take fewer, higher-value bookings, or cut unpaid hours with better workflow tools.
              </p>
            </div>

            <p className="mt-4 mb-1.5 text-[14px] font-semibold text-[#20221F]">
              Tools that reduce hidden hours
            </p>
            <ul className="list-none m-0 p-0 border-t border-[#DFE2DB]">
              <li className="border-b border-[#DFE2DB]">
                <Link
                  href="/best-crm-wedding-photographers"
                  className="block py-3 no-underline text-[#20221F] font-medium hover:text-[#3159D7]"
                >
                  Best CRM for wedding photographers{' '}
                  <span className="block text-[14px] font-normal text-[#60645F] mt-0.5">
                    Automating emails, contracts, and invoicing
                  </span>
                </Link>
              </li>
              <li className="border-b border-[#DFE2DB]">
                <Link
                  href="/best-client-gallery-software"
                  className="block py-3 no-underline text-[#20221F] font-medium hover:text-[#3159D7]"
                >
                  Best client gallery software{' '}
                  <span className="block text-[14px] font-normal text-[#60645F] mt-0.5">
                    Delivery and print sales without extra labor
                  </span>
                </Link>
              </li>
              <li className="border-b border-[#DFE2DB]">
                <Link
                  href="/best-ai-culling-editing-software"
                  className="block py-3 no-underline text-[#20221F] font-medium hover:text-[#3159D7]"
                >
                  Best AI culling and editing software{' '}
                  <span className="block text-[14px] font-normal text-[#60645F] mt-0.5">
                    Cutting post-production hours
                  </span>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
