import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_SEQUENCE = [
  { text: 'Initializing developer profile...', delay: 0, color: 'text-gray-500' },
  { text: '✓ React engine loaded', delay: 350, color: 'text-green-400' },
  { text: '✓ Node.js server connected', delay: 650, color: 'text-green-400' },
  { text: '✓ MongoDB database synced', delay: 900, color: 'text-green-400' },
  { text: '✓ GSAP animations compiled', delay: 1100, color: 'text-green-400' },
  { text: 'Compiling creativity...', delay: 1300, color: 'text-yellow-400' },
  { text: '✓ Design system initialized', delay: 1550, color: 'text-green-400' },
  { text: 'Deploying portfolio...', delay: 1750, color: 'text-blue-400' },
  { text: '✓ Ready. Welcome.', delay: 2050, color: 'text-primary font-semibold' },
];

const Preloader = memo(({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers = [];

    BOOT_SEQUENCE.forEach((item) => {
      timers.push(setTimeout(() => {
        setLines(prev => [...prev, item]);
      }, item.delay));
    });

    // Smooth progress bar
    const start = performance.now();
    const totalDuration = 2200;
    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(Math.floor(pct));
      if (pct < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Trigger exit
    timers.push(setTimeout(() => setDone(true), 2350));
    timers.push(setTimeout(() => onComplete(), 3100));

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-[#080808] flex flex-col items-center justify-center overflow-hidden"
      animate={done ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/8 blur-[140px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-secondary/6 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-lg px-8 z-10">
        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 mb-3 px-1">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="text-gray-600 text-xs font-jetbrains ml-2">~/portfolio — boot sequence</span>
          </div>

          <div className="glass-premium rounded-2xl p-6 border border-white/8">
            {/* Boot lines */}
            <div className="font-jetbrains text-sm space-y-1.5 min-h-[220px]">
              <AnimatePresence>
                {lines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={line.color}
                  >
                    {line.text}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Blinking cursor — only shown while typing */}
              {!done && lines.length < BOOT_SEQUENCE.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  className="inline-block w-2 h-[1.1em] bg-primary align-middle"
                />
              )}
            </div>

            {/* Progress bar */}
            <div className="mt-6 pt-5 border-t border-white/5">
              <div className="flex justify-between text-xs mb-2 font-jetbrains">
                <span className="text-gray-600">dharmendrabaria/portfolio</span>
                <span className="text-primary">{progress}%</span>
              </div>
              <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #2563EB, #7C3AED, #06B6D4)',
                    boxShadow: '0 0 12px rgba(37,99,235,0.6)',
                  }}
                  transition={{ ease: 'linear' }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Developer name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-center mt-8"
        >
          <p className="font-grotesk text-2xl font-bold text-gradient tracking-wider">
            DHARMENDRA BARIA
          </p>
          <p className="text-gray-700 text-xs font-jetbrains mt-1 tracking-[0.35em] uppercase">
            Full Stack MERN Developer
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
});
Preloader.displayName = 'Preloader';

export default Preloader;
