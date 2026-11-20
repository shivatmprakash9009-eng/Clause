import type { Metadata } from 'next';
import { FormPage } from '@/components/sections/FormPage';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/content/site';

export const metadata: Metadata = pageMetadata({ title: 'Book a demo', description: site.forms.demo.sub, path: '/demo' });

export default function DemoPage() {
  return <FormPage variant="demo" h1={site.forms.demo.h1} sub={site.forms.demo.sub} />;
}
