import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Variant = 'primary' | 'ghost' | 'line';

type MagneticButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
};

const base =
'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-[13px] font-semibold transition-[background-color,color,border-color] duration-200 ease-out';

const variants: Record<Variant, string> = {
  primary: 'bg-[#F63049] text-white shadow-[0_14px_34px_-18px_rgba(246,48,73,0.9)] hover:bg-[#D02752]',
  ghost: 'glass text-ink hover:border-[rgba(246,48,73,0.35)] hover:text-crimson-600',
  line: 'border border-[rgba(138,36,75,0.22)] bg-white/50 text-ink hover:border-[rgba(246,48,73,0.5)] hover:text-crimson-600'
};

/** Spring-based magnetic control. Renders as a button or a link. */
export function MagneticButton({
  children,
  onClick,
  href,
  external,
  variant = 'primary',
  className = '',
  ariaLabel
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setOffset({
      x: (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2) * 12,
      y: (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2) * 7
    });
  };

  const shared = {
    onMouseMove: handleMove,
    onMouseLeave: () => setOffset({ x: 0, y: 0 }),
    animate: reduce ? undefined : { x: offset.x, y: offset.y },
    transition: { type: 'spring' as const, stiffness: 200, damping: 16, mass: 0.6 },
    className: `${base} ${variants[variant]} ${className}`,
    'aria-label': ariaLabel
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        {...external ? { target: '_blank', rel: 'noreferrer noopener' } : {}}
        {...shared}>
        
        {children}
      </motion.a>);

  }

  return (
    <motion.button ref={ref as React.Ref<HTMLButtonElement>} type="button" onClick={onClick} {...shared}>
      {children}
    </motion.button>);

}