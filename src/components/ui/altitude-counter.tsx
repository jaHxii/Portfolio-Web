import { useEffect, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

const BASE_ALTITUDE = 8400;
const CRUISE_ALTITUDE = 38000;

export default function AltitudeCounter() {
  const { scrollY } = useScroll();
  const [altitude, setAltitude] = useState(BASE_ALTITUDE);

  useMotionValueEvent(scrollY, 'change', y => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(y / maxScroll, 1) : 0;
    const current = Math.round(
      BASE_ALTITUDE + progress * (CRUISE_ALTITUDE - BASE_ALTITUDE)
    );
    setAltitude(prev => (prev === current ? prev : current));
  });

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!reduced) return;
    setAltitude(CRUISE_ALTITUDE);
  }, [reduced]);

  return (
    <div
      className='fixed bottom-5 right-5 z-40 hidden select-none pointer-events-none md:block font-mono text-[10px] leading-4 tracking-[0.3em] text-mist-soft/50'
      aria-hidden='true'
    >
      ALT {altitude.toLocaleString('en-US')} FT
      <div className='mt-1 ml-auto h-px w-10 bg-gradient-to-r from-transparent to-gold/60' />
    </div>
  );
}
