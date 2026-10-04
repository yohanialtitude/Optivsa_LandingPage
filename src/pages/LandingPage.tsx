import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowRightIcon,
  ArrowDownIcon,
  ShieldCheckIcon,
  UserCheckIcon,
  GitBranchIcon,
  FileCodeIcon,
  XIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  CpuIcon,
  ZapIcon,
  BoxesIcon,
  ServerIcon,
  GaugeIcon,
  ScaleIcon,
  DatabaseIcon,
  FingerprintIcon,
  CircuitBoardIcon,
  LayersIcon } from
'lucide-react';
import { Seo } from '../components/Seo';
import { Reveal } from '../components/Reveal';
import { SectionLabel } from '../components/SectionLabel';
import { MagneticButton } from '../components/MagneticButton';
import { DecisionCore } from '../components/DecisionCore';
import { WorkflowPipeline } from '../components/WorkflowPipeline';
import { BenchmarkEvidence } from '../components/BenchmarkEvidence';
import { UseCaseSelector } from '../components/UseCaseSelector';
import { DecisionJourney } from '../components/DecisionJourney';
import { PricingSection } from '../components/PricingSection';
import { TestimonialsMarquee } from '../components/TestimonialsMarquee';
import { ContactForm } from '../components/ContactForm';
import { ENTITIES, SITE } from '../data/site';
import { scrollToSection } from '../utils/scroll';

const TRADE_OFF_FACTORS = [
{ label: 'Quality', x: '50%', y: '4%' },
{ label: 'Latency', x: '8%', y: '30%' },
{ label: 'Cost', x: '86%', y: '30%' },
{ label: 'Memory', x: '4%', y: '70%' },
{ label: 'Throughput', x: '90%', y: '70%' },
{ label: 'Hardware', x: '30%', y: '94%' },
{ label: 'Runtime', x: '70%', y: '94%' },
{ label: 'Deployment', x: '50%', y: '112%' }];


const APPROACH_STEPS = [
{
  title: 'Models & objectives',
  body: 'Register approved models, datasets and the objectives they are measured against.',
  icon: DatabaseIcon,
  image: '/The%20Optivsa%20approach(1).svg'
},
{
  title: 'Validation',
  body: 'Confirm the environment, runtime and hardware context before a trial runs.',
  icon: ShieldCheckIcon,
  image: '/The%20Optivsa%20approach%20(2).svg'
},
{
  title: 'Optimization trials',
  body: 'Generate candidate configurations and record what each one produced.',
  icon: CircuitBoardIcon,
  image: '/The%20Optivsa%20approach%20(3).svg'
},
{
  title: 'Trade-off intelligence',
  body: 'Compare candidates across objectives and hard constraints together.',
  icon: ScaleIcon,
  image: '/The%20Optivsa%20approach%20(4).svg'
},
{
  title: 'Expert decision',
  body: 'A reviewer selects the configuration and the decision is recorded.',
  icon: UserCheckIcon,
  image: '/The%20Optivsa%20approach%20(5).svg'
}];


const IMAGES = {
  approach: "/The%20Optivsa%20approach.svg",
  hardware: "/12de5c12-9148-464a-9af9-f5fc7c84d97b.jpg",
  topology: "/f8270f81-ef5b-4017-a206-a2745fcc3d68.jpg",
  enterprise: "/Enterprise.svg",
  evidence: "/Benchmark%20evidence.svg",
  problem: "/the%20problem%20bg.svg",
  decision: "/Decision%20intelligence%20BG.svg",
  documentation: "/documentation%20BG.svg",
  oversight: "/optivsa%2020%20BG.svg",
  useCases: "/use%20case%20BG.svg",
  registry: "/1a6ddde4-a36c-4bbb-ac32-60302ea535fe.jpg"
};

const LINEAGE = [
{
  model: 'MODEL v3.2',
  id: 'EXP-042',
  status: 'Approved',
  owner: 'Reviewed by inference team',
  branches: ['Dataset A — Evaluation-07', 'Runtime — compiled, FP16', 'Hardware — A100 class', 'Benchmark #042'],
  metrics: [
  ['Latency', '42 ms'],
  ['Quality', '94.2%'],
  ['Memory', '7.8 GB']]

},
{
  model: 'MODEL v3.2',
  id: 'EXP-043',
  status: 'Under review',
  owner: 'Awaiting reviewer',
  branches: ['Dataset B — Evaluation-09', 'Runtime — served, FP16', 'Hardware — A100 class', 'Benchmark #043'],
  metrics: [
  ['Latency', '55 ms'],
  ['Quality', '95.1%'],
  ['Memory', '9.4 GB']]

},
{
  model: 'MODEL v3.1',
  id: 'EXP-038',
  status: 'Superseded',
  owner: 'Closed, kept for history',
  branches: ['Dataset A — Evaluation-07', 'Runtime — portable, FP32', 'Hardware — mid-range GPU', 'Benchmark #038'],
  metrics: [
  ['Latency', '96 ms'],
  ['Quality', '92.7%'],
  ['Memory', '11.2 GB']]

}];


const EVIDENCE_TRAIL = [
{ label: 'Candidate B', value: 'Selected for review' },
{ label: 'Latency', value: '42 ms' },
{ label: 'Quality', value: '94.2%' },
{ label: 'Memory', value: '7.8 GB' },
{ label: 'Runtime', value: 'TensorRT' },
{ label: 'Environment', value: 'A100' },
{ label: 'Reviewer decision', value: 'Recorded with rationale' }];


const FINGERPRINT = [
{ key: 'Model', value: 'v3.2' },
{ key: 'Dataset', value: 'Evaluation-07' },
{ key: 'Runtime', value: 'TensorRT' },
{ key: 'Hardware', value: 'NVIDIA A100' },
{ key: 'Precision', value: 'FP16' },
{ key: 'Environment', value: 'Production-like' }];


const TECHNOLOGIES = [
{ name: 'GPU acceleration libraries', role: 'Data processing context', icon: CpuIcon, image: '/Technology%20ecosystem(1).svg' },
{ name: 'Optimized inference runtimes', role: 'Runtime and compilation options', icon: ZapIcon, image: '/Technology%20ecosystem%20(2).svg' },
{ name: 'Model tooling frameworks', role: 'Model preparation context', icon: BoxesIcon, image: '/Technology%20ecosystem%20(3).svg' },
{ name: 'Inference serving layers', role: 'Deployment and serving options', icon: ServerIcon, image: '/Technology%20ecosystem%20(4).svg' }];


const DOC_TOPICS = [
{ title: 'Model & Experiment APIs', body: 'Register models, versions, datasets and experiment records.' },
{ title: 'Metric & Benchmark Schemas', body: 'Describe metrics with the environment they were measured in.' },
{ title: 'Runtime Integration Guides', body: 'Connect runtimes and hardware profiles to a study.' },
{ title: 'Decision & Study APIs', body: 'Read candidates, evidence and recorded selections.' }];


const ENTERPRISE_FLOW = ['Experiment registry', 'Evaluation', 'Evidence', 'Review', 'Selection', 'Deployment'];

const GOVERNANCE = [
{ title: 'Governance', body: 'Policies define which configurations may be considered.' },
{ title: 'Ownership', body: 'Every recorded decision has a named reviewer.' },
{ title: 'Reproducibility', body: 'Results stay attached to their test conditions.' },
{ title: 'Validation', body: 'Environment checks run before results are compared.' },
{ title: 'Decision history', body: 'Previous selections remain readable later.' }];


export function LandingPage() {
  const location = useLocation();
  const reduce = useReducedMotion();
  const [docsOpen, setDocsOpen] = useState(false);
  const [activeFactor, setActiveFactor] = useState<string | null>(null);
  const [activeExp, setActiveExp] = useState(LINEAGE[0].id);
  const experiment = LINEAGE.find((entry) => entry.id === activeExp) || LINEAGE[0];

  useEffect(() => {
    const state = location.state as {scrollTo?: string;} | null;
    if (state && state.scrollTo) {
      const id = state.scrollTo;
      window.setTimeout(() => scrollToSection(id), 120);
      window.history.replaceState({}, '');
    }
  }, [location]);

  return (
    <>
      <Seo
        title="Optivsa | AI Model Optimization & Decision Engine"
        description="Optivsa helps AI teams compare model configurations, benchmark evidence, runtimes and deployment constraints to make informed model-selection decisions."
        path="/" />
      

      {/* 01 — HERO */}
      <section id="home" aria-labelledby="hero-heading" className="relative pt-24 sm:pt-24 lg:pt-28">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[1.02fr_1fr] lg:items-center lg:gap-10 lg:px-12 lg:pb-20">
          <div>
            <Reveal>
              <p className="mono-label flex flex-wrap items-center gap-3 text-ink-400">
                <span className="rounded-full border border-[rgba(246,48,73,0.3)] px-3 py-1 text-crimson-600">
                  Decision engine
                </span>
                <span>AI model optimization</span>
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h1
                id="hero-heading"
                className="mt-7 font-display text-[clamp(38px,7.4vw,84px)] font-bold leading-[0.92] tracking-tightest text-ink">
                
                DEPLOY THE
                <br />
                <span className="text-[#F63049]">MODEL YOU CAN</span>
                <br />
                PROVE IS RIGHT.
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-ink-500 sm:text-[17px]">
                Optivsa organizes your experiments, benchmarks, and constraints into one decision-support workspace. So every deployment choice is backed by validated, environment-specific evidence, not guesswork.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <MagneticButton onClick={() => scrollToSection('platform')}>
                  Explore the platform
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </MagneticButton>
                <MagneticButton variant="line" onClick={() => scrollToSection('how-it-works')}>
                  View Documentation
                  <ArrowDownIcon className="h-4 w-4" aria-hidden="true" />
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <dl className="mt-10 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 border-t border-[rgba(138,36,75,0.14)] pt-6 sm:grid-cols-3">
                {[
                ['Compare', 'Candidate configurations'],
                ['Record', 'Evidence and conditions'],
                ['Review', 'Human-owned selection']].
                map(([term, detail]) =>
                <div key={term}>
                    <dt className="font-display text-[15px] font-semibold text-ink">{term}</dt>
                    <dd className="mt-1 text-[13px] leading-snug text-ink-400">{detail}</dd>
                  </div>
                )}
              </dl>
            </Reveal>
          </div>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}>
            
            <DecisionCore />
          </motion.div>
        </div>
      </section>

      {/* 02 — PROBLEM */}
      <section
        aria-labelledby="problem-heading"
        className="relative overflow-hidden border-y border-[rgba(138,36,75,0.14)] py-24 lg:py-32">
        
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.problem})` }}>

          <div className="absolute inset-0 bg-white/55 backdrop-blur-[2px]" />
          <div
            className="absolute inset-0"
            style={{
              background:
              'radial-gradient(900px 460px at 15% 10%, rgba(255,255,255,0.92), transparent 65%), radial-gradient(800px 460px at 85% 90%, rgba(255,255,255,0.85), transparent 65%)'
            }} />
          
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <SectionLabel index="02">The problem</SectionLabel>
              <h2
                id="problem-heading"
                className="mt-5 font-display text-[clamp(30px,5.6vw,62px)] font-bold leading-[0.95] tracking-tightest text-ink">
                
                THE HIDDEN
                <br />
                COST OF GUESSING.
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-ink-500 lg:pb-3">
              AI teams juggle accuracy, latency, cost, and hardware constraints, but without a shared evidence layer, model decisions become fragmented, unreproducible, and risky.
            </p>

             <p className="max-w-md text-[15px] leading-relaxed text-ink-500 lg:pb-3">
              Problem 1: Scattered, Unreproducible Evidence
              <br />
              Problem 2: Conflicting Optimization Goals
              <br />
              Problem 3: Decisions Made Without Sufficient Evidence
            </p>
            
          </div>

          <div className="relative mt-20 lg:mt-28">
            <div className="relative mx-auto h-[540px] max-w-3xl sm:h-[460px]">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 460" fill="none" aria-hidden="true">
                {[
                [300, 30],
                [70, 150],
                [530, 150],
                [50, 330],
                [550, 330],
                [190, 430],
                [410, 430]].
                map(([x, y], i) =>
                <line
                  key={i}
                  x1="300"
                  y1="230"
                  x2={x}
                  y2={y}
                  stroke="rgba(138,36,75,0.25)"
                  strokeWidth="1"
                  className="flow-line" />

                )}
                <circle cx="300" cy="230" r="96" stroke="rgba(246,48,73,0.22)" strokeWidth="1" />
                <circle cx="300" cy="230" r="128" stroke="rgba(138,36,75,0.12)" strokeWidth="1" />
              </svg>

              <div className="absolute left-1/2 top-1/2 w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[rgba(246,48,73,0.35)] bg-white p-5 text-center shadow-glass">
                <p className="mono-label text-crimson-600">Under evaluation</p>
                <p className="mt-2 font-display text-[16px] font-bold leading-tight tracking-tight text-ink">
                  MODEL CONFIGURATION
                </p>
              </div>

              {TRADE_OFF_FACTORS.slice(0, 7).map((factor, i) =>
              <motion.button
                key={factor.label}
                type="button"
                onMouseEnter={() => setActiveFactor(factor.label)}
                onMouseLeave={() => setActiveFactor(null)}
                onFocus={() => setActiveFactor(factor.label)}
                onBlur={() => setActiveFactor(null)}
                initial={reduce ? undefined : { opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-4 py-2 font-display text-[13px] font-semibold transition-colors duration-200 ${
                activeFactor === factor.label ?
                'border-[rgba(246,48,73,0.5)] bg-[#F63049] text-white' :
                'border-[rgba(138,36,75,0.16)] bg-white/80 text-ink-500'}`
                }
                style={{ left: factor.x, top: factor.y }}>
                
                  {factor.label}
                </motion.button>
              )}
            </div>

            <Reveal className="mx-auto mt-16 max-w-3xl lg:mt-20">
              <div className="grid gap-px overflow-hidden rounded-2xl border border-[rgba(138,36,75,0.14)] bg-[rgba(138,36,75,0.12)] sm:grid-cols-3">
                {[
                'Better accuracy can mean higher latency.',
                'Lower cost can mean lower quality.',
                'Faster inference can require different hardware.'].
                map((line) =>
                <p key={line} className="bg-white/85 px-6 py-7 font-display text-[15px] leading-snug text-ink">
                    {line}
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 — APPROACH / PLATFORM */}
      <section id="platform" aria-labelledby="approach-heading" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <SectionLabel index="03">The Optivsa approach</SectionLabel>
            <h2
              id="approach-heading"
              className="mt-5 font-display text-[clamp(20px,2.8vw,32px)] font-black leading-[1.05] tracking-tightest text-ink">
              
              THE PATH TO A
              <br />
              CONFIDENT DECISION
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-500">
              A structured path from raw experimentation to a decision your team can stand behind evidence at every step, humans in control at the last one.
            </p>

            <div className="mt-12 space-y-8">
              {[
                {
                  title: 'Registry',
                  body: 'Centralize every model, dataset, and runtime profile in one traceable, versioned system of record.'
                },
                {
                  title: 'Evaluation',
                  body: 'Weigh accuracy, latency, cost, and resource usage together, not in isolation.'
                },
                {
                  title: 'Comparison',
                  body: 'Compare candidate configurations side by side, grounded in reproducible, environment-specific results.'
                },
                {
                  title: 'Explainability',
                  body: 'See exactly why a configuration is recommended, including trade-offs, constraints, and confidence.'
                },
                {
                  title: 'Approval',
                  body: 'Recommendations inform the decision; your team reviews, validates, and owns the final call.'
                }
              ].map((item, index) => (
                <div key={item.title} className="max-w-5xl">
                  <h3 className="font-display text-[clamp(20px,2.2vw,20px)] font-bold leading-[1.05] tracking-tightest text-ink">
                    {index + 1}. {item.title}
                  </h3>
                  <p className="mt-2 max-w-4xl text-[15px] leading-relaxed text-ink-500">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Reveal className="mt-14">
            <figure className="relative overflow-hidden rounded-[26px] border border-[rgba(138,36,75,0.14)]">
              <img
                src={IMAGES.approach}
                alt="Abstract composition of layered translucent panels connected by thin measurement lines"
                loading="lazy"
                className="h-[240px] w-full object-cover sm:h-[340px] lg:h-[420px]" />
              
              <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/10 to-transparent" aria-hidden="true" />
              <figcaption className="absolute bottom-6 left-6 max-w-xs">
                <p className="mono-label text-crimson-600">Optimization workspace</p>
                <p className="mt-2 font-display text-[18px] font-semibold leading-snug tracking-tight text-ink">
                  Every layer of the decision stays connected to the evidence beneath it.
                </p>
              </figcaption>
              <div className="absolute right-5 top-5 flex gap-2">
                {['STD-118', 'EXP-042', 'FP16'].map((tag) =>
                <span
                  key={tag}
                  className="mono-label rounded-full border border-[rgba(138,36,75,0.16)] bg-white/80 px-2.5 py-1 text-ink-500 backdrop-blur">
                  
                    {tag}
                  </span>
                )}
              </div>
            </figure>
          </Reveal>

          <ol className="mt-16 grid gap-4 lg:grid-cols-5">
            {APPROACH_STEPS.map((step, i) =>
            <Reveal
              key={step.title}
              delay={i * 0.06}
              className={i % 2 === 1 ? 'lg:mt-12' : ''}>
              
                <li className="group h-full rounded-2xl border border-[rgba(138,36,75,0.12)] bg-white/70 p-6 transition-[border-color,transform] duration-200 ease-out hover:-translate-y-1 hover:border-[rgba(246,48,73,0.4)]">
                  <div className="flex items-center justify-between">
                    <span className="mono-label text-ink-300">{String(i + 1).padStart(2, '0')}</span>
                    {i < APPROACH_STEPS.length - 1 &&
                  <ArrowRightIcon className="h-3.5 w-3.5 text-[rgba(246,48,73,0.6)]" aria-hidden="true" />
                  }
                  </div>
                  <span className="mt-5 grid h-12 w-12 place-items-center overflow-hidden rounded-xl bg-[rgba(246,48,73,0.08)] transition-colors duration-200 group-hover:bg-[#F63049]">
                    <img
                      src={step.image}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-contain p-1 transition-[filter] duration-200 group-hover:brightness-0 group-hover:invert" />
                  </span>
                  <h3 className="mt-4 font-display text-[17px] font-semibold leading-snug tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-500">{step.body}</p>
                </li>
              </Reveal>
            )}
          </ol>
        </div>
      </section>

      {/* 04 — TECHNICAL WORKFLOW */}
      <section
        id="how-it-works"
        aria-labelledby="workflow-heading"
        className="relative border-y border-[rgba(138,36,75,0.1)] bg-white/40 py-24 lg:py-32">
        
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <SectionLabel index="04">Technical workflow</SectionLabel>
              <h2
                id="workflow-heading"
                className="mt-5 font-display text-[clamp(28px,4.6vw,52px)] font-bold leading-[0.96] tracking-tightest text-ink">
                
                MODELS TO DECISIONS, STEP BY STEP 
              </h2>
              <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-ink-500">
                A controlled progression from validated inputs to an informed decision, not an automated shortcut to optimal.
              </p>
            </div>
          </div>

          <div className="mt-14">
            <WorkflowPipeline />
          </div>
        </div>
      </section>

      {/* 05 — MODEL & EXPERIMENT REGISTRY */}
      <section
        aria-labelledby="registry-heading"
        className="relative overflow-hidden bg-[#14090C] py-24 text-white lg:py-32">
        
        <div aria-hidden="true" className="absolute inset-0">
          <img src={IMAGES.registry} alt="" loading="lazy" className="h-full w-full object-cover opacity-30" />
          <div
            className="absolute inset-0"
            style={{
              background:
              'radial-gradient(900px 500px at 78% 12%, rgba(246,48,73,0.30), transparent 62%), linear-gradient(180deg, rgba(20,9,12,0.94) 0%, rgba(20,9,12,0.88) 45%, rgba(20,9,12,0.96) 100%)'
            }} />
          
        </div>

        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="mono-label flex items-center gap-3 text-[#F96A7E]">
                <span>05</span>
                <span className="h-px w-8 bg-[rgba(246,48,73,0.5)]" aria-hidden="true" />
                <span className="text-white/50">Model &amp; experiment registry</span>
              </p>
              <h2
                id="registry-heading"
                className="mt-5 font-display text-[clamp(28px,4.6vw,52px)] font-bold leading-[0.96] tracking-tightest">
                
                KEEP EVERY EXPERIMENT IN CONTEXT.
              </h2>
            </div>
            <p className="max-w-sm text-[14px] leading-relaxed text-white/55">
              Select an experiment to see the lineage behind it the dataset, runtime, hardware and benchmark it is
              bound to.
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-[340px_1fr]">
            {/* Experiment rail */}
            <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm">
              <p className="mono-label px-3 pb-2 pt-2 text-white/40">Registry / 3 records</p>
              <ul className="space-y-1.5">
                {LINEAGE.map((entry) => {
                  const isActive = entry.id === activeExp;
                  return (
                    <li key={entry.id}>
                      <button
                        type="button"
                        onClick={() => setActiveExp(entry.id)}
                        aria-pressed={isActive}
                        className={`w-full rounded-2xl border px-4 py-4 text-left transition-[background-color,border-color,transform] duration-200 ease-out ${
                        isActive ?
                        'border-[rgba(246,48,73,0.6)] bg-[rgba(246,48,73,0.14)] translate-x-1' :
                        'border-white/10 bg-transparent hover:border-white/25'}`
                        }>
                        
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-display text-[15px] font-semibold tracking-tight">{entry.model}</span>
                          <span className="mono-label text-white/40">{entry.id}</span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                            entry.status === 'Approved' ?
                            'bg-[#F63049]' :
                            entry.status === 'Under review' ?
                            'bg-[#F5A9B5]' :
                            'bg-white/30'}`
                            }
                            aria-hidden="true" />
                          
                          <span className="text-[12.5px] text-white/50">{entry.status}</span>
                        </div>
                      </button>
                    </li>);

                })}
              </ul>

              <ul className="mt-4 space-y-2 border-t border-white/10 px-3 pb-2 pt-4">
                {['Model versions', 'Datasets', 'Runtime profiles', 'Hardware profiles', 'Lineage', 'Approval status'].map(
                  (item) =>
                  <li key={item} className="flex items-center gap-2.5 text-[12.5px] text-white/45">
                      <GitBranchIcon className="h-3 w-3 text-[#F96A7E]" aria-hidden="true" />
                      {item}
                    </li>

                )}
              </ul>
            </div>

            {/* Lineage detail */}
            <AnimatePresence mode="wait">
              <motion.article
                key={experiment.id}
                initial={reduce ? undefined : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                className="rounded-[22px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm sm:p-8">
                
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <h3 className="font-display text-[26px] font-bold tracking-tightest">{experiment.model}</h3>
                    <p className="mt-1.5 text-[13px] text-white/50">{experiment.owner}</p>
                  </div>
                  <span
                    className={`mono-label rounded-full px-3 py-1.5 ${
                    experiment.status === 'Approved' ?
                    'bg-[#F63049] text-white' :
                    'border border-white/20 text-white/60'}`
                    }>
                    
                    {experiment.status}
                  </span>
                </div>

                <div className="mt-7 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                  <ol className="relative">
                    {experiment.branches.map((leaf, li) =>
                    <li key={leaf} className="relative pl-8">
                        {li < experiment.branches.length - 1 &&
                      <span aria-hidden="true" className="absolute left-[9px] top-6 h-full w-px bg-white/15" />
                      }
                        <span
                        aria-hidden="true"
                        className="absolute left-0 top-[18px] grid h-[19px] w-[19px] place-items-center rounded-[6px] border border-[rgba(246,48,73,0.6)] bg-[#14090C]">
                        
                          <span className="h-1.5 w-1.5 rounded-[2px] bg-[#F63049]" />
                        </span>
                        <p className="py-3.5 text-[14.5px] text-white/75">{leaf}</p>
                      </li>
                    )}
                  </ol>

                  <div className="space-y-2.5">
                    {experiment.metrics.map(([label, value]) =>
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3">
                      
                        <span className="mono-label text-white/40">{label}</span>
                        <span className="font-display text-[16px] font-semibold">{value}</span>
                      </div>
                    )}
                    <p className="pt-2 text-[11.5px] leading-relaxed text-white/35">
                      Example records. Metrics are only comparable between experiments sharing the same fingerprint.
                    </p>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 06 — OPTIMIZATION WORKSPACE */}
      <section aria-labelledby="workspace-heading" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <SectionLabel index="06">Optimization workspace</SectionLabel>
            <h2
              id="workspace-heading"
              className="mt-5 font-display text-[clamp(28px,4.6vw,52px)] font-bold leading-[0.96] tracking-tightest text-ink">
              
              COMPARE CANDIDATES AGAINST WHAT YOU DEFINED.
            </h2>
          </div>

          <Reveal className="mt-14">
            <div className="glass-strong overflow-hidden rounded-[26px] shadow-panel">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(138,36,75,0.12)] px-6 py-4">
                <p className="mono-label text-ink-500">Study / STD-118 · Objective set</p>
                <p className="mono-label text-ink-300">Illustrative interface</p>
              </div>

              <div className="grid gap-px bg-[rgba(138,36,75,0.1)] lg:grid-cols-[0.9fr_1.6fr]">
                <div className="space-y-7 bg-white/80 p-6">
                  <div>
                    <p className="mono-label text-ink-400">Optimization objectives</p>
                    <ul className="mt-4 space-y-3">
                      {[
                      ['Quality', 78],
                      ['Latency', 64],
                      ['Throughput', 52],
                      ['Memory', 40],
                      ['Cost', 46]].
                      map(([label, weight]) =>
                      <li key={label as string}>
                          <div className="flex items-center justify-between text-[13px] text-ink-500">
                            <span>{label}</span>
                            <span className="font-mono text-[11px] text-ink-400">{weight}</span>
                          </div>
                          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[rgba(138,36,75,0.09)]">
                            <div className="h-full rounded-full bg-[#D02752]" style={{ width: `${weight as number}%` }} />
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <p className="mono-label text-ink-400">Constraints</p>
                    <ul className="mt-3 space-y-2">
                      {['GPU memory ≤ 12 GB', 'Runtime compatibility: TensorRT', 'Deployment target: A100 cluster'].map(
                        (constraint) =>
                        <li
                          key={constraint}
                          className="rounded-lg border border-[rgba(138,36,75,0.12)] px-3 py-2 text-[12.5px] text-ink-500">
                          
                            {constraint}
                          </li>

                      )}
                    </ul>
                  </div>
                </div>

                <div className="bg-white/70 p-6">
                  <p className="mono-label text-ink-400">Candidate configurations</p>
                  <div className="mt-4 space-y-3">
                    {[
                    { name: 'Candidate A', runtime: 'ONNX · FP32', fit: 'Meets 3 of 5 objectives', flag: 'Exceeds memory constraint', ok: false, rank: 3 },
                    { name: 'Candidate B', runtime: 'TensorRT · FP16', fit: 'Meets 5 of 5 objectives', flag: 'Satisfies all constraints', ok: true, rank: 1 },
                    { name: 'Candidate C', runtime: 'TensorRT · INT8', fit: 'Meets 4 of 5 objectives', flag: 'Quality below threshold', ok: false, rank: 2 }].
                    map((candidate) =>
                    <div
                      key={candidate.name}
                      className={`flex flex-wrap items-center gap-4 rounded-xl border px-4 py-4 ${
                      candidate.ok ? 'border-[rgba(246,48,73,0.4)] bg-[rgba(246,48,73,0.03)]' : 'border-[rgba(138,36,75,0.12)]'}`
                      }>
                      
                        <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl font-display text-[13px] font-bold ${
                        candidate.ok ? 'bg-[#F63049] text-white' : 'bg-[rgba(138,36,75,0.07)] text-ink-500'}`
                        }>
                        
                          {candidate.rank}
                        </span>
                        <div className="min-w-[150px] flex-1">
                          <p className="font-display text-[15px] font-semibold text-ink">{candidate.name}</p>
                          <p className="mono-label mt-1 text-ink-300">{candidate.runtime}</p>
                        </div>
                        <p className="text-[13px] text-ink-500">{candidate.fit}</p>
                        <p className={`text-[12.5px] ${candidate.ok ? 'text-crimson-600' : 'text-ink-400'}`}>
                          {candidate.flag}
                        </p>
                      </div>
                    )}
                  </div>

                  <p className="mt-6 border-t border-[rgba(138,36,75,0.12)] pt-4 text-[12.5px] leading-relaxed text-ink-500">
                    Compare candidate configurations against defined objectives and constraints. Rankings reflect the
                    objectives you set and the evidence recorded for this environment.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 07 — DECISION INTELLIGENCE */}
      <section
        id="evidence"
        aria-labelledby="decision-heading"
        className="relative border-y border-[rgba(138,36,75,0.1)] bg-white/40 py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45"
          style={{ backgroundImage: `url(${IMAGES.decision})` }} />
        <div aria-hidden="true" className="absolute inset-0 bg-white/55" />

        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <SectionLabel index="07">Decision intelligence</SectionLabel>
              <h2
                id="decision-heading"
                className="mt-5 font-display text-[clamp(28px,4.6vw,52px)] font-bold leading-[0.96] tracking-tightest text-ink">
                
                THE RECOMMENDATION IS ONLY AS GOOD AS THE EVIDENCE.
              </h2>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink-500">
                Optivsa connects recommendations to benchmark evidence and operational context. Every step of the trail
                stays visible, so a reviewer can see what the recommendation rests on.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                ['Candidate', 'What is being considered'],
                ['Evidence', 'What was measured'],
                ['Constraints', 'What must hold'],
                ['Trade-offs', 'What is given up']].
                map(([term, detail]) =>
                <div key={term} className="rounded-xl border border-[rgba(138,36,75,0.12)] bg-white/70 px-4 py-4">
                    <p className="font-display text-[14px] font-semibold text-ink">{term}</p>
                    <p className="mt-1 text-[12.5px] text-ink-400">{detail}</p>
                  </div>
                )}
              </div>
            </div>

            <Reveal delay={0.1}>
              <ol className="relative">
                {EVIDENCE_TRAIL.map((step, i) =>
                <li key={step.label} className="relative pl-9">
                    {i < EVIDENCE_TRAIL.length - 1 &&
                  <span aria-hidden="true" className="absolute left-[11px] top-6 h-full w-px bg-[rgba(138,36,75,0.2)]" />
                  }
                    <span
                    aria-hidden="true"
                    className={`absolute left-0 top-4 grid h-[23px] w-[23px] place-items-center rounded-full border ${
                    i === EVIDENCE_TRAIL.length - 1 ?
                    'border-[#F63049] bg-[#F63049]' :
                    'border-[rgba(138,36,75,0.3)] bg-white'}`
                    }>
                    
                      <span
                      className={`h-1.5 w-1.5 rounded-full ${
                      i === EVIDENCE_TRAIL.length - 1 ? 'bg-white' : 'bg-[#D02752]'}`
                      } />
                    
                    </span>
                    <div className="flex items-center justify-between gap-4 border-b border-[rgba(138,36,75,0.1)] py-4">
                      <p className="font-display text-[15px] font-semibold text-ink">{step.label}</p>
                      <p className="font-mono text-[12.5px] text-ink-500">{step.value}</p>
                    </div>
                  </li>
                )}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 08 — BENCHMARK EVIDENCE */}
      <section aria-labelledby="benchmark-heading" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <SectionLabel index="08">Benchmark evidence</SectionLabel>
              <h2
                id="benchmark-heading"
                className="mt-5 font-display text-[clamp(28px,4.6vw,52px)] font-bold leading-[0.96] tracking-tightest text-ink">
                
                MEASUREMENTS, WITH THEIR CONDITIONS.
              </h2>
            </div>
            <p className="max-w-sm text-[14px] leading-relaxed text-ink-500">
              Latency, throughput, quality, memory and cost are read together. A result without its environment is not
              evidence.
            </p>
          </div>

          <Reveal className="mt-12">
            <figure className="relative overflow-hidden rounded-[24px] border border-[rgba(138,36,75,0.14)]">
              <img
                src={IMAGES.evidence}
                alt="Abstract measurement bars of varying length layered over a faint technical grid"
                loading="lazy"
                className="h-[160px] w-full object-cover sm:h-[210px]" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-white/70 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-6 bottom-5 flex flex-wrap items-center gap-x-8 gap-y-2">
                {[
                { icon: GaugeIcon, label: 'Latency' },
                { icon: ZapIcon, label: 'Throughput' },
                { icon: ScaleIcon, label: 'Quality' },
                { icon: LayersIcon, label: 'Memory' },
                { icon: ServerIcon, label: 'Cost' }].
                map((metric) =>
                <span key={metric.label} className="flex items-center gap-2 text-[13px] font-medium text-ink">
                    <metric.icon className="h-4 w-4 text-[#D02752]" aria-hidden="true" />
                    {metric.label}
                  </span>
                )}
              </div>
            </figure>
          </Reveal>

          <Reveal className="mt-14">
            <BenchmarkEvidence />
          </Reveal>
        </div>
      </section>

      {/* 09 — REPRODUCIBILITY */}
      <section aria-labelledby="repro-heading" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-xl">
            <SectionLabel index="09">Reproducibility</SectionLabel>
            <h2
              id="repro-heading"
              className="mt-5 font-display text-[clamp(28px,4.6vw,52px)] font-bold leading-[0.96] tracking-tightest text-ink">
              
              RESULTS NEED CONTEXT.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-500">
              Model results depend on version, dataset, runtime, hardware, precision, compilation settings, environment
              and test conditions. Optivsa keeps them attached as one fingerprint.
            </p>
          </div>

          <Reveal className="mt-12">
            <div className="grid items-stretch gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <figure className="relative overflow-hidden rounded-[24px] border border-[rgba(138,36,75,0.14)]">
                <img
                  src={IMAGES.hardware}
                  alt="Close view of accelerator hardware in a bright data centre"
                  loading="lazy"
                  className="h-full min-h-[220px] w-full object-cover" />
                
                <span className="mono-label absolute left-5 top-5 rounded-full bg-white/85 px-3 py-1 text-ink-500 backdrop-blur">
                  Environment / A100 class
                </span>
              </figure>
              <div className="flex flex-col justify-between gap-4 rounded-[24px] border border-[rgba(138,36,75,0.14)] bg-white/75 p-7">
                <FingerprintIcon className="h-7 w-7 text-[#F63049]" aria-hidden="true" />
                <p className="font-display text-[19px] font-semibold leading-snug tracking-tight text-ink">
                  The same model can behave differently on different hardware. The fingerprint is what makes two results
                  comparable.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Version', 'Dataset', 'Runtime', 'Hardware', 'Precision', 'Conditions'].map((tag) =>
                  <span
                    key={tag}
                    className="rounded-full border border-[rgba(138,36,75,0.14)] px-3 py-1 text-[12px] text-ink-500">
                    
                      {tag}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-14">
            <div className="relative overflow-hidden rounded-[26px] border border-[rgba(138,36,75,0.14)] bg-white/70 p-6 shadow-glass sm:p-10">
              <div className="absolute inset-0 tech-grid-fine opacity-60" aria-hidden="true" />
              <p className="mono-label relative text-ink-400">Experiment fingerprint / EXP-042</p>
              <div className="relative mt-8 grid gap-px overflow-hidden rounded-2xl bg-[rgba(138,36,75,0.12)] sm:grid-cols-2 lg:grid-cols-3">
                {FINGERPRINT.map((layer, i) =>
                <div key={layer.key} className="relative bg-white px-6 py-7">
                    <span className="mono-label text-ink-300">{String(i + 1).padStart(2, '0')}</span>
                    <p className="mono-label mt-3 text-crimson-600">{layer.key}</p>
                    <p className="mt-2 font-display text-[22px] font-semibold tracking-tight text-ink">{layer.value}</p>
                  </div>
                )}
              </div>
              <p className="relative mt-6 text-[12.5px] leading-relaxed text-ink-500">
                Change any layer and the result may change with it. Comparisons are only meaningful within a matching
                fingerprint.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10 — HUMAN OVERSIGHT */}
      <section
        aria-labelledby="oversight-heading"
        className="relative border-y border-[rgba(138,36,75,0.1)] bg-white/40 py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45"
          style={{ backgroundImage: `url(${IMAGES.oversight})` }} />
        <div aria-hidden="true" className="absolute inset-0 bg-white/55" />

        <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <SectionLabel index="10">Human oversight</SectionLabel>
            <h2
              id="oversight-heading"
              className="mt-5 font-display text-[clamp(28px,4.6vw,52px)] font-bold leading-[0.96] tracking-tightest text-ink">
              
              THE ENGINE SUPPORTS THE DECISION.
              <br />
              <span className="text-[#F63049]">THE TEAM OWNS IT.</span>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-500">
              Optivsa does not replace expert judgment. The platform helps teams evaluate evidence and constraints
              before selecting a configuration.
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
            <Reveal>
              <div className="h-full rounded-[22px] border border-[rgba(138,36,75,0.14)] bg-white/80 p-7">
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="h-4 w-4 text-[#D02752]" aria-hidden="true" />
                  <p className="mono-label text-ink-400">Engine</p>
                </div>
                <ul className="mt-6 space-y-3">
                  {['Evidence', 'Comparison', 'Analysis', 'Sensitivity'].map((item) =>
                  <li key={item} className="font-display text-[19px] font-semibold tracking-tight text-ink">
                      {item}
                    </li>
                  )}
                </ul>
              </div>
            </Reveal>

            <div className="flex items-center justify-center py-2 lg:py-0" aria-hidden="true">
              <svg viewBox="0 0 40 40" className="h-10 w-10 rotate-90 lg:rotate-0" fill="none">
                <path d="M2 20 H38" stroke="rgba(246,48,73,0.5)" strokeWidth="1" className="flow-line" />
                <path d="M32 14 L38 20 L32 26" stroke="rgba(246,48,73,0.7)" strokeWidth="1" />
              </svg>
            </div>

            <Reveal delay={0.08}>
              <div className="h-full rounded-[22px] border border-[rgba(246,48,73,0.35)] bg-white p-7 shadow-glass">
                <div className="flex items-center gap-3">
                  <UserCheckIcon className="h-4 w-4 text-[#F63049]" aria-hidden="true" />
                  <p className="mono-label text-crimson-600">Human</p>
                </div>
                <ul className="mt-6 space-y-3">
                  {['Review', 'Validation', 'Approval', 'Selection'].map((item) =>
                  <li key={item} className="font-display text-[19px] font-semibold tracking-tight text-ink">
                      {item}
                    </li>
                  )}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mt-4">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-[22px] border border-[rgba(138,36,75,0.14)] bg-white/70 px-7 py-6">
              <div>
                <p className="mono-label text-ink-400">Deployment</p>
                <p className="mt-2 font-display text-[19px] font-semibold tracking-tight text-ink">
                  Selected configuration
                </p>
              </div>
              <p className="max-w-md text-[13.5px] leading-relaxed text-ink-500">
                The configuration that reaches deployment is the one a named reviewer selected, with the evidence behind
                it recorded.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 11 — TECHNOLOGY ECOSYSTEM */}
      <section id="technology" aria-labelledby="tech-heading" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SectionLabel index="11">Technology ecosystem</SectionLabel>
              <h2
                id="tech-heading"
                className="mt-5 font-display text-[clamp(28px,4.6vw,52px)] font-bold leading-[0.96] tracking-tightest text-ink">
                
                BUILT AROUND
                <br />
                THE AI STACK.
              </h2>
            </div>
            <p className="max-w-md text-[14px] leading-relaxed text-ink-500">
              The categories below are <strong className="font-semibold text-ink">proposed integration options</strong>{' '}
              shown to describe the intended architecture. They do not indicate an official partnership, completed
              integration, certified compatibility, validated benchmark or affiliation with any vendor.
            </p>
          </div>

          <ul className="mt-14 divide-y divide-[rgba(138,36,75,0.12)] border-y border-[rgba(138,36,75,0.12)]">
            {TECHNOLOGIES.map((tech, i) =>
            <Reveal key={tech.name} delay={i * 0.05}>
                <li className="group flex flex-wrap items-center justify-between gap-4 py-7 transition-[padding] duration-200 ease-out hover:pl-3">
                  <div className="flex items-center gap-5">
                    <span className="mono-label text-ink-300">{String(i + 1).padStart(2, '0')}</span>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[rgba(138,36,75,0.14)] bg-white/70 text-[#D02752] transition-[border-color,background-color,color] duration-200 group-hover:border-[rgba(246,48,73,0.45)] group-hover:bg-[#F63049] group-hover:text-white">
                      <img
                        src={tech.image}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-contain p-1 transition-[filter] duration-200 group-hover:brightness-0 group-hover:invert" />
                    </span>
                    <span className="font-display text-[clamp(19px,3vw,32px)] font-semibold tracking-tight text-ink transition-colors duration-200 group-hover:text-crimson-600">
                      {tech.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[13.5px] text-ink-500">{tech.role}</span>
                    <span className="mono-label rounded-full border border-[rgba(138,36,75,0.16)] px-2.5 py-1 text-ink-400">
                      Proposed
                    </span>
                  </div>
                </li>
              </Reveal>
            )}
          </ul>
        </div>
      </section>

      {/* 12 — HORIZONTAL DECISION JOURNEY */}
      <section aria-label="The decision path" className="relative">
        <DecisionJourney />
      </section>

      {/* 13 — USE CASES */}
      <section aria-labelledby="usecase-heading" className="relative pb-24 pt-6 lg:pb-32 lg:pt-10">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45"
          style={{ backgroundImage: `url(${IMAGES.useCases})` }} />
        <div aria-hidden="true" className="absolute inset-0 bg-white/55" />

        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <SectionLabel index="13">Use cases</SectionLabel>
            <h2
              id="usecase-heading"
              className="mt-5 font-display text-[clamp(28px,4.6vw,52px)] font-bold leading-[0.96] tracking-tightest text-ink">
              
              WHO READS THE EVIDENCE.
            </h2>
          </div>
          <div className="mt-14">
            <UseCaseSelector />
          </div>
        </div>
      </section>

      {/* 14 — PRICING */}
      <section id="pricing" aria-labelledby="pricing-heading" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <SectionLabel index="14">Pricing</SectionLabel>
            <h2
              id="pricing-heading"
              className="mt-5 font-display text-[clamp(28px,4.6vw,52px)] font-bold leading-[0.96] tracking-tightest text-ink">
              
              PLANS BUILT AROUND STUDIES, NOT SEATS.
            </h2>
          </div>
          <div className="mt-12">
            <PricingSection />
          </div>
        </div>
      </section>

      {/* 15 — VOICES */}
      <section
        aria-labelledby="voices-heading"
        className="relative overflow-hidden border-y border-[rgba(138,36,75,0.14)] bg-[#FFF7F8] py-24 lg:py-28">
        
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <SectionLabel index="15">Voices from the work</SectionLabel>
              <h2
                id="voices-heading"
                className="mt-5 font-display text-[clamp(28px,4.6vw,52px)] font-bold leading-[0.96] tracking-tightest text-ink">
                
                VOICES FROM THE FIELD
              </h2>
            </div>
            <p className="max-w-sm text-[14px] leading-relaxed text-ink-500">
              ML engineers, MLOps leads, and platform teams use Optivsa to turn scattered benchmarks into decisions they can defend.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
            <TestimonialsMarquee />
          </div>
        </div>
      </section>

      {/* 16 — ENTERPRISE */}
      <section
        aria-labelledby="enterprise-heading"
        className="relative border-y border-[rgba(138,36,75,0.1)] bg-white/40 py-24 lg:py-32">
        
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <SectionLabel index="16">Enterprise</SectionLabel>
            <h2
              id="enterprise-heading"
              className="mt-5 font-display text-[clamp(28px,4.6vw,52px)] font-bold leading-[0.96] tracking-tightest text-ink">
              
              FROM EXPERIMENT TO DEPLOYMENT DECISION.
            </h2>
          </div>

          <Reveal className="mt-12">
            <figure className="relative overflow-hidden rounded-[24px] border border-[rgba(138,36,75,0.14)]">
              <img
                src={IMAGES.enterprise}
                alt="Modern white concrete technology building facade in warm light"
                loading="lazy"
                className="h-[180px] w-full object-cover sm:h-[260px]" />
              
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent" aria-hidden="true" />
              <figcaption className="absolute bottom-6 left-6 max-w-sm font-display text-[18px] font-semibold leading-snug tracking-tight text-ink">
                Decisions outlive the experiment that produced them.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="mt-14">
            <ol className="flex flex-col gap-3 lg:flex-row lg:items-center">
              {ENTERPRISE_FLOW.map((stage, i) =>
              <li key={stage} className="flex items-center gap-3 lg:flex-1">
                  <div className="flex-1 rounded-xl border border-[rgba(138,36,75,0.14)] bg-white/80 px-4 py-4 text-center">
                    <span className="mono-label text-ink-300">{String(i + 1).padStart(2, '0')}</span>
                    <p className="mt-2 font-display text-[13.5px] font-semibold leading-snug text-ink">{stage}</p>
                  </div>
                  {i < ENTERPRISE_FLOW.length - 1 &&
                <ArrowRightIcon
                  className="h-4 w-4 shrink-0 rotate-90 text-[rgba(246,48,73,0.55)] lg:rotate-0"
                  aria-hidden="true" />

                }
                </li>
              )}
            </ol>
          </Reveal>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[rgba(138,36,75,0.14)] bg-[rgba(138,36,75,0.12)] sm:grid-cols-2 lg:grid-cols-5">
            {GOVERNANCE.map((item) =>
            <div key={item.title} className="flex flex-col bg-white/85 px-5 py-6">
                <p className="font-display text-[15px] font-semibold text-ink">{item.title}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-500">{item.body}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 15 — DOCUMENTATION */}
      <section id="documentation" aria-labelledby="docs-heading" className="relative py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45"
          style={{ backgroundImage: `url(${IMAGES.documentation})` }} />
        <div aria-hidden="true" className="absolute inset-0 bg-white/55" />

        <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <SectionLabel index="17">Documentation</SectionLabel>
              <h2
                id="docs-heading"
                className="mt-5 font-display text-[clamp(28px,4.6vw,52px)] font-bold leading-[0.96] tracking-tightest text-ink">
                
                BUILD WITH THE DECISION LAYER.
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-500">
                Developer documentation is in preparation. The reference below describes what it will cover.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <MagneticButton variant="line" onClick={() => setDocsOpen(true)}>
                  <FileCodeIcon className="h-4 w-4" aria-hidden="true" />
                  Documentation coming soon
                </MagneticButton>
                <MagneticButton variant="ghost" onClick={() => scrollToSection('contact')}>
                  Ask for early access
                </MagneticButton>
              </div>
            </div>

            <ul className="grid gap-3">
              {DOC_TOPICS.map((topic, i) =>
              <Reveal key={topic.title} delay={i * 0.05}>
                  <li className="flex items-start justify-between gap-5 rounded-2xl border border-[rgba(138,36,75,0.12)] bg-white/70 px-5 py-5">
                    <div>
                      <p className="font-display text-[15px] font-semibold text-ink">{topic.title}</p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">{topic.body}</p>
                    </div>
                    <span className="mono-label shrink-0 rounded-full bg-[rgba(138,36,75,0.06)] px-2.5 py-1 text-ink-400">
                      Soon
                    </span>
                  </li>
                </Reveal>
              )}
            </ul>
          </div>
        </div>

        {docsOpen &&
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="docs-modal-heading"
          className="fixed inset-0 z-[115] grid place-items-center bg-[rgba(20,9,12,0.45)] px-5 backdrop-blur-sm"
          onClick={() => setDocsOpen(false)}>
          
            <motion.div
            initial={reduce ? undefined : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
            className="glass-strong w-full max-w-md rounded-[24px] p-7 shadow-panel"
            onClick={(e) => e.stopPropagation()}>
            
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mono-label text-crimson-600">Developer documentation</p>
                  <h3 id="docs-modal-heading" className="mt-3 font-display text-2xl font-bold tracking-tight text-ink">
                    Coming soon
                  </h3>
                </div>
                <button
                type="button"
                onClick={() => setDocsOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full border border-[rgba(138,36,75,0.18)] text-ink transition-colors duration-200 hover:border-[rgba(246,48,73,0.5)]">
                
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-ink-500">
                API references, metric schemas and runtime integration guides are being prepared. Contact us if you would
                like to be notified when they are published.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                type="button"
                onClick={() => {
                  setDocsOpen(false);
                  scrollToSection('contact');
                }}
                className="rounded-full bg-[#F63049] px-5 py-2.5 font-display text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#D02752]">
                
                  Contact us
                </button>
                <button
                type="button"
                onClick={() => setDocsOpen(false)}
                className="rounded-full border border-[rgba(138,36,75,0.2)] px-5 py-2.5 font-display text-[13px] font-semibold text-ink">
                
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        }
      </section>

      {/* 16 — COMPANY / TRUST */}
      <section
        id="about"
        aria-labelledby="company-heading"
        className="relative border-y border-[rgba(138,36,75,0.1)] bg-white/40 py-24 lg:py-32">
        
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
            <div>
              <SectionLabel index="18">Company</SectionLabel>
              <h2
                id="company-heading"
                className="mt-5 font-display text-[clamp(28px,4.6vw,52px)] font-bold leading-[0.96] tracking-tightest text-ink">
                
                CREDIBILITY THROUGH CLARITY.
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-500">
                Optivsa is an early-stage company. Rather than publishing customer claims we do not have, here is exactly
                who we are and where we operate.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(138,36,75,0.22)] bg-white/50 px-6 py-3 font-display text-[13px] font-semibold text-ink transition-colors duration-200 ease-out hover:border-[rgba(246,48,73,0.5)] hover:text-crimson-600">
                  
                  Learn about Optivsa
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </Link>
                <MagneticButton variant="ghost" onClick={() => scrollToSection('contact')}>
                  Contact us
                </MagneticButton>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[22px] border border-[rgba(138,36,75,0.14)] bg-white/80 p-7">
                <div className="grid gap-6 sm:grid-cols-3">
                  {[
                  ['Founder', SITE.founder],
                  ['Founded', SITE.founded],
                  ['Domain', SITE.domain]].
                  map(([label, value]) =>
                  <div key={label}>
                      <p className="mono-label text-ink-400">{label}</p>
                      <p className="mt-2 font-display text-[16px] font-semibold leading-snug text-ink">{value}</p>
                    </div>
                  )}
                </div>
              </div>

              {ENTITIES.map((entity) =>
              <div key={entity.legalName} className="rounded-[22px] border border-[rgba(138,36,75,0.14)] bg-white/70 p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-display text-[17px] font-semibold tracking-tight text-ink">{entity.legalName}</p>
                    <span className="mono-label rounded-full bg-[rgba(246,48,73,0.08)] px-2.5 py-1 text-crimson-600">
                      {entity.region}
                    </span>
                  </div>
                  <p className="mt-4 flex items-start gap-2 text-[14px] leading-relaxed text-ink-500">
                    <MapPinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-300" aria-hidden="true" />
                    {entity.address.join(', ')}
                  </p>
                  <a
                  href={entity.phoneHref}
                  className="mt-2 inline-flex items-center gap-2 text-[14px] text-ink transition-colors duration-200 hover:text-crimson-600">
                  
                    <PhoneIcon className="h-3.5 w-3.5 text-ink-300" aria-hidden="true" />
                    {entity.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 17 — CONTACT */}
      <section id="contact" aria-labelledby="contact-heading" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionLabel index="19">Contact</SectionLabel>
              <h2
                id="contact-heading"
                className="mt-5 font-display text-[clamp(28px,4.6vw,52px)] font-bold leading-[0.96] tracking-tightest text-ink">
                
                LET'S TALK ABOUT YOUR MODEL DECISIONS.
              </h2>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink-500">
                Designed for teams evaluating AI deployment decisions. Enterprise onboarding available.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href={`mailto:${SITE.contactEmail}`}
                  className="flex items-center gap-3 text-[14px] text-ink transition-colors duration-200 hover:text-crimson-600">
                  
                  <MailIcon className="h-4 w-4 text-ink-300" aria-hidden="true" />
                  {SITE.contactEmail}
                </a>
                {ENTITIES.map((entity) =>
                <div key={entity.code} className="border-t border-[rgba(138,36,75,0.12)] pt-4">
                    <p className="mono-label text-ink-400">{entity.region}</p>
                    <a
                    href={entity.phoneHref}
                    className="mt-1 block font-display text-[16px] font-semibold text-ink transition-colors duration-200 hover:text-crimson-600">
                    
                      {entity.phone}
                    </a>
                    <p className="mt-1 text-[13px] text-ink-400">{entity.address.join(', ')}</p>
                  </div>
                )}
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* 18 — CLOSING STATEMENT */}
      <section aria-label="Closing statement" className="relative overflow-hidden py-24 lg:py-36">
        <div className="mx-auto max-w-[1280px] px-5 text-center sm:px-8 lg:px-12">
          <Reveal>
            <p className="mono-label text-crimson-600">20 — Optivsa</p>
            <p className="mx-auto mt-8 max-w-4xl font-display text-[clamp(30px,6vw,72px)] font-bold leading-[0.94] tracking-tightest text-ink">
              COMPARE MODELS.
              <br />
              TEST CONFIGURATIONS.
              <br />
              <span className="text-[#F63049]">MAKE DECISIONS WITH EVIDENCE.</span>
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <MagneticButton onClick={() => scrollToSection('contact')}>
                Checkout
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(138,36,75,0.22)] px-6 py-3 font-display text-[13px] font-semibold text-ink transition-colors duration-200 hover:border-[rgba(246,48,73,0.5)] hover:text-crimson-600">
                
                About Optivsa
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>);

}