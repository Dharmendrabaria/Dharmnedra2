// ─── Site-wide Constants ───────────────────────────────────────────────────

export const SITE = {
  name: 'Dharmendra Baria',
  role: 'Full Stack MERN Developer',
  email: 'dharmendrabaria@gmail.com',
  phone: '+91 98765 43210',
  location: 'Gujarat, India',
  github: 'https://github.com/dharmendrabaria',
  linkedin: 'https://linkedin.com/in/dharmendrabaria',
  whatsapp: 'https://wa.me/919876543210',
  resumeURL: '/resume.pdf',
  githubUsername: 'dharmendrabaria',
  availableForWork: true,
};

export const NAV_LINKS = [
  { label: 'Home',        href: '#home' },
  { label: 'About',       href: '#about' },
  { label: 'Skills',      href: '#skills' },
  { label: 'Projects',    href: '#projects' },
  { label: 'Services',    href: '#services' },
  { label: 'Experience',  href: '#experience' },
  { label: 'Contact',     href: '#contact' },
];

export const STATS = [
  { value: 2,    suffix: '+', label: 'Years Learning' },
  { value: 15,   suffix: '+', label: 'Projects Built' },
  { value: 20,   suffix: '+', label: 'Technologies' },
  { value: 1000, suffix: '+', label: 'Hours Coded' },
];

export const SKILL_CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'Tools', 'Languages'];

export const SERVICES = [
  {
    icon: '🎨',
    title: 'Frontend Development',
    description: 'Pixel-perfect, responsive UIs with React, Framer Motion, and modern CSS.',
    features: ['React 18 + Hooks', 'Tailwind CSS', 'Framer Motion', 'Performance Optimized'],
  },
  {
    icon: '⚙️',
    title: 'Backend Development',
    description: 'Scalable REST APIs with Node.js, Express, and MongoDB.',
    features: ['REST APIs', 'JWT Authentication', 'Error Handling', 'MongoDB Design'],
  },
  {
    icon: '🚀',
    title: 'Full Stack Web Apps',
    description: 'End-to-end MERN applications from idea to production deployment.',
    features: ['Full MERN Stack', 'Real-time Features', 'Cloud Deploy', 'CI/CD Ready'],
  },
  {
    icon: '🛒',
    title: 'E-commerce Solutions',
    description: 'Custom shopping experiences with secure payments and admin dashboards.',
    features: ['Payment Integration', 'Admin Panel', 'Inventory', 'Analytics'],
  },
  {
    icon: '📊',
    title: 'Admin Dashboards',
    description: 'Beautiful, data-driven admin panels with charts and real-time updates.',
    features: ['Data Visualization', 'CRUD Operations', 'Role-based Access', 'Export'],
  },
  {
    icon: '🌐',
    title: 'Landing Pages',
    description: 'High-converting, animated landing pages that drive results.',
    features: ['SEO Optimized', 'Fast Loading', 'A/B Ready', 'Analytics Integration'],
  },
];

export const EXPERIENCE = [
  {
    id: 1,
    title: 'Full Stack MERN Development',
    company: 'MERN Stack Course — Self-Paced',
    type: 'course',
    duration: 'Jan 2023 – Present',
    description: 'Completed an intensive MERN Stack Development course covering React, Node.js, Express, and MongoDB. Built 10+ real-world projects.',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'REST APIs'],
  },
  {
    id: 2,
    title: 'B.Tech — Information Technology',
    company: 'University (Current)',
    type: 'education',
    duration: '2022 – 2026',
    description: 'Currently pursuing B.Tech in Information Technology with a focus on algorithms, data structures, and software engineering fundamentals.',
    skills: ['C++', 'DSA', 'DBMS', 'OS', 'Networking'],
  },
  {
    id: 3,
    title: 'Open Source & Personal Projects',
    company: 'GitHub',
    type: 'freelance',
    duration: '2023 – Present',
    description: 'Built and deployed multiple full-stack projects including e-commerce platforms, dashboards, and portfolio sites for personal and client use.',
    skills: ['React', 'MongoDB', 'Tailwind', 'Framer Motion', 'Firebase'],
  },
];

export const TESTIMONIALS = [
  {
    name: 'Rahul Sharma',
    role: 'Startup Founder',
    company: 'TechVenture',
    review: 'Dharmendra delivered our product landing page ahead of schedule. The animations were stunning and the performance was exceptional. Highly recommend!',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    name: 'Priya Patel',
    role: 'Product Manager',
    company: 'DigitalFirst',
    review: 'Working with Dharmendra was a pleasure. He understood our vision perfectly and brought incredible technical expertise to the table. Our dashboard looks world-class.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Arjun Mehta',
    role: 'Freelance Designer',
    company: 'Artboard Studio',
    review: "Dharmendra turned my Figma designs into a pixel-perfect React app. His attention to detail and animation skills are top-notch. I'll definitely work with him again.",
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

export const CERTIFICATES = [
  {
    id: 1,
    title: 'MERN Stack Development',
    issuer: 'Udemy / Course Platform',
    date: 'Dec 2023',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
  },
  {
    id: 2,
    title: 'JavaScript Algorithms & Data Structures',
    issuer: 'freeCodeCamp',
    date: 'Oct 2023',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
  },
  {
    id: 3,
    title: 'React — The Complete Guide',
    issuer: 'Academind',
    date: 'Aug 2023',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
  },
];
