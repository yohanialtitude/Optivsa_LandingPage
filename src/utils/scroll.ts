/** Smoothly scrolls a landing-page section into view, accounting for the floating dock. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const offset = window.innerWidth < 768 ? 84 : 104;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(top, 0), behavior: reduce ? 'auto' : 'smooth' });
}