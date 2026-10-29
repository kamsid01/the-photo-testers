import { Metadata } from 'next';
import { InfoLayout } from '@/components/info/InfoLayout';
import { ContactForm } from '@/components/info/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | The Photo Testers',
  description:
    'Questions, corrections, or a software tool we should test. Reach out to The Photo Testers editorial team.',
  alternates: {
    canonical: 'https://www.thephototesters.com/contact',
  },
  openGraph: {
    title: 'Contact | The Photo Testers',
    description:
      'Questions, corrections, or a software tool we should test. Reach out to The Photo Testers editorial team.',
    url: 'https://www.thephototesters.com/contact',
    type: 'website',
    images: [
      {
        url: '/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact The Photo Testers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | The Photo Testers',
    description:
      'Questions, corrections, or a software tool we should test. Reach out to The Photo Testers editorial team.',
    images: ['/og/default.jpg'],
  },
};

export default function ContactPage() {
  const schemaBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thephototesters.com' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://www.thephototesters.com/contact' },
    ],
  };

  const schemaContact = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact | The Photo Testers',
    description: 'Questions, corrections, or a software tool we should test. Reach out to The Photo Testers editorial team.',
    url: 'https://www.thephototesters.com/contact',
    isPartOf: {
      '@type': 'WebSite',
      name: 'The Photo Testers',
      url: 'https://www.thephototesters.com',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaContact) }} />
    <InfoLayout currentPage="contact">
      <header className="mb-6">
        <h1 className="m-0 mb-3.5 font-serif font-medium text-[clamp(36px,4.4vw,52px)] leading-[1.05] tracking-[-0.015em] text-[#20221F]">
          Contact
        </h1>
        <p className="m-0 text-[18px] leading-[1.55] text-[#4A4E49]">
          Questions, corrections, or a tool we should cover. Email{' '}
          <a
            href="mailto:hello@thephototesters.com"
            className="text-[#3159D7] underline hover:text-[#20221F]"
          >
            hello@thephototesters.com
          </a>{' '}
          or use the form below.
        </p>
      </header>

      <ContactForm />
    </InfoLayout>
    </>
  );
}
