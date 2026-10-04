import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.4 });

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[110] h-[2px]">
      <motion.div
        className="h-full origin-left"
        style={{ scaleX, background: 'linear-gradient(90deg, #8A244B 0%, #D02752 45%, #F63049 100%)' }} />
      
    </div>);

}