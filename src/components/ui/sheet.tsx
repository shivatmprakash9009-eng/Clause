'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Dialog } from 'radix-ui';
import { Menu, X } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { Button } from './button';

type MenuItem = { title: string; description: string; href: string };

/** Mobile menu: right-hand sheet with focus trap, Esc to close and body scroll lock (Radix Dialog). */
export function MobileSheet({
  menus,
  links,
  login,
  start,
  onOpenChange,
}: {
  menus: readonly { label: string; items: readonly MenuItem[] }[];
  links: readonly { label: string; href: string }[];
  login: { label: string; href: string };
  start: { label: string; href: string };
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const change = (next: boolean) => {
    setOpen(next);
    if (next) lenis?.stop();
    else lenis?.start();
    onOpenChange?.(next);
  };
  return (
    <Dialog.Root open={open} onOpenChange={change}>
      <Dialog.Trigger asChild>
        <button type="button" aria-label="Open menu" className="grid size-11 place-items-center rounded-button text-ink hover:bg-ink/5 md:hidden">
          <Menu aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="sheet-overlay fixed inset-0 z-[var(--z-overlay)] bg-charcoal/50 backdrop-blur-sm" />
        <Dialog.Content className="sheet-panel fixed inset-y-0 right-0 z-[var(--z-overlay)] flex w-[88vw] max-w-sm flex-col gap-6 overflow-y-auto bg-bg p-6 shadow-pop">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-body font-[550] text-ink">Menu</Dialog.Title>
            <Dialog.Close asChild>
              <button type="button" aria-label="Close menu" className="grid size-11 place-items-center rounded-button text-ink hover:bg-ink/5">
                <X aria-hidden="true" className="size-5" strokeWidth={1.5} />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
          <nav aria-label="Mobile" className="grid gap-6">
            {menus.map((menu) => (
              <div key={menu.label}>
                <p className="mb-2 text-eyebrow font-[550] uppercase tracking-[0.08em] text-muted">{menu.label}</p>
                <ul className="grid gap-1">
                  {menu.items.map((item) => (
                    <li key={item.title}>
                      <Dialog.Close asChild>
                        <Link href={item.href} className="block min-h-11 rounded-chip px-2 py-2 text-body font-medium text-ink hover:bg-mist">
                          {item.title}
                        </Link>
                      </Dialog.Close>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <ul>
              {links.map((l) => (
                <li key={l.label}>
                  <Dialog.Close asChild>
                    <Link href={l.href} className="block min-h-11 rounded-chip px-2 py-2 text-body font-medium text-ink hover:bg-mist">
                      {l.label}
                    </Link>
                  </Dialog.Close>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto grid gap-3">
            <Dialog.Close asChild>
              <Button asChild variant="white" size="lg">
                <Link href={login.href}>{login.label}</Link>
              </Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button asChild variant="brand" size="lg">
                <Link href={start.href}>{start.label}</Link>
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
