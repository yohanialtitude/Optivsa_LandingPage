import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function PageTransition({ children }: {children: React.ReactNode;}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
      
      {children}
    </motion.div>);

}