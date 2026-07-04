import React, { memo, useState, useMemo, useCallback } from 'react';
import { emit } from '../../utils/events';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaGithub, FaFigma, FaCodeBranch, FaSearch, FaTerminal
} from 'react-icons/fa';
import ParticleBackground from '../ui/ParticleBackground';
import {
  SiTypescript, SiExpress, SiMongodb, SiTailwindcss, SiRedux, SiFirebase,
  SiVite, SiVercel, SiJavascript, SiJsonwebtokens
} from 'react-icons/si';

// ── DATA ─────────────────────────────────────────────────────────────
const TECHNOLOGIES = [
  {
    id: 'react', name: 'React', category: 'Frontend', icon: FaReact, color: '#3b82f6',
    exp: '2+ Years', level: 'Expert',
    desc: 'The core of my frontend architecture. I build highly interactive SPAs using custom hooks, Context API, and strictly optimized render cycles.',
    projects: ['ReelMatic', 'ShopSphere', 'Portfolio'],
    code: `function useMagneticCursor() {\n  const cursor = useRef(null);\n  useEffect(() => {\n    // requestAnimationFrame logic\n    // bypassing React state for 60fps\n  }, []);\n}`,
    libraries: ['Framer Motion', 'React Router', 'Lucide']
  },
  {
    id: 'node', name: 'Node.js', category: 'Backend', icon: FaNodeJs, color: '#22c55e',
    exp: '2 Years', level: 'Advanced',
    desc: 'My go-to runtime for building scalable backend services. I focus on event-driven architecture and asynchronous performance.',
    projects: ['DevConnect', 'ShopSphere'],
    code: `app.use(express.json());\n\napp.post('/api/v1/auth', async (req, res) => {\n  const token = generateJWT(user._id);\n  res.cookie('token', token);\n  return res.status(200).json({ success: true });\n});`,
    libraries: ['Socket.io', 'Mongoose', 'Bcrypt']
  },
  {
    id: 'mongodb', name: 'MongoDB', category: 'Database', icon: SiMongodb, color: '#22c55e',
    exp: '2 Years', level: 'Advanced',
    desc: 'NoSQL database used for high-volume data operations. I specialize in complex aggregation pipelines and indexing strategies.',
    projects: ['TaskFlow', 'RestaurantPOS'],
    code: `db.orders.aggregate([\n  { $match: { status: "completed" } },\n  { $group: { \n      _id: "$userId", \n      total: { $sum: "$amount" } \n  }}\n])`,
    libraries: ['Mongoose', 'MongoDB Atlas']
  },
  {
    id: 'js', name: 'JavaScript', category: 'Language', icon: SiJavascript, color: '#eab308',
    exp: '3+ Years', level: 'Expert',
    desc: 'My primary programming language. Deep understanding of ES6+, closures, the event loop, and DOM manipulation.',
    projects: ['All Projects'],
    code: `const optimizedDebounce = (fn, d) => {\n  let id;\n  return (...args) => {\n    clearTimeout(id);\n    id = setTimeout(() => fn(...args), d);\n  }\n}`,
    libraries: ['ES6+', 'DOM API', 'WebSockets']
  },
  {
    id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', icon: SiTailwindcss, color: '#06b6d4',
    exp: '2 Years', level: 'Expert',
    desc: 'Utility-first CSS for rapid UI development. I create complex, responsive layouts with custom design tokens.',
    projects: ['Portfolio', 'ShopSphere'],
    code: `// Custom Tailwind Config\nmodule.exports = {\n  theme: {\n    extend: {\n      animation: {\n        'blob': 'blob 7s infinite',\n      }\n    }\n  }\n}`,
    libraries: ['PostCSS', 'Autoprefixer']
  },
  {
    id: 'express', name: 'Express.js', category: 'Backend', icon: SiExpress, color: '#9ca3af',
    exp: '2 Years', level: 'Advanced',
    desc: 'Minimalist web framework for Node.js. Used for creating robust RESTful APIs and middleware chains.',
    projects: ['DevConnect', 'ShopSphere'],
    code: `const authMiddleware = (req, res, next) => {\n  const token = req.headers.authorization;\n  if (!token) return res.sendStatus(401);\n  next();\n}`,
    libraries: ['Cors', 'Helmet', 'Morgan']
  },
  {
    id: 'typescript', name: 'TypeScript', category: 'Language', icon: SiTypescript, color: '#3b82f6',
    exp: '2 Years', level: 'Intermediate',
    desc: 'Adding strict static typing to JavaScript for enterprise-grade application stability and better DX.',
    projects: ['Next-Gen CMS'],
    code: `interface User {\n  id: string;\n  role: 'admin' | 'user';\n  permissions: string[];\n}\n\nfunction checkAccess(u: User) {\n  return u.role === 'admin';\n}`,
    libraries: ['Zod', 'TS-Node']
  }
];

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'Language'];

// ── COMPONENT ────────────────────────────────────────────────────────
const Skills = memo(() => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTechId, setActiveTechId] = useState(TECHNOLOGIES[0].id);

  const handleTechClick = useCallback((tech) => {
    setActiveTechId(tech.id);
    // Dispatch cross-section filter event
    emit('skill:filter', { tech: tech.name });
    emit('toast', { message: `Showing ${tech.name} Projects`, icon: '🔍' });
    // Scroll to projects smoothly
    setTimeout(() => {
      document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  }, []);

  // Derived state
  const activeTech = useMemo(() => TECHNOLOGIES.find(t => t.id === activeTechId), [activeTechId]);

  const filteredTechs = useMemo(() => {
    return TECHNOLOGIES.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
      const matchesCat = activeCategory === 'All' || t.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [search, activeCategory]);

  // If filter hides the active tech, switch to the first available one
  if (filteredTechs.length > 0 && !filteredTechs.find(t => t.id === activeTechId)) {
    setActiveTechId(filteredTechs[0].id);
  }

  return (
    <section id="skills" className="relative py-32 overflow-hidden bg-[#030303] min-h-[100vh]">
      <ParticleBackground />
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen"
        style={{ background: 'radial-gradient(circle at top right, rgba(37,99,235,0.15) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 pointer-events-none opacity-10 mesh-bg" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-30 pointer-events-auto">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="section-label mb-4">02 — Stack Interface</p>
          <div className="overflow-hidden mb-4">
            <h2 className="heading-lg">System <span className="text-gradient">Architecture.</span></h2>
          </div>
          <p className="text-gray-500 max-w-xl text-[15px] leading-relaxed">
            Welcome to the Developer OS. This interface breaks down my technical stack, the architecture I build with, and exactly how I implement these tools in production environments.
          </p>
        </div>

        {/* ── THE SOFTWARE DASHBOARD (Master-Detail View) ── */}
        <div className="w-full rounded-[32px] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row min-h-[700px]">

          {/* LEFT SIDEBAR: Index/Master View */}
          <div className="w-full md:w-[320px] shrink-0 border-b md:border-b-0 md:border-r border-white/10 bg-black/40 flex flex-col">

            {/* macOS Window Controls (Visual only) */}
            <div className="h-12 flex items-center px-6 gap-2 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>

            {/* Search Bar */}
            <div className="p-5 border-b border-white/5 relative">
              <FaSearch className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
              <input
                type="text"
                placeholder="Search stack..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors font-inter"
              />
            </div>

            {/* Category Pills (Horizontal Scroll on Mobile) */}
            <div className="p-4 border-b border-white/5 overflow-x-auto hide-scrollbar flex gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-jetbrains transition-all duration-300 ${activeCategory === cat ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Technology List */}
            <div className="flex-1 overflow-y-auto hide-scrollbar p-3 space-y-1 h-[250px] md:h-auto">
              {filteredTechs.length === 0 ? (
                <div className="text-gray-600 text-xs font-jetbrains text-center mt-10">No modules found.</div>
              ) : (
                filteredTechs.map(tech => {
                  const isActive = activeTechId === tech.id;
                  const Icon = tech.icon;
                  return (
                    <button
                      key={tech.id}
                      onClick={() => handleTechClick(tech)}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative group text-left ${isActive ? 'bg-white/10' : 'hover:bg-white/5'
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-primary rounded-r-full"
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )}
                      <Icon size={18} style={{ color: isActive ? tech.color : '#6b7280' }} className="transition-colors duration-300" />
                      <div className="flex-1">
                        <div className={`text-sm font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                          {tech.name}
                        </div>
                        <div className="text-[10px] font-jetbrains text-gray-600 uppercase tracking-widest mt-0.5">
                          {tech.category}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT PANEL: Detail View (The Dashboard) */}
          <div className="flex-1 p-6 md:p-10 relative overflow-y-auto hide-scrollbar bg-gradient-to-br from-white/[0.02] to-transparent">
            <AnimatePresence mode="wait">
              {activeTech && (
                <motion.div
                  key={activeTech.id}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-center gap-6 mb-10">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-2xl relative"
                      style={{ backgroundColor: `${activeTech.color}15`, border: `1px solid ${activeTech.color}40` }}
                    >
                      <div className="absolute inset-0 blur-xl opacity-50" style={{ backgroundColor: activeTech.color }} />
                      <activeTech.icon className="relative z-10" style={{ color: activeTech.color }} />
                    </div>
                    <div>
                      <h3 className="text-4xl font-grotesk font-bold text-white mb-2 tracking-tight">{activeTech.name}</h3>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-[10px] font-jetbrains uppercase tracking-widest border" style={{ borderColor: `${activeTech.color}40`, color: activeTech.color }}>
                          {activeTech.category} Module
                        </span>
                        <span className="text-gray-500 text-xs font-jetbrains flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Operational
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Grid Layout for details */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">

                    {/* Left Column */}
                    <div className="space-y-6">

                      {/* Description Card */}
                      <div className="glass-premium p-6 rounded-2xl border border-white/5">
                        <div className="text-xs font-jetbrains text-gray-500 uppercase tracking-widest mb-3">Architecture Role</div>
                        <p className="text-gray-300 text-sm leading-relaxed font-inter">
                          {activeTech.desc}
                        </p>
                      </div>

                      {/* Stats Row */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="glass-premium p-5 rounded-2xl border border-white/5 flex flex-col justify-center">
                          <div className="text-xs font-jetbrains text-gray-500 uppercase tracking-widest mb-1">Time in Prod</div>
                          <div className="text-xl font-grotesk font-bold text-white">{activeTech.exp}</div>
                        </div>
                        <div className="glass-premium p-5 rounded-2xl border border-white/5 flex flex-col justify-center">
                          <div className="text-xs font-jetbrains text-gray-500 uppercase tracking-widest mb-1">Competency</div>
                          <div className="text-xl font-grotesk font-bold" style={{ color: activeTech.color }}>{activeTech.level}</div>
                        </div>
                      </div>

                      {/* Libraries */}
                      <div className="glass-premium p-6 rounded-2xl border border-white/5">
                        <div className="text-xs font-jetbrains text-gray-500 uppercase tracking-widest mb-4">Integrated Tooling</div>
                        <div className="flex flex-wrap gap-2">
                          {activeTech.libraries.map(lib => (
                            <span key={lib} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-300">
                              {lib}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Right Column (Code Window + Projects) */}
                    <div className="space-y-6 flex flex-col h-full">

                      {/* Code Snippet Window */}
                      <div className="glass-premium rounded-2xl border border-white/10 overflow-hidden flex-1 min-h-[220px] flex flex-col">
                        <div className="bg-black/60 px-4 py-2 flex items-center justify-between border-b border-white/5">
                          <div className="flex gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-jetbrains text-gray-500 uppercase">
                            <FaTerminal size={10} /> snippet.js
                          </div>
                        </div>
                        <div className="p-5 overflow-x-auto hide-scrollbar bg-black/40 flex-1">
                          <pre className="text-sm font-jetbrains leading-relaxed">
                            <code className="text-gray-300">
                              {activeTech.code.split('\n').map((line, i) => (
                                <div key={i} className="table-row">
                                  <span className="table-cell text-gray-700 pr-4 select-none">{i + 1}</span>
                                  <span className="table-cell whitespace-pre">{line}</span>
                                </div>
                              ))}
                            </code>
                          </pre>
                        </div>
                      </div>

                      {/* Related Projects */}
                      <div className="glass-premium p-6 rounded-2xl border border-white/5">
                        <div className="text-xs font-jetbrains text-gray-500 uppercase tracking-widest mb-4">Deployed In</div>
                        <div className="flex flex-col gap-2">
                          {activeTech.projects.map(project => (
                            <div key={project} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                              <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">{project}</span>
                              <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';
export default Skills;
