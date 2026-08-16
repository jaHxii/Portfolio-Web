/**
 * Route preloading utilities for code-split routes
 */

// Cache for preloaded routes
const preloadedRoutes = new Set<string>();

// Route component loaders
export const routeLoaders = {
  '/': () => import('../pages/Index'),
  '/projects': () => import('../pages/Projects'),
  '/skills': () => import('../pages/Skills'),
  '/experience': () => import('../pages/Experience'),
  '/contact': () => import('../pages/Contact'),
} as const;

export type RouteKey = keyof typeof routeLoaders;

/**
 * Preload a route component
 */
export async function preloadRoute(path: string): Promise<void> {
  // Normalize path
  const normalizedPath = path === '' ? '/' : path;

  if (preloadedRoutes.has(normalizedPath)) {
    return; // Already preloaded
  }

  const loader = routeLoaders[normalizedPath as RouteKey];
  if (!loader) {
    console.warn(`No loader found for route: ${normalizedPath}`);
    return;
  }

  try {
    await loader();
    preloadedRoutes.add(normalizedPath);
    console.log(`Preloaded route: ${normalizedPath}`);
  } catch (error) {
    console.error(`Failed to preload route ${normalizedPath}:`, error);
  }
}

/**
 * Preload multiple routes
 */
export async function preloadRoutes(paths: string[]): Promise<void> {
  const promises = paths.map(path => preloadRoute(path));
  await Promise.allSettled(promises);
}

/**
 * Get preloaded routes
 */
export function getPreloadedRoutes(): string[] {
  return Array.from(preloadedRoutes);
}

/**
 * Clear preload cache
 */
export function clearPreloadCache(): void {
  preloadedRoutes.clear();
}

/**
 * Check if route is preloaded
 */
export function isRoutePreloaded(path: string): boolean {
  const normalizedPath = path === '' ? '/' : path;
  return preloadedRoutes.has(normalizedPath);
}

/**
 * Preload route on hover/focus with debouncing
 */
let preloadTimeout: NodeJS.Timeout | null = null;

export function scheduleRoutePreload(path: string, delay: number = 100): void {
  if (preloadTimeout) {
    clearTimeout(preloadTimeout);
  }

  preloadTimeout = setTimeout(() => {
    preloadRoute(path);
  }, delay);
}

/**
 * Cancel scheduled preload
 */
export function cancelScheduledPreload(): void {
  if (preloadTimeout) {
    clearTimeout(preloadTimeout);
    preloadTimeout = null;
  }
}

/**
 * Enhanced Link component with preloading
 */
export interface PreloadLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  preloadOnHover?: boolean;
  preloadOnFocus?: boolean;
  preloadDelay?: number;
}

/**
 * Hook for route preloading
 */
export function useRoutePreloader() {
  const preload = (path: string) => preloadRoute(path);
  const schedulePreload = (path: string, delay?: number) =>
    scheduleRoutePreload(path, delay);
  const cancelPreload = () => cancelScheduledPreload();

  return {
    preload,
    schedulePreload,
    cancelPreload,
    isPreloaded: isRoutePreloaded,
    preloadedRoutes: getPreloadedRoutes(),
  };
}

/**
 * Preload critical routes on app initialization
 */
export function preloadCriticalRoutes(): void {
  // Preload the most important routes
  const criticalRoutes = ['/', '/projects'];

  // Use requestIdleCallback if available, otherwise setTimeout
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      preloadRoutes(criticalRoutes);
    });
  } else {
    setTimeout(() => {
      preloadRoutes(criticalRoutes);
    }, 1000);
  }
}

/**
 * Intelligent route preloading based on user behavior
 */
export class RoutePreloadManager {
  private static instance: RoutePreloadManager;
  private preloadQueue: string[] = [];
  private isProcessing = false;

  static getInstance(): RoutePreloadManager {
    if (!RoutePreloadManager.instance) {
      RoutePreloadManager.instance = new RoutePreloadManager();
    }
    return RoutePreloadManager.instance;
  }

  /**
   * Add route to preload queue
   */
  queuePreload(path: string): void {
    if (!this.preloadQueue.includes(path) && !isRoutePreloaded(path)) {
      this.preloadQueue.push(path);
      this.processQueue();
    }
  }

  /**
   * Process preload queue
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.preloadQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.preloadQueue.length > 0) {
      const path = this.preloadQueue.shift();
      if (path) {
        try {
          await preloadRoute(path);
          // Add small delay between preloads to avoid blocking
          await new Promise(resolve => setTimeout(resolve, 50));
        } catch (error) {
          console.error(`Failed to preload route ${path}:`, error);
        }
      }
    }

    this.isProcessing = false;
  }

  /**
   * Preload based on current route
   */
  preloadRelatedRoutes(currentPath: string): void {
    const relatedRoutes: Record<string, string[]> = {
      '/': ['/projects', '/skills'],
      '/projects': ['/skills', '/experience'],
      '/skills': ['/experience', '/contact'],
      '/experience': ['/contact', '/projects'],
      '/contact': ['/', '/projects'],
    };

    const related = relatedRoutes[currentPath] || [];
    related.forEach(route => this.queuePreload(route));
  }
}
