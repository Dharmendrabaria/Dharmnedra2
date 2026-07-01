import React, { useState, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SEQUENCE = [
  { text: '$ npm install dharmendra-portfolio...', delay: 0 },
  { text: '› Fetching packages from registry...', delay: 600 },
  { text: '› Installing react@18.3.0', delay: 1000 },
  { text: '› Installing framer-motion@10.0.0', delay: 1300 },
  { text: '› Installing three.js@0.160.0', delay: 1600 },
  { text: '', delay: 1900 },
  { text: '████████████████████████  100%', delay: 2100 },
  { text: 'Compiling Components... 98%', delay: 2400 },
  { text: '', delay: 2700 },
  { text: '✓  Deployment Successful!', delay: 2900 },
  { text: '→  Launching portfolio...', delay: 3200 },
];

const getLineClass = (line) => {
  if (line.startsWith('✓')) return 'text-green-400 font-semibold';
  if (line.startsWith('→')) return 'text-accent';
  if (line.startsWith('$')) return 'text-white';
  if (line.startsWith('█')) return 'text-primary';
  if (line.startsWith('Compiling')) return 'text-yellow-400';
  return 'text-gray-500';
};

const Preloader = memo(({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers = [];

    SEQUENCE.forEach((item) => {
      timers.push(setTimeout(() => {
        setVisibleLines((prev) => [...prev, item.text]);
      }, item.delay));
    });

    // Animate progress bar
    const progressTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(progressTimer); return 100; }
        return p + 2;
      });
    }, 50);

    // Exit — use opacity transition instead of filter:blur (expensive)
    timers.push(setTimeout(() => {
      setTimeout(() => onComplete(), 800);
    }, 3600));

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-[#0A0A0A] flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-2xl px-8">
        {/* Top bar */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-4 text-gray-600 text-xs font-fira">portfolio — zsh — 80×24</span>
        </div>

        {/* Terminal window */}
        <div className="glass rounded-2xl p-6 md:p-8 border border-white/10">
          <div className="font-fira text-sm space-y-1.5 min-h-[200px]">
            <AnimatePresence>
              {visibleLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={getLineClass(line)}
                >
                  {line || '\u00A0'}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Blinking cursor */}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-primary align-middle"
            />
          </div>

          {/* Progress bar */}
          <div className="mt-8">
            <div className="flex justify-between text-xs text-gray-600 font-fira mb-2">
              <span>dharmendrabaria/portfolio</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </div>

        {/* Developer name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center mt-8"
        >
          <p className="text-gradient text-2xl font-syne font-bold tracking-widest">
            DHARMENDRA BARIA
          </p>
          <p className="text-gray-600 text-xs font-fira mt-1 tracking-[0.3em]">
            FULL STACK DEVELOPER
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
});
Preloader.displayName = 'Preloader';

export default Preloader;
