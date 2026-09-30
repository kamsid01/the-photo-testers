import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const CATEGORY_MAP: Record<string, { name: string, description: string }> = {
  'client-crms': {
    name: 'Client CRMs',
    description: 'Compare the best client relationship management software for photographers to streamline booking, invoicing, and client communication.'
  },
  'gallery-delivery': {
    name: 'Gallery Delivery',
    description: 'Find the right platform to deliver stunning online photo galleries to your clients, complete with print stores and digital downloads.'
  },
  'ai-culling-editing': {
    name: 'AI Culling & Editing',
    description: 'Speed up your post-production workflow with the latest AI-powered photo culling and editing software.'
  },
  'booking-scheduling': {
    name: 'Booking & Scheduling',
    description: 'Automate your calendar and let clients book mini-sessions and shoots online.'
  },
  'portfolio-websites': {
    name: 'Portfolio Websites',
    description: 'Build a beautiful, fast portfolio website to showcase your best photography work.'
  },
  'print-album-sales': {
    name: 'Print & Album Sales',
    description: 'Maximize your revenue by selling professional prints, albums, and wall art directly to clients.'
  }
};

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORY_MAP[slug];

  if (!category) {
    return {};
  }

  let customTitle = `${category.name} Software Reviews | The Photo Testers`;
  if (slug === 'client-crms') customTitle = 'Photography CRM Software Reviews | The Photo Testers';
  if (slug === 'portfolio-websites') customTitle = 'Photography Portfolio Website Reviews | The Photo Testers';

  const noindexSlugs = ['booking-scheduling', 'portfolio-websites', 'print-album-sales'];
  const shouldIndex = !noindexSlugs.includes(slug);

  return {
    title: customTitle,
    description: category.description,
    robots: shouldIndex ? { index: true, follow: true } : { index: false, follow: false },
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      title: customTitle,
      description: category.description,
      url: `/category/${slug}`,
      images: [
        {
          url: `/og/category-${slug}.jpg`,
          width: 1200,
          height: 630,
          alt: customTitle
        }
      ],
    },
    twitter: {
      title: customTitle,
      description: category.description,
      images: [`/og/category-${slug}.jpg`],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((slug) => ({
    slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = CATEGORY_MAP[slug];

  if (!category) {
    notFound();
  }

  const allPosts = getAllPosts();
  
  const normalizedCategoryName = category.name.toLowerCase().replace(/ & /g, ' and ');
  
  const articles = allPosts
    .filter((post) => {
      if (!post.meta.category) return false;
      const postCat = post.meta.category.toLowerCase().replace(/ & /g, ' and ');
      return postCat === normalizedCategoryName || postCat.includes(slug.split('-')[0]); 
    })
    .sort((a, b) => (a.meta.date > b.meta.date ? -1 : 1));

  return (
    <>
      <Header />

      <main className="flex-1 bg-bg">
        <section className="pt-16 pb-12 md:pt-20 md:pb-16 px-6 bg-cream border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-xs font-semibold tracking-wider text-muted uppercase mb-3">
              Category Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink mb-4">
              {category.name}
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-3xl leading-relaxed">
              {category.description}
            </p>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            {articles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted text-lg">We are currently testing software for this category. Check back soon for our hands-on reviews!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {articles.map((post) => (
                  <article
                    key={post.meta.slug}
                    className="group flex flex-col justify-between bg-surface p-6 md:p-8 rounded-xl border border-border hover:border-accent transition-all shadow-sm hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-3 text-xs">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-accent-tint text-accent font-semibold tracking-wide uppercase text-[11px]">
                          {post.meta.category || category.name}
                        </span>
                        <time dateTime={post.meta.date} className="text-muted text-sm font-medium">
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
            )}
            
            <div className="mt-20 pt-10 border-t border-border">
              <h3 className="text-xl font-bold mb-6 text-ink">Explore other categories</h3>
              <div className="flex flex-wrap gap-4">
                {Object.entries(CATEGORY_MAP).map(([catSlug, catData]) => (
                  catSlug !== slug && (
                    <Link key={catSlug} href={`/category/${catSlug}`} className="px-5 py-2 rounded-full border border-border bg-bg text-ink text-sm hover:border-accent hover:text-accent transition-colors font-medium shadow-sm">
                      {catData.name}
                    </Link>
                  )
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
