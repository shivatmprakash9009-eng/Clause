'use client';
import { LazyMotion, domAnimation } from 'motion/react';

/** Loads Motion's DOM feature set once; every animated element uses the lightweight `m` component. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
