import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { STATS, SITE } from '../../utils/constants';
import { useCounter } from '../../hooks/useCounter';
import { fadeInLeft, fadeInRight, staggerContainer, fadeInUp } from '../../utils/animations';

const StatCard = memo(({ value, suffix, label }) => {
  const { count, ref } = useCounter(value, 1800);
  return (
    <div ref={ref} className="stat-card glass-card rounded-2xl p-6 text-center border-gradient group">
      <div className="text-4xl font-syne font-bold text-white mb-1 group-hover:text-gradient transition-all">
        {count}{suffix}
      </div>
      <div className="text-gray-500 text-sm uppercase tracking-widest">{label}</div>
    </div>
  );
});
StatCard.displayName = 'StatCard';

const TIMELINE = [
  { year: '2022', title: 'Started B.Tech IT', desc: 'Enrolled in B.Tech Information Technology — building strong CS fundamentals.' },
  { year: '2023', title: 'Learned MERN Stack', desc: 'Completed intensive MERN Stack Development course. Built 10+ projects end-to-end.' },
  { year: '2024', title: 'Freelance Projects', desc: 'Delivered client projects — e-commerce platforms, dashboards, and landing pages.' },
  { year: '2026', title: 'Graduating', desc: 'Completing B.Tech while actively building and shipping production-ready apps.' },
];

const About = memo(() => {
  return (
    <section id="about" className="relative py-24 md:py-36 bg-[#0A0A0A] overflow-hidden">
      {/* Background blob */}
      <div className="absolute right-[-10%] top-1/4 w-[500px] h-[500px] bg-secondary/8 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-20"
        >
          <motion.p variants={fadeInUp} className="text-primary font-fira text-sm mb-3 tracking-widest uppercase">01 — About Me</motion.p>
          <motion.h2 variants={fadeInUp} className="font-syne text-4xl md:text-6xl font-bold text-white">
            The Story <span className="text-gradient">Behind the Code.</span>
          </motion.h2>
        </motion.div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left — story */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 glass px-4 py-2 rounded-full border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-green-400 text-sm font-medium">Available for Freelance</span>
            </div>

            <h3 className="font-syne text-2xl font-bold text-white mb-6">
              I'm Dharmendra — a B.Tech IT student and Full Stack MERN Developer.
            </h3>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                I don't just write code — I craft <span className="text-white font-medium">scalable, performant web applications</span> that make a real difference. My journey started with curiosity, grew through countless hours of building, and is now driven by a passion for engineering excellence.
              </p>
              <p>
                My stack of choice is the <span className="text-white font-medium">MERN ecosystem</span> — React on the frontend for rich, animated interfaces, Node.js + Express for robust APIs, and MongoDB for flexible data modeling. I layer in <span className="text-primary font-medium">Framer Motion</span>, <span className="text-secondary font-medium">Three.js</span>, and <span className="text-accent font-medium">GSAP</span> to push the visual experience further.
              </p>
              <p>
                When I'm not building apps, I'm sharpening my <span className="text-white font-medium">C++ and DSA</span> skills — because understanding algorithms makes me a better full-stack engineer, not just a framework user.
              </p>
              <p className="font-medium text-white">
                Target: FAANG, impactful startups, and challenging freelance projects. Let's build something exceptional.
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              <a href="#contact" className="px-6 py-3 bg-primary rounded-full text-white font-semibold text-sm hover:bg-primary-light hover:scale-105 transition-all duration-300 shadow-glow-blue">
                Work With Me
              </a>
              <a href={SITE?.resumeURL || '/resume.pdf'} download className="px-6 py-3 glass rounded-full text-white font-semibold text-sm border border-white/20 hover:bg-white/10 hover:scale-105 transition-all duration-300">
                Download CV
              </a>
            </div>
          </motion.div>

          {/* Right — timeline */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative"
          >
            <h3 className="font-semibold text-white text-lg mb-8 uppercase tracking-widest text-sm">
              Journey Timeline
            </h3>

            <div className="relative pl-8">
              {/* Animated vertical line */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-0 w-[1px] bg-gradient-to-b from-primary via-secondary to-accent"
              />

              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="mb-8 relative group"
                >
                  {/* Dot */}
                  <div className="absolute -left-10 top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-[#0A0A0A] group-hover:shadow-glow-blue transition-shadow duration-300" />

                  <div className="glass-card rounded-xl p-5 border border-white/5 group-hover:border-primary/30 transition-all duration-300">
                    <span className="text-primary font-fira text-xs">{item.year}</span>
                    <h4 className="text-white font-semibold mt-1 mb-2">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats grid */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {STATS.map((stat, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <StatCard {...stat} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CSS hover lift — replaces inline hover:translate */}
      <style>{`
        .stat-card {
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .stat-card:hover {
          transform: translateY(-8px) translateZ(0);
        }
      `}</style>
    </section>
  );
});
About.displayName = 'About';

export default About;
