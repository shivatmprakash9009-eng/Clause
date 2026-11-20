'use client';
import { m, useReducedMotion } from 'motion/react';
import { ease } from '@/lib/motion';
import { useLoadGate } from './useLoadGate';

type HighlightProps = { variant: 'thick' | 'thin'; trigger: 'load' | 'view'; delay?: number; children: React.ReactNode };

/** Lime bar that draws itself (scaleX from the left). Static and fully drawn under reduced motion. */
export function Highlight({ variant, trigger, delay = 0.9, children }: HighlightProps) {
  const reduce = useReducedMotion();
  const { ready, base } = useLoadGate();
  const bar =
    variant === 'thick'
      ? 'absolute inset-x-[-0.04em] bottom-[0.06em] -z-10 h-[0.42em] origin-left rounded-[2px] bg-accent'
      : 'absolute inset-x-0 bottom-[-0.12em] h-[2px] origin-left bg-accent';
  const transition = { duration: 0.7, ease: ease.outExpo, delay: trigger === 'load' ? base + delay : delay };
  const motionProps =
    trigger === 'load'
      ? { initial: { scaleX: reduce ? 1 : 0 }, animate: { scaleX: reduce || ready ? 1 : 0 }, transition }
      : { initial: { scaleX: reduce ? 1 : 0 }, whileInView: { scaleX: 1 }, viewport: { once: true, amount: 0.8 }, transition };
  return (
    <span className="relative isolate inline-block">
      {children}
      <m.span aria-hidden="true" className={bar} {...motionProps} />
    </span>
  );
}
