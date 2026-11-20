import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AvatarStack } from '@/components/ui/avatar';
import { BarChart } from './BarChart';
import { site } from '@/content/site';

const people = [
  { name: 'Maya', hue: 'a' },
  { name: 'Rohan', hue: 'b' },
  { name: 'Lena', hue: 'c' },
  { name: 'Jonas', hue: 'd' },
] as const;

/** Bento card A: full width, text left, chart panel flush right/bottom. */
export function DashboardCard() {
  const d = site.features.dashboard;
  return (
    <article className="card-lift group grid overflow-hidden rounded-card border border-line bg-mist shadow-card focus-within:ring-2 focus-within:ring-brand/40 focus-within:ring-offset-2 md:min-h-[450px] md:grid-cols-[51fr_49fr]">
      <div className="flex flex-col items-start gap-4 p-6 md:p-16">
        <h3 className="text-h3 font-medium leading-tight tracking-[-0.01em] text-ink">{d.title}</h3>
        <p className="max-w-[40ch] text-small text-muted">{d.body}</p>
        <Button asChild variant="brand" size="lg" className="mt-4 text-accent md:mt-auto">
          <Link href={d.cta.href}>{d.cta.label}</Link>
        </Button>
      </div>
      <div className="m-4 mt-0 rounded-card border border-line bg-bg p-3 md:m-0 md:mt-14 md:rounded-none md:rounded-tl-card md:border-b-0 md:border-r-0 md:p-6">
        <div className="mb-6 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-small font-[550] text-ink">
            {d.workspace}
            <ChevronDown aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
          </span>
          <AvatarStack people={people} size={28} />
        </div>
        <BarChart values={d.values} peakIndex={d.peakIndex} yLabels={d.yLabels} unitLabel={d.unit} />
      </div>
    </article>
  );
}
