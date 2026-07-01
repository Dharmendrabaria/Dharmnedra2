import React, { lazy, Suspense } from 'react';

// Lazy-loaded sections
const Hero          = lazy(() => import('../components/sections/Hero'));
const About         = lazy(() => import('../components/sections/About'));
const Skills        = lazy(() => import('../components/sections/Skills'));
const TechMarquee   = lazy(() => import('../components/sections/TechMarquee'));
const Projects      = lazy(() => import('../components/sections/Projects'));
const GithubStats   = lazy(() => import('../components/sections/GithubStats'));
const Services      = lazy(() => import('../components/sections/Services'));
const Experience    = lazy(() => import('../components/sections/Experience'));
const Testimonials  = lazy(() => import('../components/sections/Testimonials'));
const Certificates  = lazy(() => import('../components/sections/Certificates'));
const Contact       = lazy(() => import('../components/sections/Contact'));

const SectionLoader = () => (
  <div className="w-full h-40 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const Home = () => (
  <Suspense fallback={<SectionLoader />}>
    <Hero />
    <About />
    <Skills />
    <TechMarquee />
    <Projects />
    <GithubStats />
    <Services />
    <Experience />
    <Testimonials />
    <Certificates />
    <Contact />
  </Suspense>
);

export default Home;
