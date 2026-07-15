import Link from 'next/link';
import { Camera } from 'lucide-react';
import { getAllPosts } from '@/lib/posts';

const CATEGORIES = [
  "Client CRMs", "Gallery delivery", "AI culling and editing",
  "Booking and scheduling", "Portfolio websites", "Print and album sales"
];

export default function Home() {
  const featuredPosts = getAllPosts().slice(0, 3);
  return (
    <>
      <header className="border-b border-border py-4 bg-bg">
        <div className="container mx-auto px-6 flex justify-between items-center max-w-5xl">
          <Link href="/">
            <img src="/logo.svg" alt="The Photo Testers" className="h-8 w-auto" />
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-ink">
            <Link href="/about" className="hover:text-accent transition-colors">About</Link>
            <Link href="/how-we-review" className="hover:text-accent transition-colors">How we review</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="pt-20 pb-12 md:pt-28 md:pb-16 px-6 text-center bg-cream border-b border-border">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-ink mb-6">
              Software reviews for photographers, actually tested
            </h1>
            <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto">
              We sign up for every tool, use it, and write down what we find. Pricing stays current. Cons get the same airtime as the pros. The goal is simple: help you pick the right software without wading through marketing pages.
            </p>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-16 px-6 bg-bg border-b border-border">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-ink mb-8">Most-read comparisons</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPosts.map((post, i) => (
                <Link href={`/${post.meta.slug}`} key={i} className="group block bg-surface p-6 rounded-lg border border-border hover:border-accent transition-colors shadow-sm">
                  <div className="text-gray-600 text-[12px] tracking-[0.04em] uppercase font-semibold mb-3">{post.meta.category}</div>
                  <h3 className="text-lg font-bold text-ink group-hover:text-accent transition-colors mb-3 leading-snug">{post.meta.title}</h3>
                  <div className="text-sm text-muted">{post.meta.date}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Category List */}
        <section className="py-20 px-6 bg-accent-tint border-b border-border">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-ink mb-8 text-center">Browse by category</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {CATEGORIES.map((cat, i) => (
                <Link href="#" key={i} className="px-6 py-3 rounded-full border border-border bg-bg text-ink hover:border-accent hover:text-accent transition-colors font-medium shadow-sm">
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Author / Why trust us */}
        <section className="py-16 px-6 bg-cream border-b border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-ink mb-6">Why trust us</h2>
            <div className="prose prose-lg text-ink font-sans leading-relaxed space-y-4">
              <p>
                Most reviews you find are written by someone who used one tool and guessed at the rest, or by the software company itself. We do it the slow way. Every tool here gets a real account, real test files, and a real workflow run through it. 
              </p>
              <p>
                When the pricing changes, we change the page. When something is annoying, we say so. That is the whole pitch.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/about" className="text-accent font-medium hover:text-accent-dark hover:underline">
                Read how we review &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Email Signup */}
        <section className="py-24 px-6 bg-accent-tint">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-ink mb-4">New comparisons, sent occasionally</h2>
            <p className="text-muted mb-8 text-lg">
              When we publish a new review or a tool changes its pricing, you hear about it. Nothing else.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-md border border-border focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-bg text-ink shadow-sm"
                required
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-accent text-bg font-medium rounded-md hover:bg-accent-dark transition-colors shadow-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-bg">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-ink">
            <img src="/logo.svg" alt="The Photo Testers" className="h-6 w-auto grayscale opacity-80" />
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted">
            <Link href="/about" className="hover:text-accent transition-colors">About</Link>
            <Link href="/how-we-review" className="hover:text-accent transition-colors">How we review</Link>
            <Link href="/affiliate-disclosure" className="hover:text-accent transition-colors">Affiliate disclosure</Link>
            <Link href="/privacy" className="hover:text-accent transition-colors">Privacy</Link>
            <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
