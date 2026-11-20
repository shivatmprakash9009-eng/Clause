'use client';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { ease } from '@/lib/motion';

type CounterProps = { to: number; from?: number; prefix?: string; suffix?: string; durationS?: number };

/**
 * Count-up. SSR renders the final value; width is reserved in `ch` so nothing shifts.
 * Assistive technology reads the final value once from a visually hidden copy.
 */
export function Counter({ to, from = 0, prefix = '', suffix = '', durationS = 1.4 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!reduce && ref.current) ref.current.textContent = String(from);
  }, [from, reduce]);
  useEffect(() => {
    if (!inView || reduce || !ref.current) return;
    const controls = animate(from, to, {
      duration: durationS,
      ease: [...ease.outExpo],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, reduce, from, to, durationS]);
  return (
    <span className="inline-block tabular-nums" style={{ minWidth: `${prefix.length + String(to).length + suffix.length}ch` }}>
      <span className="sr-only">{`${prefix}${to}${suffix}`}</span>
      <span aria-hidden="true">
        {prefix}
        <span ref={ref}>{to}</span>
        {suffix}
      </span>
    </span>
  );
}
