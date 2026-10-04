import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Optivsa wordmark, pinned to the top-left of the viewport, outside the command dock.
 */
export function BrandMark() {
  return (
    <div className="fixed left-3 top-3 z-[105] sm:left-6 sm:top-5">
      <Link
        to="/"
        aria-label="Optivsa — home"
        className="block">
        
        <img
          src="/logo.svg"
          alt="Optivsa"
          className="h-20 w-40 shrink-0 object-contain sm:h-24 sm:w-48" />
      </Link>
    </div>);

}