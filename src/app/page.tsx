import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Integrations } from '@/components/sections/Integrations';
import { Testimonial } from '@/components/sections/Testimonial';
import { Stats } from '@/components/sections/Stats';
import { CtaBand } from '@/components/sections/CtaBand';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/content/site';

/** Re-render daily so the footer year is always current. */
export const revalidate = 86400;

export const metadata: Metadata = {
  ...pageMetadata({ title: site.seo.title, description: site.seo.description, path: '/' }),
  title: { absolute: site.seo.title },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <div className="mt-[40px]">
        <Integrations />
      </div>
      <Testimonial />
      <Stats />
      <CtaBand />
    </>
  );
}
