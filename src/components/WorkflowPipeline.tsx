import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const LAYERS = [
{ id: 'input', title: 'Models & Objectives', body: 'Register your models, datasets, and runtime profiles, then define the business and technical goals they need to meet.' },
{ id: 'validation', title: 'Validation', body: 'Inputs, environments, and constraints are checked for consistency before any trial runs.' },
{ id: 'trial', title: 'Optimization Trials', body: 'Candidate configurations are generated and benchmarked under real, environment-specific conditions.' },
{ id: 'evidence', title: 'Trade-Off Intelligence', body: 'Results are compared across quality, latency, cost, and resource metrics, with trade-offs and uncertainty made explicit.' },
{ id: 'decision', title: 'Expert Decision', body: 'Your team reviews the evidence and approves the final configuration. Optivsa informs the decision; it doesn’t make it for you.' }];


/** Animated decision pipeline — five stacked layers connected by flowing lines. */
export function WorkflowPipeline() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[26px] top-6 bottom-6 w-px bg-[rgba(138,36,75,0.18)] md:left-1/2" />
      
      <ol className="space-y-3">
        {LAYERS.map((layer, index) => {
          const isActive = hovered === layer.id;
          return (
            <motion.li
              key={layer.id}
              initial={reduce ? undefined : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
              onMouseEnter={() => setHovered(layer.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative"
              style={{ marginLeft: `${index * 2}%`, marginRight: `${(LAYERS.length - index - 1) * 1.2}%` }}>
              
              <div
                className={`relative flex flex-col gap-4 rounded-2xl border px-5 py-5 transition-[border-color,background-color,transform] duration-200 ease-out sm:flex-row sm:items-center ${
                isActive ?
                'border-[rgba(246,48,73,0.4)] bg-white' :
                'border-[rgba(138,36,75,0.12)] bg-white/70'}`
                }>
                
                <div className="flex w-full items-center gap-3 sm:w-[210px] sm:shrink-0">
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-[10px] font-mono text-[11px] transition-colors duration-200 ${
                    isActive ? 'bg-[#F63049] text-white' : 'bg-[rgba(138,36,75,0.07)] text-ink-500'}`
                    }>
                    
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-display text-[15px] font-semibold tracking-tight text-ink">{layer.title}</p>
                    <p className="mono-label mt-0.5 text-ink-300">{layer.id}</p>
                  </div>
                </div>

                <p className={`max-w-[620px] text-[13px] leading-relaxed ${
                  isActive ? 'text-ink' : 'text-ink-500'
                }`}>
                  {layer.body}
                </p>
              </div>

              {index < LAYERS.length - 1 &&
              <svg aria-hidden="true" className="ml-6 h-6 w-6 md:ml-10" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1 V23" stroke="rgba(138,36,75,0.35)" strokeWidth="1" className="flow-line" />
                  <path d="M8 18 L12 23 L16 18" stroke="rgba(246,48,73,0.6)" strokeWidth="1" />
                </svg>
              }
            </motion.li>);

        })}
      </ol>
    </div>);

}