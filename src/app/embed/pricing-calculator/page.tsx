import React from 'react';
import { Metadata } from 'next';
import { PricingCalculatorEmbed } from '@/components/PricingCalculatorEmbed';

export const metadata: Metadata = {
  title: 'Photography Pricing Calculator Widget | The Photo Testers',
  description:
    'Compact embeddable photography pricing widget showing how shoots per year and hidden hours affect take-home hourly pay.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.thephototesters.com/tools/pricing-calculator',
  },
};

export default async function EmbedPricingCalculatorPage({
  searchParams,
}: {
  searchParams: Promise<{ partner?: string; ref?: string }>;
}) {
  const sp = await searchParams;
  const partner = sp.partner || sp.ref || 'embed';

  return <PricingCalculatorEmbed partner={partner} />;
}
