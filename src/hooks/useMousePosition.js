import { useEffect } from 'react';
import { useMotionValue } from 'framer-motion';

/**
 * Returns Framer Motion motion values for mouse X/Y — zero React re-renders.
 * Use these with `useTransform` or `style` prop directly.
 */
export const useMousePosition = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xNorm = useMotionValue(0);
  const yNorm = useMotionValue(0);

  useEffect(() => {
    const handler = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      xNorm.set((e.clientX / window.innerWidth) * 2 - 1);
      yNorm.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [x, y, xNorm, yNorm]);

  return { x, y, xNorm, yNorm };
};
