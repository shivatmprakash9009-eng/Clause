import type { Transition, Variants } from 'motion/react';

export const ease = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};
export const dur = { feedback: 0.14, state: 0.26, enter: 0.72, hero: 1.1 } as const;
export const stagger = { word: 0.04, heroWord: 0.07, card: 0.09, button: 0.08 } as const;
export const spring: Transition = { type: 'spring', stiffness: 220, damping: 26, mass: 0.9 };
export const pointerSpring: Transition = { type: 'spring', stiffness: 120, damping: 18 };

export const fadeUp = (y = 24, delay = 0): Variants => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: dur.enter, ease: ease.outExpo, delay } },
});
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};
export const container = (staggerChildren: number = stagger.card, delayChildren: number = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});
export const heroWord: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: ease.outExpo } },
};
export const inViewDefaults = { once: true, amount: 0.25, margin: '0px 0px -10% 0px' } as const;
export const scrubOffset = ['start 85%', 'start 45%'] as const;
