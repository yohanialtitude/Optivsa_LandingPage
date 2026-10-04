import React from 'react';
import { LinkedinIcon, YoutubeIcon, FacebookIcon } from 'lucide-react';
import { SOCIALS } from '../data/site';
import { MediumGlyph } from './BrandGlyphs';

const icons: Record<string, React.ComponentType<{className?: string;}>> = {
  LinkedIn: LinkedinIcon,
  YouTube: YoutubeIcon,
  Facebook: FacebookIcon,
  Medium: MediumGlyph
};

/** Static social rail pinned to the right edge of the viewport. */
export function SocialRail() {
  return (
    <div className="pointer-events-none fixed right-0 top-1/2 z-[95] hidden -translate-y-1/2 md:block">
      <div className="pointer-events-auto flex flex-col items-center gap-2 rounded-l-2xl border border-r-0 border-[rgba(138,36,75,0.14)] bg-white/70 px-2 py-3 backdrop-blur-md">
        <span className="mono-label mb-1 rotate-180 text-ink-300 [writing-mode:vertical-rl]">Follow</span>
        {SOCIALS.map((social) => {
          const Icon = icons[social.label] || MediumGlyph;
          return (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${social.label} — platform homepage (official Optivsa profile not yet published)`}
              className="group grid h-9 w-9 place-items-center rounded-xl transition-[background-color,transform] duration-200 ease-out hover:-translate-x-0.5 hover:bg-[rgba(246,48,73,0.09)]">
              
              <Icon className="h-[18px] w-[18px] text-ink-400 transition-colors duration-200 group-hover:text-[#F63049]" />
            </a>);

        })}
        <span className="mt-1 h-6 w-px bg-[rgba(138,36,75,0.16)]" aria-hidden="true" />
      </div>
    </div>);

}