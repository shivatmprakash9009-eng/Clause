'use client';
import { m, useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/cn';
import { pointerSpring, spring } from '@/lib/motion';
import { useLoadGate } from './useLoadGate';

type Person = { name: string; hue: 'a' | 'b' | 'c' | 'd' };

/** Offsets from the h1 centre (CSS variables per breakpoint), drift period/amplitude per avatar. */
const slots = [
  { cls: '[--dx:-34vw] [--dy:-150px] md:[--dx:-300px] md:[--dy:-190px] lg:[--dx:-420px] lg:[--dy:-130px] xl:[--dx:-532px] xl:[--dy:-110px]', period: 7, ax: 12, ay: 9 },
  { cls: '[--dx:34vw] [--dy:-160px] md:[--dx:300px] md:[--dy:-200px] lg:[--dx:420px] lg:[--dy:-150px] xl:[--dx:536px] xl:[--dy:-132px]', period: 8.5, ax: 14, ay: 11 },
  { cls: 'hidden lg:block [--dx:-360px] [--dy:300px] xl:[--dx:-444px] xl:[--dy:308px]', period: 9.5, ax: 10, ay: 8 },
  { cls: 'hidden lg:block [--dx:390px] [--dy:326px] xl:[--dx:486px] xl:[--dy:334px]', period: 11, ax: 16, ay: 12 },
] as const;

function Pair({ person, slot, index, active, pointer }: { person: Person; slot: (typeof slots)[number]; index: number; active: boolean; pointer: React.RefObject<{ x: number; y: number } | null> }) {
  const reduce = useReducedMotion();
  const { ready, base } = useLoadGate();
  const root = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(35);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, pointerSpring);
  const sy = useSpring(py, pointerSpring);

  // Point the cursor glyph toward the h1 centre (the parent's centre); recompute on resize.
  useEffect(() => {
    const el = root.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const measure = () => {
      const a = el.getBoundingClientRect();
      const p = parent.getBoundingClientRect();
      const dx = p.left + p.width / 2 - (a.left + a.width / 2);
      const dy = p.top + p.height / 2 - (a.top + a.height / 2);
      setAngle((Math.atan2(dy, dx) * 180) / Math.PI);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  // Pointer attraction: fine pointers only, max 18px.
  useEffect(() => {
    if (reduce || !active) {
      px.set(0);
      py.set(0);
      return;
    }
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const p = pointer.current;
      const el = root.current;
      if (!p || !el) return;
      const r = el.getBoundingClientRect();
      const dx = p.x - (r.left + r.width / 2);
      const dy = p.y - (r.top + r.height / 2);
      const len = Math.hypot(dx, dy) || 1;
      const pull = 18 * Math.tanh(len / 500);
      px.set((dx / len) * pull);
      py.set((dy / len) * pull);
    };
    const onMove = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce, active, pointer, px, py]);

  const rad = (angle * Math.PI) / 180;
  const ux = Math.cos(rad);
  const uy = Math.sin(rad);
  const enter = base + 1.1 + index * 0.12;
  const drift = reduce || !active ? { x: 0, y: 0 } : { x: [0, slot.ax, 0, -slot.ax, 0], y: [0, -slot.ay, 0, slot.ay, 0] };
  return (
    <div ref={root} className={cn('pointer-events-auto group/av absolute left-[calc(50%+var(--dx))] top-[calc(50%+var(--dy))] -translate-x-1/2 -translate-y-1/2 max-md:scale-[0.8]', slot.cls)}>
      <m.div style={{ x: sx, y: sy }}>
        <m.div
          animate={drift}
          transition={reduce || !active ? { duration: 0.4 } : { duration: slot.period, repeat: Infinity, ease: 'easeInOut', delay: base + 1.5 }}
        >
          <m.div
            initial={reduce ? false : { scale: 0.6, opacity: 0 }}
            animate={ready || reduce ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
            transition={{ ...spring, delay: enter }}
            className="relative"
          >
            <Avatar name={person.name} hue={person.hue} size={88} className="shadow-pop" />
            <m.svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 size-6 fill-brand text-brand"
              style={{ translate: `${ux * 66 - 12}px ${uy * 66 - 12}px`, rotate: angle }}
              initial={reduce ? false : { opacity: 0, x: -ux * 24, y: -uy * 24 }}
              animate={ready || reduce ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -ux * 24, y: -uy * 24 }}
              transition={{ ...spring, delay: enter + 0.1 }}
            >
              <path d="M3 3l19 9-19 9 5-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </m.svg>
            <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-chip bg-ink px-2 py-1 text-eyebrow font-[550] text-bg opacity-0 transition-opacity duration-[140ms] group-hover/av:opacity-100">
              {person.name}
            </span>
          </m.div>
        </m.div>
      </m.div>
    </div>
  );
}

/** Collaborative-cursor avatars around the headline. Decorative: the whole group is aria-hidden. */
export function FloatingAvatars({ people }: { people: readonly Person[] }) {
  const host = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const inView = useInView(host, { amount: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return (
    <div ref={host} aria-hidden="true" className="pointer-events-none absolute inset-0">
      {people.slice(0, 4).map((p, i) => (
        <Pair key={p.name} person={p} slot={slots[i]!} index={i} active={inView} pointer={pointer} />
      ))}
    </div>
  );
}
