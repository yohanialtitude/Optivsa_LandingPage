import React from 'react';
import { QuoteIcon } from 'lucide-react';

type Voice = {
  quote: string;
  name: string;
  role: string;
};

const VOICES: Voice[] = [
{
  quote: 'Optivsa turned our messy benchmark spreadsheets into a decision we could actually defend to leadership.',
  name: 'Maria Chen',
  role: 'ML Platform Lead'
},
{
  quote: 'We finally compare latency, cost, and quality in one place instead of three different notebooks.',
  name: 'Devon Okafor',
  role: 'MLOps Engineer'
},
{
  quote: 'The explainable recommendations are what sold our team — no more black-box scores.',
  name: 'Priya Raman',
  role: 'AI Product Manager'
},
{
  quote: 'Reproducibility used to be our biggest gap. Optivsa closed it in weeks.',
  name: 'Tom Bergström',
  role: 'Inference Engineer'
},
{
  quote: "It's the first tool that treats model selection as a decision, not a guess.",
  name: 'Aisha Bello',
  role: 'Data Science Lead'
},
{
  quote: 'Our hardware and runtime trade-offs are finally visible before we deploy, not after.',
  name: 'Lucas Ferreira',
  role: 'Cloud Infrastructure Architect'
},
{
  quote: 'Optivsa gave our reviewers evidence instead of vibes. That changed everything.',
  name: 'Nadia Kowalski',
  role: 'Enterprise AI Lead'
},
{
  quote: 'Multi-objective evaluation sounds complex — Optivsa makes it genuinely simple to use.',
  name: 'Ethan Cole',
  role: 'Research Engineer'
}];


function VoiceCard({ voice }: {voice: Voice;}) {
  return (
    <article className="flex w-[300px] shrink-0 flex-col rounded-[22px] border border-[rgba(138,36,75,0.14)] bg-white/80 p-6 sm:w-[380px]">
      <QuoteIcon className="h-5 w-5 text-[rgba(246,48,73,0.55)]" aria-hidden="true" />
      <p className="mt-4 flex-1 font-display text-[16px] font-medium leading-snug tracking-tight text-ink">
        “{voice.quote}”
      </p>
      <div className="mt-6 flex items-center justify-between border-t border-[rgba(138,36,75,0.12)] pt-4">
        <span className="mono-label text-crimson-600">{voice.name}</span>
        <span className="mono-label text-ink-300">{voice.role}</span>
      </div>
    </article>);

}

/** Auto-scrolling horizontal band of practitioner voices. Pauses on hover and focus. */
export function TestimonialsMarquee() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#FFF7F8] to-transparent sm:w-28" />
      
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#FFF7F8] to-transparent sm:w-28" />
      

      <div className="marquee overflow-hidden py-2">
        <div className="marquee-track flex gap-5">
          {VOICES.map((voice) =>
          <VoiceCard key={voice.quote} voice={voice} />
          )}
          {VOICES.map((voice) =>
          <div key={`dup-${voice.quote}`} aria-hidden="true" className="flex">
              <VoiceCard voice={voice} />
            </div>
          )}
        </div>
      </div>

      <div className="marquee mt-5 overflow-hidden py-2">
        <div className="marquee-track marquee-reverse flex gap-5">
          {[...VOICES].reverse().map((voice) =>
          <VoiceCard key={`r-${voice.quote}`} voice={voice} />
          )}
          {[...VOICES].reverse().map((voice) =>
          <div key={`rdup-${voice.quote}`} aria-hidden="true" className="flex">
              <VoiceCard voice={voice} />
            </div>
          )}
        </div>
      </div>
    </div>);

}