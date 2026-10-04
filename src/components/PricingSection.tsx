import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckIcon, LayersIcon, GaugeIcon, BuildingIcon, ArrowRightIcon } from 'lucide-react';
import { scrollToSection } from '../utils/scroll';

type Plan = {
  id: string;
  name: string;
  icon: React.ComponentType<{className?: string;}>;
  monthly: number | null;
  annual: number | null;
  monthlyUrl?: string;
  annualUrl?: string;
  summary: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
{
  id: 'core',
  name: 'Core',
  icon: LayersIcon,
  monthly: 99,
  annual: 79,
  monthlyUrl: 'https://buy.stripe.com/test_4gM8wJ8zhcQP5u8beN33W00',
  annualUrl: 'https://buy.stripe.com/test_3cIaER6r9bML5u8ciR33W02',
  summary: 'For small teams beginning structured optimization.',
  features: [
  'Model & experiment registry (limited models)',
  'Up to 3 active optimization studies',
  'Multi-objective evaluation framework',
  'Benchmark evidence comparison views',
  'Standard runtime & hardware profiles',
  'Email support'],

  cta: 'Checkout'
},
{
  id: 'pro',
  name: 'Pro',
  icon: GaugeIcon,
  monthly: 349,
  annual: 279,
  monthlyUrl: 'https://buy.stripe.com/test_9B6bIVg1J8Az4q4fv333W01',
  annualUrl: 'https://buy.stripe.com/test_00w7sF5n59EDe0EeqZ33W03',
  summary: 'For growing ML and MLOps teams.',
  features: [
  'Expanded model & experiment registry',
  'Unlimited optimization studies',
  'Explainable recommendation views',
  'Trade-off & sensitivity analysis',
  'Runtime and hardware compatibility context',
  'Decision history & ownership tracking',
  'API access',
  'Priority support'],

  cta: 'Checkout',
  featured: true
},
{
  id: 'enterprise',
  name: 'Enterprise',
  icon: BuildingIcon,
  monthly: null,
  annual: null,
  summary: 'For organizations scaling AI decision infrastructure.',
  features: [
  'Full platform access across teams',
  'Advanced decision-analysis modules',
  'Private deployment options',
  'Usage-based optimization runs at scale',
  'Custom constraint & approval policies',
  'Dedicated model operations dashboard',
  'Professional benchmarking & integration services',
  'Dedicated account manager & SLA support'],

  cta: 'Talk to us'
}];


/** Pricing with a monthly / annual billing toggle. */
export function PricingSection() {
  const [annual, setAnnual] = useState(true);
  const reduce = useReducedMotion();

  return (
    <div>
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-[14px] leading-relaxed text-ink-500">
          Indicative plans for the platform in development. Final pricing is confirmed during onboarding.
        </p>

        <div
          role="group"
          aria-label="Billing period"
          className="relative flex items-center gap-1 rounded-full border border-[rgba(138,36,75,0.16)] bg-white/70 p-1">
          
          {[
          { id: 'monthly', label: 'Monthly' },
          { id: 'annual', label: 'Annual' }].
          map((option) => {
            const isActive = option.id === 'annual' === annual;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setAnnual(option.id === 'annual')}
                aria-pressed={isActive}
                className="relative rounded-full px-5 py-2 font-display text-[13px] font-semibold">
                
                {isActive &&
                <motion.span
                  layoutId="billing-pill"
                  className="absolute inset-0 rounded-full bg-[#F63049]"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }} />

                }
                <span className={`relative z-10 ${isActive ? 'text-white' : 'text-ink-500'}`}>{option.label}</span>
              </button>);

          })}
          <span className="mono-label ml-2 mr-3 hidden text-crimson-600 sm:inline">Save ~17%</span>
        </div>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {PLANS.map((plan, i) => {
          const Icon = plan.icon;
          const price = annual ? plan.annual : plan.monthly;
          const checkoutUrl = annual ? plan.annualUrl : plan.monthlyUrl;
          return (
            <motion.article
              key={plan.id}
              initial={reduce ? undefined : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
              className={`relative flex flex-col overflow-hidden rounded-[24px] border p-7 ${
              plan.featured ?
              'border-[rgba(246,48,73,0.45)] bg-white shadow-panel lg:-mt-6 lg:mb-6' :
              'border-[rgba(138,36,75,0.14)] bg-white/70'}`
              }>
              
              {plan.featured &&
              <span className="mono-label absolute right-5 top-5 rounded-full bg-[#F63049] px-2.5 py-1 text-white">
                  Most complete
                </span>
              }

              <span
                className={`grid h-11 w-11 place-items-center rounded-2xl ${
                plan.featured ? 'bg-[#F63049] text-white' : 'bg-[rgba(138,36,75,0.07)] text-[#8A244B]'}`
                }>
                
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>

              <h3 className="mt-5 font-display text-[22px] font-bold tracking-tight text-ink">{plan.name}</h3>
              <p className="mt-2 min-h-[42px] text-[13.5px] leading-relaxed text-ink-500">{plan.summary}</p>

              <div className="mt-6 flex items-end gap-2 border-y border-[rgba(138,36,75,0.12)] py-5">
                {price === null ?
                <span className="font-display text-[34px] font-bold tracking-tightest text-ink">Custom</span> :

                <>
                    <span className="font-display text-[38px] font-bold leading-none tracking-tightest text-ink">
                      ${price}
                    </span>
                    <span className="mono-label pb-1.5 text-ink-400">/ month{annual ? ', billed yearly' : ''}</span>
                  </>
                }
              </div>

              <ul className="mt-6 space-y-2.5">
                {plan.features.map((feature) =>
                <li key={feature} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-ink-500">
                    <CheckIcon
                    className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${plan.featured ? 'text-[#F63049]' : 'text-[#D02752]'}`}
                    aria-hidden="true" />
                  
                    {feature}
                  </li>
                )}
              </ul>

              {checkoutUrl ?
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noreferrer"
                className={`mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 pt-3 font-display text-[13px] font-semibold transition-colors duration-200 ease-out ${
                plan.featured ?
                'bg-[#F63049] text-white hover:bg-[#D02752]' :
                'border border-[rgba(138,36,75,0.22)] text-ink hover:border-[rgba(246,48,73,0.5)] hover:text-crimson-600'}`
                }
                style={{ marginTop: 28 }}>
                
                {plan.cta}
                <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </a> :
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className={`mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 pt-3 font-display text-[13px] font-semibold transition-colors duration-200 ease-out ${
                plan.featured ?
                'bg-[#F63049] text-white hover:bg-[#D02752]' :
                'border border-[rgba(138,36,75,0.22)] text-ink hover:border-[rgba(246,48,73,0.5)] hover:text-crimson-600'}`
                }
                style={{ marginTop: 28 }}>
                {plan.cta}
                <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </button>}
            </motion.article>);

        })}
      </div>

      <p className="mt-6 text-[12px] text-ink-400">
        Prices are indicative and shown in USD. They do not include taxes and are not a binding offer.
      </p>
    </div>);

}