'use client';
import { useSyncExternalStore } from 'react';

/** Seconds the preloader occupies before the load sequence may start. */
export const PRELOAD_SECONDS = 1.75;

const subscribe = () => () => {};
const snapshot = () => (document.documentElement.hasAttribute('data-preload') ? 'preload' : 'plain');

/**
 * Load-sequence timing: `ready` is false on the server and during hydration, then true;
 * `base` is 1.75 while the preloader is showing (the head script sets `html[data-preload]`), else 0.
 * Every "on load" animation offsets its delay by `base`.
 */
export function useLoadGate() {
  const v = useSyncExternalStore(subscribe, snapshot, () => 'ssr');
  return { ready: v !== 'ssr', base: v === 'preload' ? PRELOAD_SECONDS : 0 };
}
