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
};

export default function ContactPage() {
  return (
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
  );
}
