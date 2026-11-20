import { cn } from '@/lib/cn';

type AvatarProps = { name: string; hue: 'a' | 'b' | 'c' | 'd'; size: 28 | 44 | 88; className?: string };

const gradient = {
  a: 'from-avatar-a-from to-avatar-a-to',
  b: 'from-avatar-b-from to-avatar-b-to',
  c: 'from-avatar-c-from to-avatar-c-to',
  d: 'from-avatar-d-from to-avatar-d-to',
} as const;

/** Original initials-on-gradient disc. Decorative by default (`aria-hidden`). */
export function Avatar({ name, hue, size, className }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-[550] text-accent-foreground ring-2 ring-tile',
        gradient[hue],
        size === 88 ? 'size-[88px] text-h3 ring-[3px]' : size === 44 ? 'size-11 text-small' : 'size-7 text-eyebrow',
        className,
      )}
    >
      {name.trim().charAt(0).toUpperCase()}
    </span>
  );
}

export function AvatarStack({ people, size = 28 }: { people: readonly { name: string; hue: 'a' | 'b' | 'c' | 'd' }[]; size?: 28 | 44 }) {
  return (
    <span aria-hidden="true" className="inline-flex -space-x-2">
      {people.map((p) => (
        <Avatar key={p.name} name={p.name} hue={p.hue} size={size} />
      ))}
    </span>
  );
}
