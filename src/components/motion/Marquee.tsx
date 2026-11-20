'use client';
import { createContext, useContext, useRef, type CSSProperties, type ReactNode } from 'react';
import { useInView } from 'motion/react';

export const MarqueePauseContext = createContext(false);

type MarqueeProps = {
  /** Server-rendered <MarqueeList items />. */
  primary: ReactNode;
  /** Server-rendered <MarqueeList items hidden /> (aria-hidden duplicate for the seamless loop). */
  duplicate: ReactNode;
  reverse?: boolean;
  durationS: number;
  offset?: boolean;
};

/**
 * CSS-driven marquee row. Pauses on hover/focus, when off-screen and when the page-level pause
 * control is on. Static (and horizontally scrollable) under reduced motion.
 */
export function Marquee({ primary, duplicate, reverse = false, durationS, offset = false }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0 });
  const paused = useContext(MarqueePauseContext);
  return (
    <div ref={ref} className="marquee-wrap marquee-mask overflow-hidden" data-paused={paused || !inView}>
      <div
        data-marquee
        className="marquee-track"
        style={
          {
            '--marquee-dur': `${durationS}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
            marginLeft: offset ? 'calc(var(--tile) / -2)' : undefined,
          } as CSSProperties
        }
      >
        {primary}
        {duplicate}
      </div>
    </div>
  );
}
