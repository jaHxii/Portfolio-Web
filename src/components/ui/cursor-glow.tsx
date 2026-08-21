import React, { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const applyTransform = () => {
      frameRef.current = null;
      if (!glowRef.current) return;
      const { x, y } = posRef.current;
      glowRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(applyTransform);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden='true'
      className='pointer-events-none cursor-glow fixed top-0 left-0 z-0 hidden md:block w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full'
      style={{
        background:
          'radial-gradient(circle, hsl(var(--primary) / 0.07) 0%, transparent 60%)',
        willChange: 'transform',
      }}
    />
  );
};

export { CursorGlow };
