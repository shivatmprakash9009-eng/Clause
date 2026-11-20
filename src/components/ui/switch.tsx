'use client';
import { useId, useState } from 'react';
import { Switch } from 'radix-ui';
import { m } from 'motion/react';
import { spring } from '@/lib/motion';
import { cn } from '@/lib/cn';

type SwitchRowProps = {
  id?: string;
  label: string;
  defaultChecked: boolean;
  disabled?: boolean;
  /** Entrance delay in seconds (thumbs slide in sequence). */
  delay?: number;
  play?: boolean;
};

/** A labelled, real switch. 40×24 hit area (WCAG 2.5.8); thumb slides on a spring. */
export function SwitchRow({ id, label, defaultChecked, disabled = false, delay = 0, play = true }: SwitchRowProps) {
  const auto = useId();
  const sid = id ?? auto;
  const [checked, setChecked] = useState(defaultChecked);
  const shown = play ? checked : false;
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-4 last:border-b-0 md:py-5">
      <label htmlFor={sid} className={cn('text-small text-ink', disabled && 'opacity-50')}>
        {label}
      </label>
      <Switch.Root
        id={sid}
        checked={checked}
        onCheckedChange={setChecked}
        disabled={disabled}
        className={cn(
          'relative inline-flex h-6 w-10 shrink-0 items-center rounded-full p-[3px] transition-colors duration-[260ms]',
          shown ? 'bg-brand' : 'bg-line',
          disabled && 'opacity-50',
        )}
      >
        <Switch.Thumb asChild>
          <m.span
            className="block size-[18px] rounded-full bg-tile shadow-pop"
            initial={false}
            animate={{ x: shown ? 16 : 0 }}
            transition={{ ...spring, delay: play ? delay : 0 }}
          />
        </Switch.Thumb>
      </Switch.Root>
    </div>
  );
}
