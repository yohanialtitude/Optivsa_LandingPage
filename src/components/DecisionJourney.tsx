import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const PANELS = [
{ id: 'model', label: 'MODEL', meta: 'v3.2', body: 'Register the model version and the objective it is evaluated against.' },
{ id: 'runtime', label: 'RUNTIME', meta: 'TensorRT', body: 'Record the runtime and compilation settings used for the trial.' },
{ id: 'hardware', label: 'HARDWARE', meta: 'A100', body: 'Attach the hardware profile. Results move with the hardware.' },
{ id: 'benchmark', label: 'BENCHMARK', meta: '#042', body: 'Capture latency, throughput, quality, memory and cost together.' },
{ id: 'tradeoff', label: 'TRADE-OFF', meta: 'MULTI-OBJ', body: 'Compare candidates against objectives and hard constraints.' },
{ id: 'review', label: 'REVIEW', meta: 'HUMAN', body: 'An engineer reviews the evidence, the gaps and the uncertainty.' },
{ id: 'decision', label: 'DECISION', meta: 'RECORDED', body: 'The selected configuration is recorded with its rationale and owner.' }];


/** THE DECISION PATH — vertical scroll drives horizontal movement. */
export function DecisionJourney() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-72%']);
  const line = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  if (reduce) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PANELS.map((panel, i) =>
        <article key={panel.id} className="rounded-2xl border border-[rgba(138,36,75,0.12)] bg-white/70 p-6">
            <p className="mono-label text-ink-300">
              {String(i + 1).padStart(2, '0')} · {panel.meta}
            </p>
            <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">{panel.label}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-500">{panel.body}</p>
          </article>
        )}
      </div>);

  }

  return (
    <div ref={sectionRef} className="relative h-[340vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <p className="mono-label text-crimson-600">12 — The decision path</p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(28px,5vw,52px)] font-bold leading-[0.95] tracking-tightest text-ink">
            ONE PATH FROM MODEL TO RECORDED DECISION.
          </h2>
        </div>

        <div className="relative mt-10">
          <div className="absolute inset-x-0 top-1/2 h-px bg-[rgba(138,36,75,0.14)]" aria-hidden="true">
            <motion.div className="h-full bg-[#F63049]" style={{ width: line }} />
          </div>

          <motion.ol style={{ x }} className="flex gap-5 pl-5 sm:pl-8 lg:pl-12">
            {PANELS.map((panel, i) =>
            <li key={panel.id} className="w-[74vw] shrink-0 sm:w-[46vw] lg:w-[27vw]">
                <article
                className={`glass relative rounded-[22px] p-6 shadow-glass ${i % 2 === 0 ? 'mt-0' : 'mt-16'}`}>
                
                  <div className="flex items-center justify-between">
                    <span className="mono-label text-ink-300">{String(i + 1).padStart(2, '0')}</span>
                    <span className="mono-label rounded-full bg-[rgba(246,48,73,0.08)] px-2.5 py-1 text-crimson-600">
                      {panel.meta}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[clamp(22px,2.4vw,32px)] font-bold tracking-tightest text-ink">
                    {panel.label}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-500">{panel.body}</p>
                  <div className="mt-6 flex items-center gap-1.5" aria-hidden="true">
                    {PANELS.map((_, dot) =>
                  <span
                    key={dot}
                    className={`h-1 rounded-full transition-colors duration-200 ${
                    dot === i ? 'w-6 bg-[#F63049]' : 'w-1.5 bg-[rgba(138,36,75,0.18)]'}`
                    } />

                  )}
                  </div>
                </article>
              </li>
            )}
          </motion.ol>
        </div>

        <p className="mx-auto mt-10 w-full max-w-[1280px] px-5 text-[12px] text-ink-400 sm:px-8 lg:px-12">
          Scroll to move along the path.
        </p>
      </div>
    </div>);

}