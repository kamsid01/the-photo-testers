import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface CategoryConfig {
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro?: React.ReactNode;
  fallbackDescription?: string;
}

const CATEGORY_MAP: Record<string, CategoryConfig> = {
  'client-crms': {
    name: 'Client CRMs',
    h1: 'Photography CRM & Client Management Software',
    metaTitle: 'Photography CRM Software: Reviews & Comparisons (2026)',
    metaDescription: 'Independent reviews of photography CRM software, HoneyBook, Dubsado, Studio Ninja and more, compared on pricing, automation, scheduling, and UK/EU VAT and GDPR.',
    intro: (
      <>
        <p>
          A photography CRM handles the business side of your studio: inquiries, bookings, contracts, invoices, questionnaires, and client communication, so you spend less time on admin and more behind the camera. The best one for you depends on what you need most. Some are built for deep automation, some for simple booking, some specifically for European VAT and GDPR compliance.
        </p>
        <p>
          When choosing, look at: automated workflows (emails, contracts, payment reminders), a branded client portal, contracts with e-signatures, invoicing and online payments, scheduling, and, if you shoot in the UK or EU, correct VAT handling and a signable data-processing agreement. Pricing matters too, some tools charge a flat monthly fee while others scale with use.
        </p>
        <p>
          Start with our guide to the <Link href="/best-crm-wedding-photographers">best CRM for wedding photographers</Link>. For the two biggest names head to head, read <Link href="/dubsado-vs-honeybook">Dubsado vs HoneyBook</Link>. If HoneyBook is not the right fit, see <Link href="/honeybook-alternatives-photographers">HoneyBook alternatives for photographers</Link>. For specific needs, we cover <Link href="/photography-crm-built-in-scheduler">photography CRMs with a built-in scheduler</Link> and <Link href="/photography-crm-pic-time-integration">CRMs that integrate with Pic-Time</Link>. And if you are in Europe, <Link href="/photography-crm-vat-gdpr-europe">the best CRM for VAT and GDPR compliance</Link> is essential reading.
        </p>
      </>
    )
  },
  'gallery-delivery': {
    name: 'Gallery Delivery',
    h1: 'Client Gallery Software for Photographers',
    metaTitle: 'Best Client Gallery Software for Photographers (2026)',
    metaDescription: 'Independent reviews of client gallery platforms, Pixieset, ShootProof, Pic-Time, SmugMug and more, compared on pricing, print sales, storage, and client experience.',
    intro: (
      <>
        <p>
          Client gallery software is where your finished photos go to be delivered, viewed, downloaded, and often bought. A good platform makes your galleries feel like an extension of your brand: it loads fast, downloads cleanly, and sells prints without you chasing anyone.
        </p>
        <p>
          When choosing, look at: a branded, password-protected gallery, favouriting and proofing tools, full-resolution and watermarked download options, a built-in print store (and whether it takes a commission on sales), storage that fits your shooting volume, and a clean mobile experience, since most clients open their gallery on a phone. Pricing almost always scales with storage, so compare platforms at your real volume, not the headline entry price.
        </p>
        <p>
          Start with our guide to the <Link href="/best-client-gallery-software">best client gallery software</Link>, which compares the whole field including Pixieset, ShootProof, Pic-Time, SmugMug, Zenfolio and CloudSpot. For a focused look at the three most popular platforms, read <Link href="/pic-time-vs-pixieset-vs-shootproof">Pic-Time vs Pixieset vs ShootProof</Link>.
        </p>
      </>
    )
  },
  'ai-culling-editing': {
    name: 'AI Culling & Editing',
    h1: 'AI Culling & Editing Software for Photographers',
    metaTitle: 'Best AI Culling & Editing Software for Photographers (2026)',
    metaDescription: 'Independent reviews of AI culling and editing tools, Aftershoot, Imagen, Narrative, FilterPixel and more, compared on accuracy, editing quality, offline vs cloud, and pricing.',
    intro: (
      <>
        <p>
          AI culling and editing software automates the slowest parts of post-production: selecting the keepers from thousands of shots, applying your editing style across a whole gallery, and retouching portraits. Used well, these tools cut hours off every wedding or portrait session.
        </p>
        <p>
          It helps to be clear about three different jobs. Culling is picking the best frames and removing blinks, blurs and duplicates. Editing is applying your colour and tone across the set. Retouching is the close-up work on skin, glare and backgrounds. Some tools are excellent at one of these; some do all three. When comparing, weigh culling accuracy, editing quality (skin tones especially), whether the tool runs offline or in the cloud, and the pricing model, a flat monthly fee versus per-photo pricing changes the cost a lot depending on your volume.
        </p>
        <p>
          Start with our overview of the <Link href="/best-ai-culling-editing-software">best AI culling and editing software</Link>. The key head to head is <Link href="/aftershoot-vs-imagen">Aftershoot vs Imagen</Link>, and we go deep on each in our <Link href="/aftershoot-review">Aftershoot review</Link> and <Link href="/imagen-ai-review">Imagen AI review</Link>. For culling specifically, see the <Link href="/best-photo-culling-software">best photo culling software</Link>, and if you are weighing options, <Link href="/aftershoot-alternatives">Aftershoot alternatives</Link> and <Link href="/filterpixel-alternatives">FilterPixel alternatives</Link> cover the rest of the field.
        </p>
      </>
    )
  },
  'booking-scheduling': {
    name: 'Booking & Scheduling',
    h1: 'Booking & Scheduling Software',
    metaTitle: 'Booking & Scheduling Software Reviews | The Photo Testers',
    metaDescription: 'Automate your calendar and let clients book mini-sessions and shoots online.',
    fallbackDescription: 'Automate your calendar and let clients book mini-sessions and shoots online.'
  },
  'portfolio-websites': {
    name: 'Portfolio Websites',
    h1: 'Portfolio Website Builders',
    metaTitle: 'Photography Portfolio Website Reviews | The Photo Testers',
    metaDescription: 'Build a beautiful, fast portfolio website to showcase your best photography work.',
    fallbackDescription: 'Build a beautiful, fast portfolio website to showcase your best photography work.'
  },
  'print-album-sales': {
    name: 'Print & Album Sales',
    h1: 'Print & Album Sales Platforms',
    metaTitle: 'Print & Album Sales Software Reviews | The Photo Testers',
    metaDescription: 'Maximize your revenue by selling professional prints, albums, and wall art directly to clients.',
    fallbackDescription: 'Maximize your revenue by selling professional prints, albums, and wall art directly to clients.'
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

  const noindexSlugs = ['booking-scheduling', 'portfolio-websites', 'print-album-sales'];
  const shouldIndex = !noindexSlugs.includes(slug);

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    robots: shouldIndex ? { index: true, follow: true } : { index: false, follow: true },
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      url: `/category/${slug}`,
      images: [
        {
          url: `/og/default.jpg`,
          width: 1200,
          height: 630,
          alt: category.metaTitle
        }
      ],
    },
    twitter: {
      title: category.metaTitle,
      description: category.metaDescription,
      images: [`/og/default.jpg`],
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
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink mb-6">
              {category.h1}
            </h1>
            {category.intro ? (
              <div className="prose prose-lg text-ink font-sans leading-relaxed space-y-4 max-w-4xl prose-p:text-ink prose-p:leading-[1.7] prose-a:text-accent hover:prose-a:text-accent-dark prose-a:font-medium prose-a:underline prose-strong:text-ink">
                {category.intro}
              </div>
            ) : (
              <p className="text-lg md:text-xl text-muted max-w-3xl leading-relaxed">
                {category.fallbackDescription}
              </p>
            )}
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
              <h2 className="text-sm font-semibold text-muted uppercase tracking-wider">
                {articles.length} Published Articles
              </h2>
            </div>

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
