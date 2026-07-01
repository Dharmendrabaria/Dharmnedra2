import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook that returns animated counter value when element enters viewport.
 * Uses requestAnimationFrame instead of setInterval for smoother animation
 * and better frame synchronization.
 */
export const useCounter = (target, duration = 1500) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const startTime = performance.now();
          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic for smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(eased * target);

            setCount(value);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target); // Ensure exact final value
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
};
