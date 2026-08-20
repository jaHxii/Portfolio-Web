import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Plane } from 'lucide-react';
import SEO from '@/components/seo/SEO';
import Navigation from '@/components/layout/Navigation';
import Atmosphere from '@/components/atmosphere/Atmosphere';
import PreloadLink from '@/components/ui/preload-link';

const ALTITUDE_404 = [
  '  ____    _   _   ____   _____  ',
  ' |  _ \\  / \\ | |/ ___| |  ___| ',
  ' | | | |/ _ \\| | |  _  | |_    ',
  ' | |_| / ___ \\ | |_| | |  _|   ',
  ' |____/_/   \\_|\\____|  |_|     ',
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    );
  }, [location.pathname]);

  const seoProps = {
    title: '404 - Page Not Found',
    description:
      "The page you're looking for doesn't exist. Return to the homepage to explore the portfolio.",
    noIndex: true,
    noFollow: true,
  };

  return (
    <div className='min-h-screen bg-background relative overflow-hidden'>
      <Atmosphere variant='mist' />
      <SEO {...seoProps} />
      <Navigation />
      <div className='relative z-10 min-h-screen flex items-center justify-center px-4'>
        <div className='text-center'>
          {/* Altitude art */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className='mb-8'
          >
            <pre className='font-mono gold-text/80 leading-tight text-xs sm:text-sm md:text-base overflow-x-auto'>
              {ALTITUDE_404.join('\n')}
            </pre>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className='text-3xl md:text-4xl font-bold font-heading mb-4'
          >
            Lost above the clouds
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className='text-xl text-mist-soft max-w-xl mx-auto mb-8 font-light'
          >
            <Plane className='inline h-5 w-5 gold-text mr-2' />
            <span className='font-mono text-sm'>
              no route found at `{location.pathname}`
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <PreloadLink to='/'>
              <span className='inline-flex items-center px-8 py-3.5 rounded-lg bg-mist text-storm-deep text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-strong'>
                <Home className='mr-2 h-4 w-4' />
                Back to Home
              </span>
            </PreloadLink>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
