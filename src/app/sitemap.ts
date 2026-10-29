import { MetadataRoute } from 'next';
import { getSiteData } from '@/lib/site-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.thephototesters.com';
  const site = getSiteData();

  // Real modification dates for static pages and category hubs
  const staticPageDates: Record<string, string> = {
    '': '2026-10-29',
    '/about': '2026-10-29',
    '/how-we-review': '2026-10-29',
    '/affiliate-disclosure': '2026-10-24',
    '/privacy': '2026-10-24',
    '/contact': '2026-10-24',
    '/blog': '2026-10-29',
    '/tools': '2026-10-29',
    '/tools/pricing-calculator': '2026-10-24',
    '/tools/culling-tool-finder': '2026-10-29',
    '/tools/gallery-cost-calculator': '2026-10-29',
    '/category/client-crms': '2026-10-29',
    '/category/gallery-delivery': '2026-10-29',
    '/category/ai-culling-editing': '2026-10-29',
  };

  const staticPages = Object.entries(staticPageDates).map(([route, dateStr]) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(`${dateStr}T00:00:00.000Z`),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Article pages from unified site-data
  const articlePages = site.articles.map((a) => {
    const rawDate = a.updated || a.date;
    const parsedDate = rawDate ? new Date(rawDate) : new Date();
    const lastModified = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

    return {
      url: `${baseUrl}/${a.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    };
  });

  return [...staticPages, ...articlePages];
}
