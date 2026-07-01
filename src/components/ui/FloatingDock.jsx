import React, { memo, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaArrowUp, FaFilePdf } from 'react-icons/fa';
import { SITE } from '../../utils/constants';

const DOCK_ITEMS = [
  { icon: FaGithub,   href: SITE.github,   label: 'GitHub',   color: '#ffffff' },
  { icon: FaLinkedin, href: SITE.linkedin,  label: 'LinkedIn', color: '#0A66C2' },
  { icon: FaWhatsapp, href: SITE.whatsapp,  label: 'WhatsApp', color: '#25D366' },
  { icon: FaFilePdf,  href: SITE.resumeURL, label: 'Resume',   color: '#EF4444' },
];

const FloatingDock = memo(() => {
  const visibleRef = useRef(false);
  const [visible, setVisible] = React.useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  // Only trigger state when visibility actually changes — ref prevents redundant setState
  useMotionValueEvent(scrollY, "change", (latest) => {
    const isVisible = latest > 300;
    if (isVisible !== visibleRef.current) {
      visibleRef.current = isVisible;
      setVisible(isVisible);
    }
  });

  // Calculate SVG stroke offset directly on motion value — zero React renders
  const dashoffset = useTransform(scrollYProgress, [0, 1], [106.81, 0]); // 2 * Math.PI * 17 = 106.81

  const scrollTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed right-6 bottom-10 z-50 flex flex-col items-center gap-3"
        >
          {DOCK_ITEMS.map(({ icon: Icon, href, label, color }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              whileHover={{ scale: 1.2, x: -6 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors group relative"
            >
              <Icon size={16} style={{ color }} />
              <span className="absolute right-12 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
                {label}
              </span>
            </motion.a>
          ))}

          {/* Divider */}
          <div className="w-[1px] h-6 bg-white/10" />

          {/* Back to top with progress ring */}
          <motion.button
            onClick={scrollTop}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            title="Back to top"
          >
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
              <motion.circle
                cx="20" cy="20" r="17" fill="none"
                stroke="url(#dock-gradient)"
                strokeWidth="2"
                strokeDasharray="106.81"
                style={{ strokeDashoffset: dashoffset }}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="dock-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
            <FaArrowUp size={12} className="relative z-10" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
FloatingDock.displayName = 'FloatingDock';

export default FloatingDock;
