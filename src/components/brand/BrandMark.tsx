import Link from 'next/link';
import { cn } from '@/lib/cn';
import { site } from '@/content/site';
import { Logo } from './Logo';

/** Square brand tile: deep green with the lime pinwheel. */
export function BrandTile({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('grid shrink-0 place-items-center rounded-chip bg-deep text-accent', className)}
      style={{ width: size, height: size }}
    >
      <Logo style={{ width: size * 0.68, height: size * 0.68 }} />
    </span>
  );
}

/** Tile + wordmark, linking home. `tone="onDark"` for the footer. */
export function BrandMark({ tone = 'light', className }: { tone?: 'light' | 'onDark'; className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.brand.name} home`}
      className={cn('inline-flex min-h-11 items-center gap-2', tone === 'onDark' ? 'text-on-dark' : 'text-ink', className)}
    >
      <BrandTile size={36} className={tone === 'onDark' ? 'bg-accent text-accent-foreground [&_circle]:fill-accent' : undefined} />
      <span className="text-body-lg font-[550] tracking-tight">{site.brand.name}</span>
    </Link>
  );
}
