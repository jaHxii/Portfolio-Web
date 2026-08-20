import { motion, useScroll, useTransform } from 'framer-motion';

const isNarrow = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 767px)').matches;

export default function ScrollSky() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['62%', '-8%']);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.05, 0.05, 0.14]
  );

  if (isNarrow()) return null;

  return (
    <motion.div
      aria-hidden='true'
      className='pointer-events-none fixed inset-0 z-[5] overflow-hidden hidden md:block'
    >
      <motion.div
        className='scrollsky-sun absolute left-1/2 h-[72vh] w-[95vw]'
        style={{
          y,
          opacity,
          x: '-50%',
          background:
            'radial-gradient(ellipse at 50% 100%, hsl(42 58% 64% / 0.9), transparent 62%)',
          filter: 'blur(70px)',
        }}
      />
    </motion.div>
  );
}
