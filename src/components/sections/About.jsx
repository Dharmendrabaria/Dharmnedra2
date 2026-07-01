import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaLaptopCode, FaMapMarkerAlt, FaCoffee } from 'react-icons/fa';

const BentoCard = memo(({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10%' }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`glass-premium rounded-3xl border border-white/10 overflow-hidden relative group hover:border-white/20 transition-colors ${className}`}
  >
    {/* Subtle gradient hover effect inside the card */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    {children}
  </motion.div>
));
BentoCard.displayName = 'BentoCard';

const About = memo(() => {
  return (
    <section id="about" className="relative py-28 md:py-40 overflow-hidden" style={{ background: '#050505' }}>
      <div className="absolute inset-0 pointer-events-none mesh-bg opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-16">
          <p className="section-label mb-4">01 — Background</p>
          <div className="overflow-hidden mb-4">
            <h2 className="heading-lg">
              Engineering <span className="text-gradient">Identity.</span>
            </h2>
          </div>
        </div>

        {/* ── BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[220px]">
          
          {/* Card 1: Core Identity (2x2) */}
          <BentoCard className="md:col-span-2 lg:col-span-2 row-span-2 p-8 lg:p-10 flex flex-col justify-between" delay={0.1}>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                <FaLaptopCode size={24} />
              </div>
              <h3 className="font-grotesk text-3xl font-bold text-white mb-4">Architecting Digital Realities.</h3>
              <p className="text-gray-400 leading-relaxed font-inter">
                I am a passionate Full Stack MERN Developer focused on building scalable, high-performance web applications. 
                I believe that writing code is an art form—every line should have purpose, every interaction should feel seamless, 
                and performance should never be an afterthought. 
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <span className="px-4 py-1.5 rounded-full glass border border-white/10 text-xs text-white">Product Focused</span>
              <span className="px-4 py-1.5 rounded-full glass border border-white/10 text-xs text-white">Detail Oriented</span>
            </div>
          </BentoCard>

          {/* Card 2: Location (1x1) */}
          <BentoCard className="col-span-1 row-span-1 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden" delay={0.2}>
            {/* Fake radar/map effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.2)_0%,transparent_70%)] animate-pulse" />
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 mb-3 z-10">
              <FaMapMarkerAlt size={20} />
            </div>
            <h4 className="font-grotesk font-bold text-white z-10">Gujarat, India</h4>
            <p className="text-xs text-gray-500 font-jetbrains mt-1 z-10">22.2587° N, 71.1924° E</p>
          </BentoCard>

          {/* Card 3: Experience (1x1) */}
          <BentoCard className="col-span-1 row-span-1 p-6 flex flex-col justify-end" delay={0.3}>
             <div className="text-6xl font-grotesk font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-1">
               2+
             </div>
             <p className="text-sm text-gray-400 font-inter">Years of dedicated learning & building.</p>
          </BentoCard>

          {/* Card 4: Education (2x1) */}
          <BentoCard className="md:col-span-2 col-span-1 row-span-1 p-8 flex items-center gap-6" delay={0.4}>
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary">
              <FaGraduationCap size={30} />
            </div>
            <div>
              <h4 className="font-grotesk text-xl font-bold text-white mb-2">B.Tech Information Technology</h4>
              <p className="text-sm text-gray-400">Currently pursuing my degree, focusing on algorithms, system design, and deep technical fundamentals.</p>
            </div>
          </BentoCard>

          {/* Card 5: Philosophy (1x2) - Adjusts based on screen */}
          <BentoCard className="col-span-1 md:col-span-1 lg:col-span-2 row-span-1 p-8 relative overflow-hidden flex flex-col justify-center" delay={0.5}>
             <div className="absolute -right-10 -bottom-10 opacity-10">
               <FaCoffee size={140} />
             </div>
             <h4 className="font-grotesk text-2xl font-bold text-white mb-3">Powered by Coffee & Code</h4>
             <p className="text-sm text-gray-400 max-w-sm">
               Constantly experimenting with new frameworks, optimizing build tools, and hunting for perfect 60FPS animations.
             </p>
          </BentoCard>

        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';
export default About;
