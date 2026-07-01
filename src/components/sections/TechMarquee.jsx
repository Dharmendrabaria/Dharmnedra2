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

const TechLogo = memo(({ icon: Icon, name, color }) => (
  <div className="tech-logo flex items-center gap-3 glass-premium rounded-2xl px-6 py-3.5 mx-3 shrink-0 cursor-default group border border-white/5 hover:border-white/20 transition-all duration-300">
    <Icon size={24} style={{ color }} className="transition-transform duration-300 group-hover:scale-110 drop-shadow-md" />
    <span className="text-gray-400 group-hover:text-white text-sm font-grotesk font-medium transition-colors whitespace-nowrap">{name}</span>
  </div>
));
TechLogo.displayName = 'TechLogo';

const firstHalf  = TECHS.slice(0, 10);
const secondHalf = TECHS.slice(10);

const ROW1 = [...firstHalf,  ...firstHalf,  ...firstHalf,  ...firstHalf ];
const ROW2 = [...secondHalf, ...secondHalf, ...secondHalf, ...secondHalf];

const TechMarquee = memo(() => (
  <div className="w-full border-y border-white/5 py-10 overflow-hidden relative" style={{ background: '#080808' }}>
    {/* Fade edges */}
    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

    {/* Section indicator */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-[0.02] pointer-events-none w-full text-center">
      <span className="font-grotesk font-bold text-8xl md:text-[12rem] whitespace-nowrap">STACK</span>
    </div>

    {/* Row 1 */}
    <div className="flex mb-6 hover:[animation-play-state:paused] animate-marquee relative z-10">
      {ROW1.map((t, i) => <TechLogo key={i} {...t} />)}
    </div>

    {/* Row 2 */}
    <div className="flex hover:[animation-play-state:paused] animate-marquee-reverse relative z-10">
      {ROW2.map((t, i) => <TechLogo key={i} {...t} />)}
    </div>

    {/* CSS 3D tilt */}
    <style>{`
      .tech-logo {
        perspective: 800px;
        transform-style: preserve-3d;
      }
      .tech-logo:hover {
        transform: scale(1.05) rotateX(10deg) translateY(-4px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1);
      }
    `}</style>
  </div>
));
TechMarquee.displayName = 'TechMarquee';

export default TechMarquee;
