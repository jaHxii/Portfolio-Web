import React from 'react';
import { cn } from '@/lib/utils';

export interface SkipLinkProps {
  targetId: string;
  label?: string;
  className?: string;
}

/**
 * SkipLink gives keyboard users a fast path to the main content region.
 */
export const SkipLink: React.FC<SkipLinkProps> = ({
  targetId,
  label = 'Skip to content',
  className,
}) => {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        'sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary',
        className
      )}
    >
      {label}
    </a>
  );
};

export default SkipLink;
