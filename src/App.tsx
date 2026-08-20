import React, { Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoadingFallback from './components/layout/LoadingFallback';
import RouteErrorBoundary from './components/layout/RouteErrorBoundary';
import { preloadCriticalRoutes } from './lib/route-preloader';
import { SkipLink } from './components/accessibility/SkipLink';
import { ScrollProgress } from './components/ui/scroll-progress';
import { CursorGlow } from './components/ui/cursor-glow';
import { BackToTop } from './components/ui/back-to-top';
import AltitudeCounter from './components/ui/altitude-counter';
import ScrollSky from './components/atmosphere/ScrollSky';
import CloudField from './components/atmosphere/CloudField';

// Lazy load all page components for code splitting
const Index = React.lazy(() => import('./pages/Index'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Skills = React.lazy(() => import('./pages/Skills'));
const Experience = React.lazy(() => import('./pages/Experience'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Resume = React.lazy(() => import('./pages/Resume'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Performance dashboard — dev only, split into its own chunk
const PerformanceDashboard = React.lazy(
  () => import('./components/ui/performance-dashboard')
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode='wait'>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <Routes location={location}>
              <Route path='/' element={<Index />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='/skills' element={<Skills />} />
              <Route path='/experience' element={<Experience />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/resume' element={<Resume />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0.45 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className='pointer-events-none fixed inset-0 z-[60]'
        style={{
          background:
            'linear-gradient(180deg, hsl(210 24% 4%) 0%, hsl(42 58% 64% / 0.12) 50%, hsl(210 24% 4%) 100%)',
        }}
      />
    </>
  );
};

const App = () => {
  useEffect(() => {
    // Preload critical routes on app initialization
    preloadCriticalRoutes();

    // Performance monitoring is dev-only; load on demand to keep it out of prod
    if (import.meta.env.DEV) {
      void import('./lib/performance-monitor').then(
        ({ initPerformanceMonitoring }) => initPerformanceMonitoring()
      );
    }
  }, []);

  return (
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <SkipLink targetId='main-content' />
        <ScrollProgress />
        <CursorGlow />
        <BackToTop />
        <AltitudeCounter />
        <ScrollSky />
        <CloudField />
        <div id='main-content' tabIndex={-1}>
          <RouteErrorBoundary>
            <AnimatedRoutes />
          </RouteErrorBoundary>
        </div>

        {/* Performance Dashboard (development only) */}
        {import.meta.env.DEV && (
          <Suspense fallback={null}>
            <PerformanceDashboard />
          </Suspense>
        )}
      </BrowserRouter>
    </TooltipProvider>
  );
};

export default App;
