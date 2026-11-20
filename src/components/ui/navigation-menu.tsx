'use client';
import Link from 'next/link';
import { NavigationMenu } from 'radix-ui';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

type MenuItem = { title: string; description: string; href: string };
type Menu = { label: string; items: readonly MenuItem[] };

const itemLink = 'link-grow inline-flex min-h-9 items-center rounded-chip px-2 text-small font-medium text-ink';

/** Radix NavigationMenu, restyled. Triggers are real buttons: hover, click, Enter/Space open; Esc closes. */
export function MainNav({
  menus,
  links,
  onValueChange,
}: {
  menus: readonly Menu[];
  links: readonly { label: string; href: string }[];
  onValueChange?: (value: string) => void;
}) {
  return (
    <NavigationMenu.Root aria-label="Primary" delayDuration={120} onValueChange={onValueChange} className="relative">
      <NavigationMenu.List className="flex items-center gap-7">
        {menus.map((menu) => (
          <NavigationMenu.Item key={menu.label} className="relative">
            <NavigationMenu.Trigger className={cn(itemLink, 'group gap-1 [&>svg]:transition-transform [&>svg]:duration-[260ms] data-[state=open]:[&>svg]:rotate-180')}>
              {menu.label}
              <ChevronDown aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="nav-panel absolute left-0 top-full z-[var(--z-overlay)] mt-2 w-72 rounded-tile border border-line bg-bg p-2 shadow-pop">
              <ul className="grid gap-1">
                {menu.items.map((item) => (
                  <li key={item.title}>
                    <NavigationMenu.Link asChild>
                      <Link href={item.href} className="block rounded-chip px-3 py-2.5 transition-colors hover:bg-mist focus-visible:bg-mist">
                        <span className="block text-small font-[550] text-ink">{item.title}</span>
                        <span className="block text-small text-muted">{item.description}</span>
                      </Link>
                    </NavigationMenu.Link>
                  </li>
                ))}
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
        {links.map((l) => (
          <NavigationMenu.Item key={l.label}>
            <NavigationMenu.Link asChild>
              <Link href={l.href} className={itemLink}>
                {l.label}
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
