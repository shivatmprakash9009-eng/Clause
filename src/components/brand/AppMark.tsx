import {
  siAsana, siClickup, siDropbox, siGoogleads, siGrammarly, siHubspot, siInstagram, siIntercom, siMailchimp,
  siNotion, siPaypal, siShopify, siSquare, siTrello, siX, siYoutube, siZapier, siZendesk,
  type SimpleIcon,
} from 'simple-icons';
import { BriefcaseBusiness, CalendarDays, Hash, Blocks, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

const icons: Record<string, SimpleIcon> = {
  notion: siNotion, trello: siTrello, paypal: siPaypal, googleads: siGoogleads, grammarly: siGrammarly,
  dropbox: siDropbox, hubspot: siHubspot, asana: siAsana, mailchimp: siMailchimp, zapier: siZapier,
  zendesk: siZendesk, clickup: siClickup, shopify: siShopify, intercom: siIntercom, square: siSquare,
  x: siX, instagram: siInstagram, youtube: siYoutube,
};

/** simple-icons has dropped these brands; a neutral glyph stands in (logged in DECISIONS.md). */
const fallbacks: Record<string, LucideIcon> = { slack: Hash, mondaydotcom: CalendarDays, linkedin: BriefcaseBusiness };

type Props = { slug: string; label?: string; mono?: boolean; className?: string };

/** Brand mark for a slug. Decorative: always `aria-hidden` (the surrounding list carries the label). */
export function AppMark({ slug, mono = false, className }: Props) {
  const icon = icons[slug];
  if (icon) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className={cn('size-full', className)}
        fill="currentColor"
        style={mono ? undefined : { color: `#${icon.hex}` }}
      >
        <path d={icon.path} />
      </svg>
    );
  }
  const Fallback = fallbacks[slug] ?? Blocks;
  return <Fallback aria-hidden="true" strokeWidth={1.5} className={cn('size-full text-ink', mono && 'text-current', className)} />;
}
