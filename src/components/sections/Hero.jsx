import React, { useRef, Suspense, memo, useEffect, useCallback, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { TypeAnimation } from 'react-type-animation';
import { FaDownload, FaArrowRight, FaGithub, FaLinkedin, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';
import { SITE, STATS } from '../../utils/constants';

// ── Stars field ─────────────────────────────────────────────────────────────
const StarField = memo(() => {
  const ref = useRef();
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.x -= d * 0.02;
      ref.current.rotation.y -= d * 0.03;
    }
  });
  return <Stars ref={ref} radius={90} depth={60} count={1200} factor={2.5} saturation={0} fade speed={0.4} />;
});
StarField.displayName = 'StarField';

// ── Mouse-following spotlight (RAF-throttled, zero re-renders) ──────────────
const Spotlight = memo(() => {
  const ref = useRef(null);
  const raf = useRef(null);
  useEffect(() => {
    let lx = 0, ly = 0;
    const tick = () => {
      if (ref.current)
        ref.current.style.background = `radial-gradient(700px circle at ${lx}px ${ly}px, rgba(37,99,235,0.07) 0%, rgba(124,58,237,0.03) 40%, transparent 70%)`;
      raf.current = null;
    };
    const move = (e) => { lx = e.clientX; ly = e.clientY; if (!raf.current) raf.current = requestAnimationFrame(tick); };
    window.addEventListener('mousemove', move, { passive: true });
    return () => { window.removeEventListener('mousemove', move); if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);
  return <div ref={ref} className="absolute inset-0 z-0 pointer-events-none transition-none" />;
});
Spotlight.displayName = 'Spotlight';

// ── Live clock ───────────────────────────────────────────────────────────────
const LiveClock = memo(() => {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="font-jetbrains text-xs text-gray-500">
      {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })} IST
    </span>
  );
});
LiveClock.displayName = 'LiveClock';

// ── Floating stat card ───────────────────────────────────────────────────────
const StatPill = memo(({ value, label, color = 'primary', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, type: 'spring', stiffness: 200, damping: 20 }}
    className="glass-premium rounded-2xl px-5 py-3 flex items-center gap-3"
  >
    <span className={`text-2xl font-grotesk font-bold text-${color === 'primary' ? 'primary' : color === 'purple' ? 'secondary' : 'accent'}`}>{value}</span>
    <span className="text-xs text-gray-500 leading-tight max-w-[5rem]">{label}</span>
  </motion.div>
));
StatPill.displayName = 'StatPill';

// ── Code editor card ─────────────────────────────────────────────────────────
const CODE_LINES = [
  { text: 'const developer = {', color: 'text-blue-400' },
  { text: "  name: 'Dharmendra Baria',", color: 'text-green-400' },
  { text: "  stack: 'MERN',", color: 'text-yellow-400' },
  { text: "  status: 'open_to_work',", color: 'text-emerald-400' },
  { text: "  passion: 'shipping_fast',", color: 'text-purple-400' },
  { text: '};', color: 'text-blue-400' },
];

const CodeCard = memo(() => {
  const [visibleLines, setVisibleLines] = useState(0);
  useEffect(() => {
    if (visibleLines >= CODE_LINES.length) return;
    const t = setTimeout(() => setVisibleLines(v => v + 1), 180);
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, rotate: 3 }}
      animate={{ opacity: 1, x: 0, rotate: 1 }}
      transition={{ delay: 1.4, duration: 1, type: 'spring', stiffness: 120, damping: 20 }}
      className="glass-premium rounded-2xl overflow-hidden border border-white/8 shadow-premium w-72 pointer-events-none"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-gray-600 text-xs font-jetbrains ml-2">developer.js</span>
      </div>
      {/* Code */}
      <div className="p-4 font-jetbrains text-xs leading-6 space-y-0.5">
        {CODE_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={`${line.color}`}>{line.text}</div>
        ))}
        {visibleLines < CODE_LINES.length && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="inline-block w-1.5 h-4 bg-primary align-middle ml-0.5"
          />
        )}
      </div>
    </motion.div>
  );
});
CodeCard.displayName = 'CodeCard';

// ── GitHub activity card ─────────────────────────────────────────────────────
const GithubCard = memo(() => (
  <motion.div
    initial={{ opacity: 0, x: -40, rotate: -2 }}
    animate={{ opacity: 1, x: 0, rotate: -1 }}
    transition={{ delay: 1.6, duration: 1, type: 'spring', stiffness: 120, damping: 20 }}
    className="glass-premium rounded-2xl p-4 border border-white/8 w-56 pointer-events-none"
  >
    <div className="flex items-center gap-2 mb-3">
      <FaGithub size={14} className="text-white" />
      <span className="text-xs text-gray-400 font-grotesk font-medium">GitHub Activity</span>
    </div>
    {/* Mini contribution grid */}
    <div className="grid grid-cols-7 gap-0.5">
      {Array.from({ length: 35 }).map((_, i) => {
        const intensity = Math.random();
        return (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-sm"
            style={{
              background: intensity > 0.7
                ? `rgba(37,99,235,${0.4 + intensity * 0.6})`
                : intensity > 0.4
                  ? `rgba(124,58,237,${0.2 + intensity * 0.4})`
                  : 'rgba(255,255,255,0.05)',
            }}
          />
        );
      })}
    </div>
    <p className="text-[10px] text-gray-600 mt-2 font-jetbrains">1,000+ hours coded</p>
  </motion.div>
));
GithubCard.displayName = 'GithubCard';

// ── Tech orbit ring ──────────────────────────────────────────────────────────
const ORBIT_ICONS = ['⚛️', '🟩', '🍃', '🔷', '🎨', '🔀'];
const OrbitRing = memo(() => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Outer rotating ring */}
    <div className="absolute inset-0 rounded-full border border-white/5 animate-spin-slow" />
    <div className="absolute inset-4 rounded-full border border-dashed border-white/[0.04] animate-spin-reverse" />

    {ORBIT_ICONS.map((icon, i) => {
      const angle = (i / ORBIT_ICONS.length) * 360;
      const rad = (angle * Math.PI) / 180;
      const r = 44;
      return (
        <motion.div
          key={i}
          className="absolute z-10 glass rounded-xl px-2 py-1 text-xs border border-white/8"
          style={{
            left: `${50 + r * Math.cos(rad)}%`,
            top: `${50 + r * Math.sin(rad)}%`,
            transform: 'translate(-50%,-50%)',
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {icon}
        </motion.div>
      );
    })}

    {/* Center avatar */}
    <div className="relative w-44 h-44 md:w-52 md:h-52 flex items-center justify-center">
      <div className="clip-hex w-full h-full bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/20 p-[2px]">
        <div className="clip-hex w-full h-full bg-[#080808] flex items-center justify-center">
          <span className="font-grotesk text-5xl font-bold text-gradient">DB</span>
        </div>
      </div>
      {/* Glow ring */}
      <div className="absolute inset-0 clip-hex" style={{ boxShadow: '0 0 40px rgba(37,99,235,0.25)', pointerEvents: 'none' }} />
    </div>
  </div>
));
OrbitRing.displayName = 'OrbitRing';

// ── Type animation sequence ──────────────────────────────────────────────────
const TYPE_SEQ = [
  'Full Stack MERN Developer.', 2400,
  'React & Node.js Engineer.', 2000,
  'UI/UX Focused Builder.', 2000,
  'Problem Solver.', 1800,
  'Creative Engineer.', 1800,
];

// ── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], ['0%', '18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  // Track hero visibility for 3D frameloop
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollToProjects = useCallback((e) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* ── 3D star field ── */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas
            frameloop={inView ? 'always' : 'never'}
            camera={{ position: [0, 0, 1], fov: 75 }}
            gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
            dpr={[1, 1.5]}
          >
            <StarField />
          </Canvas>
        </Suspense>
      </div>

      {/* ── Aurora background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none aurora-bg" />

      {/* ── Mouse spotlight ── */}
      <Spotlight />

      {/* ── Ambient blobs ── */}
      <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[160px] animate-blob pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[160px] animate-blob pointer-events-none" style={{ animationDelay: '5s' }} />

      {/* ── Main content ── */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-24 pb-12"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left column ── */}
          <div className="flex flex-col items-start">

            {/* Status bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="flex items-center gap-3 flex-wrap mb-8"
            >
              {/* Open to work badge */}
              <div className="inline-flex items-center gap-2 glass-premium rounded-full px-4 py-2 border border-green-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs text-green-400 font-medium">Open to Work</span>
              </div>
              {/* Location */}
              <div className="inline-flex items-center gap-1.5 glass-premium rounded-full px-3 py-2">
                <FaMapMarkerAlt size={10} className="text-gray-500" />
                <span className="text-xs text-gray-500">Gujarat, India</span>
              </div>
              {/* Live clock */}
              <div className="glass-premium rounded-full px-3 py-2">
                <LiveClock />
              </div>
            </motion.div>

            {/* Main headline — clipped reveal */}
            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="font-grotesk text-5xl md:text-7xl font-bold text-white leading-[1.02] tracking-tight"
              >
                Building
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="font-grotesk text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight"
              >
                <span className="text-gradient-animate">scalable digital</span>
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="font-grotesk text-5xl md:text-7xl font-bold text-white leading-[1.02] tracking-tight"
              >
                experiences.
              </motion.h1>
            </div>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.7 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-[1px] bg-primary/60" />
              <div className="text-base text-gray-400 font-inter h-7 flex items-center">
                <TypeAnimation
                  sequence={TYPE_SEQ}
                  speed={60}
                  repeat={Infinity}
                  className="text-white font-medium"
                />
              </div>
            </motion.div>

            {/* Value prop */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="text-gray-500 max-w-md mb-10 leading-relaxed text-[15px]"
            >
              B.Tech IT student obsessed with performance, clean code & pixel-perfect UI.
              I turn ideas into premium MERN-stack products.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <a href="#projects" onClick={scrollToProjects} className="btn-primary">
                View My Work <FaArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href={SITE.resumeURL} download className="btn-glass">
                <FaDownload size={13} /> Resume
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-glass">
                <FaWhatsapp size={13} className="text-green-400" /> Let's Talk
              </a>
            </motion.div>

            {/* Social + stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <a href={SITE.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-white transition-colors link-hover">
                <FaGithub size={16} /> GitHub
              </a>
              <div className="w-px h-4 bg-white/10" />
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors link-hover">
                <FaLinkedin size={16} /> LinkedIn
              </a>
            </motion.div>
          </div>

          {/* ── Right column ── */}
          <div className="hidden lg:block relative h-[580px]">
            {/* Orbit ring + avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 1.2, type: 'spring', stiffness: 80, damping: 20 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative w-80 h-80">
                <OrbitRing />
              </div>
            </motion.div>

            {/* Floating code card — top right */}
            <div className="absolute top-6 right-0">
              <CodeCard />
            </div>

            {/* Floating GitHub card — bottom left */}
            <div className="absolute bottom-16 left-0">
              <GithubCard />
            </div>

            {/* Stat pills — stacked right */}
            <div className="absolute bottom-10 right-4 flex flex-col gap-2">
              <StatPill value="15+" label="Projects built" color="primary" delay={1.7} />
              <StatPill value="20+" label="Technologies" color="purple" delay={1.85} />
              <StatPill value="2+" label="Years learning" color="cyan" delay={2.0} />
            </div>
          </div>
        </div>

        {/* ── Mobile stat pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="flex gap-3 flex-wrap mt-8 lg:hidden"
        >
          <StatPill value="15+" label="Projects" color="primary" delay={1.5} />
          <StatPill value="20+" label="Technologies" color="purple" delay={1.6} />
          <StatPill value="2+" label="Years" color="cyan" delay={1.7} />
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-gray-700 text-[10px] uppercase tracking-[0.4em] font-jetbrains">scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-gray-700"
        >
          <HiArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default memo(Hero);
