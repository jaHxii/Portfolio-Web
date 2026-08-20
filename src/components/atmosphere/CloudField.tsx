import React, { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Plane } from 'lucide-react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isNarrow = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 767px)').matches;

const CloudField = () => {
  const { scrollYProgress } = useScroll();

  // Parallax clouds — rise gently through the viewport as you descend
  const cloudAY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const cloudBY = useTransform(scrollYProgress, [0, 1], [0, -210]);
  const lightY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Window banking — clouds drift horizontally with the mouse
  const normX = useMotionValue(0.5);
  const bank = useSpring(normX, { stiffness: 45, damping: 16 });
  const cloudAOffsetX = useTransform(bank, [0, 1], [-10, 10]);
  const cloudBOffsetX = useTransform(bank, [0, 1], [-16, 16]);

  // Tiny airplane — glides after the pointer, banking toward its heading
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const planeX = useSpring(cursorX, { stiffness: 220, damping: 30 });
  const planeY = useSpring(cursorY, { stiffness: 220, damping: 30 });
  const heading = useMotionValue(0);
  const headingSpring = useSpring(heading, { stiffness: 120, damping: 18 });
  // Wake left behind the plane (extra lag)
  const wake1x = useSpring(cursorX, { stiffness: 140, damping: 26 });
  const wake1y = useSpring(cursorY, { stiffness: 140, damping: 26 });
  const wake2x = useSpring(cursorX, { stiffness: 70, damping: 22 });
  const wake2y = useSpring(cursorY, { stiffness: 70, damping: 22 });

  const lastCursor = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      cursorX.set(x);
      cursorY.set(y);
      normX.set(x / window.innerWidth);

      // Bank the plane toward its direction of travel (Plane icon points NE by default → +45°)
      const dx = x - lastCursor.current.x;
      const dy = y - lastCursor.current.y;
      if (Math.abs(dx) + Math.abs(dy) > 1) {
        heading.set(Math.atan2(dy, dx) * (180 / Math.PI) + 45);
      }
      lastCursor.current = { x, y };
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [cursorX, cursorY, heading, normX]);

  if (prefersReducedMotion() || isNarrow()) return null;

  return (
    <div
      aria-hidden='true'
      className='pointer-events-none fixed inset-0 z-[4] overflow-hidden hidden md:block'
    >
      {/* Distant cloud silhouettes */}
      <motion.div
        style={{ y: cloudAY, x: cloudAOffsetX }}
        className='absolute inset-0'
      >
        <div
          className='absolute -top-32 right-[-8%] h-[60vh] w-[75vw] motion-safe:animate-cloud-drift'
          style={{
            opacity: 0.05,
            background:
              'radial-gradient(circle at 60% 40%, hsl(var(--mist)), transparent 65%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className='absolute top-[10%] left-[-12%] h-[45vh] w-[60vw]'
          style={{
            opacity: 0.045,
            background:
              'radial-gradient(circle at 40% 50%, hsl(var(--mist)), transparent 65%)',
            filter: 'blur(100px)',
          }}
        />
      </motion.div>

      {/* Midground cloud band + low mist */}
      <motion.div
        style={{ y: cloudBY, x: cloudBOffsetX }}
        className='absolute inset-0'
      >
        <div
          className='absolute left-[-10%] top-[42%] h-[40vh] w-[110vw] motion-safe:animate-cloud-drift'
          style={{
            opacity: 0.06,
            background:
              'radial-gradient(circle at 50% 50%, hsl(var(--mist)), transparent 70%)',
            filter: 'blur(70px)',
            animationDelay: '5s',
          }}
        />
        <div
          className='absolute inset-x-[-10%] bottom-[-10%] h-[40vh]'
          style={{
            opacity: 0.08,
            background:
              'linear-gradient(180deg, transparent, hsl(var(--mist)))',
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      {/* Golden volumetric light */}
      <motion.div
        style={{ y: lightY, x: '-50%' }}
        className='absolute bottom-[-10%] left-1/2 h-[55vh] w-[75vw]'
      >
        <div
          className='absolute inset-0 motion-safe:animate-sun-breathe'
          style={{
            background:
              'radial-gradient(ellipse at 50% 100%, hsl(var(--primary) / 0.22), transparent 60%)',
            filter: 'blur(70px)',
          }}
        />
      </motion.div>

      {/* Tiny airplane + wake */}
      <div className='hidden md:block'>
        <motion.div
          style={{ x: planeX, y: planeY, rotate: headingSpring }}
          className='absolute left-0 top-0'
        >
          <div className='-translate-x-1/2 -translate-y-1/2'>
            <Plane
              className='h-4 w-4 text-gold/70'
              strokeWidth={1.75}
              style={{
                filter: 'drop-shadow(0 0 6px hsl(var(--sunlight) / 0.45))',
              }}
            />
          </div>
        </motion.div>
        <motion.div
          style={{ x: wake1x, y: wake1y }}
          className='absolute left-0 top-0'
        >
          <div className='h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mist/20 blur-[2px]' />
        </motion.div>
        <motion.div
          style={{ x: wake2x, y: wake2y }}
          className='absolute left-0 top-0'
        >
          <div className='h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[2px]' />
        </motion.div>
      </div>
    </div>
  );
};

export default CloudField;
