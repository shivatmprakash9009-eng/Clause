'use client';
import { animate, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { BrandTile } from '@/components/brand/BrandMark';
import { ease } from '@/lib/motion';
import { site } from '@/content/site';

/**
 * First-visit-per-session overlay (≤1.75s). Always SSR-rendered; CSS shows it only while the head
 * script has set html[data-preload]. It never delays hydration or hides content from crawlers.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const tile = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const first = useRef(pathname);

  // Hero CSS delays key off html[data-preload]; clear it once the visitor navigates client-side.
  useEffect(() => {
    if (pathname !== first.current) document.documentElement.removeAttribute('data-preload');
  }, [pathname]);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.hasAttribute('data-preload') || !root.current || !tile.current || !word.current) return;
    if (reduce) {
      html.removeAttribute('data-preload');
      return;
    }
    const overlay = root.current;
    const letters = Array.from(word.current.querySelectorAll<HTMLElement>('[data-letter]'));
    const stops: Array<{ stop: () => void }> = [];
    stops.push(animate(tile.current, { opacity: [0, 1], scale: [0.6, 1] }, { duration: 0.45, ease: [...ease.outExpo] }));
    letters.forEach((el, i) => {
      stops.push(
        animate(el, { opacity: [0, 1], y: [8, 0], filter: ['blur(6px)', 'blur(0px)'] }, { duration: 0.55, delay: 0.45 + i * 0.04, ease: [...ease.outExpo] }),
      );
    });
    stops.push(
      animate(root.current, { clipPath: ['inset(0 0 0% 0)', 'inset(0 0 100% 0)'], opacity: [1, 0] }, { duration: 0.5, delay: 1.25, ease: [...ease.inOut] }),
    );
    // The attribute stays (running CSS delays depend on it); the overlay is hidden directly.
    const done = window.setTimeout(() => {
      overlay.style.pointerEvents = 'none';
      overlay.style.display = 'none';
    }, 1800);
    return () => {
      window.clearTimeout(done);
      stops.forEach((s) => s.stop());
    };
  }, [reduce]);

  return (
    <div ref={root} aria-hidden="true" className="preloader fixed inset-0 z-[var(--z-preloader)] place-items-center bg-preloader-bg">
      <div className="flex items-center gap-4">
        <div ref={tile} style={{ opacity: 0 }}>
          <BrandTile size={64} className="rounded-tile" />
        </div>
        <div ref={word} className="flex text-ink" style={{ fontSize: '2.25rem', fontWeight: 500 }}>
          {site.brand.name.split('').map((c, i) => (
            <span key={i} data-letter style={{ opacity: 0, display: 'inline-block' }}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
