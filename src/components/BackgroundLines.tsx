import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/** Site-wide technical line field: optimization paths, data flow, experiment lineage. */
export function BackgroundLines() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = layerRef.current;
    if (!el) return;
    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 26;
      target.y = (e.clientY / window.innerHeight - 0.5) * 18;
    };
    const loop = () => {
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;
      el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, [reduce]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-paper-atmos" />
      <div className="absolute inset-0 tech-grid opacity-[0.55]" />
      <div ref={layerRef} className="absolute -inset-x-12 inset-y-0 will-change-transform">
        <svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id="bgline" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8A244B" stopOpacity="0" />
              <stop offset="35%" stopColor="#D02752" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#F63049" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="bgline-v" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F63049" stopOpacity="0" />
              <stop offset="50%" stopColor="#8A244B" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#F63049" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M-40 180 C 320 120, 620 300, 1480 190" stroke="url(#bgline)" strokeWidth="1" className="flow-line-slow" />
          <path d="M-40 470 C 380 560, 760 330, 1480 520" stroke="url(#bgline)" strokeWidth="1" className="flow-line-slow" />
          <path d="M-40 760 C 300 700, 700 840, 1480 730" stroke="url(#bgline)" strokeWidth="1" className="flow-line-slow" />
          <line x1="240" y1="-40" x2="240" y2="940" stroke="url(#bgline-v)" strokeWidth="1" />
          <line x1="1080" y1="-40" x2="1080" y2="940" stroke="url(#bgline-v)" strokeWidth="1" />
        </svg>
      </div>
    </div>);

}