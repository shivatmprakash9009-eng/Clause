import Link from 'next/link';
import { ArrowRight, Plug } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Reveal, RevealItem } from '@/components/motion/Reveal';
import { SplitWords } from '@/components/motion/SplitWords';
import { Parallax } from '@/components/motion/Parallax';
import { Marquee } from '@/components/motion/Marquee';
import { MarqueeList } from '@/components/motion/MarqueeList';
import { IntegrationsRows } from './IntegrationsRows';
import { site } from '@/content/site';

export function Integrations() {
  const i = site.integrations;
  return (
    <section id="integrations" className="mx-auto max-w-[var(--w-wide)] px-4 md:px-10">
      <Reveal y={60} scale={0.96} className="relative isolate overflow-hidden rounded-panel border border-footer/70 bg-panel-dark pb-16 pt-16 md:min-h-[min(850px,100svh)] md:pb-24 md:pt-24">
        <Parallax className="grid-dark" />
        <Reveal stagger={0.2} delay={0.3} className="relative mx-auto flex max-w-[var(--w-narrow)] flex-col items-center px-4 text-center">
          <RevealItem>
            <Badge tone="onDark" icon={<Plug className="size-3" strokeWidth={1.5} />}>
              {i.badge}
            </Badge>
          </RevealItem>
          <SplitWords as="h2" mode="stagger" text={i.h2} className="mt-5 text-h2 font-medium leading-[1.15] tracking-[-0.015em] text-on-dark" />
          <RevealItem as="p" className="mt-4 max-w-[640px] text-small text-on-dark-muted">
            {i.body}
          </RevealItem>
          <RevealItem className="mt-5">
            <Link href={i.link.href} className="group inline-flex min-h-8 items-center gap-1.5 text-small font-[550] text-on-dark underline underline-offset-4">
              {i.link.label}
              <ArrowRight aria-hidden="true" className="size-3.5 transition-transform duration-[260ms] group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </RevealItem>
        </Reveal>
        <div className="relative">
          <IntegrationsRows>
            <Marquee durationS={60} primary={<MarqueeList items={i.row1} />} duplicate={<MarqueeList items={i.row1} hidden />} />
            <Marquee durationS={75} reverse offset primary={<MarqueeList items={i.row2} />} duplicate={<MarqueeList items={i.row2} hidden />} />
          </IntegrationsRows>
        </div>
      </Reveal>
    </section>
  );
}
