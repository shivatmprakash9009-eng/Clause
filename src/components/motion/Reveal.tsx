'use client';
import { m, useReducedMotion, type Variants } from 'motion/react';
import { container, ease, dur, fadeOnly, inViewDefaults } from '@/lib/motion';
import { useLoadGate } from './useLoadGate';
import { cn } from '@/lib/cn';

type RevealProps = {
  as?: 'div' | 'section' | 'li' | 'span' | 'p';
  delay?: number;
  y?: number;
  scale?: number;
  /** When set, this element is a stagger container for <RevealItem> children. */
  stagger?: number;
  /** `view` (default) reveals on scroll; `load` joins the load sequence (waits for the preloader). */
  on?: 'view' | 'load';
  className?: string;
  id?: string;
  children: React.ReactNode;
};

const up = (y: number, delay: number, scale = 1): Variants => ({
  hidden: { opacity: 0, y, scale },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: dur.enter, ease: ease.outExpo, delay } },
});

export function Reveal({ as = 'div', delay = 0, y = 24, scale = 1, stagger, on = 'view', className, id, children }: RevealProps) {
  const reduce = useReducedMotion();
  const { ready, base } = useLoadGate();
  const Comp = m[as];
  const variants = stagger !== undefined ? container(stagger, on === 'load' ? base + delay : delay) : reduce ? fadeOnly : up(y, on === 'load' ? base + delay : delay, scale);
  if (on === 'load') {
    return (
      <Comp id={id} className={className} variants={variants} initial={reduce ? false : 'hidden'} animate={ready || reduce ? 'show' : 'hidden'}>
        {children}
      </Comp>
    );
  }
  return (
    <Comp id={id} className={className} variants={variants} initial={reduce ? false : 'hidden'} whileInView="show" viewport={inViewDefaults}>
      {children}
    </Comp>
  );
}

/** Child of a staggered <Reveal stagger>. Inherits hidden/show from its parent. */
export function RevealItem({ as = 'div', y = 24, className, children }: Pick<RevealProps, 'as' | 'y' | 'className' | 'children'>) {
  const reduce = useReducedMotion();
  const Comp = m[as];
  return (
    <Comp className={cn(className)} variants={reduce ? fadeOnly : up(y, 0)}>
      {children}
    </Comp>
  );
}
