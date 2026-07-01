import React, { useState, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaSearch, FaTimes } from 'react-icons/fa';
import projects from '../../data/projects';
import { staggerContainer, fadeInUp } from '../../utils/animations';

const CATEGORIES = ['All', 'fullstack', 'frontend', 'backend'];

// ── Project Modal ──────────────────────────────────────────────────────────────
const ProjectModal = memo(({ project, onClose }) => {
  const [tab, setTab] = useState('overview');
  const [imgIdx, setImgIdx] = useState(0);
  const TABS = ['overview', 'features', 'challenges', 'solution'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop — separated element so blur only composites once */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl border border-white/10 no-scrollbar"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <FaTimes size={14} />
        </button>

        {/* Image carousel */}
        <div className="relative h-56 md:h-80 overflow-hidden rounded-t-3xl bg-black/50">
          <AnimatePresence mode="wait">
            <motion.img
              key={imgIdx}
              src={project.images[imgIdx] || project.image}
              alt={project.title}
              loading="eager"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          {project.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`h-2 rounded-full transition-all ${i === imgIdx ? 'bg-white w-6' : 'bg-white/40 w-2'}`}
                />
              ))}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className="text-xs font-fira text-primary/80 uppercase tracking-widest">{project.category}</span>
            <h2 className="font-syne text-2xl md:text-3xl font-bold text-white mt-1">{project.title}</h2>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span key={t} className="text-xs glass border border-white/10 rounded-full px-3 py-1 text-gray-300 font-fira">{t}</span>
            ))}
          </div>

          <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                  tab === t ? 'bg-primary text-white' : 'text-gray-500 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {tab === 'overview'    && <p className="text-gray-400 leading-relaxed">{project.longDescription}</p>}
              {tab === 'features'   && (
                <ul className="space-y-3">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400">
                      <span className="text-primary mt-1 shrink-0">✓</span>{f}
                    </li>
                  ))}
                </ul>
              )}
              {tab === 'challenges' && <p className="text-gray-400 leading-relaxed">{project.challenges}</p>}
              {tab === 'solution'   && <p className="text-gray-400 leading-relaxed">{project.solution}</p>}
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-4 mt-8">
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 glass px-5 py-2.5 rounded-full text-sm text-white border border-white/10 hover:border-primary/50 transition-colors">
              <FaGithub /> GitHub
            </a>
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary px-5 py-2.5 rounded-full text-sm text-white font-semibold hover:bg-primary-light transition-colors shadow-glow-blue">
              <FaExternalLinkAlt size={12} /> Live Demo
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});
ProjectModal.displayName = 'ProjectModal';

// ── Project Card — memoized, no layout prop ────────────────────────────────────
const ProjectCard = memo(({ project, onClick }) => {
  const handleClick = useCallback(() => onClick(project), [project, onClick]);

  return (
    <motion.div
      /* Removed `layout` prop — eliminated expensive grid relayout on filter */
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="project-card glass-card rounded-3xl overflow-hidden border border-white/5 group cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative h-52 overflow-hidden bg-black/50">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {project.featured && (
          <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs font-semibold text-primary border border-primary/30">
            ★ Featured
          </div>
        )}
        <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 text-xs text-gray-400 border border-white/10">
          {project.year}
        </div>

        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="glass px-5 py-2.5 rounded-full text-white text-sm font-semibold border border-white/20 -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            View Case Study →
          </span>
        </div>
      </div>

      <div className="p-6">
        <span className="text-xs font-fira text-primary/70 uppercase tracking-widest">{project.category}</span>
        <h3 className="font-syne text-xl font-bold text-white mt-1 mb-2 group-hover:text-gradient transition-all duration-500">
          {project.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="text-xs bg-white/5 border border-white/8 rounded-full px-2.5 py-0.5 text-gray-400 font-fira">
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-xs text-gray-600 px-2.5 py-0.5">+{project.tech.length - 4}</span>
          )}
        </div>

        <div className="flex gap-3 pt-2 border-t border-white/5">
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors">
            <FaGithub size={13} /> Code
          </a>
          <a href={project.live} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary transition-colors">
            <FaExternalLinkAlt size={11} /> Live
          </a>
        </div>
      </div>
    </motion.div>
  );
});
ProjectCard.displayName = 'ProjectCard';

// ── Main Section ───────────────────────────────────────────────────────────────
const Projects = () => {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  // useMemo — filter only recomputes when category or search changes
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return projects.filter((p) => {
      const matchCat = category === 'All' || p.category === category;
      const matchSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [category, search]);

  const handleSelect   = useCallback((p) => setSelected(p), []);
  const handleDeselect = useCallback(() => setSelected(null), []);

  return (
    <section id="projects" className="relative py-24 md:py-36 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute right-0 bottom-1/4 w-[500px] h-[500px] bg-secondary/8 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-fira text-sm mb-3 tracking-widest uppercase">04 — Projects</motion.p>
          <motion.h2 variants={fadeInUp} className="font-syne text-4xl md:text-6xl font-bold text-white">
            Shipped <span className="text-gradient">Products.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-500 mt-4 max-w-xl mx-auto">
            Real-world applications built with care — each one solving a problem, learning something new.
          </motion.p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                  category === cat
                    ? 'bg-primary text-white shadow-glow-blue'
                    : 'glass text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={13} />
            <input
              type="text"
              placeholder="Search projects or tech..."
              defaultValue={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full glass border border-white/10 rounded-full pl-10 pr-10 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-primary/50 transition-colors bg-transparent"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white">
                <FaTimes size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Grid — NO layout prop */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={handleSelect} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-600">
            <p className="text-4xl mb-4">🔍</p>
            <p>No projects found. Try a different search.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={handleDeselect} />}
      </AnimatePresence>

      {/* CSS hover lift for cards — no JS animation on hover */}
      <style>{`
        .project-card {
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .project-card:hover {
          transform: translateY(-8px) translateZ(0);
          box-shadow: 0 30px 60px rgba(37,99,235,0.15), 0 0 0 1px rgba(37,99,235,0.2);
        }
      `}</style>
    </section>
  );
};

export default Projects;
