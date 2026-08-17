import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Camera } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { MDXComponents } from '@/components/mdx-components';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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
      <Header />

      <main className="flex-1 bg-bg py-16 md:py-24 px-6">
        <article className="max-w-[700px] mx-auto prose prose-lg prose-a:text-accent hover:prose-a:text-accent-dark prose-a:no-underline hover:prose-a:underline prose-headings:font-bold prose-headings:text-ink prose-h1:text-4xl md:prose-h1:text-5xl prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-p:text-ink prose-p:leading-[1.7] prose-strong:text-ink">
          <MDXRemote source={post.content} components={MDXComponents()} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </article>
      </main>

      <Footer />
    </>
  );
}
