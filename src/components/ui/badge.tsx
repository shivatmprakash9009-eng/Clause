import { cn } from '@/lib/cn';

type BadgeProps = { tone: 'light' | 'onDark'; icon?: React.ReactNode; children: string; className?: string };

/** Section eyebrow pill. Used only on the three section badges. */
export function Badge({ tone, icon, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex h-7 items-center gap-1.5 rounded-full border px-3 text-eyebrow font-[550] uppercase leading-none tracking-[0.08em]',
        tone === 'light' ? 'border-line bg-tile text-accent-foreground shadow-card' : 'border-white/10 bg-white/10 text-on-dark',
        className,
      )}
    >
      {icon ? <span aria-hidden="true" className={cn('grid size-3 place-items-center', tone === 'light' && 'text-deep')}>{icon}</span> : null}
      {children}
    </span>
  );
}
