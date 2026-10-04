import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { LinkedinIcon, YoutubeIcon, FacebookIcon, ArrowUpRightIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { ENTITIES, SITE, SOCIALS } from '../data/site';
import { MediumGlyph } from './BrandGlyphs';
import { scrollToSection } from '../utils/scroll';

const socialIcons: Record<string, React.ComponentType<{className?: string;}>> = {
  LinkedIn: LinkedinIcon,
  YouTube: YoutubeIcon,
  Facebook: FacebookIcon,
  Medium: MediumGlyph
};

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const reduce = useReducedMotion();

  const goSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    scrollToSection(id);
  };

  const productLinks = [
  { label: 'Platform', id: 'platform' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Evidence', id: 'evidence' },
  { label: 'Technology', id: 'technology' },
  { label: 'Documentation', id: 'documentation' }];


  return (
    <footer className="relative overflow-hidden bg-[#14090C] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.4]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
            'radial-gradient(900px 420px at 12% 0%, rgba(246,48,73,0.28), transparent 60%), radial-gradient(700px 400px at 90% 30%, rgba(138,36,75,0.35), transparent 65%)'
          }} />
        
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 700" fill="none" preserveAspectRatio="none">
          <path d="M0 120 C 400 40, 900 240, 1440 100" stroke="rgba(246,48,73,0.45)" strokeWidth="1" className="flow-line-slow" />
          <path d="M0 420 C 380 520, 1000 300, 1440 460" stroke="rgba(255,255,255,0.12)" strokeWidth="1" className="flow-line-slow" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 pt-20 sm:px-8 lg:px-12">
        <p className="mono-label text-crimson-300">Closing statement</p>
        <motion.h2
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mt-4 font-display text-[13vw] font-bold leading-[0.86] tracking-tightest sm:text-[9vw] lg:text-[104px]">
          
          MAKE THE
          <br />
          <span className="text-[#F63049]">DECISION</span> VISIBLE.
        </motion.h2>
      </div>

      <div className="relative mx-auto mt-16 max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 border-t border-white/10 pt-12 lg:grid-cols-[1.15fr_2fr]">
          <div>
            <p className="font-display text-2xl font-bold tracking-tightest">OPTIVSA</p>
            <p className="mono-label mt-2 text-white/45">AI model optimization &amp; decision engine</p>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/75">
              Optivsa turns scattered AI benchmarks into evidence-backed decisions — comparing accuracy, latency, and cost so teams choose configurations with confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {SOCIALS.map((social) => {
                const Icon = socialIcons[social.label] || MediumGlyph;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${social.label} — platform homepage (official Optivsa profile not yet published)`}
                    className="group relative grid h-14 w-14 place-items-center overflow-hidden rounded-2xl border border-white/[0.12] transition-[border-color,transform] duration-200 ease-out hover:-translate-y-1 hover:border-[rgba(246,48,73,0.7)]">
                    
                    <span className="absolute inset-0 translate-y-full bg-[#F63049] transition-transform duration-200 ease-out group-hover:translate-y-0" />
                    <Icon className="relative h-5 w-5 text-white/70 transition-colors duration-200 group-hover:text-white" />
                  </a>);

              })}
            </div>
            <p className="mt-3 max-w-xs text-[11px] leading-relaxed text-white/35">
              Social destinations are configurable in one place. Until official profiles are published, these open the
              relevant platform homepage.
            </p>
          </div>

          <div className="grid gap-10">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <p className="mono-label text-white/40">Product</p>
                <ul className="mt-4 space-y-2.5">
                  {productLinks.map((item) =>
                  <li key={item.id}>
                      <button
                      type="button"
                      onClick={() => goSection(item.id)}
                      className="group inline-flex items-center gap-1.5 text-[14px] text-white/70 transition-colors duration-200 hover:text-white">
                      
                        {item.label}
                        <ArrowUpRightIcon className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      </button>
                    </li>
                  )}
                  <li>
                    <Link to="/product" className="text-[14px] text-white/70 transition-colors duration-200 hover:text-white">
                      Product page
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="mono-label text-white/40">Company</p>
                <ul className="mt-4 space-y-2.5">
                  <li>
                    <button
                      type="button"
                      onClick={() => goSection('home')}
                      className="text-[14px] text-white/70 transition-colors duration-200 hover:text-white">
                      
                      Home
                    </button>
                  </li>
                  <li>
                    <Link to="/about" className="text-[14px] text-white/70 transition-colors duration-200 hover:text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => goSection('contact')}
                      className="text-[14px] text-white/70 transition-colors duration-200 hover:text-white">
                      
                      Contact
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => goSection('pricing')}
                      className="text-[14px] text-white/70 transition-colors duration-200 hover:text-white">
                      
                      Pricing
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <p className="mono-label text-white/40">Legal</p>
                <ul className="mt-4 space-y-2.5">
                  <li>
                    <Link to="/privacy" className="text-[14px] text-white/70 transition-colors duration-200 hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-[14px] text-white/70 transition-colors duration-200 hover:text-white">
                      Terms &amp; Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <p className="mono-label text-white/40">Company entities</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {ENTITIES.map((entity) =>
                <div key={entity.legalName} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="mono-label text-[#F96A7E]">{entity.code}</p>
                    <p className="mt-2 font-display text-[15px] font-semibold leading-snug">{entity.legalName}</p>
                    <p className="mt-1 text-[13px] text-white/50">{entity.region}</p>
                    <div className="mt-4 flex items-start gap-2 text-[13px] leading-relaxed text-white/60">
                      <MapPinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/35" aria-hidden="true" />
                      <span>{entity.address.join(', ')}</span>
                    </div>
                    <a
                    href={entity.phoneHref}
                    className="mt-3 inline-flex items-center gap-2 text-[13px] text-white/75 transition-colors duration-200 hover:text-white">
                    
                      <PhoneIcon className="h-3.5 w-3.5 text-white/35" aria-hidden="true" />
                      {entity.phone}
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-3 rounded-2xl border border-white/10 px-5 py-4">
                <div>
                  <p className="mono-label text-white/40">Founded</p>
                  <p className="mt-1 font-display text-[14px]">{SITE.founded}</p>
                </div>
                <div>
                  <p className="mono-label text-white/40">Founder</p>
                  <p className="mt-1 font-display text-[14px]">{SITE.founder}</p>
                </div>
                <div>
                  <p className="mono-label text-white/40">Domain</p>
                  <p className="mt-1 font-display text-[14px]">{SITE.domain}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-16 overflow-hidden border-t border-white/10 px-5 pb-8 pt-10 sm:px-8 lg:px-12">

        <div className="mx-auto mt-6 flex max-w-[1280px] flex-col gap-2 text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Optivsa Digital Solutions (Pvt) Ltd &amp; Optivsa Technologies LLC.
          </p>
          <p className="mono-label text-white/25">Decision support · Not a guarantee of optimality</p>
        </div>
      </div>
    </footer>);

}