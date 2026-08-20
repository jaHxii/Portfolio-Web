import React from 'react';
import { cn } from '@/lib/utils';

interface AtmosphereProps {
  variant?: 'hero' | 'mist' | 'horizon';
  className?: string;
}

/**
 * Shared atmospheric background — layered blurred cloud silhouettes,
 * silver cloud bands and a soft golden light near a focal area.
 * Decorative only; place behind content inside a `relative` parent.
 */
const Atmosphere = ({ variant = 'hero', className }: AtmosphereProps) => {
  const base =
    variant === 'mist'
      ? 'bg-atmo-mist'
      : variant === 'horizon'
        ? 'bg-atmo-horizon'
        : 'bg-atmo-hero';

  return (
    <div
      aria-hidden='true'
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
    >
      <div className={cn('absolute inset-0', base)} />

      {/* Distant cloud mass — upper right */}
      <div
        className='absolute -top-24 right-[-10%] h-[55vh] w-[75vw] motion-safe:animate-cloud-drift'
        style={{
          opacity: variant === 'horizon' ? 0.04 : 0.06,
          background:
            'radial-gradient(circle at 60% 40%, hsl(210 8% 77%), transparent 65%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Midground cloud band */}
      <div
        className='absolute left-[-10%] top-[34%] h-[42vh] w-[95vw] motion-safe:animate-cloud-drift'
        style={{
          opacity: variant === 'hero' ? 0.05 : 0.07,
          background:
            'radial-gradient(circle at 50% 50%, hsl(210 10% 66%), transparent 70%)',
          filter: 'blur(70px)',
          animationDelay: '4s',
        }}
      />

      {/* Low silver layer rising toward the horizon */}
      <div
        className='absolute inset-x-[-10%] bottom-[-15%] h-[45vh]'
        style={{
          opacity: variant === 'hero' ? 0.07 : 0.08,
          background: 'linear-gradient(180deg, transparent, hsl(210 8% 66%))',
          filter: 'blur(60px)',
        }}
      />

      {/* Golden sunlight near focal area */}
      <div
        className={cn(
          'absolute left-1/2 h-[50vh] w-[70vw] -translate-x-1/2',
          variant === 'hero'
            ? 'top-[55%]'
            : variant === 'horizon'
              ? 'bottom-[-15%]'
              : 'top-[30%]'
        )}
        style={{
          opacity: variant === 'horizon' ? 0.16 : 0.1,
          background:
            'radial-gradient(circle, hsl(42 58% 64%), transparent 60%)',
          filter: 'blur(90px)',
        }}
      />
    </div>
  );
};

export default Atmosphere;
