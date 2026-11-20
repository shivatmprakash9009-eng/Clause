import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="px-4 pb-24 pt-36 text-center md:pt-44">
      <h1 className="text-h2 font-medium leading-[1.15] tracking-[-0.015em] text-ink">This page could not be found</h1>
      <p className="mx-auto mb-8 mt-4 max-w-[48ch] text-body-lg text-muted">The link may be out of date. Head back to the start.</p>
      <Button asChild variant="brand" size="lg">
        <Link href="/">Back to home</Link>
      </Button>
    </section>
  );
}
