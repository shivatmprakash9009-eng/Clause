import { LeadForm } from '@/components/forms/LeadForm';

/** Shared shell for /start and /demo. */
export function FormPage({ variant, h1, sub }: { variant: 'start' | 'demo'; h1: string; sub: string }) {
  return (
    <section className="px-4 pb-24 pt-36 md:px-6 md:pt-44 xl:px-10">
      <div className="mx-auto max-w-[var(--w-narrow)]">
        <h1 className="text-h2 font-medium leading-[1.15] tracking-[-0.015em] text-ink">{h1}</h1>
        <p className="mb-10 mt-4 max-w-[52ch] text-body-lg text-muted">{sub}</p>
        <LeadForm variant={variant} turnstileSiteKey={process.env.TURNSTILE_SITE_KEY || undefined} />
      </div>
    </section>
  );
}
