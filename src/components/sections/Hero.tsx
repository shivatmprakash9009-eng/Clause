import Link from 'next/link';
import { Zap } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeroHeadline } from '@/components/motion/HeroHeadline';
import { FloatingAvatars } from '@/components/motion/FloatingAvatars';
import { Partners } from './Partners';
import { site } from '@/content/site';

export function Hero() {
  const { hero } = site;
  return (
    <section id="top" className="relative isolate overflow-hidden bg-bg-hero">
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto flex min-h-[min(100svh,940px)] max-w-[var(--w-content)] flex-col justify-between px-4 pb-14 pt-36 text-center md:px-6 md:pb-16 md:pt-51 xl:px-10">
        <div>
          <div className="rise relative z-10" style={{ '--d': '0.1s', '--y': '12px' } as CSSProperties}>
            <Badge tone="light" icon={<Zap className="size-3" strokeWidth={1.5} />}>
              {hero.badge}
            </Badge>
          </div>
          <div className="relative mt-6">
            <HeroHeadline
              before={hero.h1.before}
              highlight={hero.h1.highlight}
              after={hero.h1.after}
              className="mx-auto max-w-[18ch] text-display font-medium leading-[1.2] tracking-[-0.02em] text-ink md:max-w-[18ch]"
            />
            <FloatingAvatars people={hero.avatars} />
          </div>
          <p className="rise mx-auto mt-7 max-w-[52rem] text-body-lg text-muted" style={{ '--d': '0.55s' } as CSSProperties}>
            {hero.sub}
          </p>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
            <div className="rise" style={{ '--d': '0.9s' } as CSSProperties}>
              <Button asChild variant="brand" size="lg">
                <Link href={hero.primary.href}>{hero.primary.label}</Link>
              </Button>
            </div>
            <div className="rise" style={{ '--d': '0.98s' } as CSSProperties}>
              <Button asChild variant="white" size="lg">
                <Link href={hero.secondary.href}>{hero.secondary.label}</Link>
              </Button>
            </div>
          </div>
        </div>
        <Partners />
      </div>
    </section>
  );
}
