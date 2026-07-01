import React, { memo } from 'react';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaBootstrap, FaGithub, FaFigma,
} from 'react-icons/fa';
import {
  SiTypescript, SiExpress, SiMongodb, SiTailwindcss, SiRedux, SiFirebase,
  SiCplusplus, SiFramer, SiVite, SiGsap, SiPostman, SiVercel,
} from 'react-icons/si';

const TECHS = [
  { icon: FaReact,       name: 'React',      color: '#61DAFB' },
  { icon: FaNodeJs,      name: 'Node.js',    color: '#339933' },
  { icon: SiMongodb,     name: 'MongoDB',    color: '#47A248' },
  { icon: SiExpress,     name: 'Express',    color: '#ffffff' },
  { icon: SiTailwindcss, name: 'Tailwind',   color: '#06B6D4' },
  { icon: SiTypescript,  name: 'TypeScript', color: '#3178C6' },
  { icon: FaJs,          name: 'JavaScript', color: '#F7DF1E' },
  { icon: SiRedux,       name: 'Redux',      color: '#764ABC' },
  { icon: SiFirebase,    name: 'Firebase',   color: '#FFCA28' },
  { icon: FaGithub,      name: 'GitHub',     color: '#ffffff' },
  { icon: SiCplusplus,   name: 'C++',        color: '#00599C' },
  { icon: SiFramer,      name: 'Framer',     color: '#FF0055' },
  { icon: SiVite,        name: 'Vite',       color: '#646CFF' },
  { icon: SiGsap,        name: 'GSAP',       color: '#88CE02' },
  { icon: FaFigma,       name: 'Figma',      color: '#F24E1E' },
  { icon: SiPostman,     name: 'Postman',    color: '#FF6C37' },
  { icon: SiVercel,      name: 'Vercel',     color: '#ffffff' },
  { icon: FaCss3Alt,     name: 'CSS3',       color: '#1572B6' },
  { icon: FaHtml5,       name: 'HTML5',      color: '#E34F26' },
  { icon: FaBootstrap,   name: 'Bootstrap',  color: '#7952B3' },
];

/**
 * TechLogo — pure CSS hover (no Framer Motion), identical visual result.
 * Replacing whileHover with CSS 3D transform eliminates ~80 spring physics
 * calculations running while the marquee scrolls.
 */
const TechLogo = memo(({ icon: Icon, name, color }) => (
  <div
    className="tech-logo flex items-center gap-3 glass rounded-xl px-5 py-3 mx-3 shrink-0 cursor-default group border border-white/5 hover:border-white/20 transition-colors duration-300"
  >
    <Icon size={26} style={{ color }} className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_currentColor]" />
    <span className="text-gray-400 group-hover:text-white text-sm font-medium transition-colors whitespace-nowrap">{name}</span>
  </div>
));
TechLogo.displayName = 'TechLogo';

const firstHalf  = TECHS.slice(0, 10);
const secondHalf = TECHS.slice(10);

// Pre-built strips — static arrays, defined outside component so they never recreate
const ROW1 = [...firstHalf,  ...firstHalf,  ...firstHalf,  ...firstHalf ];
const ROW2 = [...secondHalf, ...secondHalf, ...secondHalf, ...secondHalf];

const TechMarquee = memo(() => (
  <div className="w-full border-y border-white/5 py-8 bg-[#0A0A0A] overflow-hidden relative">
    {/* Fade edges */}
    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

    {/* Row 1 — Left — CSS animation only, no JS physics */}
    <div className="flex mb-4 hover:[animation-play-state:paused] animate-marquee">
      {ROW1.map((t, i) => <TechLogo key={i} {...t} />)}
    </div>

    {/* Row 2 — Right */}
    <div className="flex hover:[animation-play-state:paused] animate-marquee-reverse">
      {ROW2.map((t, i) => <TechLogo key={i} {...t} />)}
    </div>

    {/* CSS-only 3D tilt on hover — zero JS, identical look */}
    <style>{`
      .tech-logo {
        transition: transform 0.3s ease, border-color 0.3s ease;
        perspective: 400px;
        transform-style: preserve-3d;
      }
      .tech-logo:hover {
        transform: scale(1.2) rotateY(15deg);
      }
    `}</style>
  </div>
));
TechMarquee.displayName = 'TechMarquee';

export default TechMarquee;
