import React from 'react';

/** Current X (formerly Twitter) mark. */
export function XGlyph({ className }: {className?: string;}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.53 3h3.02l-6.6 7.54L21.75 21h-5.9l-4.62-6.04L5.94 21H2.92l7.06-8.07L2.5 3h6.05l4.18 5.52L17.53 3Zm-1.06 16.2h1.67L7.6 4.71H5.81l10.66 14.49Z" />
    </svg>);

}

/** Pinterest mark. */
export function PinterestGlyph({ className }: {className?: string;}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.65 19.31c-.09-.78-.17-1.98.03-2.83.19-.79 1.2-5.04 1.2-5.04s-.31-.61-.31-1.52c0-1.42.83-2.48 1.85-2.48.88 0 1.3.66 1.3 1.44 0 .88-.56 2.19-.85 3.41-.24 1.02.51 1.85 1.52 1.85 1.82 0 3.22-1.92 3.22-4.69 0-2.45-1.76-4.17-4.28-4.17-2.92 0-4.63 2.19-4.63 4.45 0 .88.34 1.83.76 2.34.08.1.09.19.07.29-.08.32-.25 1.02-.29 1.16-.05.19-.15.23-.35.14-1.3-.61-2.11-2.5-2.11-4.03 0-3.28 2.38-6.29 6.87-6.29 3.61 0 6.41 2.57 6.41 6.01 0 3.58-2.26 6.47-5.4 6.47-1.05 0-2.04-.55-2.38-1.2l-.65 2.47c-.23.9-.86 2.03-1.29 2.72A10 10 0 1 0 12 2Z" />
    </svg>);

}

/** Medium mark. */
export function MediumGlyph({ className }: {className?: string;}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M5 17.5V6.5c0-.3.2-.5.5-.5h2.1c.3 0 .5.1.7.4l3.4 5.5 3.4-5.5c.2-.3.4-.4.7-.4h2.1c.3 0 .5.2.5.5v11c0 .3-.2.5-.5.5H17c-.3 0-.5-.2-.5-.5V9.7L13.7 15c-.2.3-.5.4-.8.4s-.6-.1-.8-.4L7.5 9.7v7.8c0 .3-.2.5-.5.5H5.5c-.3 0-.5-.2-.5-.5Z" />
    </svg>
  );
}
