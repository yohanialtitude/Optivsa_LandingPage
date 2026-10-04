import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { Seo } from '../components/Seo';
import { Reveal } from '../components/Reveal';
import { SectionLabel } from '../components/SectionLabel';
import { ENTITIES, SITE } from '../data/site';

const TIMELINE = [
{
  year: '2024',
  title: 'Company founded',
  body: 'Optivsa was founded on 7 February 2024 to work on model optimization and decision support.',
  state: 'Recorded'
},
{
  year: 'Next',
  title: 'Platform development',
  body: 'Model and experiment registry, optimization workspace and evidence views.',
  state: 'Future development'
},
{
  year: 'Next',
  title: 'Developer documentation',
  body: 'API references, metric schemas and runtime integration guides.',
  state: 'Future development'
},
{
  year: 'Next',
  title: 'Enterprise deployment options',
  body: 'Private deployment and integration services for larger engineering organizations.',
  state: 'Future development'
}];


export function AboutUs() {
  return (
    <>
      <Seo
        title="About Optivsa | AI Model Optimization & Decision Engine"
        description="Optivsa builds decision support for AI model selection. Company story, vision, mission, founder, legal entities and contact information."
        path="/about" />
      

      <section aria-labelledby="about-heading" className="relative pt-32 sm:pt-36 lg:pt-44">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <SectionLabel index="01">About Optivsa</SectionLabel>
          <h1
            id="about-heading"
            className="mt-6 max-w-4xl font-display text-[clamp(34px,6.6vw,78px)] font-bold leading-[0.93] tracking-tightest text-ink">
            
            BUILDING BETTER DECISIONS FOR <span className="text-[#F63049]">AI SYSTEMS.</span>
          </h1>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* Founder portrait area */}
            <Reveal>
              <figure className="relative mx-auto w-full max-w-md">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[26px] border border-[rgba(138,36,75,0.16)] bg-white/70">
                  <img
                    src="/Founder.png"
                    alt={`${SITE.founder}, founder of Optivsa`}
                    className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-[rgba(138,36,75,0.14)] bg-white/85 px-5 py-4 backdrop-blur">
                    <p className="mono-label text-ink-400">Founder</p>
                    <p className="mt-1 font-display text-[19px] font-bold tracking-tight text-ink">{SITE.founder}</p>
                  </div>
                </div>
                <figcaption className="mt-3 text-[12px] text-ink-400">
                  Founder portrait.
                </figcaption>
              </figure>
            </Reveal>

            <div className="space-y-10">
              <Reveal delay={0.06}>
                <div>
                  <p className="mono-label text-crimson-600">Company story</p>
                  <p className="mt-4 text-[16px] leading-relaxed text-ink-500">
                    Optivsa was founded on {SITE.founded}. The company works on a single problem: teams choose AI model
                    configurations without a clear, shared view of the evidence behind the choice. Benchmark results sit
                    in notebooks, environments differ, and the reasons behind a past decision are hard to recover.
                  </p>
                  <p className="mt-4 text-[16px] leading-relaxed text-ink-500">
                    The product is an optimization and decision-support layer. It organizes experiments, performance
                    evidence and operational constraints so a team can compare candidate configurations and record what
                    they selected, and why.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[rgba(138,36,75,0.14)] bg-white/75 p-6">
                    <p className="mono-label text-ink-400">Vision</p>
                    <p className="mt-3 font-display text-[17px] font-semibold leading-snug tracking-tight text-ink">
                      Model decisions should be readable long after they are made.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[rgba(246,48,73,0.3)] bg-white p-6 shadow-glass">
                    <p className="mono-label text-crimson-600">Mission</p>
                    <p className="mt-3 font-display text-[17px] font-semibold leading-snug tracking-tight text-ink">
                      Give AI teams evidence, constraints and trade-offs in one place — and leave the decision with the
                      team.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="rounded-2xl border border-[rgba(138,36,75,0.14)] bg-white/60 p-6">
                  <p className="mono-label text-ink-400">What we do not claim</p>
                  <ul className="mt-4 space-y-2 text-[14px] leading-relaxed text-ink-500">
                    <li>Optivsa does not claim to find a globally optimal model.</li>
                    <li>Benchmark results are specific to the environment they were measured in.</li>
                    <li>Recommendations are decision-support evidence, reviewed by people.</li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section aria-labelledby="timeline-heading" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
          <SectionLabel index="02">Company timeline</SectionLabel>
          <h2
            id="timeline-heading"
            className="mt-5 max-w-2xl font-display text-[clamp(26px,4.4vw,48px)] font-bold leading-[0.97] tracking-tightest text-ink">
            
            WHAT HAS HAPPENED, AND WHAT IS PLANNED.
          </h2>

          <ol className="mt-14 relative">
            {TIMELINE.map((entry, i) =>
            <Reveal key={entry.title} delay={i * 0.06}>
                <li className="relative grid gap-4 border-t border-[rgba(138,36,75,0.14)] py-8 sm:grid-cols-[120px_1fr_160px] sm:items-baseline">
                  <p className="font-display text-[22px] font-bold tracking-tight text-ink">{entry.year}</p>
                  <div>
                    <p className="font-display text-[17px] font-semibold text-ink">{entry.title}</p>
                    <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-ink-500">{entry.body}</p>
                  </div>
                  <span
                  className={`mono-label justify-self-start rounded-full px-3 py-1 sm:justify-self-end ${
                  entry.state === 'Recorded' ?
                  'bg-[rgba(246,48,73,0.09)] text-crimson-600' :
                  'bg-[rgba(138,36,75,0.06)] text-ink-400'}`
                  }>
                  
                    {entry.state}
                  </span>
                </li>
              </Reveal>
            )}
          </ol>
          <p className="mt-4 text-[12.5px] text-ink-400">
            Only the founding date is a recorded historical milestone. Later entries are planned work.
          </p>
        </div>
      </section>

      {/* Identity + entities + locations */}
      <section
        aria-labelledby="identity-heading"
        className="relative border-y border-[rgba(138,36,75,0.1)] bg-white/40 py-24 lg:py-32">
        
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionLabel index="03">Company identity</SectionLabel>
              <h2
                id="identity-heading"
                className="mt-5 font-display text-[clamp(26px,4.4vw,48px)] font-bold leading-[0.97] tracking-tightest text-ink">
                
                TWO ENTITIES.
                <br />
                TWO LOCATIONS.
              </h2>
              <dl className="mt-8 space-y-4">
                {[
                ['Business name', SITE.name],
                ['Product', SITE.product],
                ['Founder', SITE.founder],
                ['Founded', SITE.founded],
                ['Website', SITE.domain]].
                map(([term, value]) =>
                <div key={term} className="flex items-baseline justify-between gap-6 border-b border-[rgba(138,36,75,0.12)] pb-3">
                    <dt className="mono-label text-ink-400">{term}</dt>
                    <dd className="text-right font-display text-[15px] font-semibold text-ink">{value}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {ENTITIES.map((entity) =>
              <Reveal key={entity.legalName}>
                  <article className="flex h-full flex-col rounded-[22px] border border-[rgba(138,36,75,0.14)] bg-white/80 p-7">
                    <div className="flex items-center justify-between">
                      <span className="mono-label rounded-full bg-[rgba(246,48,73,0.08)] px-2.5 py-1 text-crimson-600">
                        {entity.code}
                      </span>
                      <span className="mono-label text-ink-300">Presence point</span>
                    </div>

                    {entity.code === 'LK' ?
                    <div className="relative mt-6 h-28 overflow-hidden rounded-xl border border-[rgba(138,36,75,0.12)] bg-white">
                      <iframe
                        title="Optivsa Sri Lanka location in Nugegoda"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26077.95414761468!2d79.88506004206207!3d6.86561901049752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25a7a9577b535%3A0x62e4b0a7bd678e33!2sNugegoda!5e1!3m2!1sen!2slk!4v1789032894725!5m2!1sen!2slk"
                        className="h-full w-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin" />
                    </div> :
                    <div className="relative mt-6 h-28 overflow-hidden rounded-xl border border-[rgba(138,36,75,0.12)] bg-white">
                      <iframe
                        title="Optivsa United States location in Los Angeles"
                        src="https://www.google.com/maps?q=1212+Wilshire+Blvd,+Los+Angeles,+CA+90017,+USA&output=embed"
                        className="h-full w-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin" />
                    </div>}

                    <h3 className="mt-6 font-display text-[17px] font-semibold leading-snug tracking-tight text-ink">
                      {entity.legalName}
                    </h3>
                    <p className="mt-3 flex items-start gap-2 text-[13.5px] leading-relaxed text-ink-500">
                      <MapPinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-300" aria-hidden="true" />
                      {entity.address.join(', ')}
                    </p>
                    <a
                    href={entity.phoneHref}
                    className="mt-auto inline-flex items-center gap-2 pt-5 text-[14px] text-ink transition-colors duration-200 hover:text-crimson-600">
                    
                      <PhoneIcon className="h-3.5 w-3.5 text-ink-300" aria-hidden="true" />
                      {entity.phone}
                    </a>
                  </article>
                </Reveal>
              )}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4 rounded-[22px] border border-[rgba(138,36,75,0.14)] bg-white/70 px-7 py-6">
            <p className="flex-1 font-display text-[17px] font-semibold tracking-tight text-ink">
              Want to talk through a model decision?
            </p>
            <Link
              to="/"
              state={{ scrollTo: 'contact' }}
              className="inline-flex items-center gap-2 rounded-full bg-[#F63049] px-6 py-3 font-display text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#D02752]">
              
              Contact us
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>);

}