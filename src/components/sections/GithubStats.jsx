import React, { useEffect, useState, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaUsers, FaCode } from 'react-icons/fa';
import { fetchGithubStats } from '../../services/githubAPI';
import { SITE } from '../../utils/constants';
import { useCounter } from '../../hooks/useCounter';
import { staggerContainer, fadeInUp } from '../../utils/animations';

const LANG_COLORS = {
  JavaScript: '#F7DF1E', TypeScript: '#3178C6', CSS: '#1572B6',
  HTML: '#E34F26', 'C++': '#00599C', Python: '#3776AB', default: '#6366f1',
};

const StatBox = memo(({ icon: Icon, value, suffix = '', label, color }) => {
  const { count, ref } = useCounter(value, 1500);
  return (
    <div ref={ref} className="glass-card rounded-2xl p-6 flex flex-col items-center text-center border border-white/5 hover:border-primary/20 transition-colors group">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}20` }}>
        <Icon size={24} style={{ color }} />
      </div>
      <div className="font-syne text-3xl font-bold text-white">{count}{suffix}</div>
      <div className="text-gray-500 text-sm mt-1">{label}</div>
    </div>
  );
});
StatBox.displayName = 'StatBox';

const LanguageBar = memo(({ lang, pct }) => (
  <div>
    <div className="flex justify-between text-sm mb-1.5">
      <span className="text-gray-400 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: LANG_COLORS[lang] || LANG_COLORS.default }} />
        {lang}
      </span>
      <span className="text-gray-600 font-fira">{pct}%</span>
    </div>
    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-full"
        style={{ background: LANG_COLORS[lang] || LANG_COLORS.default }}
      />
    </div>
  </div>
));
LanguageBar.displayName = 'LanguageBar';

const GithubStats = memo(() => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchGithubStats(SITE.githubUsername).then((data) => {
      if (!cancelled) {
        setStats(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="github" className="relative py-24 md:py-36 bg-[#0D0D0D] overflow-hidden">
      <div className="absolute left-[-5%] top-1/2 w-[400px] h-[400px] bg-primary/8 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-fira text-sm mb-3 tracking-widest uppercase">05 — GitHub</motion.p>
          <motion.h2 variants={fadeInUp} className="font-syne text-4xl md:text-6xl font-bold text-white">
            Code in <span className="text-gradient">Public.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-500 mt-4">
            Open source contributions, personal projects, and consistent commits.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[1,2,3,4].map(i => <div key={i} className="glass-card rounded-2xl h-32 shimmer-bg" />)}
          </div>
        ) : (
          <>
            {/* Stats */}
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            >
              <motion.div variants={fadeInUp}><StatBox icon={FaCode}   value={stats.public_repos} label="Repositories" color="#2563EB" /></motion.div>
              <motion.div variants={fadeInUp}><StatBox icon={FaStar}   value={stats.totalStars}   label="Total Stars"   color="#F7DF1E" /></motion.div>
              <motion.div variants={fadeInUp}><StatBox icon={FaUsers}  value={stats.followers}    label="Followers"    color="#06B6D4" /></motion.div>
              <motion.div variants={fadeInUp}><StatBox icon={FaGithub} value={stats.following}    label="Following"    color="#7C3AED" /></motion.div>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 border border-white/5"
            >
              <h3 className="font-semibold text-white mb-6 flex items-center gap-3">
                <FaCode className="text-primary" />
                Most Used Languages
              </h3>
              <div className="space-y-4">
                {stats.topLanguages.map(({ lang, pct }) => (
                  <LanguageBar key={lang} lang={lang} pct={pct} />
                ))}
              </div>

              {/* GitHub profile link */}
              <div className="mt-8 text-center">
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full text-sm text-white border border-white/10 hover:border-primary/50 hover:text-primary transition-colors"
                >
                  <FaGithub size={15} />
                  View Full GitHub Profile →
                </a>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
});
GithubStats.displayName = 'GithubStats';

export default GithubStats;
