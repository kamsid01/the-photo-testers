import { Metadata } from 'next';
import Link from 'next/link';
import { InfoLayout } from '@/components/info/InfoLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Photo Testers',
  description:
    'This policy explains what information The Photo Testers collects, how we use it, and your privacy rights.',
  alternates: {
    canonical: 'https://www.thephototesters.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <InfoLayout currentPage="privacy">
      <header className="mb-7">
        <h1 className="m-0 mb-2.5 font-serif font-medium text-[clamp(36px,4.4vw,52px)] leading-[1.05] tracking-[-0.015em] text-[#20221F]">
          Privacy policy
        </h1>
        <p className="m-0 text-[15px] text-[#60645F]">Last updated: June 2026</p>
      </header>

      <div className="text-[17.5px] leading-[1.68] text-[#20221F] font-sans">
        <p className="m-0 mb-4 text-[#4A4E49]">
          This policy explains what information The Photo Testers collects and how we use it. We keep our privacy policy concise and plain on purpose.
        </p>

        <h2 className="mt-[1.6em] mb-[0.5em] font-serif font-medium text-[28px] leading-[1.15] text-[#20221F]">
          What we collect
        </h2>
        <p className="m-0 mb-3 text-[#4A4E49]">
          <strong className="font-semibold text-[#20221F]">Email address:</strong> only if you choose to subscribe to our newsletter or reach out via our contact form. We use it to send you new comparisons, tool updates, and pricing notifications or to reply to your inquiry. Nothing else. You can unsubscribe at any time using the link in any email.
        </p>
        <p className="m-0 mb-3 text-[#4A4E49]">
          <strong className="font-semibold text-[#20221F]">Analytics data:</strong> we collect privacy-conscious analytics to understand how visitors engage with the publication: which guides are read, referring sites, approximate geographic location, and device types. This data is aggregated and never used to track individuals.
        </p>
        <p className="m-0 mb-4 text-[#4A4E49]">
          <strong className="font-semibold text-[#20221F]">Cookies:</strong> our site, analytics, and affiliate tracking partners may place small cookies in your browser to remember preferences or track affiliate referral attribution. You can disable cookies in your browser settings at any time without impacting site readability.
        </p>

        <h2 className="mt-[1.6em] mb-[0.5em] font-serif font-medium text-[28px] leading-[1.15] text-[#20221F]">
          How we use it
        </h2>
        <p className="m-0 mb-4 text-[#4A4E49]">
          We use this information to maintain the website, publish relevant comparisons, and manage our newsletter. We never sell, rent, or trade your personal data to third parties.
        </p>

        <h2 className="mt-[1.6em] mb-[0.5em] font-serif font-medium text-[28px] leading-[1.15] text-[#20221F]">
          Third-party services
        </h2>
        <p className="m-0 mb-2.5 text-[#4A4E49]">
          Some third-party providers we utilize may collect data under their respective privacy policies:
        </p>
        <ul className="m-0 mb-4 pl-5 list-disc text-[#4A4E49] space-y-1.5">
          <li>
            <strong className="text-[#20221F]">Analytics:</strong> to monitor publication traffic and readability metrics.
          </li>
          <li>
            <strong className="text-[#20221F]">Affiliate networks:</strong> when you click a commercial link to a vendor website, the destination platform may track the referral to assign commission.
          </li>
        </ul>

        <h2 className="mt-[1.6em] mb-[0.5em] font-serif font-medium text-[28px] leading-[1.15] text-[#20221F]">
          Your rights and choices
        </h2>
        <p className="m-0 mb-4 text-[#4A4E49]">
          You have the right to request access to any personal data we hold about you, request corrections, or ask for complete deletion of your records. You can also opt out of email communications at any time.
        </p>

        <h2 className="mt-[1.6em] mb-[0.5em] font-serif font-medium text-[28px] leading-[1.15] text-[#20221F]">
          Contact
        </h2>
        <p className="m-0 text-[#4A4E49]">
          Questions regarding your privacy or data protection? Reach out to us at{' '}
          <a
            href="mailto:hello@thephototesters.com"
            className="text-[#3159D7] underline hover:text-[#20221F]"
          >
            hello@thephototesters.com
          </a>{' '}
          or via our{' '}
          <Link href="/contact" className="text-[#3159D7] underline hover:text-[#20221F]">
            Contact
          </Link>{' '}
          page.
        </p>
      </div>
    </InfoLayout>
  );
}
