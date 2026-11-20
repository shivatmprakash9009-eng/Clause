'use client';
import { useState, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';
import { MarqueePauseContext } from '@/components/motion/Marquee';
import { site } from '@/content/site';

/** Hosts the marquee rows (server-rendered children) and the page-level pause control (WCAG 2.2.2). */
export function IntegrationsRows({ children }: { children: ReactNode }) {
  const i = site.integrations;
  const [paused, setPaused] = useState(false);
  return (
    <div className="relative mt-16 md:mt-24">
      <p className="sr-only">{i.srList}</p>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="absolute -top-12 right-4 z-10 inline-flex min-h-8 items-center gap-1.5 rounded-chip border border-white/20 bg-white/10 px-3 text-small font-medium text-on-dark opacity-0 transition-opacity duration-[140ms] focus-visible:opacity-100 md:right-10"
      >
        {paused ? <Play aria-hidden="true" className="size-3.5" strokeWidth={1.5} /> : <Pause aria-hidden="true" className="size-3.5" strokeWidth={1.5} />}
        {paused ? i.resume : i.pause}
      </button>
      <MarqueePauseContext.Provider value={paused}>
        <div className="grid gap-5 [--marquee-gap:32px] [--tile:72px] md:gap-14 md:[--marquee-gap:62px] md:[--tile:110px]">{children}</div>
      </MarqueePauseContext.Provider>
    </div>
  );
}
