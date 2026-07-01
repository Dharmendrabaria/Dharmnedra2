import React, { memo, useRef, useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import projectsData from '../../data/projects';

// Limit to top 5 projects for the showcase
const SHOWCASE_PROJECTS = projectsData.slice(0, 5);

const Projects = memo(() => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Use IntersectionObserver on spacer elements to update active index
  // Threshold 0.5 means it triggers when spacer is halfway in view
  useEffect(() => {
    const observers = [];
    const elements = document.querySelectorAll('.project-scroll-spacer');

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      { root: null, rootMargin: '-30% 0px -30% 0px', threshold: 0 }
    );

    elements.forEach((el) => {
      observer.observe(el);
      observers.push(el);
    });

    return () => {
      observers.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <section id="projects" ref={containerRef} className="relative w-full" style={{ background: '#080808' }}>

      {/* ── Sticky Storytelling Container ── */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center z-10 pointer-events-none">

        {/* Optimized Static Ambient background (No moving blurs) */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, #111 0%, #080808 100%)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center pointer-events-auto relative z-10 h-[90vh] md:h-[80vh]">

          {/* Left: Project Info */}
          <div className="h-full relative flex flex-col justify-center pr-14 lg:pr-0">
            {/* Header */}
            <div className="absolute top-0 left-0 pt-28 md:pt-8">
              <p className="section-label mb-2">04 — Projects</p>
              <h2 className="heading-lg text-3xl">Selected <span className="text-gradient">Work.</span></h2>
            </div>

            <div className="mt-24 h-full relative">
              {SHOWCASE_PROJECTS.map((project, i) => {
                const isActive = i === activeIndex;
                return (
                  <div
                    key={project.id}
                    className="absolute inset-0 flex flex-col justify-center max-w-lg transition-all duration-700 ease-[0.16,1,0.3,1] will-change-transform"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translate3d(0,0,0)' : `translate3d(0, ${i < activeIndex ? '-40px' : '40px'}, 0)`,
                      pointerEvents: isActive ? 'auto' : 'none',
                      zIndex: isActive ? 10 : 0
                    }}
                  >
                    <span className="text-xs font-jetbrains text-primary/80 uppercase tracking-widest mb-3 block">
                      {project.category}
                    </span>
                    <h3 className="font-grotesk text-4xl md:text-5xl font-bold text-white mb-6">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed mb-8">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-10">
                      {project.tech.map(t => (
                        <span key={t} className="tag text-[11px]">{t}</span>
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

            {/* Progress indicators (CSS only transitions) */}
            <div className="absolute bottom-0 left-0 flex gap-3 pb-8">
              {SHOWCASE_PROJECTS.map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full overflow-hidden transition-all duration-500 ease-out"
                  style={{
                    width: i === activeIndex ? '32px' : '8px',
                    background: i === activeIndex ? '#2563eb' : 'rgba(255,255,255,0.1)'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: MacBook Mockup */}
          <div className="hidden lg:flex items-center justify-center h-full relative">
            <div className="relative w-full max-w-2xl" data-cursor="VIEW CASE STUDY">
              {/* Fake MacBook Frame */}
              <div className="relative pt-[62%] w-full rounded-2xl bg-[#1a1a1a] border border-[#333] shadow-2xl overflow-hidden transform-gpu translate-z-0">
                <div className="absolute top-0 left-0 right-0 h-4 bg-[#222] flex items-center justify-center border-b border-[#333] z-20">
                  <div className="w-1.5 h-1.5 rounded-full bg-black/50" />
                </div>

                {/* Screen Content - Render all images and toggle opacity (Hardware accelerated) */}
                <div className="absolute top-4 left-0 right-0 bottom-0 bg-black overflow-hidden z-10">
                  {SHOWCASE_PROJECTS.map((project, i) => (
                    <img
                      key={`img-${project.id}`}
                      src={project.image}
                      alt={project.title}
                      loading={i === 0 ? "eager" : "lazy"} // Lazy load offscreen images
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-[0.16,1,0.3,1] will-change-transform"
                      style={{
                        opacity: i === activeIndex ? 1 : 0,
                        transform: i === activeIndex ? 'scale(1) translateZ(0)' : 'scale(1.05) translateZ(0)',
                        zIndex: i === activeIndex ? 10 : 0
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
          </div>

        </div>
      </div>

      {/* ── Scroll Spacers ── */}
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
