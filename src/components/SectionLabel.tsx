import React from 'react';

/** Numbered section marker with a measurement tick, part of the technical language. */
export function SectionLabel({ index, children }: {index: string;children: React.ReactNode;}) {
  return (
    <p className="mono-label flex items-center gap-3 text-crimson-600">
      <span>{index}</span>
      <span className="h-px w-8 bg-[rgba(246,48,73,0.4)]" aria-hidden="true" />
      <span className="text-ink-400">{children}</span>
    </p>);

}