import { Metadata } from 'next';
import Link from 'next/link';
import { InfoLayout } from '@/components/info/InfoLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Photo Testers',
  description:
    'How The Photo Testers handles contact messages, newsletter requests, browser-only calculators, affiliate links, and data removal requests.',
  alternates: {
    canonical: 'https://www.thephototesters.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | The Photo Testers',
    description:
      'How The Photo Testers handles contact messages, newsletter requests, browser-only calculators, affiliate links, and data removal requests.',
    url: 'https://www.thephototesters.com/privacy',
    type: 'website',
    images: [
      {
        url: '/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | The Photo Testers',
    description:
      'How The Photo Testers handles contact messages, newsletter requests, browser-only calculators, affiliate links, and data removal requests.',
    images: ['/og/default.jpg'],
  },
};

export default function PrivacyPage() {
  return (
    <InfoLayout currentPage="privacy">
      <header className="mb-7">
        <h1 className="m-0 mb-2.5 font-serif font-medium text-[clamp(36px,4.4vw,52px)] leading-[1.05] tracking-[-0.015em] text-[#20221F]">
          Privacy policy
        </h1>
        <p className="m-0 text-[15px] text-[#60645F]">Last updated: November 2026</p>
      </header>

      <div className="text-[17.5px] leading-[1.68] text-[#20221F] font-sans">
        <p className="m-0 mb-4 text-[#4A4E49]">
          This policy explains what information The Photo Testers collects and how we use it. We keep our privacy policy concise and aligned with how the site actually works.
        </p>

        <h2 className="mt-[1.6em] mb-[0.5em] font-serif font-medium text-[28px] leading-[1.15] text-[#20221F]">
          What we collect
        </h2>
        <p className="m-0 mb-3 text-[#4A4E49]">
          <strong className="font-semibold text-[#20221F]">Email address and messages:</strong> only if you choose to subscribe to our newsletter or reach out via our contact form. We use it to send you new comparisons, tool updates, and pricing notifications or to reply to your inquiry. Nothing else. You can request removal from our update list at any time by submitting a request through our{' '}
          <Link href="/contact" className="text-[#3159D7] underline hover:text-[#20221F]">
            contact form
          </Link>.
        </p>
        <p className="m-0 mb-3 text-[#4A4E49]">
          <strong className="font-semibold text-[#20221F]">Interactive tools:</strong> our calculators and culling finder run entirely in your browser. Numbers and quiz answers you enter are not stored on our servers or transmitted to third parties.
        </p>
        <p className="m-0 mb-3 text-[#4A4E49]">
          <strong className="font-semibold text-[#20221F]">Server logs and analytics:</strong> we do not currently run third-party client-side analytics trackers (such as Google Analytics) in our site code. Our web hosting infrastructure may keep standard technical access logs (such as IP address, browser user agent, and requested URL) for security and reliability.
        </p>
        <p className="m-0 mb-4 text-[#4A4E49]">
          <strong className="font-semibold text-[#20221F]">Cookies and affiliate links:</strong> our site does not set advertising or tracking cookies. When you click an outbound commercial link to a software vendor, the destination vendor or its affiliate network may set a referral cookie under its own privacy policy to attribute a commission.
        </p>

        <h2 className="mt-[1.6em] mb-[0.5em] font-serif font-medium text-[28px] leading-[1.15] text-[#20221F]">
          How we use it
        </h2>
        <p className="m-0 mb-4 text-[#4A4E49]">
          We use submitted contact and newsletter information solely to reply to inquiries and manage update requests. We never sell, rent, or trade your personal data to third parties.
        </p>

        <h2 className="mt-[1.6em] mb-[0.5em] font-serif font-medium text-[28px] leading-[1.15] text-[#20221F]">
          Third-party services
        </h2>
        <p className="m-0 mb-2.5 text-[#4A4E49]">
          The following third-party services handle specific site functions under their own privacy policies:
        </p>
        <ul className="m-0 mb-4 pl-5 list-disc text-[#4A4E49] space-y-1.5">
          <li>
            <strong className="text-[#20221F]">Form delivery (FormSubmit):</strong> delivers messages submitted through the contact and newsletter forms to our editorial inbox.
          </li>
          <li>
            <strong className="text-[#20221F]">Affiliate networks and vendors:</strong> when you click a commercial link to a vendor website, the destination platform may track the referral to assign commission.
          </li>
        </ul>

        <h2 className="mt-[1.6em] mb-[0.5em] font-serif font-medium text-[28px] leading-[1.15] text-[#20221F]">
          Your rights and choices
        </h2>
        <p className="m-0 mb-4 text-[#4A4E49]">
          You have the right to request access to any personal data we hold about you, request corrections, or ask for complete deletion of your records. You can also opt out of email communications or request data removal at any time by submitting a request through our{' '}
          <Link href="/contact" className="text-[#3159D7] underline hover:text-[#20221F]">
            contact form
          </Link>.
        </p>

        <h2 className="mt-[1.6em] mb-[0.5em] font-serif font-medium text-[28px] leading-[1.15] text-[#20221F]">
          Contact
        </h2>
        <p className="m-0 text-[#4A4E49]">
          Questions regarding your privacy or data protection? Reach out to us through our{' '}
          <Link href="/contact" className="text-[#3159D7] underline hover:text-[#20221F]">
            Contact
          </Link>{' '}
          page.
        </p>
      </div>
    </InfoLayout>
  );
}
