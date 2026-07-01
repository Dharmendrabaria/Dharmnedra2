import React, { useRef, Suspense, memo, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { TypeAnimation } from 'react-type-animation';
import { FaDownload, FaArrowRight, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';
import { SITE } from '../../utils/constants';

// ── Three.js particle field — memoized so canvas never re-mounts ────────────
const ParticleField = memo(() => {
  const starsRef = useRef();
  useFrame((_, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.x -= delta * 0.03;
      starsRef.current.rotation.y -= delta * 0.04;
    }
  });
  return (
    <Stars
      ref={starsRef}
      radius={80}
      depth={50}
      count={1500}       // ← reduced from 2000 — further halves GPU draw calls
      factor={3}
      saturation={0}
      fade
      speed={0.5}
    />
  );
});
ParticleField.displayName = 'ParticleField';

// ── Mouse spotlight — RAF-throttled, direct DOM ref, zero React re-renders ──
const MouseSpotlight = memo(() => {
  const spotRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    let lastX = 0, lastY = 0;

    const update = () => {
      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(600px circle at ${lastX}px ${lastY}px, rgba(37,99,235,0.08), transparent 60%)`;
      }
      rafIdRef.current = null;
    };

    const handler = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      // Throttle to one update per animation frame
      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener('mousemove', handler, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handler);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <div
      ref={spotRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
});
MouseSpotlight.displayName = 'MouseSpotlight';

// ── Floating code card — static, no motion needed ───────────────────────────
const CodeCard = memo(({ className, code, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: 'spring', stiffness: 150, damping: 20 }}
    className={`absolute glass-card rounded-xl p-4 font-fira text-xs border border-white/10 pointer-events-none ${className}`}
  >
    <pre className="text-green-400 whitespace-pre">{code}</pre>
  </motion.div>
));
CodeCard.displayName = 'CodeCard';

// ── Tech orbit badges — pre-compute positions at module level ────────────────
const ORBIT_TECHS = [
  { name: 'React',    emoji: '⚛️', angle: 0   },
  { name: 'Node.js',  emoji: '🟩', angle: 51  },
  { name: 'MongoDB',  emoji: '🍃', angle: 102 },
  { name: 'TS',       emoji: '🔷', angle: 153 },
  { name: 'TW',       emoji: '🎨', angle: 204 },
  { name: 'Git',      emoji: '🔀', angle: 255 },
  { name: 'Three.js', emoji: '🌐', angle: 306 },
].map((tech) => {
  const rad = (tech.angle * Math.PI) / 180;
  const r = 46;
  return {
    ...tech,
    tx: 50 + r * Math.cos(rad),
    ty: 50 + r * Math.sin(rad),
  };
});

// ── Orbit badge — memoized to prevent re-render on parent scroll ────────────
const OrbitBadge = memo(({ name, emoji, angle, tx, ty }) => (
  <motion.div
    className="absolute z-10 glass rounded-xl px-2 py-1 text-xs font-fira border border-white/10 shadow-card"
    style={{ left: `${tx}%`, top: `${ty}%`, transform: 'translate(-50%,-50%)' }}
    animate={{ y: [0, -5, 0] }}
    transition={{ duration: 2 + (angle / 360) * 2, repeat: Infinity, delay: angle / 360 }}
  >
    {emoji} {name}
  </motion.div>
));
OrbitBadge.displayName = 'OrbitBadge';

// Stable type animation sequence — defined outside render to avoid re-creation
const TYPE_SEQUENCE = [
  'Full Stack MERN Developer', 2200,
  'React & Node.js Engineer',  2000,
  'UI/UX Focused Builder',     2000,
  'Problem Solver',            1800,
];

const Hero = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "0px 0px 400px 0px" });
  const { scrollYProgress } = useScroll();
  const heroY       = useTransform(scrollYProgress, [0, 0.4], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const scrollToProjects = useCallback((e) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] flex items-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* 3D Particle BG — paused when off-screen */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas
            frameloop={isInView ? 'always' : 'never'}
            camera={{ position: [0, 0, 1], fov: 75 }}
            gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
            dpr={[1, 1.5]}
          >
            <ParticleField />
          </Canvas>
        </Suspense>
      </div>

      {/* Mouse spotlight — RAF-throttled, DOM-ref based, no state */}
      <MouseSpotlight />

      {/* Ambient blobs — CSS only, GPU-composited via will-change in index.css */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-primary/15 blur-[130px] animate-blob pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-secondary/15 blur-[130px] animate-blob pointer-events-none" style={{ animationDelay: '4s' }} />

      {/* Main content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col lg:flex-row items-center gap-12"
      >
        {/* Left text */}
        <div className="flex-1 text-center lg:text-left">
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 border border-white/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm text-gray-300">Open to Work — Available for Freelance</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-syne text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-[1.05]"
          >
            Dharmendra<br />
            <span className="text-gradient-animate">Baria.</span>
          </motion.h1>

          {/* Type animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-lg md:text-2xl text-gray-400 mb-3 font-light h-9"
          >
            <TypeAnimation
              sequence={TYPE_SEQUENCE}
              speed={55}
              repeat={Infinity}
              className="text-white font-medium"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="text-gray-500 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            Building premium digital products with the MERN stack. B.Tech IT student who obsesses over performance, clean code, and pixel-perfect UI.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="group flex items-center gap-2 px-7 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-glow-blue hover:shadow-glow-blue hover:scale-105"
            >
              View Projects
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={14} />
            </a>
            <a
              href={SITE.resumeURL}
              download
              className="flex items-center gap-2 px-7 py-3.5 glass rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-105"
            >
              <FaDownload size={14} /> Resume
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 glass rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300 border border-white/20 hover:border-green-500/50 hover:scale-105"
            >
              <FaWhatsapp size={14} className="text-green-400" /> Let's Talk
            </a>
          </motion.div>

          {/* Social strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="flex items-center gap-5 mt-10 justify-center lg:justify-start"
          >
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 text-sm">
              <FaGithub size={18} /> GitHub
            </a>
            <div className="w-1 h-1 rounded-full bg-gray-700" />
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 text-sm">
              <FaLinkedin size={18} /> LinkedIn
            </a>
          </motion.div>
        </div>

        {/* Right visual — hexagonal photo + orbit */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1, type: 'spring', stiffness: 120, damping: 20 }}
          className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 shrink-0 hidden md:flex items-center justify-center"
        >
          {/* Orbit ring */}
          <div className="absolute inset-0 rounded-full border border-white/5 animate-spin-slow" />
          <div className="absolute inset-4 rounded-full border border-dashed border-white/5" />

          {/* Orbiting tech badges — memoized, pre-computed positions */}
          {ORBIT_TECHS.map((tech) => (
            <OrbitBadge key={tech.name} {...tech} />
          ))}

          {/* Hexagonal developer avatar */}
          <div className="relative w-44 h-44 md:w-56 md:h-56">
            <div className="clip-hex w-full h-full bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/20 p-[2px]">
              <div className="clip-hex w-full h-full bg-[#0D0D0D] flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="font-syne text-6xl font-bold text-gradient">DB</span>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 clip-hex shadow-glow-blue opacity-40 pointer-events-none" />
          </div>

          {/* Floating code cards */}
          <CodeCard
            className="hidden lg:block -top-10 -left-16 w-44"
            code={`const dev = {\n  name: "Dharmendra",\n  stack: "MERN"\n}`}
            delay={1.2}
          />
          <CodeCard
            className="hidden lg:block -bottom-8 -right-12 w-36"
            code={`npm start\n✓ Serving...\nPort: 3000`}
            delay={1.5}
          />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-gray-600 text-xs uppercase tracking-[0.3em] font-fira">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-gray-600 hover:text-white transition-colors"
        >
          <HiArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default memo(Hero);
