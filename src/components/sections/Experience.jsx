import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../../utils/constants';
import { staggerContainer, fadeInUp } from '../../utils/animations';

const TYPE_COLORS = { course: '#2563EB', education: '#7C3AED', freelance: '#06B6D4' };
const TYPE_LABELS = { course: 'Course', education: 'Education', freelance: 'Freelance' };

/**
 * ExperienceCard — memoized, avoids re-render on sibling scroll animations
 */
const ExperienceCard = memo(({ item, i }) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7, delay: i * 0.1 }}
    className={`relative flex items-center gap-8 ${
      i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
    } flex-col md:flex-row`}
  >
    {/* Card */}
    <div className="md:w-[calc(50%-32px)] w-full">
      <div className="glass-card rounded-3xl p-8 border border-white/5 hover:border-primary/20 transition-colors duration-400 group">
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-xs font-fira px-3 py-1 rounded-full border"
            style={{
              color: TYPE_COLORS[item.type],
              borderColor: `${TYPE_COLORS[item.type]}40`,
              background: `${TYPE_COLORS[item.type]}10`,
            }}
          >
            {TYPE_LABELS[item.type]}
          </span>
          <span className="text-xs text-gray-600 font-fira">{item.duration}</span>
        </div>

        <h3 className="font-syne text-xl font-bold text-white mb-1 group-hover:text-gradient transition-all duration-500">
          {item.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4">{item.company}</p>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">{item.description}</p>

        <div className="flex flex-wrap gap-2">
          {item.skills.map((s) => (
            <span key={s} className="text-xs glass border border-white/8 rounded-full px-2.5 py-0.5 text-gray-400 font-fira">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* Center dot */}
    <div className="hidden md:flex shrink-0 w-16 h-16 items-center justify-center relative z-10">
      <div
        className="w-5 h-5 rounded-full border-2 border-[#0D0D0D]"
        style={{ background: TYPE_COLORS[item.type], boxShadow: `0 0 15px ${TYPE_COLORS[item.type]}60` }}
      />
    </div>

    {/* Spacer */}
    <div className="hidden md:block md:w-[calc(50%-32px)]" />
  </motion.div>
));
ExperienceCard.displayName = 'ExperienceCard';

const Experience = memo(() => (
  <section id="experience" className="relative py-24 md:py-36 bg-[#0D0D0D] overflow-hidden">
    <div className="absolute left-0 top-1/2 w-[400px] h-[400px] bg-secondary/8 blur-[130px] rounded-full pointer-events-none" />

    <div className="max-w-5xl mx-auto px-6 lg:px-12">
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="text-center mb-20"
      >
        <motion.p variants={fadeInUp} className="text-primary font-fira text-sm mb-3 tracking-widest uppercase">07 — Journey</motion.p>
        <motion.h2 variants={fadeInUp} className="font-syne text-4xl md:text-6xl font-bold text-white">
          Experience & <span className="text-gradient">Education.</span>
        </motion.h2>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary via-secondary to-accent opacity-30 hidden md:block" />

        <div className="space-y-16">
          {EXPERIENCE.map((item, i) => (
            <ExperienceCard key={item.id} item={item} i={i} />
          ))}
        </div>
      </div>
    </div>
  </section>
));
Experience.displayName = 'Experience';

export default Experience;
