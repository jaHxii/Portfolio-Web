import React, { useCallback } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import {
  scheduleRoutePreload,
  cancelScheduledPreload,
} from '@/lib/route-preloader';
import { cn } from '@/lib/utils';

interface PreloadLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  preloadOnHover?: boolean;
  preloadOnFocus?: boolean;
  preloadDelay?: number;
  children: React.ReactNode;
}

const PreloadLink: React.FC<PreloadLinkProps> = ({
  to,
  preloadOnHover = true,
  preloadOnFocus = true,
  preloadDelay = 100,
  className,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  children,
  ...props
}) => {
  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (preloadOnHover) {
        scheduleRoutePreload(to, preloadDelay);
      }
      onMouseEnter?.(event);
    },
    [to, preloadOnHover, preloadDelay, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (preloadOnHover) {
        cancelScheduledPreload();
      }
      onMouseLeave?.(event);
    },
    [preloadOnHover, onMouseLeave]
  );

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLAnchorElement>) => {
      if (preloadOnFocus) {
        scheduleRoutePreload(to, preloadDelay);
      }
      onFocus?.(event);
    },
    [to, preloadOnFocus, preloadDelay, onFocus]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLAnchorElement>) => {
      if (preloadOnFocus) {
        cancelScheduledPreload();
      }
      onBlur?.(event);
    },
    [preloadOnFocus, onBlur]
  );

  return (
    <Link
      to={to}
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    >
      {children}
    </Link>
  );
};

export default PreloadLink;
