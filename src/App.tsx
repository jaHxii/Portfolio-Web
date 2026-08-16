import React, { Suspense, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingFallback from './components/layout/LoadingFallback';
import RouteErrorBoundary from './components/layout/RouteErrorBoundary';
import PerformanceDashboard from './components/ui/performance-dashboard';
import { preloadCriticalRoutes } from './lib/route-preloader';
import { initPerformanceMonitoring } from './lib/performance-monitor';
import { SkipLink } from './components/accessibility/SkipLink';

// Lazy load all page components for code splitting
const Index = React.lazy(() => import('./pages/Index'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Skills = React.lazy(() => import('./pages/Skills'));
const Experience = React.lazy(() => import('./pages/Experience'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Resume = React.lazy(() => import('./pages/Resume'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize performance monitoring
    initPerformanceMonitoring();

    // Preload critical routes on app initialization
    preloadCriticalRoutes();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SkipLink targetId='main-content' />
          <div id='main-content' tabIndex={-1}>
            <RouteErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
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
            </RouteErrorBoundary>
          </div>

          {/* Performance Dashboard (development only by default) */}
          <PerformanceDashboard />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
