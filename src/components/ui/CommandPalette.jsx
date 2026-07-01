import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiUser, FiCode, FiMail, FiDownload, FiGithub, FiLinkedin } from 'react-icons/fi';
import { NAV_LINKS, SITE } from '../../utils/constants';

function scrollTo(href) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

const COMMANDS = [
  { label: 'Go to Home',      action: () => scrollTo('#home'),         icon: FiUser },
  { label: 'Go to About',     action: () => scrollTo('#about'),        icon: FiUser },
  { label: 'Go to Skills',    action: () => scrollTo('#skills'),       icon: FiCode },
  { label: 'Go to Projects',  action: () => scrollTo('#projects'),     icon: FiCode },
  { label: 'Go to Contact',   action: () => scrollTo('#contact'),      icon: FiMail },
  { label: 'Download Resume', action: () => window.open(SITE.resumeURL, '_blank'), icon: FiDownload },
  { label: 'Open GitHub',     action: () => window.open(SITE.github, '_blank'),    icon: FiGithub },
  { label: 'Open LinkedIn',   action: () => window.open(SITE.linkedin, '_blank'),  icon: FiLinkedin },
  { label: 'Send Email',      action: () => window.open(`mailto:${SITE.email}`),   icon: FiMail },
];

const CommandPalette = memo(({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // useMemo — only recompute when query changes
  const filtered = useMemo(() =>
    COMMANDS.filter((c) => c.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  useEffect(() => {
    if (open) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  const run = (cmd) => { cmd.action(); onClose(); };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[160] w-full max-w-xl"
          >
            <div className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.8)]">
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b border-white/5">
                <FiSearch className="text-gray-500 shrink-0" size={18} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent text-white placeholder-gray-600 text-sm outline-none font-inter"
                />
                <kbd className="text-gray-600 text-xs border border-white/10 rounded px-1.5 py-0.5 font-fira shrink-0">ESC</kbd>
              </div>

              {/* Commands List */}
              <div className="max-h-72 overflow-y-auto p-2 no-scrollbar">
                {filtered.length === 0 && (
                  <p className="text-gray-600 text-sm text-center py-6">No commands found</p>
                )}
                {filtered.map((cmd, i) => (
                  <motion.button
                    key={cmd.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => run(cmd)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-white/5 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary/40 transition-colors">
                      <cmd.icon size={14} className="text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{cmd.label}</span>
                  </motion.button>
                ))}
              </div>

              <div className="px-4 py-2 border-t border-white/5 flex items-center gap-4 text-[11px] text-gray-600 font-fira">
                <span><kbd className="border border-white/10 rounded px-1">↑↓</kbd> navigate</span>
                <span><kbd className="border border-white/10 rounded px-1">↵</kbd> select</span>
                <span><kbd className="border border-white/10 rounded px-1">esc</kbd> close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
CommandPalette.displayName = 'CommandPalette';

export default CommandPalette;
