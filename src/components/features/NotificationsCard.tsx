'use client';
import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { useInView, useReducedMotion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { SwitchRow } from '@/components/ui/switch';
import { site } from '@/content/site';

/** Bento card B: real switches (Reminders is disabled), Save shows a 1.5s success state. No network call. */
export function NotificationsCard() {
  const n = site.features.notifications;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.4 }) || Boolean(reduce);
  const [saved, setSaved] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const save = () => {
    setSaved(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setSaved(false), 1500);
  };
  return (
    <article ref={ref} className="card-lift flex flex-col overflow-hidden rounded-card border border-line bg-mist shadow-card focus-within:ring-2 focus-within:ring-brand/40 focus-within:ring-offset-2">
      <div className="px-6 pt-8 text-center md:px-10 md:pt-16">
        <h3 className="text-h3 font-medium leading-tight tracking-[-0.01em] text-ink">{n.title}</h3>
        <p className="mx-auto mt-3 max-w-[46ch] text-small text-muted">{n.body}</p>
      </div>
      <div className="mt-8 flex-1 border-t border-line bg-bg px-6 pb-8 pt-8 md:mt-12 md:px-8">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-body font-[550] text-ink">{n.panelTitle}</h4>
          <Button variant="white" size="sm" className="h-9 rounded-chip px-4 text-small" onClick={save} aria-live="polite">
            {saved ? (
              <>
                <Check aria-hidden="true" className="size-3" strokeWidth={2} /> {n.saved}
              </>
            ) : (
              n.save
            )}
          </Button>
        </div>
        {n.rows.map((r, i) => (
          <SwitchRow key={r.id} id={`notif-${r.id}`} label={r.label} defaultChecked={r.on} disabled={r.disabled} play={inView} delay={0.2 + i * 0.12} />
        ))}
      </div>
    </article>
  );
}
