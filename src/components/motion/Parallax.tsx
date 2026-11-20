'use client';
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { cn } from '@/lib/cn';

/** Decorative background layer that drifts `distance`px over the scroll of its parent (desktop only via CSS). */
export function Parallax({ distance = -40, className }: { distance?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <m.div className={cn('absolute -inset-x-2 -bottom-12 -top-2 lg:will-change-transform', className)} style={reduce ? undefined : { y }} />
    </div>
  );
}
