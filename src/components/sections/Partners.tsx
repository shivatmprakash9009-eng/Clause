import { AppMark } from '@/components/brand/AppMark';
import type { CSSProperties } from 'react';
import { site } from '@/content/site';

/** DEMO partner placeholders (see README → Replace before launch). Monochrome marks. */
export function Partners() {
  const { caption, items } = site.hero.partners;
  return (
    <div style={{ '--d': '1.4s' } as CSSProperties} className="rise mt-12 flex flex-col items-start gap-5 text-left md:mt-16 md:flex-row md:items-center md:justify-between md:gap-10">
      <p className="max-w-44 text-body-lg font-[550] leading-snug text-ink">{caption}</p>
      <ul aria-label="Partner companies" className="flex flex-wrap items-center gap-x-8 gap-y-4 text-ink/70 md:flex-nowrap md:gap-x-10">
        {items.map((it) => (
          <li key={it.slug} className="flex h-8 items-center gap-2">
            <span className="block size-7">
              <AppMark slug={it.slug} mono />
            </span>
            <span className="text-mark font-[550] tracking-tight">{it.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
