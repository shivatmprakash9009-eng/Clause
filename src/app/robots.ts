import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';

/** Crawler policy (owner decision, default allow — recorded in DECISIONS.md). */
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/' }], sitemap: `${siteUrl}/sitemap.xml` };
}
