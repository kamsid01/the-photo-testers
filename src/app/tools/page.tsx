import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Photography Business Tools | The Photo Testers',
  description: 'Free interactive tools for photographers to calculate pricing, choose software, and run a more profitable business.',
  alternates: {
    canonical: '/tools',
  },
  openGraph: {
    title: 'Free Photography Business Tools | The Photo Testers',
    description: 'Free interactive tools for photographers to calculate pricing, choose software, and run a more profitable business.',
    url: '/tools',
  },
  twitter: {
    title: 'Free Photography Business Tools | The Photo Testers',
    description: 'Free interactive tools for photographers to calculate pricing, choose software, and run a more profitable business.',
  },
};

export default function ToolsIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <header className="mb-12 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink mb-4">
          Free Tools for Photographers
        </h1>
        <p className="text-lg text-muted">
          Interactive calculators, quizzes, and resources to help you run a more profitable and efficient photography business.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link href="/tools/pricing-calculator" className="block group">
          <div className="bg-surface p-8 rounded-xl border border-border h-full hover:border-accent transition-colors flex flex-col">
            <h2 className="text-2xl font-bold text-ink mb-3 group-hover:text-accent transition-colors">Photography Pricing Calculator</h2>
            <p className="text-muted mb-6 flex-grow">
              Work backwards from your desired salary to figure out exactly what you need to charge per shoot. Factors in hidden hours, business costs, and estimated taxes to reveal your true hourly rate.
            </p>
            <span className="text-accent font-medium">Open Calculator &rarr;</span>
          </div>
        </Link>

        <Link href="/tools/culling-tool-finder" className="block group">
          <div className="bg-surface p-8 rounded-xl border border-border h-full hover:border-accent transition-colors flex flex-col">
            <h2 className="text-2xl font-bold text-ink mb-3 group-hover:text-accent transition-colors">AI Culling Tool Finder Quiz</h2>
            <p className="text-muted mb-6 flex-grow">
              Answer 5 quick questions about your workflow, volume, and budget, and we'll match you with the perfect AI photo culling software for your specific needs.
            </p>
            <span className="text-accent font-medium">Take the Quiz &rarr;</span>
          </div>
        </Link>

        <Link href="/tools/gallery-cost-calculator" className="block group">
          <div className="bg-surface p-8 rounded-xl border border-border h-full hover:border-accent transition-colors flex flex-col">
            <h2 className="text-2xl font-bold text-ink mb-3 group-hover:text-accent transition-colors">Gallery Cost Calculator</h2>
            <p className="text-muted mb-6 flex-grow">
              Enter your annual shoot volume to instantly see the exact plan and estimated cost you would need across major gallery platforms like Pixieset, ShootProof, and Pic-Time.
            </p>
            <span className="text-accent font-medium">Compare Costs &rarr;</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
