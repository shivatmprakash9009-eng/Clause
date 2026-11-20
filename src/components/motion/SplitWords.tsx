'use client';
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';
import { container, heroWord, inViewDefaults, scrubOffset, stagger } from '@/lib/motion';

type SplitWordsProps = {
  text: string;
  as?: 'h1' | 'h2' | 'p' | 'blockquote';
  mode: 'scrub' | 'stagger';
  className?: string;
};

function ScrubWord({ word, i, n, p }: { word: string; i: number; n: number; p: MotionValue<number> }) {
  const opacity = useTransform(p, [i / n, (i + 1) / n], [0.18, 1]);
  return (
    <>
      <m.span data-word={word} style={{ opacity }} className="scrub-word inline-block" />{' '}
    </>
  );
}

/**
 * Splits text into words for a reveal. One accessible copy (visually hidden) is read by assistive
 * technology. In `scrub` mode the dimmed words are drawn from a data attribute via CSS (`::after`),
 * so the only real text node is the full-contrast copy (see ADR-013).
 */
export function SplitWords({ text, mode, as: Tag = 'p', className }: SplitWordsProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const words = text.split(' ');
  const { scrollYProgress } = useScroll({ target: ref, offset: [...scrubOffset] });
  const Comp = m[Tag] as typeof m.p;
  if (reduce) return <Comp className={className}>{text}</Comp>;
  if (mode === 'scrub')
    return (
      <Comp ref={ref as never} className={className}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {words.map((w, i) => (
            <ScrubWord key={i} word={w} i={i} n={words.length} p={scrollYProgress} />
          ))}
        </span>
      </Comp>
    );
  return (
    <Comp className={className} variants={container(stagger.word)} initial="hidden" whileInView="show" viewport={inViewDefaults}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i}>
            <m.span variants={heroWord} className="inline-block">
              {w}
            </m.span>{' '}
          </span>
        ))}
      </span>
    </Comp>
  );
}
