import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaTwitter, FaHeart } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { NAV_LINKS, SITE } from '../../utils/constants';
import { staggerContainer, fadeInUp } from '../../utils/animations';

const SOCIAL_LINKS = [
  { icon: FaGithub, href: SITE.github, label: 'GitHub' },
  { icon: FaLinkedin, href: SITE.linkedin, label: 'LinkedIn' },
  { icon: FaWhatsapp, href: SITE.whatsapp, label: 'WhatsApp' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: MdEmail, href: `mailto:${SITE.email}`, label: 'Email' },
];

const YEAR = new Date().getFullYear();

const Footer = memo(() => (
  <footer className="relative bg-black border-t border-white/5 overflow-hidden">
    {/* Ambient glow */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
      >
        {/* Brand */}
        <motion.div variants={fadeInUp} className="lg:col-span-2">
          <h3 className="font-syne text-3xl font-bold text-white mb-4">
            DB<span className="text-gradient">.</span>
          </h3>
          <p className="text-gray-400 leading-relaxed max-w-sm mb-6">
            Full Stack MERN Developer crafting premium digital experiences that balance engineering excellence with stunning visual design.
          </p>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 hover:shadow-glow-blue transition-all duration-300"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Links */}
        <motion.div variants={fadeInUp}>
          <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">Navigation</h4>
          <ul className="space-y-3">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-gray-500 hover:text-white text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-[1px] bg-primary group-hover:w-4 transition-all duration-300" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div variants={fadeInUp}>
          <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">Let's Talk</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors break-all">{SITE.email}</a></li>
            <li><a href={SITE.whatsapp} className="hover:text-white transition-colors">{SITE.phone}</a></li>
            <li className="text-gray-600">{SITE.location}</li>
            <li className="flex items-center gap-2 mt-4">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
              <span className="text-green-400 text-xs">Open to opportunities</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
        <p className="text-gray-600 text-sm flex items-center gap-1.5">
          Made with <FaHeart className="text-red-500 animate-pulse" size={12} /> by
          <span className="text-white font-medium ml-1">Dharmendra Baria</span>
          <span className="ml-1">© {YEAR}</span>
        </p>
        <p className="text-gray-700 text-xs font-fira">
          Built with React + Vite + Tailwind CSS
        </p>
      </div>
    </div>
  </footer>
));
Footer.displayName = 'Footer';

export default Footer;
