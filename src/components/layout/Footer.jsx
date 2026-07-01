import React, { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowUp } from 'react-icons/fa';
import { SITE, NAV_LINKS } from '../../utils/constants';

const SOCIAL_LINKS = [
  { icon: FaGithub,   href: SITE.github,   label: 'GitHub' },
  { icon: FaLinkedin, href: SITE.linkedin, label: 'LinkedIn' },
  { icon: FaTwitter,  href: SITE.twitter,  label: 'Twitter' },
];

const Footer = memo(() => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNav = useCallback((e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <footer className="relative overflow-hidden pt-24 pb-8" style={{ background: '#050505' }}>
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-primary/5 blur-[120px] pointer-events-none" />

      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & Bio */}
          <div className="lg:col-span-5">
            <a href="#home" onClick={e => handleNav(e, '#home')} className="flex items-center gap-3 mb-6 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent p-px">
                <div className="w-full h-full bg-[#080808] rounded-[11px] flex items-center justify-center font-grotesk font-bold text-white text-lg group-hover:scale-105 transition-transform">
                  DB
                </div>
              </div>
              <div>
                <div className="font-grotesk font-bold text-xl text-white tracking-tight">Dharmendra Baria</div>
                <div className="text-xs text-gray-500 font-jetbrains">Full Stack MERN Developer</div>
              </div>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-8">
              Building premium, performant digital experiences. Focused on UI/UX, scalable architecture, and writing clean, maintainable code.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
                  aria-label={link.label}
                >
                  <link.icon size={16} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-grotesk font-semibold text-white mb-6 text-sm">Navigation</h4>
              <ul className="space-y-4">
                {NAV_LINKS.slice(0, 5).map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={e => handleNav(e, link.href)}
                      className="text-sm text-gray-500 hover:text-white transition-colors relative inline-block group"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-grotesk font-semibold text-white mb-6 text-sm">Resources</h4>
              <ul className="space-y-4">
                <li><a href={SITE.github} className="text-sm text-gray-500 hover:text-white transition-colors">GitHub Profile</a></li>
                <li><a href={SITE.resumeURL} download className="text-sm text-gray-500 hover:text-white transition-colors">Resume (PDF)</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Design System</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Source Code</a></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-grotesk font-semibold text-white mb-6 text-sm">Contact</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">{SITE.email}</a></li>
                <li><a href={SITE.whatsapp} className="hover:text-white transition-colors">{SITE.phone}</a></li>
                <li>Gujarat, India</li>
                <li><span className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full glass border border-green-500/20 text-xs text-green-400"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Available for work</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Large Text Background */}
        <div className="relative mb-8 pt-8 border-t border-white/5 overflow-hidden flex justify-center items-center">
           <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           >
              <h2 className="text-[12vw] leading-none font-grotesk font-bold text-white/[0.03] text-center select-none tracking-tighter mix-blend-plus-lighter">
                DHARMENDRA
              </h2>
           </motion.div>
           
           {/* Back to top button */}
           <button
             onClick={scrollToTop}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass-premium border border-white/10 flex items-center justify-center text-white hover:border-primary/50 hover:shadow-glow-blue transition-all duration-300 group z-10"
             aria-label="Back to top"
           >
             <FaArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
           </button>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-jetbrains text-gray-600">
          <p>© {new Date().getFullYear()} Dharmendra Baria. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            Designed & Built with <span className="text-red-500 animate-pulse">❤️</span> & ☕
          </div>
        </div>
      </div>
    </footer>
  );
});
Footer.displayName = 'Footer';

export default Footer;
