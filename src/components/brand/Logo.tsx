import type { SVGProps } from 'react';

/**
 * Original four-petal pinwheel mark authored for this project (not a trace of any reference mark).
 * Colours come from `currentColor`.
 */
export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      {[0, 90, 180, 270].map((deg) => (
        <path key={deg} transform={`rotate(${deg} 12 12)`} d="M12 11.2C12 6.4 14.4 3.2 19 2.6c.6 4.4-1.7 7.8-7 8.6Z" />
      ))}
      <circle cx="12" cy="12" r="1.6" fill="var(--c-deep)" />
    </svg>
  );
}
