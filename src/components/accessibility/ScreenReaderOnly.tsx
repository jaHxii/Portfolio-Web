import React from 'react';
import { cn } from '@/lib/utils';

export interface ScreenReaderOnlyProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * ScreenReaderOnly hides content visually while keeping it available to assistive technology.
 */
export const ScreenReaderOnly: React.FC<ScreenReaderOnlyProps> = ({
  children,
  className,
}) => {
  return <span className={cn('sr-only', className)}>{children}</span>;
};

export default ScreenReaderOnly;
