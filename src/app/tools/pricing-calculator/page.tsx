import { Metadata } from 'next';
import Link from 'next/link';
import { PricingCalculator } from '../../../components/PricingCalculator';

export const metadata: Metadata = {
  title: 'Photography Pricing Calculator: What Should You Charge?',
  description: 'Use our free interactive calculator to find out exactly how much you need to charge per shoot to hit your desired salary, factoring in hidden hours, costs, and taxes.',
};

export default function PricingCalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <header className="mb-8 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink mb-4">
          Photography Pricing Calculator
        </h1>
        <p className="text-lg text-muted">
          Most photographers undercharge because they only count the hours they spend holding a camera. Work backwards from your desired salary to find out what you <i>actually</i> need to charge to run a sustainable business.
        </p>
      </header>

      <PricingCalculator />

      <article className="prose prose-lg prose-headings:text-ink prose-a:text-accent hover:prose-a:text-accent-dark max-w-3xl mx-auto mt-20 pt-12 border-t border-border">
        <h2>Why most photographers undercharge</h2>
        <p>
          The most common pricing mistake in the photography industry is the "hidden hours" trap. When you look at an 8-hour wedding or a 1-hour portrait session, it's easy to multiply that by a standard hourly rate and feel good about the resulting price. 
        </p>
        <p>
          But the actual time you spend on a client includes emails, consultations, travel, culling, editing, exporting, and delivering the gallery. A single 1-hour shoot often requires 5+ hours of total labor. When you factor in business costs - insurance, CRM software, gallery hosting, camera depreciation, marketing - your true effective hourly rate plummets. 
        </p>
        <p>
          This calculator forces you to confront those hidden hours and costs. By working backward from the take-home salary you actually want (and need) to survive, you'll find the baseline price you must charge per shoot. If the result is shockingly high, you have two choices: increase your prices and position yourself as a premium, high-value brand, or drastically cut your unpaid hours by outsourcing or using better workflow tools.
        </p>
        
        <h3 className="mt-12">Tools to help you run a more profitable business:</h3>
        <ul>
          <li>
            <Link href="/best-client-gallery-software">Best Client Gallery Software</Link> - Deliver your photos beautifully and use automated marketing to sell more prints without extra labor.
          </li>
          <li>
            <Link href="/best-crm-wedding-photographers">Best CRM for Wedding Photographers</Link> - Cut down your admin time by automating your emails, contracts, and invoicing.
          </li>
        </ul>
      </article>
    </div>
  );
}
