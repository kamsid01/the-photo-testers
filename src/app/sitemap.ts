import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://thephototesters.com';

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/how-we-review',
    '/affiliate-disclosure',
    '/privacy',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Article pages
  const posts = getAllPosts();
  const articlePages = posts.map((post) => {
    const rawDate = post.meta.updated || post.meta.date;
    const parsedDate = rawDate ? new Date(rawDate) : new Date();
    const lastModified = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

    return {
      url: `${baseUrl}/${post.meta.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    };
  });

  return [...staticPages, ...articlePages];
}
