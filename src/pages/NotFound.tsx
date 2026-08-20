import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/seo/SEO';
import Navigation from '@/components/layout/Navigation';
import PreloadLink from '@/components/ui/preload-link';

const ASCII_404 = [
  '  _  _  __   _  _    __    ___   __',
  ' | || |/ /_ | || |  /_ /  / _ \\ / /_',
  " | __ | '_ \\| || |_  | | | (_) | '_ \\",
  ' |_||_|_||_||_||_( ) | |  \\___/|_.__/',
  '                |/  |_/',
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
    <div className='min-h-screen bg-background'>
      <SEO {...seoProps} />
      <Navigation />
      <div className='min-h-screen flex items-center justify-center px-4'>
        <div className='text-center'>
          {/* ASCII art easter egg */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className='mb-8'
          >
            <pre className='font-mono text-primary/80 leading-tight text-xs sm:text-sm md:text-base overflow-x-auto'>
              {ASCII_404.join('\n')}
            </pre>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className='text-3xl md:text-4xl font-bold font-heading mb-4'
          >
            Page not found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className='text-xl text-muted-foreground max-w-xl mx-auto mb-8'
          >
            <Terminal className='inline h-5 w-5 text-primary mr-2' />
            <span className='font-mono text-sm'>
              error: route `{location.pathname}` not found
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <PreloadLink to='/'>
              <Button className='bg-primary hover:bg-primary/90 text-primary-foreground btn-glow hover-lift px-8 py-3'>
                <Home className='mr-2 h-4 w-4' />
                Back to Home
              </Button>
            </PreloadLink>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
