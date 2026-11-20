'use client';
import Link from 'next/link';
import { useRef } from 'react';
import { m, useInView, useReducedMotion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Highlight } from '@/components/motion/Highlight';
import { dur, ease, inViewDefaults } from '@/lib/motion';
import { site } from '@/content/site';

/**
 * Closing call to action. The slab rises by clip-path; because a clipped element cannot trigger its
 * own observer reliably, an unclipped outer section is observed and the inner slab is animated.
 */
export function CtaBand() {
  const c = site.cta;
  const reduce = useReducedMotion();
  const host = useRef<HTMLElement>(null);
  const inView = useInView(host, { once: true, amount: 0.2 });
  const text = `${c.before}${c.highlight}${c.after}`;
  return (
    <section id="cta" ref={host} className="mt-16 bg-bg md:mt-24">
      <m.div
        className="bg-panel-dark px-4 py-12 md:px-6 md:py-[72px] xl:px-10"
        initial={{ clipPath: reduce ? 'inset(0)' : 'inset(100% 0 0 0)' }}
        animate={{ clipPath: inView || reduce ? 'inset(0)' : 'inset(100% 0 0 0)' }}
        transition={{ duration: reduce ? 0.2 : 0.8, ease: ease.outExpo }}
      >
        <div className="mx-auto flex max-w-[var(--w-content)] flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {reduce ? (
            <h2 className="max-w-[24ch] text-cta font-medium leading-tight text-on-dark">
              {c.before}
              <Highlight variant="thin" trigger="view">
                {c.highlight}
              </Highlight>
              {c.after}
            </h2>
          ) : (
            <h2 className="max-w-[24ch] text-cta font-medium leading-tight tracking-[-0.01em] text-on-dark">
              <span className="sr-only">{text}</span>
              <span aria-hidden="true">
                {c.before
                  .trim()
                  .split(' ')
                  .map((w) => (
                    <span key={w}>
                      <m.span
                        className="inline-block"
                        initial={{ opacity: 0, y: 12 }}
                        animate={inView ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: dur.enter, ease: ease.outExpo, delay: 0.3 }}
                      >
                        {w}
                      </m.span>{' '}
                    </span>
                  ))}
                <Highlight variant="thin" trigger="view" delay={0.9}>
                  {c.highlight}
                </Highlight>{' '}
                {c.after.trim()}
              </span>
            </h2>
          )}
          <div className="flex flex-col gap-3 sm:flex-row">
            {[
              { v: 'white' as const, l: c.secondary, d: 0.5 },
              { v: 'lime' as const, l: c.primary, d: 0.6 },
            ].map(({ v, l, d }) => (
              <m.div
                key={l.label}
                className="w-full sm:w-auto"
                initial={{ opacity: 0, scale: reduce ? 1 : 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={inViewDefaults}
                transition={{ duration: dur.enter, ease: ease.outExpo, delay: d }}
              >
                <Button asChild variant={v} size="lg" className="w-full sm:w-auto">
                  <Link href={l.href}>{l.label}</Link>
                </Button>
              </m.div>
            ))}
          </div>
        </div>
      </m.div>
    </section>
  );
}
