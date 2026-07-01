import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { CERTIFICATES } from '../../utils/constants';

const CertCard = memo(({ cert, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className="group cursor-pointer"
    onClick={() => onClick(cert)}
  >
    <div className="glass-premium rounded-3xl p-3 border border-white/6 h-full flex flex-col card-lift">
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-black/40 mb-4">
        <img
          src={cert.image}
          alt={cert.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute top-3 right-3 glass rounded-full px-2.5 py-1 text-[10px] font-jetbrains text-gray-300 border border-white/10 backdrop-blur-md">
          {cert.date}
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-[10px] font-jetbrains text-primary/80 uppercase tracking-widest">{cert.issuer}</span>
          <h3 className="font-grotesk text-lg font-bold text-white mt-1 leading-tight group-hover:text-primary transition-colors">
            {cert.title}
          </h3>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
          <span className="btn-glass text-xs py-2 px-4 scale-95 group-hover:scale-100 transition-transform">
            View Certificate
          </span>
        </div>
      </div>
    </div>
  </motion.div>
));
CertCard.displayName = 'CertCard';

const Certificates = memo(() => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="certificates" className="relative py-28 md:py-40 overflow-hidden" style={{ background: '#080808' }}>
      {/* Background Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mesh-bg" />

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent origin-left"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label mb-4"
          >
            09 — Continuous Learning
          </motion.p>
          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="heading-lg"
            >
              Verified <span className="text-gradient">Certifications.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-lg text-[15px]"
          >
            Formal recognition of skills acquired through dedicated coursework and professional training.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CERTIFICATES.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} onClick={setSelected} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-4xl glass-premium p-2 rounded-3xl border border-white/10"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <FaTimes size={16} />
              </button>
              
              <img src={selected.image} alt={selected.title} className="w-full rounded-2xl border border-white/5" />
              
              <div className="absolute bottom-6 right-6">
                <a href={selected.link} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2 px-5 shadow-glow-blue">
                  <FaExternalLinkAlt size={12} /> Verify Credential
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});
Certificates.displayName = 'Certificates';

export default Certificates;
