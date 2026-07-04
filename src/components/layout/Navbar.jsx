import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, SITE } from '../../utils/constants';

const Navbar = memo(({ onCommandOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');

  const sectionsRef = useRef([]);
  const rafRef = useRef(null);
  const scrolledRef = useRef(false);
  const activeRef = useRef('Home');

  useEffect(() => {
    // 1. Navbar background scroll effect
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const isScrolled = window.scrollY > 60;
        if (isScrolled !== scrolledRef.current) {
          scrolledRef.current = isScrolled;
          setScrolled(isScrolled);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // 2. Active section tracking via IntersectionObserver (Zero layout thrashing)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const link = NAV_LINKS.find(l => l.href === `#${id}`);
          if (link) setActive(link.label);
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    const observed = new Set();
    const observeInterval = setInterval(() => {
      NAV_LINKS.forEach(link => {
        if (!observed.has(link.href)) {
          const el = document.querySelector(link.href);
          if (el) {
            observer.observe(el);
            observed.add(link.href);
          }
        }
      });
    }, 1000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearInterval(observeInterval);
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleNav = useCallback((href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-premium border-b border-white/5 py-3' : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNav('#home'); }}
            className="relative group flex items-center"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent p-px mr-3">
              <div className="w-full h-full bg-[#080808] rounded-[7px] flex items-center justify-center font-grotesk font-bold text-white text-sm">
                DB
              </div>
            </div>
            <span className="font-grotesk text-xl font-bold text-white tracking-tight hidden sm:block">
              Dharmendra Baria
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1.5 relative glass rounded-full px-2 py-1.5 border border-white/6">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => { e.preventDefault(); handleNav(href); }}
                className="relative px-4 py-1.5 text-sm font-medium transition-colors duration-300 group"
              >
                {active === label && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className={`relative z-10 transition-colors font-grotesk ${active === label ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                  {label}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={onCommandOpen}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="hidden md:flex items-center gap-2 glass rounded-full px-4 py-2 text-xs text-gray-400 hover:text-white transition-all border border-white/10 hover:border-white/20 hover:bg-white/5 cursor-pointer"
              title="Search Portfolio (Ctrl+K)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <kbd className="font-jetbrains px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-500">Ctrl K</kbd>
            </motion.button>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNav('#contact'); }}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                boxShadow: '0 0 20px rgba(37,99,235,0.3)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Available
            </a>

            <button
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} className="block w-6 h-px bg-white" />
              <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.3 }} className="block w-6 h-px bg-white" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} className="block w-6 h-px bg-white" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-[#080808]/90 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  onClick={(e) => { e.preventDefault(); handleNav(href); }}
                  className="font-grotesk text-4xl font-bold text-white hover:text-gradient transition-all duration-300"
                >
                  {label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 text-xs text-gray-500 font-jetbrains tracking-widest"
            >
              {SITE.email}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
Navbar.displayName = 'Navbar';

export default Navbar;
