import React, { memo } from 'react';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaBootstrap, FaGithub, FaFigma,
} from 'react-icons/fa';
import {
  SiTypescript, SiExpress, SiMongodb, SiTailwindcss, SiRedux, SiFirebase,
  SiCplusplus, SiFramer, SiVite, SiGsap, SiJsonwebtokens,
} from 'react-icons/si';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../../utils/constants';
import { staggerContainer, fadeInUp } from '../../utils/animations';
import { useState, useMemo, useCallback } from 'react';

const SKILLS = [
  { name: 'HTML5',         icon: FaHtml5,        pct: 95, cat: 'Frontend',  color: '#E34F26' },
  { name: 'CSS3',          icon: FaCss3Alt,       pct: 90, cat: 'Frontend',  color: '#1572B6' },
  { name: 'JavaScript',    icon: FaJs,            pct: 88, cat: 'Frontend',  color: '#F7DF1E' },
  { name: 'TypeScript',    icon: SiTypescript,    pct: 76, cat: 'Frontend',  color: '#3178C6' },
  { name: 'React.js',      icon: FaReact,         pct: 92, cat: 'Frontend',  color: '#61DAFB' },
  { name: 'Redux',         icon: SiRedux,         pct: 80, cat: 'Frontend',  color: '#764ABC' },
  { name: 'Tailwind CSS',  icon: SiTailwindcss,   pct: 95, cat: 'Frontend',  color: '#06B6D4' },
  { name: 'Bootstrap',     icon: FaBootstrap,     pct: 85, cat: 'Frontend',  color: '#7952B3' },
  { name: 'Framer Motion', icon: SiFramer,        pct: 82, cat: 'Frontend',  color: '#FF0055' },
  { name: 'Node.js',       icon: FaNodeJs,        pct: 83, cat: 'Backend',   color: '#339933' },
  { name: 'Express.js',    icon: SiExpress,       pct: 85, cat: 'Backend',   color: '#ffffff' },
  { name: 'REST APIs',     icon: SiJsonwebtokens, pct: 88, cat: 'Backend',   color: '#f97316' },
  { name: 'JWT Auth',      icon: SiJsonwebtokens, pct: 82, cat: 'Backend',   color: '#a855f7' },
  { name: 'MongoDB',       icon: SiMongodb,       pct: 85, cat: 'Database',  color: '#47A248' },
  { name: 'Firebase',      icon: SiFirebase,      pct: 75, cat: 'Database',  color: '#FFCA28' },
  { name: 'Git/GitHub',    icon: FaGithub,        pct: 90, cat: 'Tools',     color: '#ffffff' },
  { name: 'Vite',          icon: SiVite,          pct: 88, cat: 'Tools',     color: '#646CFF' },
  { name: 'GSAP',          icon: SiGsap,          pct: 74, cat: 'Tools',     color: '#88CE02' },
  { name: 'Figma',         icon: FaFigma,         pct: 70, cat: 'Tools',     color: '#F24E1E' },
  { name: 'C++',           icon: SiCplusplus,     pct: 85, cat: 'Languages', color: '#00599C' },
  // TypeScript intentionally kept once per category — deduped below
];

const getLabel = (pct) =>
  pct >= 90 ? 'Expert' : pct >= 80 ? 'Advanced' : pct >= 70 ? 'Proficient' : 'Familiar';

/**
 * SkillCard — memoized so it never re-renders unless props change.
 * Hover glow via CSS box-shadow (no whileHover animating non-GPU props).
 */
const SkillCard = memo(({ name, icon: Icon, pct, color }) => (
  <motion.div
    /* No `layout` prop — removes expensive layout recalculation on filter */
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.85 }}
    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    className="glass-card rounded-2xl p-5 group border border-white/5 transition-all duration-300 cursor-default skill-card"
    style={{ '--skill-glow': color }}
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
        <Icon size={22} style={{ color }} />
      </div>
      <div>
        <h3 className="text-white font-semibold text-sm">{name}</h3>
        <span className="text-gray-600 text-xs font-fira">{pct}%</span>
      </div>
    </div>

    {/* Progress bar — whileInView once, no continuous animation */}
    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
      />
    </div>

    <div className="mt-2 text-right">
      <span className="text-xs text-gray-600 font-fira">{getLabel(pct)}</span>
    </div>
  </motion.div>
));
SkillCard.displayName = 'SkillCard';

const Skills = () => {
  const [active, setActive] = useState('All');

  // useMemo so filter only recomputes when `active` changes — not on every render
  const filtered = useMemo(() => {
    const seen = new Set();
    return SKILLS.filter((s) => {
      const key = `${s.name}-${s.cat}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return active === 'All' || s.cat === active;
    });
  }, [active]);

  const handleTabClick = useCallback((cat) => setActive(cat), []);

  return (
    <section id="skills" className="relative py-24 md:py-36 bg-[#0A0A0A] overflow-hidden">
      {/* Ambient blob — pointer-events-none, no interaction cost */}
      <div className="absolute left-[-5%] top-1/3 w-[400px] h-[400px] bg-accent/8 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-fira text-sm mb-3 tracking-widest uppercase">02 — Skills</motion.p>
          <motion.h2 variants={fadeInUp} className="font-syne text-4xl md:text-6xl font-bold text-white">
            Technical <span className="text-gradient">Arsenal.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-500 mt-4 max-w-xl mx-auto">
            Tools and technologies I use to bring ideas from concept to production — with intention and precision.
          </motion.p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {SKILL_CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              variants={fadeInUp}
              onClick={() => handleTabClick(cat)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? 'bg-primary text-white shadow-glow-blue'
                  : 'glass text-gray-400 hover:text-white border border-white/10 hover:border-primary/30'
              }`}
            >
              {active === cat && (
                <motion.span
                  layoutId="skill-filter"
                  className="absolute inset-0 rounded-full bg-primary -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid — NO layout prop, prevents full layout recalculation on filter change */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((skill) => (
            <SkillCard key={`${skill.name}-${skill.cat}`} {...skill} />
          ))}
        </div>
      </div>

      {/* CSS hover glow — avoids animating box-shadow with JS */}
      <style>{`
        .skill-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 0 30px color-mix(in srgb, var(--skill-glow) 13%, transparent), 0 8px 32px rgba(0,0,0,0.5);
        }
      `}</style>
    </section>
  );
};

export default Skills;
