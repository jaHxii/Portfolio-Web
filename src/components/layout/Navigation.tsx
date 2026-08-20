import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PreloadLink from '@/components/ui/preload-link';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('light', savedTheme === 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
    { name: 'Resume', path: '/resume' },
  ];

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
      className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <PreloadLink to='/' className='flex items-center space-x-2 group'>
            <div className='w-9 h-9 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300'>
              <span className='text-primary-foreground font-heading font-bold text-sm'>
                EL
              </span>
            </div>
            <span className='font-heading font-semibold text-lg gradient-text'>
              Ermias Lemesa
            </span>
          </PreloadLink>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            {navItems.map(item => (
              <PreloadLink
                key={item.name}
                to={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`text-sm font-medium transition-colors hover:text-primary relative group ${
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full' />
              </PreloadLink>
            ))}

            {/* Download CV Button */}
            <PreloadLink to='/resume'>
              <Button
                variant='outline'
                size='sm'
                className='flex items-center gap-2 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300'
              >
                <FileText className='h-3.5 w-3.5' />
                Download CV
              </Button>
            </PreloadLink>

            {/* Theme Toggle */}
            <Button
              variant='ghost'
              size='icon'
              onClick={toggleTheme}
              className='relative overflow-hidden group'
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
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center space-x-2'>
            <Button
              variant='ghost'
              size='icon'
              onClick={toggleTheme}
              className='relative overflow-hidden'
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
              className='relative'
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
            className='md:hidden bg-surface/95 backdrop-blur-md border-t border-border'
          >
            <div className='px-4 py-6 space-y-4'>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PreloadLink
                    to={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`block text-base font-medium transition-colors hover:text-primary ${
                      location.pathname === item.path
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  >
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
