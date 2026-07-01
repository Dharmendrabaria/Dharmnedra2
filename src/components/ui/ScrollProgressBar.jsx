import React, { memo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgressBar — uses Framer Motion values directly, zero React state.
 * Spring config tuned for minimal CPU: higher restDelta = stops sooner.
 */
const ScrollProgressBar = memo(() => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.005 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #2563EB, #7C3AED, #06B6D4)',
        willChange: 'transform',
      }}
    />
  );
});
ScrollProgressBar.displayName = 'ScrollProgressBar';

export default ScrollProgressBar;
