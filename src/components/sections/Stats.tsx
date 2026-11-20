import { Counter } from '@/components/motion/Counter';
import { Reveal } from '@/components/motion/Reveal';
import { site } from '@/content/site';

/** DEMO statistics (flagged in site.ts and README). */
export function Stats() {
  return (
    <section id="stats" className="px-4 md:px-6 xl:px-10">
      <Reveal className="mx-auto max-w-[var(--w-content)] rounded-panel border border-line bg-bg-hero px-6 py-10 md:px-10 md:py-[72px]">
        <dl className="grid gap-8 text-center md:grid-cols-3">
          {site.stats.items.map((s) => (
            <div key={s.label} className="flex flex-col-reverse items-center gap-1.5">
              <dt className="text-small font-medium text-muted">{s.label}</dt>
              <dd className="text-stat font-medium leading-none tracking-[-0.02em] text-ink">
                <Counter to={s.to} from={s.from} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
