import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import { TESTIMONIALS } from '../../utils/constants';

const StarRating = memo(({ rating }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <FaStar key={i} size={12} className={i < rating ? 'text-yellow-400' : 'text-gray-800'} />
    ))}
  </div>
));
StarRating.displayName = 'StarRating';

const Testimonials = memo(() => {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  const next = useCallback(() => setIdx(i => (i + 1) % TESTIMONIALS.length), []);
  const prev = useCallback(() => setIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), []);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 6000);
  }, [next]);

  useEffect(() => {
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const handleNext = useCallback(() => { next(); resetTimer(); }, [next, resetTimer]);
  const handlePrev = useCallback(() => { prev(); resetTimer(); }, [prev, resetTimer]);
  const handleDot = useCallback((i) => { setIdx(i); resetTimer(); }, [resetTimer]);

  const t = TESTIMONIALS[idx];

  return (
    <section id="testimonials" className="relative py-28 md:py-40 overflow-hidden" style={{ background: '#080808' }}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)' }} />

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent origin-center"
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label mb-4"
          >08 — Testimonials</motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="heading-lg"
            >
              What People <span className="text-gradient">Say.</span>
            </motion.h2>
          </div>
        </div>

        {/* Testimonial card — scale + opacity transition */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-premium rounded-3xl p-10 md:p-14 border border-white/6 text-center"
            >
              <FaQuoteLeft size={36} className="text-primary/15 mx-auto mb-8" />

              <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 font-light max-w-2xl mx-auto">
                "{t.review}"
              </p>

              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <img src={t.avatar} alt={t.name} loading="lazy" decoding="async"
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div className="absolute inset-0 rounded-full" style={{ boxShadow: '0 0 16px rgba(37,99,235,0.4)' }} />
                </div>
                <div>
                  <h4 className="font-grotesk font-semibold text-white">{t.name}</h4>
                  <p className="text-gray-600 text-sm">{t.role} · {t.company}</p>
                </div>
                <StarRating rating={t.rating} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button onClick={handlePrev}
              className="w-10 h-10 rounded-full glass-premium border border-white/8 flex items-center justify-center text-gray-500 hover:text-white hover:border-primary/40 transition-all duration-300">
              <FaChevronLeft size={13} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => handleDot(i)}
                  className={`rounded-full transition-all duration-300 ${i === idx ? 'w-8 h-1.5 bg-primary shadow-glow-blue' : 'w-1.5 h-1.5 bg-white/15 hover:bg-white/30'
                    }`}
                />
              ))}
            </div>
            <button onClick={handleNext}
              className="w-10 h-10 rounded-full glass-premium border border-white/8 flex items-center justify-center text-gray-500 hover:text-white hover:border-primary/40 transition-all duration-300">
              <FaChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});
Testimonials.displayName = 'Testimonials';

export default Testimonials;
