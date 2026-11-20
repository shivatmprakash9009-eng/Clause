'use client';
import { m, useReducedMotion } from 'motion/react';
import { FileText, Plus } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { dur, ease, inViewDefaults } from '@/lib/motion';
import { site } from '@/content/site';

/** Bento card C: two activity messages entering in sequence; the second is clipped by a fade mask. */
export function TaskCard() {
  const t = site.features.tasks;
  const reduce = useReducedMotion();
  const [first, second] = t.messages;
  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: inViewDefaults,
    transition: { duration: reduce ? 0.2 : dur.enter, ease: ease.outExpo, delay: reduce ? 0 : delay },
  });
  return (
    <article className="card-lift flex flex-col overflow-hidden rounded-card border border-line bg-mist shadow-card focus-within:ring-2 focus-within:ring-brand/40 focus-within:ring-offset-2">
      <div className="px-6 pt-8 text-center md:px-10 md:pt-16">
        <h3 className="text-h3 font-medium leading-tight tracking-[-0.01em] text-ink">{t.title}</h3>
        <p className="mx-auto mt-3 max-w-[46ch] text-small text-muted">{t.body}</p>
      </div>
      <div className="mt-8 flex-1 overflow-hidden border-t border-line bg-bg px-6 pt-8 md:mt-12 md:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h4 className="text-body font-[550] text-ink">{t.panelTitle}</h4>
          <Button variant="white" size="sm" className="h-9 rounded-chip px-4 text-small">
            <Plus aria-hidden="true" className="size-3" strokeWidth={2} />
            {t.newMessage.replace('+ ', '')}
          </Button>
        </div>
        <div className="fade-bottom grid gap-4 pb-10">
          {first && 'mention' in first ? (
            <m.div {...enter(0)} className="rounded-message border border-line bg-bg p-4 shadow-card">
              <div className="flex items-center gap-2">
                <Avatar name={first.author} hue={first.hue} size={28} />
                <span className="text-small font-[550] text-ink">{first.author}</span>
                <span aria-hidden="true" className="ml-auto h-3 w-10 rounded-full bg-mist" />
              </div>
              <p className="mt-2 text-small text-muted">
                <span className="font-[550] text-brand">{first.mention}</span> {first.text}{' '}
                <span role="img" aria-label={first.emoji.label}>
                  {first.emoji.glyph}
                </span>
              </p>
            </m.div>
          ) : null}
          {second && 'file' in second ? (
            <m.div {...enter(0.6)} className="rounded-message border border-line bg-bg p-5 shadow-card">
              <div className="flex items-center gap-2">
                <Avatar name={second.author} hue={second.hue} size={28} />
                <span className="text-small font-[550] text-ink">{second.author}</span>
                <span aria-hidden="true" className="ml-auto h-3 w-10 rounded-full bg-mist" />
              </div>
              <p className="mt-2 flex items-center gap-2 text-small text-muted">
                <span aria-hidden="true" className="grid size-6 place-items-center rounded-chip bg-mist text-brand">
                  <FileText className="size-3.5" strokeWidth={1.5} />
                </span>
                {second.file}
              </p>
            </m.div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
