import React, { memo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EXPERIENCE } from '../../utils/constants';

const TYPE_COLORS = { course: '#2563EB', education: '#7C3AED', freelance: '#06B6D4' };
const TYPE_BG     = { course: 'rgba(37,99,235,0.1)', education: 'rgba(124,58,237,0.1)', freelance: 'rgba(6,182,212,0.1)' };
const TYPE_LABELS = { course: 'Course', education: 'Education', freelance: 'Freelance' };

const ExperienceCard = memo(({ item, index }) => {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
    >
      {/* Card */}
      <div className="md:w-[calc(50%-40px)] w-full group">
        <div
          className="glass-premium rounded-3xl p-8 border transition-all duration-400"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = `${TYPE_COLORS[item.type]}40`;
            e.currentTarget.style.boxShadow = `0 0 30px ${TYPE_COLORS[item.type]}15, 0 20px 50px rgba(0,0,0,0.5)`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <span
              className="text-xs font-jetbrains px-3 py-1 rounded-full"
              style={{ color: TYPE_COLORS[item.type], background: TYPE_BG[item.type] }}
            >
              {TYPE_LABELS[item.type]}
            </span>
            <span className="text-xs text-gray-600 font-jetbrains">{item.duration}</span>
          </div>

          <h3 className="font-grotesk text-xl font-bold text-white mb-1 group-hover:text-gradient transition-all duration-500">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{item.company}</p>
          <p className="text-gray-500 text-sm leading-relaxed mb-5">{item.description}</p>

          <div className="flex flex-wrap gap-2">
            {item.skills.map(s => (
              <span key={s} className="tag">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Center node */}
      <div className="hidden md:flex shrink-0 w-20 justify-center relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 300, damping: 20 }}
          className="w-5 h-5 rounded-full border-2 border-[#080808]"
          style={{
            background: TYPE_COLORS[item.type],
            boxShadow: `0 0 16px ${TYPE_COLORS[item.type]}70`,
          }}
        />
      </div>

      <div className="hidden md:block md:w-[calc(50%-40px)]" />
    </motion.div>
  );
});
ExperienceCard.displayName = 'ExperienceCard';

const Experience = memo(() => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const lineH = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section id="experience" ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden" style={{ background: '#0D0D0D' }}>
      {/* Ambient */}
      <div className="absolute left-[-5%] top-1/2 w-[500px] h-[500px] bg-secondary/7 blur-[150px] rounded-full pointer-events-none" />

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent origin-left"
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label mb-4"
          >
            07 — Journey
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="heading-lg"
            >
              Experience & <span className="text-gradient">Education.</span>
            </motion.h2>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Scroll-driven line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden md:block">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-secondary to-accent rounded-full"
              style={{ height: lineH }}
            />
          </div>

          <div className="space-y-12">
            {EXPERIENCE.map((item, i) => (
              <ExperienceCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
Experience.displayName = 'Experience';

export default Experience;
