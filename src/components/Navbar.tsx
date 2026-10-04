import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MenuIcon, XIcon, ArrowUpRightIcon } from 'lucide-react';
import { NAV_SECTIONS } from '../data/site';
import { scrollToSection } from '../utils/scroll';

/** OPTIVSA COMMAND DOCK — floating dock with scroll-spy driven signal indicator. */
export function Navbar() {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const onLanding = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!onLanding) return;
    const els = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.
        filter((e) => e.isIntersecting).
        sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.01, 0.2, 0.5] }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onLanding, location.pathname]);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setActive(id);
    if (!onLanding) {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    scrollToSection(id);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:shadow-lift">
        
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-[100] flex justify-end px-3 pt-3 sm:px-6 sm:pt-5">
        <nav
          aria-label="Primary"
          className={`glass-strong flex w-full max-w-[1180px] items-center gap-2 rounded-[22px] pl-[124px] transition-[padding,box-shadow] duration-200 ease-out xl:w-auto xl:max-w-none xl:pl-3 ${
          condensed ? 'px-3 py-2 shadow-glass sm:px-4' : 'px-3 py-3 sm:px-5'}`
          }>
          
          <ul className="hidden flex-none items-center gap-0.5 pl-2 xl:flex">
            {NAV_SECTIONS.map((section) => {
              const isActive = onLanding && active === section.id;
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => go(section.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className="relative rounded-full px-3.5 py-2 font-display text-[12.5px] font-medium">
                    
                    {isActive && !reduce &&
                    <motion.span
                      layoutId="dock-signal"
                      className="absolute inset-0 rounded-full bg-[rgba(246,48,73,0.10)] ring-1 ring-[rgba(246,48,73,0.28)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.6 }} />

                    }
                    <span
                      className={`relative z-10 transition-colors duration-200 ${
                      isActive ? 'text-crimson-600' : 'text-ink-500 hover:text-ink'}`
                      }>
                      
                      {section.label}
                    </span>
                  </button>
                </li>);

            })}
          </ul>

          <div className="ml-auto flex items-center gap-2">
            {location.pathname === '/product' ?
            <a
              href="https://portal.optivsa.net"
              target="_blank"
              rel="noreferrer"
              aria-label="Open the Optivsa portal"
              className="group relative hidden items-center gap-2 bg-[#F63049] py-2.5 pl-5 pr-4 font-display text-[12.5px] font-semibold text-white transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#D02752] sm:inline-flex"
              style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}>
              <span className="h-1.5 w-1.5 rotate-45 bg-white/70 transition-transform duration-200 group-hover:rotate-[135deg]" aria-hidden="true" />
              Optivsa Prism V1.0
              <ArrowUpRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </a> :
            <Link
              to="/product"
              aria-label="Open the product page"
              className="group relative hidden items-center gap-2 bg-[#F63049] py-2.5 pl-5 pr-4 font-display text-[12.5px] font-semibold text-white transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#D02752] sm:inline-flex"
              style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}>
              <span className="h-1.5 w-1.5 rotate-45 bg-white/70 transition-transform duration-200 group-hover:rotate-[135deg]" aria-hidden="true" />
              Optivsa Prism V1.0
              <ArrowUpRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="command-dock-panel"
              className="grid h-9 w-9 place-items-center rounded-full border border-[rgba(138,36,75,0.18)] text-ink transition-colors duration-200 hover:border-[rgba(246,48,73,0.45)] xl:hidden">
              
              {open ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
              <span className="sr-only">{open ? 'Close navigation' : 'Open navigation'}</span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open &&
        <motion.div
          id="command-dock-panel"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-x-3 top-[76px] z-[99] xl:hidden">
          
            <div className="glass-strong max-h-[76vh] overflow-y-auto rounded-[22px] p-3 shadow-panel">
              <p className="mono-label px-2 pb-2 text-ink-400">Command dock</p>
              <ul className="grid gap-1">
                {NAV_SECTIONS.map((section, i) =>
              <li key={section.id}>
                    <button
                  type="button"
                  onClick={() => go(section.id)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left font-display text-[15px] font-medium transition-colors duration-200 ${
                  onLanding && active === section.id ?
                  'bg-[rgba(246,48,73,0.09)] text-crimson-600' :
                  'text-ink hover:bg-[rgba(138,36,75,0.05)]'}`
                  }>
                  
                      {section.label}
                      <span className="mono-label text-ink-300">{String(i + 1).padStart(2, '0')}</span>
                    </button>
                  </li>
              )}
              </ul>
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-[rgba(138,36,75,0.1)] pt-3">
                <Link
                to="/about"
                className="rounded-2xl border border-[rgba(138,36,75,0.16)] px-4 py-3 text-center font-display text-[13px] font-medium text-ink">
                
                  About page
                </Link>
                <Link
                to="/product"
                className="bg-[#F63049] px-4 py-3 text-center font-display text-[13px] font-semibold text-white"
                style={{
                  clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)'
                }}>
                
                  Product
                </Link>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}