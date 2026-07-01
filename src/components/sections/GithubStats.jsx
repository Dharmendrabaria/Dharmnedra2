import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaCodeBranch, FaStar, FaCode } from 'react-icons/fa';

const StatCard = memo(({ icon: Icon, label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    className="glass-premium rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden border border-white/10 group hover:border-white/20 transition-colors"
  >
    <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform duration-500 text-white">
      <Icon size={100} />
    </div>
    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 mb-6">
      <Icon size={18} />
    </div>
    <div>
      <div className="text-3xl font-grotesk font-bold text-white tracking-tight mb-1">{value}</div>
      <div className="text-xs font-jetbrains text-gray-500 uppercase tracking-widest">{label}</div>
    </div>
  </motion.div>
));
StatCard.displayName = 'StatCard';

const GithubStats = memo(() => {
  // Fake contribution data for visual bento effect
  const weeks = Array.from({ length: 45 }); // 45 columns
  const daysPerWeek = 7;

  return (
    <section id="github" className="relative py-28 md:py-40 overflow-hidden" style={{ background: '#080808' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-16">
          <p className="section-label mb-4">07 — Open Source</p>
          <div className="overflow-hidden mb-4">
            <h2 className="heading-lg">
              GitHub <span className="text-gradient">Activity.</span>
            </h2>
          </div>
        </div>

        {/* ── BENTO DASHBOARD ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[200px]">
          
          {/* Main Stat Cards */}
          <div className="col-span-1 row-span-1">
            <StatCard icon={FaGithub} label="Total Commits" value="1,248" delay={0.1} />
          </div>
          <div className="col-span-1 row-span-1">
            <StatCard icon={FaStar} label="Stars Earned" value="42" delay={0.2} />
          </div>
          <div className="col-span-1 row-span-1">
            <StatCard icon={FaCodeBranch} label="Pull Requests" value="18" delay={0.3} />
          </div>

          {/* Top Languages (1x2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="md:col-span-3 lg:col-span-1 row-span-1 lg:row-span-2 glass-premium rounded-3xl p-8 border border-white/10 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-8">
              <FaCode className="text-primary" size={20} />
              <h3 className="font-grotesk font-bold text-white text-lg">Top Languages</h3>
            </div>
            
            <div className="flex-1 flex flex-col justify-center space-y-6">
              {[
                { name: 'JavaScript', pct: '65%', color: 'bg-yellow-400' },
                { name: 'TypeScript', pct: '20%', color: 'bg-blue-400' },
                { name: 'HTML/CSS', pct: '10%', color: 'bg-orange-400' },
                { name: 'Other', pct: '5%', color: 'bg-gray-400' }
              ].map(lang => (
                <div key={lang.name}>
                  <div className="flex justify-between text-xs font-jetbrains text-gray-400 mb-2">
                    <span>{lang.name}</span>
                    <span>{lang.pct}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: lang.pct }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                      className={`h-full rounded-full ${lang.color}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contribution Heatmap (3x1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="md:col-span-3 col-span-1 row-span-1 glass-premium rounded-3xl p-8 border border-white/10 flex flex-col justify-center overflow-hidden relative group"
          >
             <div className="flex justify-between items-end mb-6">
               <h3 className="font-grotesk font-bold text-white text-lg">Contribution Activity</h3>
               <span className="text-xs text-green-400 font-jetbrains px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">Current Streak: 12 days</span>
             </div>
             
             {/* Fake Heatmap Grid */}
             <div className="flex gap-1.5 w-full overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
               {weeks.map((_, i) => (
                 <div key={i} className="flex flex-col gap-1.5">
                   {Array.from({ length: daysPerWeek }).map((_, j) => {
                     // Generate visual pattern that looks like a real heatmap
                     const intensity = Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0;
                     const bgColors = [
                       'bg-white/[0.03]', // 0
                       'bg-green-900/40', // 1
                       'bg-green-700/60', // 2
                       'bg-green-500/80', // 3
                       'bg-green-400',    // 4
                     ];
                     return (
                       <div 
                         key={`${i}-${j}`} 
                         className={`w-3 h-3 rounded-sm ${bgColors[intensity]}`}
                       />
                     );
                   })}
                 </div>
               ))}
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
});

GithubStats.displayName = 'GithubStats';
export default GithubStats;
