import type { CSSProperties } from 'react';
import { Highlight } from './Highlight';

type Props = { before: string; highlight: string; after: string; className?: string };

/**
 * Hero h1 (the LCP text). Server-rendered and animated with CSS only (`.hero-word`): words rise from
 * blur while the colour tweens muted → ink, then the lime highlighter draws under the key word.
 * One accessible copy; the animated words are aria-hidden.
 */
export function HeroHeadline({ before, highlight, after, className }: Props) {
  const parts = [
    ...before.trim().split(' ').map((w) => ({ w, hl: false })),
    { w: highlight, hl: true },
    ...after.trim().split(' ').map((w) => ({ w, hl: false })),
  ];
  return (
    <h1 className={className}>
      <span className="sr-only">{`${before}${highlight}${after}`}</span>
      <span aria-hidden="true">
        {parts.map(({ w, hl }, i) => (
          <span key={`${w}-${i}`}>
            <span className="hero-word inline-block" style={{ '--d': `${0.2 + i * 0.07}s` } as CSSProperties}>
              {hl ? (
                <Highlight variant="thick" trigger="load">
                  {w}
                </Highlight>
              ) : (
                w
              )}
            </span>{' '}
          </span>
        ))}
      </span>
    </h1>
  );
}
