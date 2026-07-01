import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaTimes, FaExpand } from 'react-icons/fa';
import { CERTIFICATES } from '../../utils/constants';
import { staggerContainer, fadeInUp } from '../../utils/animations';

const CertModal = memo(({ cert, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" />
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onClick={(e) => e.stopPropagation()}
      className="relative z-10 w-full max-w-2xl glass-card rounded-3xl overflow-hidden border border-white/10"
    >
      <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
        <FaTimes size={14} />
      </button>

      <img src={cert.image} alt={cert.title} loading="eager" className="w-full h-64 object-cover" />
      <div className="p-8">
        <h3 className="font-syne text-2xl font-bold text-white mb-2">{cert.title}</h3>
        <p className="text-gray-500 mb-1">{cert.issuer}</p>
        <p className="text-primary font-fira text-sm mb-6">{cert.date}</p>
        <a
          href={cert.image}
          download
          className="inline-flex items-center gap-2 bg-primary px-6 py-3 rounded-full text-white font-semibold text-sm hover:bg-primary-light transition-colors shadow-glow-blue"
        >
          <FaDownload size={13} /> Download Certificate
        </a>
      </div>
    </motion.div>
  </motion.div>
));
CertModal.displayName = 'CertModal';

/**
 * CertCard — memoized, CSS hover instead of whileHover={{ y: -6 }}
 */
const CertCard = memo(({ cert, onSelect }) => {
  const handleClick = useCallback(() => onSelect(cert), [cert, onSelect]);

  return (
    <motion.div
      variants={fadeInUp}
      onClick={handleClick}
      className="cert-card group relative rounded-3xl overflow-hidden cursor-pointer glass-card border border-white/5 hover:border-primary/30 transition-all duration-400"
    >
      <div className="relative h-48 overflow-hidden bg-black/30">
        <img
          src={cert.image}
          alt={cert.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/10">
          <div className="glass rounded-full p-3 border border-white/20">
            <FaExpand className="text-white" size={18} />
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-white mb-1 group-hover:text-gradient transition-all duration-500">{cert.title}</h3>
        <p className="text-gray-500 text-sm">{cert.issuer}</p>
        <p className="text-primary font-fira text-xs mt-2">{cert.date}</p>
      </div>
    </motion.div>
  );
});
CertCard.displayName = 'CertCard';

const Certificates = memo(() => {
  const [selected, setSelected] = useState(null);
  const handleSelect = useCallback((cert) => setSelected(cert), []);
  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <section id="certificates" className="relative py-24 md:py-36 bg-[#0D0D0D] overflow-hidden">
      <div className="absolute right-0 top-1/3 w-[400px] h-[400px] bg-accent/8 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-fira text-sm mb-3 tracking-widest uppercase">09 — Certificates</motion.p>
          <motion.h2 variants={fadeInUp} className="font-syne text-4xl md:text-6xl font-bold text-white">
            Credentials & <span className="text-gradient">Achievements.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CERTIFICATES.map((cert) => (
            <CertCard key={cert.id} cert={cert} onSelect={handleSelect} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <CertModal cert={selected} onClose={handleClose} />}
      </AnimatePresence>

      {/* CSS hover lift — replaces whileHover={{ y: -6 }} */}
      <style>{`
        .cert-card {
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .cert-card:hover {
          transform: translateY(-6px) translateZ(0);
        }
      `}</style>
    </section>
  );
});
Certificates.displayName = 'Certificates';

export default Certificates;
