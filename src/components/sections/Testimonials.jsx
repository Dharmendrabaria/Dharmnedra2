import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import { TESTIMONIALS } from '../../utils/constants';
import { staggerContainer, fadeInUp } from '../../utils/animations';

const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <FaStar key={i} size={14} className={i < rating ? 'text-yellow-400' : 'text-gray-700'} />
    ))}
  </div>
);

const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  const next = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  };

  const handleNext = () => { next(); resetTimer(); };
  const handlePrev = () => { prev(); resetTimer(); };

  return (
    <section id="testimonials" className="relative py-24 md:py-36 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-secondary/5 to-transparent pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-fira text-sm mb-3 tracking-widest uppercase">08 — Testimonials</motion.p>
          <motion.h2 variants={fadeInUp} className="font-syne text-4xl md:text-6xl font-bold text-white">
            What People <span className="text-gradient">Say.</span>
          </motion.h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-3xl p-10 md:p-14 border border-white/5 text-center"
            >
              {/* Quote icon */}
              <FaQuoteLeft size={40} className="text-primary/20 mx-auto mb-8" />

              <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 font-light">
                "{TESTIMONIALS[idx].review}"
              </p>

              {/* Author */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <img
                    src={TESTIMONIALS[idx].avatar}
                    alt={TESTIMONIALS[idx].name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div className="absolute inset-0 rounded-full shadow-glow-blue opacity-50" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{TESTIMONIALS[idx].name}</h4>
                  <p className="text-gray-500 text-sm">{TESTIMONIALS[idx].role} · {TESTIMONIALS[idx].company}</p>
                </div>
                <StarRating rating={TESTIMONIALS[idx].rating} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button onClick={handlePrev} className="w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 transition-colors">
              <FaChevronLeft size={14} />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIdx(i); resetTimer(); }}
                  className={`rounded-full transition-all duration-300 ${i === idx ? 'w-8 h-2 bg-primary' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>

            <button onClick={handleNext} className="w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 transition-colors">
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
