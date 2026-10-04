import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { AnimatedValue } from './AnimatedValue';

const STAGES = [
{ label: 'MODEL', meta: 'v3.2' },
{ label: 'DATASET', meta: 'EVAL-07' },
{ label: 'RUNTIME', meta: 'TRT' },
{ label: 'HARDWARE', meta: 'A100' },
{ label: 'BENCHMARK', meta: '#042' },
{ label: 'TRADE-OFF', meta: 'MULTI-OBJ' },
{ label: 'DECISION', meta: 'REVIEWED' }];


const SIGNALS = [
{ label: 'Latency', value: 42, suffix: ' ms', decimals: 0 },
{ label: 'Quality', value: 94.2, suffix: '%', decimals: 1 },
{ label: 'Throughput', value: 1180, suffix: ' rps', decimals: 0 },
{ label: 'Memory', value: 7.8, suffix: ' GB', decimals: 1 }];


/**
 * Optimization Decision Core — abstract visualization of the
 * MODEL → DATASET → RUNTIME → HARDWARE → BENCHMARK → TRADE-OFF → DECISION path.
 * SVG/CSS only, so it stays light on mobile.
 */
export function DecisionCore() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setActiveStage((s) => (s + 1) % STAGES.length), 1600);
    return () => window.clearInterval(id);
  }, [reduce]);

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - rect.top) / rect.height - 0.5) * -7,
      y: ((e.clientX - rect.left) / rect.width - 0.5) * 9
    });
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative w-full select-none"
      style={{ perspective: '1400px' }}
      data-cursor="react">
      
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 90, damping: 18, mass: 0.7 }}
        className="relative"
        style={{ transformStyle: 'preserve-3d' }}>
        
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-10 -z-10 rounded-[48px]"
          style={{ background: 'radial-gradient(closest-side, rgba(246,48,73,0.14), rgba(252,236,239,0) 70%)' }} />
        

        <div className="glass-strong relative overflow-hidden rounded-[26px] p-4 shadow-panel sm:p-6">
          <div className="absolute inset-0 tech-grid-fine opacity-70" aria-hidden="true" />

          <div className="relative flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(138,36,75,0.1)] pb-3">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F63049]" />
              <p className="mono-label text-ink-500">Optimization study / STD-118</p>
            </div>
            <p className="mono-label text-ink-300">env / a100 · trt · fp16</p>
          </div>

          <div className="relative mt-4 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="mono-label text-ink-400">Decision path</p>
              <ul className="mt-3 space-y-1.5">
                {STAGES.map((stage, i) => {
                  const isActive = i === activeStage;
                  return (
                    <li key={stage.label} className="relative">
                      <div
                        className={`flex items-center justify-between rounded-xl border px-3 py-2 transition-[background-color,border-color,transform] duration-200 ease-out ${
                        isActive ? 'border-[rgba(246,48,73,0.45)] bg-white' : 'border-[rgba(138,36,75,0.10)] bg-white/55'}`
                        }
                        style={{ transform: isActive ? 'translateX(6px)' : 'none' }}>
                        
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`grid h-5 w-5 place-items-center rounded-[6px] text-[9px] font-semibold ${
                            isActive ? 'bg-[#F63049] text-white' : 'bg-[rgba(138,36,75,0.08)] text-ink-400'}`
                            }>
                            
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span
                            className={`font-display text-[12px] font-semibold tracking-[0.06em] ${
                            isActive ? 'text-ink' : 'text-ink-500'}`
                            }>
                            
                            {stage.label}
                          </span>
                        </div>
                        <span className="mono-label text-ink-300">{stage.meta}</span>
                      </div>
                    </li>);

                })}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-[rgba(138,36,75,0.1)] bg-white/60">
                <svg viewBox="0 0 300 300" className="h-full w-full" fill="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="coreRing" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#F63049" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#8A244B" stopOpacity="0.15" />
                    </linearGradient>
                  </defs>
                  {[130, 104, 78, 52].map((r, i) =>
                  <motion.ellipse
                    key={r}
                    cx="150"
                    cy="150"
                    rx={r}
                    ry={r * 0.42}
                    stroke="url(#coreRing)"
                    strokeWidth="1"
                    animate={reduce ? undefined : { rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 44 + i * 12, ease: 'linear', repeat: Infinity }}
                    style={{ transformOrigin: '150px 150px' }} />

                  )}
                  <circle cx="150" cy="150" r="26" fill="rgba(246,48,73,0.06)" stroke="rgba(246,48,73,0.4)" />
                  <circle cx="150" cy="150" r="5" fill="#F63049" />
                  {[0, 72, 144, 216, 288].map((deg, i) => {
                    const rad = deg * Math.PI / 180;
                    const x = 150 + Math.cos(rad) * 116;
                    const y = 150 + Math.sin(rad) * 50;
                    return (
                      <g key={deg}>
                        <line x1="150" y1="150" x2={x} y2={y} stroke="rgba(138,36,75,0.22)" strokeWidth="1" className="flow-line" />
                        <circle cx={x} cy={y} r="3.5" fill="#fff" stroke="#D02752" strokeWidth="1.2" />
                        <text x={x} y={y - 9} textAnchor="middle" fill="#8A244B" style={{ fontSize: 7, letterSpacing: '0.1em' }}>
                          {['LAT', 'QLT', 'THR', 'MEM', 'CST'][i]}
                        </text>
                      </g>);

                  })}
                </svg>
                <p className="mono-label absolute bottom-3 left-3 text-ink-400">Decision core</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {SIGNALS.map((signal) =>
                <div key={signal.label} className="rounded-xl border border-[rgba(138,36,75,0.1)] bg-white/70 px-3 py-2.5">
                    <p className="mono-label text-ink-400">{signal.label}</p>
                    <p className="mt-1 font-display text-[17px] font-semibold tracking-tight text-ink">
                      <AnimatedValue value={signal.value} decimals={signal.decimals} suffix={signal.suffix} />
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="relative mt-4 border-t border-[rgba(138,36,75,0.1)] pt-3 text-[11px] leading-relaxed text-ink-400">
            Illustrative visualization. Values shown are examples, not measured benchmark results.
          </p>
        </div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 20, x: -10 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="glass drift absolute -left-6 top-28 hidden w-[178px] rounded-2xl p-3.5 shadow-glass xl:block">
          
          <p className="mono-label text-ink-400">Constraint</p>
          <p className="mt-1.5 font-display text-[13px] font-semibold text-ink">GPU memory ≤ 12 GB</p>
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[rgba(138,36,75,0.1)]">
            <div className="h-full w-[65%] rounded-full bg-[#F63049]" />
          </div>
          <p className="mt-2 text-[11px] text-ink-400">Candidate B satisfies</p>
        </motion.div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 24, x: 12 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.6, delay: 0.68, ease: [0.23, 1, 0.32, 1] }}
          className="glass drift absolute -right-7 bottom-24 hidden w-[196px] rounded-2xl p-3.5 shadow-glass xl:block"
          style={{ animationDelay: '1.4s' }}>
          
          <div className="flex items-center justify-between">
            <p className="mono-label text-ink-400">Trade-off</p>
            <span className="mono-label rounded-full bg-[rgba(246,48,73,0.1)] px-2 py-0.5 text-crimson-600">EXP-042</span>
          </div>
          <p className="mt-2 text-[12px] leading-snug text-ink-500">
            +2.1% quality for +18 ms latency in the same environment.
          </p>
        </motion.div>
      </motion.div>
    </div>);

}