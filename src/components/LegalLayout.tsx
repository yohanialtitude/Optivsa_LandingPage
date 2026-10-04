import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import { SITE } from '../data/site';

export type LegalSection = {heading: string;paragraphs: string[];list?: string[];};

type LegalLayoutProps = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  counterpartLabel: string;
  counterpartTo: string;
};

/** Shared reading layout for Terms and Privacy: sticky index + long-form body. */
export function LegalLayout({
  eyebrow,
  title,
  updated,
  intro,
  sections,
  counterpartLabel,
  counterpartTo
}: LegalLayoutProps) {
  const slug = (heading: string) => heading.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <div className="pt-32 sm:pt-36 lg:pt-44">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
        <SectionLabel index="Legal">{eyebrow}</SectionLabel>
        <h1 className="mt-6 max-w-3xl font-display text-[clamp(32px,5.6vw,64px)] font-bold leading-[0.95] tracking-tightest text-ink">
          {title}
        </h1>
        <p className="mono-label mt-6 text-ink-400">Last updated / {updated}</p>
        <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-ink-500">{intro}</p>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1180px] gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-[240px_1fr] lg:px-12 lg:pb-32">
        <nav aria-label="Section index" className="lg:sticky lg:top-28 lg:self-start">
          <p className="mono-label text-ink-400">Contents</p>
          <ol className="mt-4 space-y-1.5">
            {sections.map((section, i) =>
            <li key={section.heading}>
                <a
                href={`#${slug(section.heading)}`}
                className="flex gap-3 py-1 text-[13px] leading-snug text-ink-500 transition-colors duration-200 hover:text-crimson-600">
                
                  <span className="mono-label pt-0.5 text-ink-300">{String(i + 1).padStart(2, '0')}</span>
                  {section.heading}
                </a>
              </li>
            )}
          </ol>
        </nav>

        <div className="max-w-2xl">
          {sections.map((section, i) =>
          <section
            key={section.heading}
            id={slug(section.heading)}
            className="scroll-mt-28 border-t border-[rgba(138,36,75,0.14)] py-9 first:border-t-0 first:pt-0">
            
              <p className="mono-label text-crimson-600">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="mt-3 font-display text-[22px] font-semibold tracking-tight text-ink">{section.heading}</h2>
              {section.paragraphs.map((paragraph) =>
            <p key={paragraph.slice(0, 40)} className="mt-4 text-[15px] leading-relaxed text-ink-500">
                  {paragraph}
                </p>
            )}
              {section.list &&
            <ul className="mt-4 space-y-2">
                  {section.list.map((item) =>
              <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink-500">
                      <span className="mt-2.5 h-px w-4 shrink-0 bg-[rgba(246,48,73,0.5)]" aria-hidden="true" />
                      {item}
                    </li>
              )}
                </ul>
            }
            </section>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-4 rounded-[22px] border border-[rgba(138,36,75,0.14)] bg-white/70 px-6 py-5">
            <p className="flex-1 text-[14px] text-ink-500">
              Questions about this document? Write to{' '}
              <a href={`mailto:${SITE.contactEmail}`} className="font-semibold text-ink underline decoration-[rgba(246,48,73,0.4)] underline-offset-4">
                {SITE.contactEmail}
              </a>
              .
            </p>
            <Link
              to={counterpartTo}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(138,36,75,0.2)] px-5 py-2.5 font-display text-[13px] font-semibold text-ink transition-colors duration-200 hover:border-[rgba(246,48,73,0.5)] hover:text-crimson-600">
              
              {counterpartLabel}
              <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>);

}