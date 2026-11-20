import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/start', '/demo', '/privacy', '/terms'].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.5,
  }));
}
