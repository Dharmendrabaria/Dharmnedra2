import React, { memo, useRef, useState, useEffect, useCallback } from 'react';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import projectsData from '../../data/projects';
import { on, emit } from '../../utils/events';

const SHOWCASE_PROJECTS = projectsData.slice(0, 5);

// ── MacBook Mockup with Video/Image Preview ────────────────────────────────
const MacbookMockup = memo(({ projects, activeIndex, filterTech }) => {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const videoRefs = useRef([]);
  const wrapperRef = useRef(null);
  const rafRef = useRef(null);

  // ── Visibility observer to pause videos when off-screen ──────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          videoRefs.current.forEach(v => v?.pause());
        }
      },
      { threshold: 0.1 }
    );
    if (wrapperRef.current) obs.observe(wrapperRef.current);
    return () => obs.disconnect();
  }, []);

  // ── Tab visibility ────────────────────────────────────────────────────────
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) videoRefs.current.forEach(v => v?.pause());
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // ── Play / pause on hover ─────────────────────────────────────────────────
  useEffect(() => {
    const v = videoRefs.current[activeIndex];
    if (!v) return;
    if (hovered) { v.play().catch(() => { }); }
    else { v.pause(); v.currentTime = 0; }
  }, [hovered, activeIndex]);

  // ── 3D Tilt on mouse move (RAF-driven) ───────────────────────────────────
  const onMouseMove = useCallback((e) => {
    if (!wrapperRef.current) return;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const rect = wrapperRef.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: ny * -6, y: nx * 6 });
      setShinePos({ x: (nx + 0.5) * 100, y: (ny + 0.5) * 100 });
    });
  }, []);

  const onMouseEnter = () => setHovered(true);
  const onMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
    setShinePos({ x: 50, y: 50 });
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
  };

  const activeProject = projects[activeIndex];
  const isFiltered = filterTech && activeProject?.tech.some(t => t.toLowerCase().includes(filterTech.toLowerCase()));

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      data-cursor="VIEW CASE STUDY"
      className="relative w-full max-w-2xl"
      style={{
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.1s linear' : 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        willChange: 'transform',
      }}
    >
      {/* MacBook Frame */}
      <div
        className="relative pt-[62%] w-full rounded-2xl bg-[#1a1a1a] border shadow-2xl overflow-hidden transform-gpu"
        style={{
          borderColor: isFiltered ? 'rgba(37,99,235,0.5)' : '#333',
          boxShadow: isFiltered ? '0 0 30px rgba(37,99,235,0.2), 0 25px 60px rgba(0,0,0,0.8)' : '0 25px 60px rgba(0,0,0,0.8)',
          transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
        }}
      >
        {/* Notch bar */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-[#222] flex items-center justify-center border-b border-[#333] z-20">
          <div className="w-1.5 h-1.5 rounded-full bg-black/50" />
        </div>

        {/* Screen */}
        <div className="absolute top-4 left-0 right-0 bottom-0 bg-black overflow-hidden z-10">

          {/* Moving shine reflection on hover */}
          {hovered && (
            <div
              className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,0.04) 0%, transparent 60%)`,
                opacity: 1,
              }}
            />
          )}

          {/* Images (poster) */}
          {projects.map((project, i) => (
            <img
              key={`img-${project.id}`}
              src={project.image}
              alt={project.title}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-top will-change-transform"
              style={{
                opacity: (i === activeIndex && !hovered) || (i === activeIndex && !project.video && hovered) ? 1 : 0,
                transform: i === activeIndex ? 'scale(1) translateZ(0)' : 'scale(1.04) translateZ(0)',
                transition: 'opacity 0.3s ease-out, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                zIndex: i === activeIndex ? 10 : 0,
              }}
            />
          ))}

          {/* Videos (shown on hover if video URL exists) */}
          {projects.map((project, i) => project.video && (
            <video
              key={`vid-${project.id}`}
              ref={el => videoRefs.current[i] = el}
              src={project.video}
              poster={project.image}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover object-top will-change-transform"
              style={{
                opacity: i === activeIndex && hovered ? 1 : 0,
                transition: 'opacity 0.3s ease-out',
                zIndex: i === activeIndex ? 11 : 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* MacBook Base */}
      <div className="w-[110%] h-3 bg-gradient-to-b from-[#444] to-[#111] absolute -bottom-3 -left-[5%] rounded-b-xl border-t border-[#666] shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex justify-center">
        <div className="w-24 h-full bg-[#333] rounded-t-md" />
      </div>
    </div>
  );
});
MacbookMockup.displayName = 'MacbookMockup';

// ── Projects Section ──────────────────────────────────────────────────────
const Projects = memo(() => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [filterTech, setFilterTech] = useState(null);

  // ── Listen for skill filter events ───────────────────────────────────────
  useEffect(() => {
    const unsub = on('skill:filter', ({ tech }) => {
      setFilterTech(tech);
      // Scroll to first matching project
      const firstMatch = SHOWCASE_PROJECTS.findIndex(p =>
        p.tech.some(t => t.toLowerCase().includes(tech.toLowerCase()))
      );
      if (firstMatch >= 0) {
        const spacers = document.querySelectorAll('.project-scroll-spacer');
        spacers[firstMatch]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    return unsub;
  }, []);

  // ── IntersectionObserver for scroll storytelling ──────────────────────────
  useEffect(() => {
    const elements = document.querySelectorAll('.project-scroll-spacer');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.getAttribute('data-index')));
          }
        });
      },
      { root: null, rootMargin: '-30% 0px -30% 0px', threshold: 0 }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const clearFilter = useCallback(() => setFilterTech(null), []);

  const isMatch = useCallback((project) => {
    if (!filterTech) return true;
    return project.tech.some(t => t.toLowerCase().includes(filterTech.toLowerCase()));
  }, [filterTech]);

  return (
    <section id="projects" ref={containerRef} className="relative w-full" style={{ background: '#080808' }}>

      {/* Filter badge */}
      <AnimatePresence>
        {filterTech && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-20 left-1/2 z-50 -translate-x-1/2 flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/30 backdrop-blur-xl text-sm font-inter"
            style={{ background: 'rgba(37,99,235,0.12)' }}
          >
            <span className="text-blue-300 font-medium">Filtering by <strong>{filterTech}</strong></span>
            <button
              onClick={clearFilter}
              className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label="Clear filter"
            >
              <FaTimes size={9} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sticky Panel ── */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center z-10 pointer-events-none">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, #111 0%, #080808 100%)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center pointer-events-auto relative z-10 h-[90vh] md:h-[80vh]">

          {/* Left: Project Info */}
          <div className="h-full relative flex flex-col justify-center pr-4 lg:pr-0">
            <div className="absolute top-0 left-0 pt-28 md:pt-8">
              <p className="section-label mb-2">04 — Projects</p>
              <h2 className="heading-lg text-3xl">Selected <span className="text-gradient">Work.</span></h2>
            </div>

            <div className="mt-24 md:mt-20 h-full relative">
              {SHOWCASE_PROJECTS.map((project, i) => {
                const isActive = i === activeIndex;
                const matched = isMatch(project);
                return (
                  <div
                    key={project.id}
                    className="absolute inset-0 flex flex-col justify-center max-w-lg will-change-transform"
                    style={{
                      opacity: isActive ? (matched ? 1 : 0.35) : 0,
                      transform: isActive ? 'translate3d(0,0,0)' : `translate3d(0,${i < activeIndex ? '-40px' : '40px'},0)`,
                      transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                      pointerEvents: isActive ? 'auto' : 'none',
                      zIndex: isActive ? 10 : 0,
                      filter: (filterTech && !matched && isActive) ? 'grayscale(0.4)' : 'none',
                    }}
                  >
                    <span className="text-xs font-jetbrains text-primary/80 uppercase tracking-widest mb-2 md:mb-3 block">
                      {project.category}
                    </span>
                    <h3 className="font-grotesk text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">{project.title}</h3>
                    
                    {/* Mobile Project Image */}
                    <div className="block lg:hidden w-full h-48 sm:h-64 rounded-xl overflow-hidden mb-5 border border-white/10 relative shadow-xl">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
                    </div>

                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 md:mb-8">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
                      {project.tech.map((t, ti) => (
                        <motion.span
                          key={t}
                          initial={isActive ? { opacity: 0, scale: 0.8 } : false}
                          animate={isActive ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: ti * 0.05, type: 'spring', stiffness: 400, damping: 25 }}
                          className="tag text-[11px]"
                          style={{
                            borderColor: (filterTech && t.toLowerCase().includes(filterTech.toLowerCase()))
                              ? 'rgba(37,99,235,0.6)' : undefined,
                            color: (filterTech && t.toLowerCase().includes(filterTech.toLowerCase()))
                              ? '#93c5fd' : undefined,
                            boxShadow: (filterTech && t.toLowerCase().includes(filterTech.toLowerCase()))
                              ? '0 0 8px rgba(37,99,235,0.3)' : undefined,
                          }}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-glass text-sm py-3 px-6" data-magnetic>
                        <FaGithub size={16} /> Code
                      </a>
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-3 px-6" data-magnetic>
                        <FaExternalLinkAlt size={14} /> Live Demo
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress dots */}
            <div className="absolute bottom-0 left-0 flex gap-3 pb-8">
              {SHOWCASE_PROJECTS.map((proj, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full overflow-hidden transition-all duration-500 ease-out"
                  style={{
                    width: i === activeIndex ? '32px' : '8px',
                    background: i === activeIndex ? '#2563eb' : 'rgba(255,255,255,0.1)',
                    opacity: filterTech && !isMatch(proj) ? 0.25 : 1,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: MacBook */}
          <div className="hidden lg:flex items-center justify-center h-full relative">
            <MacbookMockup
              projects={SHOWCASE_PROJECTS}
              activeIndex={activeIndex}
              filterTech={filterTech}
            />
          </div>
        </div>
      </div>

      {/* Scroll Spacers */}
      <div className="relative w-full" style={{ height: `calc(${SHOWCASE_PROJECTS.length} * max(60vh, 100vh))` }}>
        {SHOWCASE_PROJECTS.map((project, i) => (
          <div
            key={`spacer-${project.id}`}
            data-index={i}
            className="project-scroll-spacer w-full h-[60vh] md:h-[100vh] pointer-events-none invisible"
          />
        ))}
      </div>
    </section>
  );
});
Projects.displayName = 'Projects';
export default Projects;
