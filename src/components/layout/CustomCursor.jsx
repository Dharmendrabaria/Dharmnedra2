import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CustomCursor — uses motion values + springs, zero state re-renders.
 */
const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const isHovered = useRef(false);

  // Spring-smoothed positions for the outer ring (laggy feel = intentional)
  const springConfig = { stiffness: 200, damping: 20, mass: 0.3 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  // Faster spring for inner dot
  const dotConfig = { stiffness: 800, damping: 40, mass: 0.1 };
  const dotX = useSpring(cursorX, dotConfig);
  const dotY = useSpring(cursorY, dotConfig);

  // Ring size motion values
  const ringSize = useMotionValue(32);
  const dotOpacity = useMotionValue(1);
  const ringBorderColor = useMotionValue('rgba(37,99,235,0.9)');

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onOver = (e) => {
      const el = e.target.closest('a, button, [data-cursor="pointer"], input, textarea, select');
      if (el && !isHovered.current) {
        isHovered.current = true;
        ringSize.set(48);
        dotOpacity.set(0);
        ringBorderColor.set('rgba(124,58,237,0.9)');
      } else if (!el && isHovered.current) {
        isHovered.current = false;
        ringSize.set(32);
        dotOpacity.set(1);
        ringBorderColor.set('rgba(37,99,235,0.9)');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [cursorX, cursorY, ringSize, dotOpacity, ringBorderColor]);

  // Don't render on touch
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <div className="hidden md:block">
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: '-50%',
          translateY: '-50%',
          border: '1.5px solid',
          borderColor: ringBorderColor,
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          width: 8,
          height: 8,
          translateX: '-50%',
          translateY: '-50%',
          opacity: dotOpacity,
        }}
      />
    </div>
  );
};

export default CustomCursor;
