import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';

const ROLES = [
{
  id: 'ml-engineering',
  label: 'ML Engineering',
  body: 'Compare model configurations against quality, latency and runtime requirements.',
  signals: ['Candidate comparison', 'Precision options', 'Runtime profiles']
},
{
  id: 'mlops',
  label: 'MLOps',
  body: 'Keep experiment evidence connected to deployment context.',
  signals: ['Experiment lineage', 'Environment records', 'Decision history']
},
{
  id: 'ai-platform',
  label: 'AI Platform Teams',
  body: 'Standardize evaluation across models, environments and teams.',
  signals: ['Shared objectives', 'Constraint policies', 'Review workflow']
},
{
  id: 'data-science',
  label: 'Data Science',
  body: 'Trace how dataset and evaluation changes affect measured results.',
  signals: ['Dataset context', 'Task metrics', 'Sensitivity views']
},
{
  id: 'inference',
  label: 'Inference Engineering',
  body: 'Review latency, throughput and memory behaviour per hardware profile.',
  signals: ['Hardware profiles', 'Batching context', 'Compilation settings']
},
{
  id: 'ai-product',
  label: 'AI Product Teams',
  body: 'Understand what a configuration change means for product behaviour.',
  signals: ['Quality trade-offs', 'Cost context', 'Release evidence']
},
{
  id: 'cloud-infra',
  label: 'Cloud Infrastructure',
  body: 'See how deployment targets and resource limits constrain the options.',
  signals: ['Resource ceilings', 'Deployment targets', 'Cost per request']
},
{
  id: 'research',
  label: 'Research Organizations',
  body: 'Record the conditions behind every reported result.',
  signals: ['Reproducibility notes', 'Version records', 'Test conditions']
},
{
  id: 'leadership',
  label: 'Enterprise Technology Leaders',
  body: 'See which configuration was selected, on what evidence, and by whom.',
  signals: ['Ownership', 'Governance', 'Decision trail']
}];


/** Interactive vertical role selector with an adjacent explanation panel. */
export function UseCaseSelector() {
  const [activeId, setActiveId] = useState(ROLES[0].id);
  const reduce = useReducedMotion();
  const active = ROLES.find((r) => r.id === activeId) || ROLES[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
      <ul className="relative">
        {ROLES.map((role, i) => {
          const isActive = role.id === activeId;
          return (
            <li key={role.id} className="border-b border-[rgba(138,36,75,0.12)] last:border-b-0">
              <button
                type="button"
                onClick={() => setActiveId(role.id)}
                aria-pressed={isActive}
                className="group flex w-full items-center gap-4 py-4 text-left"
                style={{ paddingLeft: isActive ? 16 : 0, transition: 'padding 200ms cubic-bezier(0.23,1,0.32,1)' }}>
                
                <span className={`mono-label w-6 shrink-0 ${isActive ? 'text-crimson-500' : 'text-ink-300'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`flex-1 font-display text-[clamp(18px,3.4vw,26px)] font-semibold tracking-tight transition-colors duration-200 ${
                  isActive ? 'text-ink' : 'text-ink-300 group-hover:text-ink-500'}`
                  }>
                  
                  {role.label}
                </span>
                <ArrowRightIcon
                  className={`h-4 w-4 shrink-0 transition-[opacity,transform] duration-200 ${
                  isActive ? 'translate-x-0 text-[#F63049] opacity-100' : '-translate-x-2 opacity-0'}`
                  }
                  aria-hidden="true" />
                
              </button>
            </li>);

        })}
      </ul>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="glass-strong relative overflow-hidden rounded-[24px] p-7 shadow-glass">
          <div className="absolute inset-0 tech-grid-fine opacity-60" aria-hidden="true" />
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduce ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="relative">
              
              <p className="mono-label text-crimson-600">{active.id}</p>
              <p className="mt-4 font-display text-[22px] font-semibold leading-snug tracking-tight text-ink">
                {active.body}
              </p>
              <ul className="mt-6 space-y-2.5">
                {active.signals.map((signal) =>
                <li key={signal} className="flex items-center gap-3 text-[14px] text-ink-500">
                    <span className="h-px w-6 bg-[rgba(246,48,73,0.5)]" aria-hidden="true" />
                    {signal}
                  </li>
                )}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>);

}