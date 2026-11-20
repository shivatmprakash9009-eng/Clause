import { cva } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

const variants = cva(
  'relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-button font-[550] transition duration-[260ms] ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
  {
    variants: {
      variant: {
        brand: 'btn-sheen bg-brand text-brand-foreground shadow-brand hover:-translate-y-px hover:bg-brand-hover',
        white: 'border border-line bg-tile text-accent-foreground shadow-pop hover:border-accent-foreground/40 hover:shadow-card',
        lime: 'btn-sheen bg-accent text-accent-foreground shadow-pop hover:-translate-y-px hover:brightness-105',
        ghost: 'bg-transparent text-ink hover:bg-ink/5',
        link: 'h-auto min-h-6 rounded-chip px-0 text-ink underline decoration-1 underline-offset-4 hover:decoration-2 active:scale-100',
      },
      size: {
        sm: 'h-10 px-4 text-small',
        md: 'h-12 px-6 text-small',
        lg: 'h-14 px-7 text-body',
      },
    },
    defaultVariants: { variant: 'brand', size: 'md' },
  },
);

type ButtonProps = {
  variant?: 'brand' | 'white' | 'lime' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/** All five variants share one anatomy; loading keeps the button width. */
export function Button({ variant, size, loading = false, asChild = false, className, children, disabled, ...rest }: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';
  const cls = cn(variants({ variant, size }), variant === 'link' && 'px-0', className);
  if (asChild) {
    return (
      <Comp className={cls} {...rest}>
        {children}
      </Comp>
    );
  }
  return (
    <Comp className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      <span className={cn('inline-flex items-center gap-2', loading && 'invisible')}>{children}</span>
      {loading ? <LoaderCircle aria-hidden="true" className="absolute size-4 animate-spin" /> : null}
    </Comp>
  );
}
