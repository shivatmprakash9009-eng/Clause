import { Badge } from '@/components/ui/badge';
import { Reveal, RevealItem } from '@/components/motion/Reveal';
import { SplitWords } from '@/components/motion/SplitWords';
import { DashboardCard } from '@/components/features/DashboardCard';
import { NotificationsCard } from '@/components/features/NotificationsCard';
import { TaskCard } from '@/components/features/TaskCard';
import { LayoutGrid } from 'lucide-react';
import { site } from '@/content/site';

export function Features() {
  const f = site.features;
  return (
    <section id="features" className="bg-bg px-4 pb-20 pt-20 md:px-6 md:pb-[120px] md:pt-42 xl:px-10">
      <div className="mx-auto max-w-[var(--w-content)]">
        <Reveal stagger={0.09} className="mx-auto flex max-w-[var(--w-narrow)] flex-col items-center text-center">
          <RevealItem>
            <Badge tone="light" icon={<LayoutGrid className="size-3" strokeWidth={1.5} />}>
              {f.badge}
            </Badge>
          </RevealItem>
          <SplitWords as="h2" mode="stagger" text={f.h2} className="mt-5 max-w-[30ch] text-h2 font-medium leading-[1.25] tracking-[-0.015em] text-ink" />
          <RevealItem as="p" className="mt-4 max-w-[480px] text-small text-muted">
            {f.sub}
          </RevealItem>
        </Reveal>
        <Reveal stagger={0.09} className="mt-14 grid gap-6 md:mt-24 md:gap-8 md:grid-cols-2">
          <RevealItem y={40} className="md:col-span-2">
            <DashboardCard />
          </RevealItem>
          <RevealItem y={40}>
            <NotificationsCard />
          </RevealItem>
          <RevealItem y={40}>
            <TaskCard />
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
