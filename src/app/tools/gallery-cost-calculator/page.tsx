import { Metadata } from 'next';
import Link from 'next/link';
import { GalleryCostCalculator } from '../../../components/GalleryCostCalculator';

export const metadata: Metadata = {
  title: 'Photography Gallery Cost Calculator',
  description: 'Compare the real annual cost of Pixieset, ShootProof, Pic-Time, and more based on your actual shoot volume and storage needs.',
};

export default function GalleryCostCalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <header className="mb-8 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink mb-4">
          Photography Gallery Cost Calculator
        </h1>
        <p className="text-lg text-muted">
          Don't overpay for storage you don't need, or get hit by surprise upgrade fees. Enter your annual shoot volume below to see the exact plan and estimated cost you would need across the major client gallery platforms.
        </p>
      </header>

      <GalleryCostCalculator />

      <article className="prose prose-lg prose-headings:text-ink prose-a:text-accent hover:prose-a:text-accent-dark max-w-3xl mx-auto mt-20 pt-12 border-t border-border">
        <h2>How gallery pricing actually works</h2>
        <p>
          Client gallery platforms typically use one of two pricing models to charge photographers: storage based limits or photo count limits. Understanding the difference is crucial for choosing the most cost effective option for your specific photography niche.
        </p>
        <p>
          Storage based pricing, used by platforms like Pixieset and CloudSpot, limits the total gigabytes of data you can upload. High resolution JPEGs usually average around 5MB each. If you shoot high volume weddings and deliver thousands of images per month, you will chew through storage limits incredibly fast and quickly find yourself needing an unlimited plan. Conversely, ShootProof charges by the total number of photos hosted regardless of file size, which can be advantageous if you deliver very large files.
        </p>
        <p>
          Another major factor is store commission. Free or cheap entry level plans often take a 15% cut of any print sales you make through the gallery store. If you sell a lot of prints, that 15% commission will easily eclipse the monthly cost of upgrading to a premium, zero commission plan. Always run the numbers on your expected print sales before settling for a free tier.
        </p>
        
        <h3 className="mt-12">Related Guides:</h3>
        <ul>
          <li>
            <Link href="/best-client-gallery-software">Best Client Gallery Software</Link> - Read our deep dive into the top platforms and see how their features compare beyond just price.
          </li>
          <li>
            <Link href="/pic-time-vs-pixieset-vs-shootproof">Pic-Time vs Pixieset vs ShootProof</Link> - A detailed comparison of the big three gallery platforms.
          </li>
        </ul>
      </article>
    </div>
  );
}
