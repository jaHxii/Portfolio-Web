import React, { useEffect, useState } from 'react';

const FlightLog = ({ entries }: { entries: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const timer = setInterval(
      () => setIndex(prev => (prev + 1) % entries.length),
      2800
    );
    return () => clearInterval(timer);
  }, [entries.length]);

  const text = entries[index % entries.length] ?? entries[0] ?? '';

  return (
    <span className='glass inline-flex items-center gap-2.5 rounded-full px-5 py-2 font-mono text-[11px] tracking-[0.25em] text-mist-soft'>
      <span className='relative flex h-2 w-2' aria-hidden='true'>
        <span className='absolute inline-flex h-full w-full rounded-full bg-gold/50 motion-safe:animate-ping' />
        <span className='relative inline-flex h-2 w-2 rounded-full bg-gold' />
      </span>
      {text}
    </span>
  );
};

export default FlightLog;
