import type { Metadata } from 'next';
import { HomeHero, HomeInside } from '@/components/home/HomeTop';
import { HomeWorkflow, HomeGuides } from '@/components/home/HomeMiddle';
import {
  HomeCompare,
  HomeTools,
  HomeMethod,
  HomeLatest,
  HomeNewsletter,
} from '@/components/home/HomeBottom';

export const metadata: Metadata = {
  title: 'The Photo Testers — Photography Software Field Guide',
  description:
    'Independent reviews, practical comparisons, and useful tools for choosing the software that fits your photography business.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'The Photo Testers',
    url: 'https://www.thephototesters.com/',
    description:
      'Independent reviews, practical comparisons, and useful tools for choosing photography software.',
  };

  return (
    <div style={{ background: '#FAF9F6' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeHero />
      <HomeInside />
      <HomeWorkflow />
      <HomeGuides />
      <HomeCompare />
      <HomeTools />
      <HomeMethod />
      <HomeLatest />
      <HomeNewsletter />
    </div>
  );
}
