'use client';
import { ReactLenis, type LenisRef } from 'lenis/react';
import { cancelFrame, frame, useReducedMotion } from 'motion/react';
import { useEffect, useRef, type ReactNode } from 'react';

/** Lenis driven by Motion's frame loop (one rAF). Disabled for reduced motion. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const ref = useRef<LenisRef>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const update = ({ timestamp }: { timestamp: number }) => ref.current?.lenis?.raf(timestamp);
    frame.update(update, true);
    return () => cancelFrame(update);
  }, [reduce]);
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root ref={ref} options={{ autoRaf: false, lerp: 0.1, smoothWheel: true, syncTouch: false }}>
      {children}
    </ReactLenis>
  );
}
