'use client';
import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import { applyTheme, readTheme, type Theme } from '@/lib/theme';

function subscribe(notify: () => void) {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  query.addEventListener('change', notify);
  return () => {
    observer.disconnect();
    query.removeEventListener('change', notify);
  };
}

/** Light/dark switch. Persists the choice; without one the OS preference governs. */
export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => 'light');
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      aria-label="Dark theme"
      aria-pressed={dark}
      onClick={() => applyTheme(dark ? 'light' : 'dark')}
      className="grid size-11 place-items-center rounded-button text-on-dark-muted transition-colors hover:bg-white/10 hover:text-on-dark"
    >
      {dark ? <Sun aria-hidden="true" className="size-5" strokeWidth={1.5} /> : <Moon aria-hidden="true" className="size-5" strokeWidth={1.5} />}
    </button>
  );
}
