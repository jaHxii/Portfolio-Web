import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BackToTop = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const check = () => setVisible(window.scrollY > 400);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className='fixed bottom-6 right-6 z-50'
        >
          <Button
            onClick={scrollToTop}
            size='icon'
            aria-label='Back to top'
            className='glass rounded-full shadow-glow hover:scale-110 transition-transform'
          >
            <ArrowUp className='h-4 w-4' />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { BackToTop };
