import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Metric = {
  label: string;
  unit: string;
  candidates: {name: string;value: number;scale: number;}[];
  note: string;
};

const METRICS: Metric[] = [
{
  label: 'Latency',
  unit: 'ms / request',
  note: 'Lower is better. Measured per environment.',
  candidates: [
  { name: 'Candidate A', value: 68, scale: 0.82 },
  { name: 'Candidate B', value: 42, scale: 0.5 },
  { name: 'Candidate C', value: 31, scale: 0.37 }]

},
{
  label: 'Throughput',
  unit: 'requests / second',
  note: 'Higher is better. Batch size affects results.',
  candidates: [
  { name: 'Candidate A', value: 640, scale: 0.44 },
  { name: 'Candidate B', value: 1180, scale: 0.79 },
  { name: 'Candidate C', value: 1490, scale: 1 }]

},
{
  label: 'Quality',
  unit: 'task score',
  note: 'Task-specific. Not comparable across datasets.',
  candidates: [
  { name: 'Candidate A', value: 96.1, scale: 0.98 },
  { name: 'Candidate B', value: 94.2, scale: 0.9 },
  { name: 'Candidate C', value: 91.4, scale: 0.79 }]

},
{
  label: 'Memory',
  unit: 'GB peak',
  note: 'Depends on precision and compilation settings.',
  candidates: [
  { name: 'Candidate A', value: 14.2, scale: 0.95 },
  { name: 'Candidate B', value: 7.8, scale: 0.53 },
  { name: 'Candidate C', value: 5.1, scale: 0.35 }]

},
{
  label: 'Cost',
  unit: 'USD / 1k requests',
  note: 'Derived from instance pricing at test time.',
  candidates: [
  { name: 'Candidate A', value: 0.74, scale: 0.88 },
  { name: 'Candidate B', value: 0.42, scale: 0.5 },
  { name: 'Candidate C', value: 0.29, scale: 0.35 }]

}];


const CANDIDATE_COLORS = ['#8A244B', '#D02752', '#F63049'];

/** Experimental benchmark comparison: vertical metric labels + measurement bars. */
export function BenchmarkEvidence() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[rgba(138,36,75,0.12)] bg-white/70 p-5 shadow-glass sm:p-8">
      <div className="absolute inset-0 tech-grid-fine opacity-60" aria-hidden="true" />

      <div className="relative flex flex-wrap items-end justify-between gap-4 border-b border-[rgba(138,36,75,0.12)] pb-5">
        <div>
          <p className="mono-label text-ink-400">Benchmark set / BM-042</p>
          <p className="mt-1 font-display text-[17px] font-semibold text-ink">Environment-specific measurements</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {METRICS[0].candidates.map((candidate, i) =>
          <span key={candidate.name} className="flex items-center gap-2 text-[12px] text-ink-500">
              <span className="h-2.5 w-2.5 rounded-[3px]" style={{ backgroundColor: CANDIDATE_COLORS[i] }} />
              {candidate.name}
            </span>
          )}
        </div>
      </div>

      <div className="relative mt-6 space-y-6">
        {METRICS.map((metric, mi) =>
        <motion.div
          key={metric.label}
          initial={reduce ? undefined : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: mi * 0.05, ease: [0.23, 1, 0.32, 1] }}
          onMouseEnter={() => setActive(metric.label)}
          onMouseLeave={() => setActive(null)}
          className="grid gap-3 md:grid-cols-[150px_1fr]">
          
            <div className="flex items-baseline gap-3 md:block">
              <p className="font-display text-[22px] font-semibold tracking-tight text-ink">{metric.label}</p>
              <p className="mono-label mt-1 text-ink-300">{metric.unit}</p>
            </div>

            <div className="space-y-2">
              {metric.candidates.map((candidate, ci) =>
            <div key={candidate.name} className="flex items-center gap-3">
                  <span className="mono-label w-6 shrink-0 text-ink-300">{String.fromCharCode(65 + ci)}</span>
                  <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-[rgba(138,36,75,0.05)]">
                    <motion.div
                  initial={reduce ? { width: `${candidate.scale * 100}%` } : { width: 0 }}
                  whileInView={{ width: `${candidate.scale * 100}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.55, delay: 0.1 + ci * 0.06, ease: [0.23, 1, 0.32, 1] }}
                  className="h-full rounded-md"
                  style={{ backgroundColor: CANDIDATE_COLORS[ci], opacity: active && active !== metric.label ? 0.4 : 0.88 }} />
                
                    <span className="absolute inset-y-0 right-3 flex items-center font-mono text-[11px] text-ink">
                      {candidate.value}
                    </span>
                  </div>
                </div>
            )}
              <p className="pl-9 text-[11.5px] text-ink-400">{metric.note}</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="relative mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[rgba(138,36,75,0.12)] pt-5">
        {['ENV / A100', 'RUNTIME / TRT', 'PRECISION / FP16', 'BATCH / 8', 'DATASET / EVAL-07'].map((tag) =>
        <span key={tag} className="mono-label text-ink-400">
            {tag}
          </span>
        )}
      </div>
      <p className="relative mt-3 text-[12px] leading-relaxed text-ink-500">
        Example values for illustration. Benchmark results are specific to the environment and test conditions recorded
        with them, and are not transferable between environments.
      </p>
    </div>);

}