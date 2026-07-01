import React, { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../../utils/constants';
import { staggerContainer, fadeInUp } from '../../utils/animations';

/**
 * ServiceCard — memoized, CSS-only hover instead of whileHover
 * whileHover with y and borderColor triggers layout recalcs on every mouse event
 */
const ServiceCard = memo(({ icon, title, description, features }) => (
  <motion.div
    variants={fadeInUp}
    className="service-card glass-card rounded-3xl p-8 border border-white/5 group cursor-default relative overflow-hidden"
  >
    {/* Hover glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

    {/* Icon */}
    <div className="relative z-10 text-4xl mb-6 inline-block group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
      {icon}
    </div>

    <div className="relative z-10">
      <h3 className="font-syne text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-500">
        {title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-6">{description}</p>

      <ul className="space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
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

const Services = memo(() => (
  <section id="services" className="relative py-24 md:py-36 bg-[#0A0A0A] overflow-hidden">
    <div className="absolute right-[-5%] top-1/4 w-[400px] h-[400px] bg-accent/8 blur-[130px] rounded-full pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="text-center mb-16"
      >
        <motion.p variants={fadeInUp} className="text-primary font-fira text-sm mb-3 tracking-widest uppercase">06 — Services</motion.p>
        <motion.h2 variants={fadeInUp} className="font-syne text-4xl md:text-6xl font-bold text-white">
          What I <span className="text-gradient">Deliver.</span>
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-gray-500 mt-4 max-w-xl mx-auto">
          End-to-end development services tailored to your goals — from concept to production.
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {SERVICES.map((service, i) => (
          <ServiceCard key={i} {...service} />
        ))}
      </motion.div>
    </div>

    {/* CSS hover lift — replaces whileHover={{ y: -8, borderColor }} */}
    <style>{`
      .service-card {
        transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                    border-color 0.4s ease;
      }
      .service-card:hover {
        transform: translateY(-8px) translateZ(0);
        border-color: rgba(37,99,235,0.4);
      }
    `}</style>
  </section>
));
Services.displayName = 'Services';

export default Services;
