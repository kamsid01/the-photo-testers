import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Camera } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { MDXComponents } from '@/components/mdx-components';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.meta.meta_title || post.meta.title,
    description: post.meta.meta_description,
    alternates: {
      canonical: post.meta.canonical,
    },
    openGraph: {
      title: post.meta.og_title || post.meta.title,
      description: post.meta.og_description || post.meta.meta_description,
      type: (post.meta.og_type as any) || 'article',
      url: post.meta.canonical,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.meta.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

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

      <main className="flex-1 bg-bg py-16 md:py-24 px-6">
        <article className="max-w-[700px] mx-auto prose prose-lg prose-a:text-accent hover:prose-a:text-accent-dark prose-a:no-underline hover:prose-a:underline prose-headings:font-bold prose-headings:text-ink prose-h1:text-4xl md:prose-h1:text-5xl prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-p:text-ink prose-p:leading-[1.7] prose-strong:text-ink">
          <MDXRemote source={post.content} components={MDXComponents()} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </article>
      </main>

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
