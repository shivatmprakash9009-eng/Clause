import { Quote } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { SplitWords } from '@/components/motion/SplitWords';
import { Avatar } from '@/components/ui/avatar';
import { AppMark } from '@/components/brand/AppMark';
import { site } from '@/content/site';

/** DEMO testimonial (flagged in site.ts and README). */
export function Testimonial() {
  const t = site.testimonial;
  return (
    <section id="testimonial" className="px-4 pb-16 pt-24 md:px-6 md:pb-24 md:pt-40 xl:px-10">
      <figure className="mx-auto flex max-w-[1040px] flex-col items-center text-center">
        <Quote aria-hidden="true" className="size-10 fill-brand text-brand" strokeWidth={1.5} />
        <blockquote className="mt-6">
          <SplitWords as="p" mode="scrub" text={`“${t.quote}”`} className="text-quote font-medium leading-[1.5] tracking-[-0.01em] text-ink" />
        </blockquote>
        <Reveal as="div" delay={0.2} className="mt-8 flex flex-col items-center gap-3">
          <figcaption className="flex flex-col items-center gap-3">
            <span aria-hidden="true" className="inline-flex -space-x-2">
              <Avatar name={t.name} hue="b" size={44} />
              <span className="inline-grid size-11 place-items-center rounded-full bg-tile ring-2 ring-tile">
                <span className="block size-6">
                  <AppMark slug="mailchimp" />
                </span>
              </span>
            </span>
            <span className="grid gap-0.5">
              <span className="text-small font-[550] text-ink">{t.name}</span>
              <span className="text-small text-muted">{t.role}</span>
            </span>
          </figcaption>
        </Reveal>
      </figure>
    </section>
  );
}
