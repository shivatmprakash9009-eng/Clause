import { z } from 'zod';
import { site } from '@/content/site';

const e = site.forms.errors;

export const leadSchema = z.object({
  name: z.string().trim().min(1, e.name).max(120),
  email: z.string().trim().email(e.email).max(200),
  company: z.string().trim().min(1, e.company).max(160),
  message: z.string().trim().max(2000).optional().default(''),
  /** Honeypot: humans leave it empty. */
  website: z.string().max(200).optional().default(''),
  turnstileToken: z.string().max(4096).optional(),
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadData = z.output<typeof leadSchema>;
