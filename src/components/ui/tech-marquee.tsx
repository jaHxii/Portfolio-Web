import React from 'react';
import { motion } from 'framer-motion';

const STACK = [
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'Python',
  'SQL',
  'Windows Server',
  'Networking',
  'Hardware Repair',
  'Helpdesk',
  'PWA',
  'Machine Learning',
];

const TechMarquee = () => {
  const items = [...STACK, ...STACK];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      className='mt-16 overflow-hidden relative w-full'
      aria-hidden='true'
    >
      <div className='absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10' />
      <div className='absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10' />
      <div className='flex w-max animate-marquee gap-3'>
        {items.map((tech, index) => (
          <span
            key={`${tech}-${index}`}
            className='px-4 py-2 glass rounded-full font-mono text-sm text-muted-foreground whitespace-nowrap'
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export { TechMarquee };
