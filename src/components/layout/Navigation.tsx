import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PreloadLink from '@/components/ui/preload-link';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { name: 'Home', path: '/', index: '01' },
  { name: 'Projects', path: '/projects', index: '02' },
  { name: 'Skills', path: '/skills', index: '03' },
  { name: 'Experience', path: '/experience', index: '04' },
  { name: 'Contact', path: '/contact', index: '05' },
  { name: 'Resume', path: '/resume', index: '06' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('light', savedTheme === 'light');
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  const handleNavClick = (path: string) => {
    setIsOpen(false);

    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      if (route === '' || route === '/') {
        if (location.pathname !== '/') {
          window.location.href = path;
        } else {
          const element = document.getElementById(hash);
          element?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500',
        scrolled
          ? 'bg-background/70 backdrop-blur-xl border-border'
          : 'bg-transparent border-transparent'
      )}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <PreloadLink to='/' className='flex items-center gap-3 group'>
            <div className='relative w-9 h-9 rounded-md bg-storm border border-border flex items-center justify-center overflow-hidden'>
              <span className='font-heading font-bold text-sm gold-text'>
                EL
              </span>
              <div className='absolute inset-x-0 bottom-0 h-px bg-gradient-gold opacity-60' />
            </div>
            <span className='font-heading font-semibold text-lg tracking-tight text-foreground'>
              Ermias <span className='text-mist'>Lemesa</span>
            </span>
          </PreloadLink>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-7'>
            {NAV_ITEMS.map(item => {
              const active = location.pathname === item.path;
              return (
                <PreloadLink
                  key={item.name}
                  to={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={cn(
                    'text-sm font-medium transition-colors relative group',
                    active
                      ? 'text-gold'
                      : 'text-mist-soft hover:text-foreground'
                  )}
                >
                  <span className='font-mono text-[10px] mr-1 opacity-60'>
                    {item.index}
                  </span>
                  {item.name}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-0 h-px bg-gradient-gold transition-all duration-300',
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </PreloadLink>
              );
            })}

            {/* Theme Toggle */}
            <Button
              variant='ghost'
              size='icon'
              onClick={toggleTheme}
              className='text-mist-soft hover:text-gold hover:bg-white/5'
              aria-label='Toggle theme'
            >
              <AnimatePresence mode='wait'>
                {theme === 'dark' ? (
                  <motion.div
                    key='sun'
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className='h-4 w-4' />
                  </motion.div>
                ) : (
                  <motion.div
                    key='moon'
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className='h-4 w-4' />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            {/* Altitude micro-detail — almost hidden */}
            <span className='font-mono text-[10px] tracking-[0.3em] text-mist-soft/40 select-none hidden lg:inline'>
              ALT 38,000 FT
            </span>
          </div>

          {/* Mobile controls */}
          <div className='md:hidden flex items-center gap-1'>
            <Button
              variant='ghost'
              size='icon'
              onClick={toggleTheme}
              className='text-mist-soft hover:text-gold'
              aria-label='Toggle theme'
            >
              <AnimatePresence mode='wait'>
                {theme === 'dark' ? (
                  <motion.div
                    key='sun'
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className='h-4 w-4' />
                  </motion.div>
                ) : (
                  <motion.div
                    key='moon'
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className='h-4 w-4' />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode='wait'>
                {isOpen ? (
                  <motion.div
                    key='close'
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className='h-5 w-5' />
                  </motion.div>
                ) : (
                  <motion.div
                    key='menu'
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className='h-5 w-5' />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className='md:hidden bg-background/90 backdrop-blur-xl border-t border-border'
          >
            <div className='px-6 py-6 space-y-5'>
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <PreloadLink
                    to={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={cn(
                      'flex items-center gap-3 text-base font-medium transition-colors',
                      location.pathname === item.path
                        ? 'text-gold'
                        : 'text-mist-soft hover:text-foreground'
                    )}
                  >
                    <span className='font-mono text-xs opacity-60'>
                      {item.index}
                    </span>
                    {item.name}
                  </PreloadLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
