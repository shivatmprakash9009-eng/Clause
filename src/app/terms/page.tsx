import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/content/site';

const page = site.legalStubs.terms;

export const metadata: Metadata = pageMetadata({ title: page.h1, description: page.body, path: '/terms' });

export default function TermsPage() {
  return (
    <section className="px-4 pb-24 pt-36 md:px-6 md:pt-44 xl:px-10">
      <div className="mx-auto max-w-[var(--w-narrow)]">
        <h1 className="text-h2 font-medium leading-[1.15] tracking-[-0.015em] text-ink">{page.h1}</h1>
        <p className="mt-4 text-body-lg text-muted">{page.body}</p>
      </div>
    </section>
  );
}
