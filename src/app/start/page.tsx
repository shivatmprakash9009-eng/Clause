import type { Metadata } from 'next';
import { FormPage } from '@/components/sections/FormPage';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/content/site';

export const metadata: Metadata = pageMetadata({ title: 'Start for free', description: site.forms.start.sub, path: '/start' });

export default function StartPage() {
  return <FormPage variant="start" h1={site.forms.start.h1} sub={site.forms.start.sub} />;
}
