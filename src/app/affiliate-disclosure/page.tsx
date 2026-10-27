import { Metadata } from 'next';
import Link from 'next/link';
import { InfoLayout } from '@/components/info/InfoLayout';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | The Photo Testers',
  description:
    'The Photo Testers is supported by its readers. Here is exactly how affiliate relationships and commissions work on this publication.',
  alternates: {
    canonical: 'https://www.thephototesters.com/affiliate-disclosure',
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <InfoLayout currentPage="affiliate-disclosure">
      <header className="mb-7">
        <h1 className="m-0 mb-2.5 font-serif font-medium text-[clamp(36px,4.4vw,52px)] leading-[1.05] tracking-[-0.015em] text-[#20221F]">
          Affiliate disclosure
        </h1>
        <p className="m-0 text-[15px] text-[#60645F]">Last updated: June 2026</p>
      </header>

      <div className="text-[17.5px] leading-[1.68] text-[#20221F] font-sans">
        <p className="m-0 mb-5 font-serif text-[21px] leading-[1.45] text-[#20221F]">
          The Photo Testers is supported by its readers. Here is exactly how our funding works.
        </p>

        <h2 className="mt-[1.6em] mb-[0.5em] font-serif font-medium text-[28px] leading-[1.15] text-[#20221F]">
          We use affiliate links
        </h2>
        <p className="m-0 mb-4 text-[#4A4E49]">
          Some of the links on this website are affiliate links. If you click one and sign up for or purchase a subscription, we may earn an affiliate commission. This comes at zero extra cost to you; you pay the exact same price (or in some cases receive a promotional discount code) you would have paid anyway.
        </p>
        <p className="m-0 mb-4 text-[#4A4E49]">
          We maintain affiliate relationships with several software companies across photography workflows, which may include HoneyBook, Dubsado, Pixieset, Studio Ninja, Aftershoot, Imagen AI, and others.
        </p>

        <h2 className="mt-[1.6em] mb-[0.5em] font-serif font-medium text-[28px] leading-[1.15] text-[#20221F]">
          It does not change our recommendations
        </h2>
        <p className="m-0 mb-4 text-[#4A4E49]">
          This is the foundational principle of this publication: earning a commission never changes what we write or which tool we recommend. We recommend the tool we genuinely evaluate as best suited for the specific photographer described, and we routinely recommend free software, lower-tier plans, or tools without affiliate programs over higher-paying competitors.
        </p>
        <p className="m-0 mb-4 text-[#4A4E49]">
          Our logic is straightforward: a review site that pushes the wrong product to pocket a commission is a site nobody trusts twice. This publication only works if working photographers can rely on our verdict. The honest recommendation is the only one that makes commercial sense long term.
        </p>

        <h2 className="mt-[1.6em] mb-[0.5em] font-serif font-medium text-[28px] leading-[1.15] text-[#20221F]">
          What we do not do
        </h2>
        <p className="m-0 mb-4 text-[#4A4E49]">
          We do not let affiliate relationships decide our ranking or verdicts. We do not omit or soften the limitations of partner platforms. And we do not recommend tools we have not directly tested or rigorously researched through structured evaluations.
        </p>

        <h2 className="mt-[1.6em] mb-[0.5em] font-serif font-medium text-[28px] leading-[1.15] text-[#20221F]">
          Questions
        </h2>
        <p className="m-0 mb-4 text-[#4A4E49]">
          If you ever want to know whether a specific link is an affiliate link, or have questions about how our publication is funded,{' '}
          <Link href="/contact" className="text-[#3159D7] underline hover:text-[#20221F]">
            contact us
          </Link>{' '}
          and we will answer directly.
        </p>

        <p className="mt-[1.6em] pt-4 border-t border-[#DFE2DB] text-[15px] text-[#60645F]">
          This disclosure is provided in compliance with FTC guidelines on affiliate marketing and consumer transparency.
        </p>
      </div>
    </InfoLayout>
  );
}
