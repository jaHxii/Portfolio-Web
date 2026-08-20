import React from 'react';
import { motion } from 'framer-motion';

const LAYERS = [
  {
    code: 'SYS',
    items: ['IT Support', 'Systems Administration', 'Troubleshooting'],
  },
  { code: 'NET', items: ['Networking', 'Hardware', 'Windows', 'Linux'] },
  { code: 'DEV', items: ['Python', 'React', 'SQL'] },
  { code: 'ML', items: ['AI/ML', 'Cloud'] },
];

const STATUS = ['ON TIME', 'CRUISING', 'STABLE', 'NOMINAL'];

const buildStrip = (dup: number): React.ReactNode[] => {
  const nodes: React.ReactNode[] = [];

  LAYERS.forEach((layer, layerIndex) => {
    nodes.push(
      <div
        key={`sep-${dup}-${layer.code}`}
        className='flex items-center gap-3 px-2 shrink-0'
      >
        <span className='h-px w-6 bg-gold/40' />
        <span className='font-mono text-[10px] tracking-[0.3em] text-gold/70'>
          {layer.code}
        </span>
        <span className='h-px w-6 bg-gold/40' />
      </div>
    );

    layer.items.forEach((tech, i) => {
      const number = layerIndex * 10 + i + 1;
      const status = STATUS[(layerIndex + i) % STATUS.length] ?? 'ON TIME';
      nodes.push(
        <span
          key={`${dup}-${layer.code}-${tech}`}
          className='glass inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-mono text-sm text-mist-soft whitespace-nowrap'
        >
          <span className='w-1 h-1 rounded-full bg-gold/70' />
          <span className='text-[11px] text-gold/80'>
            T-{String(number).padStart(3, '0')}
          </span>
          <span>{tech}</span>
          <span className='text-[10px] tracking-[0.15em] text-mist-soft/50'>
            {status}
          </span>
        </span>
      );
    });
  });

  return nodes;
};

const TechMarquee = () => {
  const items = [...buildStrip(0), ...buildStrip(1)];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      className='group mt-14 overflow-hidden relative w-full'
      aria-hidden='true'
    >
      <div className='absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10' />
      <div className='absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10' />
      <div className='flex w-max animate-marquee [animation-duration:70s] group-hover:[animation-play-state:paused] gap-3'>
        {items}
      </div>
    </motion.div>
  );
};

export { TechMarquee };
