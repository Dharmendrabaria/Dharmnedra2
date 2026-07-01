import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, SITE } from '../../utils/constants';
import { FiTerminal } from 'react-icons/fi';

/**
 * Navbar — performance fixes:
 * 1. Scroll handler runs through RAF — no layout thrash
 * 2. offsetTop values cached after mount — no DOM read on every scroll
 * 3. setScrolled only triggers state if value actually changed
 * 4. setActive only triggers state when section actually changes
 */
const Navbar = memo(({ onCommandOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive]     = useState('Home');

  // Cache section offsets — read once, not on every scroll event
  const sectionsRef   = useRef([]);
  const rafRef        = useRef(null);
  const scrolledRef   = useRef(false);
  const activeRef     = useRef('Home');

  // Measure section positions once after mount (and on resize)
  const measureSections = useCallback(() => {
    sectionsRef.current = NAV_LINKS.map(({ href, label }) => {
      const el = document.querySelector(href);
      return el ? { label, top: el.offsetTop, height: el.offsetHeight } : null;
    }).filter(Boolean);
  }, []);

  useEffect(() => {
    measureSections();
    window.addEventListener('resize', measureSections, { passive: true });

    const onScroll = () => {
      // Throttle via RAF — runs at most once per frame
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const y = window.scrollY;

        // scrolled state — only trigger setState if it changed
        const isScrolled = y > 60;
        if (isScrolled !== scrolledRef.current) {
          scrolledRef.current = isScrolled;
          setScrolled(isScrolled);
        }

        // Scroll spy — use cached positions, no DOM reads
        const scrollY = y + 120;
        for (const s of sectionsRef.current) {
          if (s.top <= scrollY && s.top + s.height > scrollY) {
            if (s.label !== activeRef.current) {
              activeRef.current = s.label;
              setActive(s.label);
            }
            break;
          }
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measureSections);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [measureSections]);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass border-b border-white/5 py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNav('#home'); }}
            className="relative group"
          >
            <span className="font-syne text-2xl font-bold text-white">
              DB<span className="text-gradient">.</span>
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
          </a>

          <nav className="hidden lg:flex items-center gap-1 relative">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => { e.preventDefault(); handleNav(href); }}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 group"
              >
                {active === label && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/8 border border-white/10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className={`relative z-10 transition-colors ${active === label ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                  {label}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onCommandOpen}
              className="hidden md:flex items-center gap-2 glass rounded-lg px-3 py-2 text-xs text-gray-500 hover:text-white transition-colors border border-white/5 hover:border-white/20"
              title="Open Command Palette (Ctrl+K)"
            >
              <FiTerminal size={13} />
              <kbd className="font-fira">⌘K</kbd>
            </button>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNav('#contact'); }}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-primary hover:bg-primary-light transition-all duration-300 text-white shadow-glow-blue hover:scale-105"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Hire Me
            </a>

            <button
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} className="block w-6 h-[1.5px] bg-white" />
              <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.3 }} className="block w-6 h-[1.5px] bg-white" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} className="block w-6 h-[1.5px] bg-white" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 48px) 40px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 48px) 40px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 48px) 40px)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-6">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => { e.preventDefault(); handleNav(href); }}
                  className="font-syne text-4xl font-bold text-white hover:text-gradient transition-all duration-300"
                >
                  {label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 text-sm text-gray-600 font-fira"
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
