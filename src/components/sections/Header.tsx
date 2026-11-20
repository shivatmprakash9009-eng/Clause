'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { m, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { BrandMark } from '@/components/brand/BrandMark';
import { MainNav } from '@/components/ui/navigation-menu';
import { MobileSheet } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useLoadGate } from '@/components/motion/useLoadGate';
import { container, ease, dur } from '@/lib/motion';
import { cn } from '@/lib/cn';
import { site } from '@/content/site';

const item = {
  hidden: { opacity: 0, y: -12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.outExpo } },
};

/**
 * Fixed header. Transparent → blurred after 24px; hides on scroll-down (>80px) and returns on
 * scroll-up; never hidden while a menu is open or focus is inside it.
 */
export function Header() {
  const { nav } = site;
  const reduce = useReducedMotion();
  const { ready, base } = useLoadGate();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const last = useRef(0);

  useMotionValueEvent(scrollY, 'change', (y) => {
    setSolid(y > 24);
    const delta = y - last.current;
    if (y > 80 && delta > 2) setHidden(true);
    else if (delta < -2 || y <= 80) setHidden(false);
    last.current = y;
  });

  const locked = navOpen || sheetOpen || focusWithin;
  const off = hidden && !locked;
  return (
    <m.header
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={() => setFocusWithin(false)}
      animate={{ y: off ? '-100%' : '0%' }}
      transition={{ duration: reduce ? 0.2 : dur.state, ease: ease.outExpo }}
      className={cn(
        'fixed inset-x-0 top-0 z-[var(--z-header)] border-b transition-[background-color,border-color,backdrop-filter] duration-[260ms]',
        solid ? 'border-line bg-bg/80 backdrop-blur-[12px]' : 'border-transparent bg-transparent',
      )}
    >
      <m.div
        variants={container(0.06, base)}
        initial={reduce ? false : 'hidden'}
        animate={ready || reduce ? 'show' : 'hidden'}
        className="mx-auto flex h-[84px] max-w-[var(--w-wide)] items-center justify-between gap-4 px-4 md:px-6 xl:px-10"
      >
        <div className="flex items-center gap-8">
          <m.div variants={item}>
            <BrandMark />
          </m.div>
          <m.div variants={item} className="hidden md:block">
            <MainNav menus={nav.menus} links={nav.links} onValueChange={(v) => setNavOpen(v !== '')} />
          </m.div>
        </div>
        <div className="flex items-center gap-2">
          <m.div variants={item} className="hidden md:block">
            <Button asChild variant="white" size="md">
              <Link href={nav.login.href}>{nav.login.label}</Link>
            </Button>
          </m.div>
          <m.div variants={item}>
            <Button asChild variant="brand" size="md">
              <Link href={nav.start.href}>{nav.start.label}</Link>
            </Button>
          </m.div>
          <m.div variants={item}>
            <MobileSheet menus={nav.menus} links={nav.links} login={nav.login} start={nav.start} onOpenChange={setSheetOpen} />
          </m.div>
        </div>
      </m.div>
    </m.header>
  );
}
