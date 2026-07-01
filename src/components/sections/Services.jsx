import React, { memo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SERVICES } from '../../utils/constants';

const PROCESS_STEPS = [
  { n: '01', title: 'Discover',   desc: 'Deep dive into your goals, users, and constraints.' },
  { n: '02', title: 'Design',     desc: 'Wireframes, design system, and component architecture.' },
  { n: '03', title: 'Build',      desc: 'Production-grade code with tests and performance budgets.' },
  { n: '04', title: 'Ship',       desc: 'CI/CD deployment with monitoring and iterative improvement.' },
];

const ServiceCard = memo(({ icon, title, description, features, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    className="group relative glass-premium rounded-3xl p-8 border border-white/6 overflow-hidden"
    style={{
      transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.45s ease',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-10px) translateZ(0)';
      e.currentTarget.style.borderColor = 'rgba(37,99,235,0.3)';
      e.currentTarget.style.boxShadow = '0 30px 70px rgba(0,0,0,0.6), 0 0 40px rgba(37,99,235,0.1)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0) translateZ(0)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {/* Gradient hover bg */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/4 to-secondary/4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

    {/* Number */}
    <div className="absolute top-6 right-6 font-grotesk text-6xl font-bold text-white/[0.04] select-none pointer-events-none">
      {String(index + 1).padStart(2, '0')}
    </div>

    {/* Icon */}
    <div className="relative z-10 text-3xl mb-6 inline-block group-hover:scale-110 transition-transform duration-400">
      {icon}
    </div>

    <div className="relative z-10">
      <h3 className="font-grotesk text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-500">
        {title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-6">{description}</p>

      <ul className="space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
            <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
            {f}
          </li>
        ))}
      </ul>
    </div>

    {/* Corner accent */}
    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </motion.div>
));
ServiceCard.displayName = 'ServiceCard';

const ProcessStep = memo(({ n, title, desc, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    className="flex flex-col items-center text-center group"
  >
    <div className="w-14 h-14 rounded-2xl glass-premium border border-white/8 flex items-center justify-center font-jetbrains text-primary text-sm font-bold mb-4 group-hover:border-primary/30 group-hover:shadow-glow-blue transition-all duration-400">
      {n}
    </div>
    <h4 className="font-grotesk font-bold text-white mb-2">{title}</h4>
    <p className="text-gray-600 text-sm leading-relaxed max-w-[160px]">{desc}</p>
  </motion.div>
));
ProcessStep.displayName = 'ProcessStep';

const Services = memo(() => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section id="services" ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden" style={{ background: '#080808' }}>
      {/* Parallax ambient */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute right-[-8%] top-[10%] w-[500px] h-[500px] bg-accent/7 blur-[150px] rounded-full" />
        <div className="absolute left-[-5%] bottom-[10%] w-[400px] h-[400px] bg-secondary/6 blur-[140px] rounded-full" />
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent origin-left"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label mb-4"
          >
            06 — Services
          </motion.p>
          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="heading-lg"
            >
              What I <span className="text-gradient">Deliver.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-500 max-w-lg text-[15px]"
          >
            End-to-end development services — from concept to production deployment.
          </motion.p>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>

        {/* Process section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="glass-premium rounded-3xl p-10 border border-white/6"
        >
          <h3 className="font-grotesk text-2xl font-bold text-white text-center mb-12">
            My <span className="text-gradient">Process</span>
          </h3>

          {/* Connecting line */}
          <div className="relative">
            <div className="absolute top-7 left-[12%] right-[12%] h-px bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 hidden md:block" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {PROCESS_STEPS.map((step, i) => (
                <ProcessStep key={step.n} {...step} index={i} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
Services.displayName = 'Services';

export default Services;
