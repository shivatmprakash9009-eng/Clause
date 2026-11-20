import type { Metadata } from 'next';
import { site } from '@/content/site';

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

type PageMeta = { title: string; description: string; path: string; noindex?: boolean };

export function pageMetadata({ title, description, path, noindex }: PageMeta): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.brand.name, type: 'website', locale: 'en_US' },
    twitter: { card: 'summary_large_image', title, description },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}

export const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: site.brand.name,
      url: siteUrl,
      email: site.brand.email,
      description: site.seo.description,
    },
    { '@type': 'WebSite', name: site.brand.name, url: siteUrl, inLanguage: 'en' },
  ],
};
