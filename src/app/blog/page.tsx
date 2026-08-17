import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'All Articles | The Photo Testers',
  description: 'Explore our complete library of hands-on tested photography software reviews, AI culling & editing guides, and client CRM comparisons.',
};

const EXCLUDED_SLUGS = new Set([
  'about',
  'how-we-review',
  'affiliate-disclosure',
  'privacy',
  'contact',
]);

export default function BlogIndexPage() {
  const allPosts = getAllPosts();
  
  // Filter out boilerplate pages and explicitly excluded slugs
  const articles = allPosts
    .filter(
      (post) =>
        post.meta.type !== 'page' && !EXCLUDED_SLUGS.has(post.meta.slug)
    )
    .sort((a, b) => (a.meta.date > b.meta.date ? -1 : 1));

  return (
    <>
      <Header />

      <main className="flex-1 bg-bg">
        {/* Hero Banner */}
        <section className="pt-16 pb-12 md:pt-20 md:pb-16 px-6 bg-cream border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-xs font-semibold tracking-wider text-muted uppercase mb-3">
              Library
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink mb-4">
              All Articles & Software Reviews
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-3xl leading-relaxed">
              Every tool we test gets a full hands-on review with real workflows and current pricing. Browse all our comparisons, buyer guides, and software tests below.
            </p>
          </div>
        </section>

        {/* Articles List / Grid */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
              <h2 className="text-sm font-semibold text-muted uppercase tracking-wider">
                {articles.length} Published Articles
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {articles.map((post) => (
                <article
                  key={post.meta.slug}
                  className="group flex flex-col justify-between bg-surface p-6 md:p-8 rounded-xl border border-border hover:border-accent transition-all shadow-sm hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-3 text-xs">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-accent-tint text-accent font-semibold tracking-wide uppercase text-[11px]">
                        {post.meta.category || 'Review'}
                      </span>
                      <time
                        dateTime={post.meta.date}
                        className="text-muted text-sm font-medium"
                      >
                        {post.meta.date}
                      </time>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-ink group-hover:text-accent transition-colors mb-3 leading-snug">
                      <Link href={`/${post.meta.slug}`}>
                        {post.meta.title}
                      </Link>
                    </h2>

                    <p className="text-muted text-base leading-relaxed line-clamp-3 mb-6">
                      {post.meta.meta_description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/60">
                    <Link
                      href={`/${post.meta.slug}`}
                      className="inline-flex items-center text-sm font-semibold text-accent group-hover:text-accent-dark transition-colors"
                    >
                      Read full article
                      <span className="ml-1.5 transition-transform group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
