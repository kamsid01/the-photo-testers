import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Tools for Photographers | The Photo Testers',
  description:
    'Calculators and a short quiz that work from your own numbers. Everything runs in your browser; nothing you enter is stored or sent.',
  alternates: {
    canonical: 'https://www.thephototesters.com/tools',
  },
  openGraph: {
    title: 'Free Tools for Photographers | The Photo Testers',
    description:
      'Calculators and a short quiz that work from your own numbers. Everything runs in your browser; nothing you enter is stored or sent.',
    url: 'https://www.thephototesters.com/tools',
    type: 'website',
    images: [
      {
        url: '/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'The Photo Testers Free Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Tools for Photographers | The Photo Testers',
    description:
      'Calculators and a short quiz that work from your own numbers. Everything runs in your browser; nothing you enter is stored or sent.',
    images: ['/og/default.jpg'],
  },
};

export default function ToolsIndexPage() {
  return (
    <div className="bg-[#FAF9F6] min-h-[calc(100vh-200px)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-14 pb-16 md:pb-24">
        <header className="max-w-[720px] pb-7">
          <h1 className="m-0 mb-3 font-serif font-medium text-[clamp(36px,4.4vw,52px)] leading-[1.05] tracking-[-0.015em] text-[#20221F]">
            Free tools for photographers
          </h1>
          <p className="m-0 text-[18px] leading-[1.55] text-[#4A4E49]">
            Calculators and a short quiz that work from your own numbers. Everything runs entirely in your browser; nothing you enter is stored or sent anywhere.
          </p>
        </header>

        <ol className="list-none m-0 p-0 border-t border-[#20221F]">
          {/* Tool 01: Pricing Calculator */}
          <li className="flex flex-col lg:flex-row gap-6 lg:gap-14 py-9 border-b border-[#DFE2DB] items-start lg:items-center">
            <div className="flex-1 min-w-0">
              <p className="m-0 mb-2 font-serif text-[20px] text-[#3159D7]">01</p>
              <h2 className="m-0 mb-2.5 font-serif font-medium text-[clamp(28px,2.8vw,36px)] leading-[1.1] text-[#20221F]">
                Photography Pricing Calculator
              </h2>
              <p className="m-0 mb-4 text-[17px] leading-[1.55] text-[#4A4E49] max-w-[34em]">
                Work backwards from the salary you want to the price you need to charge per shoot, with hidden hours, business costs, and an estimated tax rate included.
              </p>
              <dl className="m-0 mb-5 grid grid-cols-1 sm:grid-cols-[minmax(0,110px)_minmax(0,1fr)] gap-2 sm:gap-4 text-[15px] leading-[1.5]">
                <dt className="font-semibold text-[#20221F]">You enter</dt>
                <dd className="m-0 text-[#4A4E49]">
                  Take-home goal, shoots per year, annual costs, tax rate, shoot hours, hidden hours
                </dd>
                <dt className="font-semibold text-[#20221F]">You learn</dt>
                <dd className="m-0 text-[#4A4E49]">
                  Price per shoot, total hours, gross and take-home hourly rates, and where each fee goes
                </dd>
                <dt className="font-semibold text-[#20221F]">Why it helps</dt>
                <dd className="m-0 text-[#4A4E49]">
                  Prices built on camera time alone leave out editing, admin, and travel
                </dd>
              </dl>
              <Link
                href="/tools/pricing-calculator"
                className="inline-flex items-center whitespace-nowrap h-11 px-5 bg-[#3159D7] text-white rounded font-semibold text-[15px] no-underline hover:bg-[#2547B5] transition-colors"
              >
                Open the calculator
              </Link>
            </div>

            {/* Visual preview card */}
            <div
              aria-hidden="true"
              className="w-full lg:w-[480px] shrink-0 bg-[#20221F] text-white rounded p-6 sm:p-7 tabular-nums"
            >
              <p className="m-0 mb-1 text-[14px] text-[#C9CBC5]">You need to charge</p>
              <p className="m-0 mb-4 font-serif text-[56px] leading-none">£2,044</p>
              <div className="grid grid-cols-3 gap-3 pt-3.5 border-t border-[#3A3C38] text-[13px] text-[#A7AAA3]">
                <div>
                  Total hours
                  <span className="block text-[19px] text-white font-semibold mt-0.5">23</span>
                </div>
                <div>
                  Gross hourly
                  <span className="block text-[19px] text-white font-semibold mt-0.5">£89</span>
                </div>
                <div>
                  Take-home hourly
                  <span className="block text-[19px] text-white font-semibold mt-0.5">£58</span>
                </div>
              </div>
              <p className="mt-3.5 mb-0 text-[13px] text-[#A7AAA3]">
                Example: £40,000 take-home, 30 shoots, £8,000 costs, 25% tax, 8 + 15 hours
              </p>
            </div>
          </li>

          {/* Tool 02: AI Culling Tool Finder */}
          <li className="flex flex-col lg:flex-row gap-6 lg:gap-14 py-9 border-b border-[#DFE2DB] items-start lg:items-center">
            <div className="flex-1 min-w-0">
              <p className="m-0 mb-2 font-serif text-[20px] text-[#3159D7]">02</p>
              <h2 className="m-0 mb-2.5 font-serif font-medium text-[clamp(28px,2.8vw,36px)] leading-[1.1] text-[#20221F]">
                AI Culling Tool Finder
              </h2>
              <p className="m-0 mb-4 text-[17px] leading-[1.55] text-[#4A4E49] max-w-[34em]">
                Five questions about your workflow, volume, and budget point to a culling tool to trial first, with a runner-up and the main limitation to check.
              </p>
              <dl className="m-0 mb-5 grid grid-cols-1 sm:grid-cols-[minmax(0,110px)_minmax(0,1fr)] gap-2 sm:gap-4 text-[15px] leading-[1.5]">
                <dt className="font-semibold text-[#20221F]">You enter</dt>
                <dd className="m-0 text-[#4A4E49]">
                  Monthly volume, your priority, offline needs, budget model, and main task
                </dd>
                <dt className="font-semibold text-[#20221F]">You learn</dt>
                <dd className="m-0 text-[#4A4E49]">
                  A suggested tool, why it fits, its main limitation, and a runner-up
                </dd>
                <dt className="font-semibold text-[#20221F]">Why it helps</dt>
                <dd className="m-0 text-[#4A4E49]">
                  Narrows seven tools down to the two worth testing on a real shoot
                </dd>
              </dl>
              <Link
                href="/tools/culling-tool-finder"
                className="inline-flex items-center whitespace-nowrap h-11 px-5 bg-[#3159D7] text-white rounded font-semibold text-[15px] no-underline hover:bg-[#2547B5] transition-colors"
              >
                Start the five questions
              </Link>
            </div>

            {/* Visual preview card */}
            <div
              aria-hidden="true"
              className="w-full lg:w-[480px] shrink-0 bg-white border border-[#DFE2DB] rounded p-6 sm:p-7"
            >
              <div className="flex justify-between text-[13px] text-[#60645F] mb-2">
                <span>Question 2 of 5</span>
                <span>Priority</span>
              </div>
              <div className="grid grid-cols-5 gap-1 mb-4">
                <span className="h-1 bg-[#3159D7] rounded-sm" />
                <span className="h-1 bg-[#9DB0EC] rounded-sm" />
                <span className="h-1 bg-[#E1E2DC] rounded-sm" />
                <span className="h-1 bg-[#E1E2DC] rounded-sm" />
                <span className="h-1 bg-[#E1E2DC] rounded-sm" />
              </div>
              <p className="m-0 mb-3 font-serif text-[22px] leading-[1.2] text-[#20221F]">
                What matters most to you?
              </p>
              <div className="grid gap-1.5 text-[15px]">
                <span className="p-2.5 px-3 border border-[#DFE2DB] rounded text-[#4A4E49]">
                  Lowest cost
                </span>
                <span className="p-2.5 px-3 border border-[#DFE2DB] rounded text-[#4A4E49]">
                  Best editing quality
                </span>
                <span className="p-2.5 px-3 border-[1.5px] border-[#3159D7] bg-[#EEF2FC] rounded font-medium text-[#20221F]">
                  Keeping creative control
                </span>
                <span className="p-2.5 px-3 border border-[#DFE2DB] rounded text-[#4A4E49]">
                  All-in-one workflow
                </span>
              </div>
            </div>
          </li>

          {/* Tool 03: Gallery Cost Calculator */}
          <li className="flex flex-col lg:flex-row gap-6 lg:gap-14 py-9 border-b border-[#DFE2DB] items-start lg:items-center">
            <div className="flex-1 min-w-0">
              <p className="m-0 mb-2 font-serif text-[20px] text-[#3159D7]">03</p>
              <h2 className="m-0 mb-2.5 font-serif font-medium text-[clamp(28px,2.8vw,36px)] leading-[1.1] text-[#20221F]">
                Gallery Cost Calculator
              </h2>
              <p className="m-0 mb-4 text-[17px] leading-[1.55] text-[#4A4E49] max-w-[34em]">
                Enter your annual shoot volume to see the plan you would need on Pixieset, ShootProof, Pic-Time, SmugMug, Zenfolio, and CloudSpot, at published October 2026 prices.
              </p>
              <dl className="m-0 mb-5 grid grid-cols-1 sm:grid-cols-[minmax(0,110px)_minmax(0,1fr)] gap-2 sm:gap-4 text-[15px] leading-[1.5]">
                <dt className="font-semibold text-[#20221F]">You enter</dt>
                <dd className="m-0 text-[#4A4E49]">
                  Shoots per year and average photos delivered per shoot
                </dd>
                <dt className="font-semibold text-[#20221F]">You learn</dt>
                <dd className="m-0 text-[#4A4E49]">
                  Total photos, estimated storage, and each platform’s plan, annual cost, and limits
                </dd>
                <dt className="font-semibold text-[#20221F]">Why it helps</dt>
                <dd className="m-0 text-[#4A4E49]">
                  Headline entry prices rarely match the plan your real volume needs
                </dd>
              </dl>
              <Link
                href="/tools/gallery-cost-calculator"
                className="inline-flex items-center whitespace-nowrap h-11 px-5 bg-[#3159D7] text-white rounded font-semibold text-[15px] no-underline hover:bg-[#2547B5] transition-colors"
              >
                Compare gallery costs
              </Link>
            </div>

            {/* Visual preview card */}
            <div
              aria-hidden="true"
              className="w-full lg:w-[480px] shrink-0 bg-white border border-[#DFE2DB] rounded p-4 sm:px-6 text-[15px] tabular-nums"
            >
              <div className="flex justify-between py-2.5 border-b border-[#EEEFEA] text-[#60645F]">
                <span>30 shoots × 500 photos · 73.2 GB</span>
              </div>
              <div className="flex justify-between gap-3 py-2.5 border-b border-[#EEEFEA] text-[#20221F]">
                <span>
                  <strong>SmugMug</strong> · Power
                </span>
                <span>$180/yr</span>
              </div>
              <div className="flex justify-between gap-3 py-2.5 border-b border-[#EEEFEA] text-[#20221F]">
                <span>
                  <strong>Zenfolio</strong> · PortfolioPlus
                </span>
                <span>$228/yr</span>
              </div>
              <div className="flex justify-between gap-3 py-2.5 border-b border-[#EEEFEA] text-[#20221F]">
                <span>
                  <strong>Pixieset</strong> · Basic
                </span>
                <span>$288/yr</span>
              </div>
              <div className="flex justify-between gap-3 py-2.5 text-[#20221F]">
                <span>
                  <strong>Pic-Time</strong> · Professional
                </span>
                <span>$312/yr</span>
              </div>
            </div>
          </li>
        </ol>

        <p className="mt-6 text-[15px] text-[#60645F] max-w-[46em]">
          Results are estimates for comparison, not financial or tax advice. Each tool lists its assumptions and links to the guides it draws on.
        </p>
      </div>
    </div>
  );
}
