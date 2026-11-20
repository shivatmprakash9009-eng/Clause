import { AppMark } from '@/components/brand/AppMark';

/** Each list is repeated so it is always wider than the panel (widest panel: 1360px). */
const REPEAT = 2;

/** Server-rendered tile list for <Marquee>: keeps icon data and markup out of the client bundle. */
export function MarqueeList({ items, hidden = false }: { items: readonly string[]; hidden?: boolean }) {
  const parsed = items.map((s) => {
    const [slug, label] = s.split(':');
    return { slug: slug ?? '', label: label ?? slug ?? '' };
  });
  return (
    <ul className="marquee-list" aria-hidden={hidden || undefined}>
      {Array.from({ length: REPEAT }).flatMap((_, r) =>
        parsed.map((it) => (
          <li key={`${r}-${it.slug}`}>
            <span className="app-tile grid size-[var(--tile)] place-items-center rounded-tile bg-tile shadow-pop transition duration-[260ms] hover:-translate-y-1.5 hover:scale-[1.04]">
              <span className="block size-[calc(var(--tile)*0.42)]">
                <AppMark slug={it.slug} label={it.label} />
              </span>
            </span>
          </li>
        )),
      )}
    </ul>
  );
}
