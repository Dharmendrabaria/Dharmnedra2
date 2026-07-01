import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaArrowRight, FaCode, FaEnvelope, FaFileDownload, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SITE, NAV_LINKS } from '../../utils/constants';
import projects from '../../data/projects';

import { triggerEasterEgg } from './EasterEggs';

const ACTIONS = [
  { id: 'home', label: 'Go to Home', section: 'Navigation', action: () => document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'projects', label: 'Go to Projects', section: 'Navigation', action: () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'skills', label: 'Go to Skills', section: 'Navigation', action: () => document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'contact', label: 'Go to Contact', section: 'Navigation', action: () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'resume', label: 'Download Resume', icon: FaFileDownload, section: 'Links', action: () => window.open(SITE.resumeURL, '_blank') },
  { id: 'email', label: 'Send Email', icon: FaEnvelope, section: 'Links', action: () => window.open(`mailto:${SITE.email}`, '_blank') },
  { id: 'github', label: 'GitHub Profile', icon: FaGithub, section: 'Links', action: () => window.open(SITE.github, '_blank') },
  { id: 'linkedin', label: 'LinkedIn Profile', icon: FaLinkedin, section: 'Links', action: () => window.open(SITE.linkedin, '_blank') },
  { id: 'devmode', label: 'Toggle Developer Mode', icon: FaCode, section: 'System', action: () => document.body.classList.toggle('dev-mode') },
  { id: 'matrix', label: 'Matrix Easter Egg', section: 'System', action: () => triggerEasterEgg('matrix') },
  { id: 'coffee', label: 'Coffee Time', section: 'System', action: () => triggerEasterEgg('coffee') },
];

const CommandPalette = memo(({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Combine actions and projects
  const items = [
    ...ACTIONS,
    ...projects.map(p => ({
      id: `proj-${p.id}`,
      label: `Project: ${p.title}`,
      section: 'Projects',
      action: () => {
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
        // Can emit event to open project modal if needed
      }
    }))
  ].filter(item => item.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      setSelectedIndex(0);
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          onClose(true); // Assuming onClose actually toggles or takes a state in parent
        }
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < items.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter' && items[selectedIndex]) {
        e.preventDefault();
        items[selectedIndex].action();
        onClose(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, items, selectedIndex, onClose]);

  // Reset selection on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[1000] flex items-start justify-center pt-[15vh] px-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => onClose(false)} />

          {/* Palette */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-2xl bg-[#0D0D0D]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: '60vh' }}
          >
            {/* Search Input */}
            <div className="flex items-center px-4 border-b border-white/10">
              <FaSearch className="text-gray-500 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search commands, projects, or sections..."
                className="w-full bg-transparent text-white font-inter text-lg py-5 outline-none placeholder-gray-600"
              />
              <div className="flex items-center gap-1 text-[10px] font-jetbrains text-gray-500 bg-white/5 px-2 py-1 rounded">
                ESC to close
              </div>
            </div>

            {/* Results */}
            <div className="overflow-y-auto p-2" style={{ maxHeight: 'calc(60vh - 70px)' }}>
              {items.length === 0 ? (
                <div className="py-12 text-center text-gray-500 font-inter text-sm">
                  No results found for "{query}"
                </div>
              ) : (
                items.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onClick={() => { item.action(); onClose(false); }}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                        isSelected ? 'bg-primary/20 text-white' : 'text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon ? <item.icon className={isSelected ? 'text-primary' : 'text-gray-500'} /> : <FaArrowRight className={isSelected ? 'text-primary' : 'text-gray-600'} size={12} />}
                        <span className="font-inter text-sm font-medium">{item.label}</span>
                      </div>
                      <span className="text-[10px] font-jetbrains uppercase tracking-widest text-gray-600">
                        {item.section}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
CommandPalette.displayName = 'CommandPalette';

export default CommandPalette;
