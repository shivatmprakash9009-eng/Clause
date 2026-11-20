'use client';
import { useEffect, useState } from 'react';
import { m, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { ease } from '@/lib/motion';
import { formatPeriodValue } from '@/lib/format';
import { cn } from '@/lib/cn';

type BarChartProps = { values: readonly number[]; peakIndex: number; yLabels: readonly string[]; unitLabel: string };

/**
 * Plain div chart (no chart library). Each bar is a button: hover/focus highlights it and shows a
 * value chip. The group carries the text alternative.
 */
export function BarChart({ values, peakIndex, yLabels, unitLabel }: BarChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const [peakOn, setPeakOn] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setPeakOn(true), reduce ? 0 : 700 + values.length * 50);
    return () => window.clearTimeout(t);
  }, [inView, reduce, values.length]);

  return (
    <div ref={ref} className="flex gap-2 md:gap-3">
      <div aria-hidden="true" className="flex h-44 shrink-0 flex-col justify-between pt-1 text-right text-eyebrow tabular-nums text-muted md:h-72">
        {yLabels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <div className="relative min-w-0 flex-1">
        <div aria-hidden="true" className="absolute inset-0 flex flex-col justify-between pt-2.5">
          {yLabels.map((l) => (
            <span key={l} className="block h-px bg-line" />
          ))}
        </div>
        <div role="group" aria-label={unitLabel} className="relative flex h-44 items-end justify-between pt-7 md:h-72">
          {values.map((v, i) => {
            const isPeak = i === peakIndex;
            const lit = active === i || (active === null && isPeak && peakOn);
            return (
              <button
                key={i}
                type="button"
                aria-label={`Period ${i + 1}: ${formatPeriodValue(v)}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group relative flex h-full w-6 items-end justify-center rounded-chip md:w-9"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute z-10 -translate-y-1 whitespace-nowrap rounded-chip bg-ink px-2 py-1 text-eyebrow font-[550] tabular-nums text-bg opacity-0 transition-opacity duration-[140ms]',
                    active === i && 'opacity-100',
                  )}
                  style={{ bottom: `calc(${v}% - 0px)`, marginBottom: '0.5rem' }}
                >
                  {formatPeriodValue(v)}
                </span>
                <m.span
                  aria-hidden="true"
                  className={cn('block w-3.5 origin-bottom rounded-t-bar transition-colors duration-[140ms] md:w-[22px]', lit ? 'bg-brand' : 'bg-chart-bar')}
                  style={{ height: `${v}%` }}
                  initial={{ scaleY: reduce ? 1 : 0 }}
                  animate={{ scaleY: inView || reduce ? 1 : 0 }}
                  transition={{ duration: 0.7, ease: ease.outExpo, delay: reduce ? 0 : isPeak ? values.length * 0.05 : i * 0.05 }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
