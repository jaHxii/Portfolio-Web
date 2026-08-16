import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import {
  preloadRoute,
  isRoutePreloaded,
  clearPreloadCache,
} from '@/lib/route-preloader';
import LoadingFallback from '../LoadingFallback';
import RouteErrorBoundary from '../RouteErrorBoundary';

// Mock the route modules
vi.mock('../../../pages/Index', () => ({
  default: () => <div data-testid='index-page'>Index Page</div>,
}));

vi.mock('../../../pages/Projects', () => ({
  default: () => <div data-testid='projects-page'>Projects Page</div>,
}));

describe('Code Splitting', () => {
  beforeEach(() => {
    clearPreloadCache();
  });

  describe('LoadingFallback', () => {
    it('renders loading spinner and message', () => {
      render(<LoadingFallback />);

      expect(screen.getByText('Loading...')).toBeInTheDocument();

      // Check for loading spinner
      const spinner = document.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();

      // Check for loading dots
      const dots = document.querySelectorAll('.bg-primary.rounded-full');
      expect(dots.length).toBeGreaterThan(0);
    });

    it('renders custom loading message', () => {
      render(<LoadingFallback message='Loading page...' />);

      expect(screen.getByText('Loading page...')).toBeInTheDocument();
    });
  });

  describe('RouteErrorBoundary', () => {
    const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
      if (shouldThrow) {
        throw new Error('Test error');
      }
      return <div>No error</div>;
    };

    it('renders children when no error occurs', () => {
      render(
        <RouteErrorBoundary>
          <ThrowError shouldThrow={false} />
        </RouteErrorBoundary>
      );

      expect(screen.getByText('No error')).toBeInTheDocument();
    });

    it('renders error UI when error occurs', () => {
      // Suppress console.error for this test
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <RouteErrorBoundary>
          <ThrowError shouldThrow={true} />
        </RouteErrorBoundary>
      );

      expect(
        screen.getByText('Oops! Something went wrong')
      ).toBeInTheDocument();
      expect(screen.getByText('Try Again')).toBeInTheDocument();
      expect(screen.getByText('Go Home')).toBeInTheDocument();

      consoleSpy.mockRestore();
    });

    it('renders custom fallback when provided', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const customFallback = <div>Custom Error UI</div>;

      render(
        <RouteErrorBoundary fallback={customFallback}>
          <ThrowError shouldThrow={true} />
        </RouteErrorBoundary>
      );

      expect(screen.getByText('Custom Error UI')).toBeInTheDocument();

      consoleSpy.mockRestore();
    });
  });

  describe('Route Preloading', () => {
    it('preloads route successfully', async () => {
      expect(isRoutePreloaded('/')).toBe(false);

      await preloadRoute('/');

      expect(isRoutePreloaded('/')).toBe(true);
    });

    it('handles invalid route gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      await preloadRoute('/invalid-route');

      expect(consoleSpy).toHaveBeenCalledWith(
        'No loader found for route: /invalid-route'
      );
      expect(isRoutePreloaded('/invalid-route')).toBe(false);

      consoleSpy.mockRestore();
    });

    it('does not preload same route twice', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      await preloadRoute('/');
      await preloadRoute('/'); // Second call

      // Should only log once
      expect(consoleSpy).toHaveBeenCalledTimes(1);

      consoleSpy.mockRestore();
    });

    it('normalizes empty path to root', async () => {
      await preloadRoute('');

      expect(isRoutePreloaded('/')).toBe(true);
    });
  });

  describe('Lazy Loading Integration', () => {
    it('shows loading fallback while component loads', async () => {
      const LazyComponent = React.lazy(
        () =>
          new Promise(resolve =>
            setTimeout(
              () =>
                resolve({
                  default: () => <div>Loaded Component</div>,
                }),
              100
            )
          )
      );

      render(
        <BrowserRouter>
          <React.Suspense
            fallback={<LoadingFallback message='Loading component...' />}
          >
            <LazyComponent />
          </React.Suspense>
        </BrowserRouter>
      );

      // Should show loading initially
      expect(screen.getByText('Loading component...')).toBeInTheDocument();

      // Should show loaded component after delay
      await waitFor(
        () => {
          expect(screen.getByText('Loaded Component')).toBeInTheDocument();
        },
        { timeout: 200 }
      );
    });

    it('handles lazy loading errors with error boundary', async () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const FailingLazyComponent = React.lazy(() =>
        Promise.reject(new Error('Failed to load'))
      );

      render(
        <BrowserRouter>
          <RouteErrorBoundary>
            <React.Suspense fallback={<LoadingFallback />}>
              <FailingLazyComponent />
            </React.Suspense>
          </RouteErrorBoundary>
        </BrowserRouter>
      );

      // Should show error boundary UI
      await waitFor(() => {
        expect(
          screen.getByText('Oops! Something went wrong')
        ).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });
  });
});
