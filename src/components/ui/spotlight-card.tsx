import React, { useRef } from 'react';

const SpotlightCard = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current?.style.setProperty('--spot-x', `${x}px`);
    ref.current?.style.setProperty('--spot-y', `${y}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`spotlight-card relative overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export { SpotlightCard };
