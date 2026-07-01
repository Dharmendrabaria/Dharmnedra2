import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/layout/Preloader';
import CustomCursor from './components/layout/CustomCursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgressBar from './components/ui/ScrollProgressBar';
import FloatingDock from './components/ui/FloatingDock';
import CommandPalette from './components/ui/CommandPalette';
import Home from './pages/Home';
import { useKonami } from './hooks/useKonami';
import ConfettiExplosion from './components/ui/ConfettiExplosion';

/**
 * MainContent — isolated from App re-renders caused by loading/confetti state.
 * Only re-renders when commandOpen changes (which is rare).
 */
const MainContent = memo(({ onCommandOpen, commandOpen, onCommandClose }) => (
  <div key="main" className="relative">
    <Navbar onCommandOpen={onCommandOpen} />
    <main>
      <Home />
    </main>
    <Footer />
    <FloatingDock />
    <CommandPalette open={commandOpen} onClose={onCommandClose} />
  </div>
));
MainContent.displayName = 'MainContent';

function App() {
  const [loading, setLoading] = useState(true);
  const [commandOpen, setCommandOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);

  // Stable callback refs — prevent child re-renders
  const handlePreloaderComplete = useCallback(() => setLoading(false), []);
  const handleCommandOpen = useCallback(() => setCommandOpen(true), []);
  const handleCommandClose = useCallback(() => setCommandOpen(false), []);

  // Konami Easter Egg
  useKonami(useCallback(() => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 4000);
  }, []));

  // Keyboard shortcut: Ctrl+K / ⌘K
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen((v) => !v);
      }
      if (e.key === 'Escape') setCommandOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Lenis smooth scroll — synced to GSAP ticker to share a single RAF loop
  // This eliminates the dual-RAF conflict (Lenis RAF vs GSAP RAF)
  useEffect(() => {
    if (loading) return; // Don't init Lenis during preloader

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });

    // Single unified RAF: GSAP ticker drives Lenis — no competing loops
    const onTick = (time) => {
      lenis.raf(time * 1000); // gsap ticker gives seconds, Lenis wants ms
    };
    gsap.ticker.add(onTick);

    // Disable GSAP's internal lagSmoothing so scroll stays buttery
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, [loading]);

  return (
    <>
      <CustomCursor />
      <ScrollProgressBar />
      {confetti && <ConfettiExplosion />}

      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        ) : (
          <MainContent
            key="main"
            onCommandOpen={handleCommandOpen}
            commandOpen={commandOpen}
            onCommandClose={handleCommandClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
