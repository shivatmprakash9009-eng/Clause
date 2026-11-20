import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge must know the project's token-backed utilities, otherwise `text-small` (a font
 * size) is mistaken for a text colour and silently drops `text-brand-foreground`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['display', 'h2', 'h3', 'quote', 'stat', 'body-lg', 'body', 'small', 'eyebrow', 'cta', 'mark'] }],
      shadow: [{ shadow: ['card', 'pop', 'brand'] }],
      rounded: [{ rounded: ['chip', 'button', 'card', 'panel', 'tile', 'inner', 'message', 'bar'] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
