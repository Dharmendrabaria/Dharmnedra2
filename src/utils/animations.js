// ─── Animation Variants ────────────────────────────────────────────────────

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
};

/**
 * blurIn — removed filter:blur() animation (triggers full repaint every frame).
 * Replaced with opacity + y + subtle scale for an equivalent soft-focus effect.
 */
export const blurIn = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const clipReveal = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
  },
};

export const rotateIn = {
  hidden: { opacity: 0, rotate: -10, scale: 0.9 },
  show: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

export const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 25,
  mass: 0.5,
};

export const smoothTransition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1],
};
