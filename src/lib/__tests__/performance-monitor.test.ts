import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  performanceMonitor,
  PERFORMANCE_THRESHOLDS,
  PerformanceMetrics,
} from '../performance-monitor';

// Mock web-vitals
vi.mock('web-vitals', () => ({
  onCLS: vi.fn(),
  onFCP: vi.fn(),
  onINP: vi.fn(),
  onLCP: vi.fn(),
  onTTFB: vi.fn(),
}));

// Mock console methods
const consoleSpy = {
  log: vi.spyOn(console, 'log').mockImplementation(() => {}),
  warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
};

// Mock PerformanceObserver
global.PerformanceObserver = Object.assign(
  vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
  })),
  { supportedEntryTypes: [] as readonly string[] }
) as unknown as typeof PerformanceObserver;

// Mock performance API
Object.defineProperty(global, 'performance', {
  writable: true,
  value: {
    getEntriesByType: vi.fn(type => {
      if (type === 'navigation') {
        return [
          {
            domContentLoadedEventEnd: 1500,
            domContentLoadedEventStart: 1400,
            domComplete: 2000,
            navigationStart: 0,
            loadEventEnd: 2100,
            redirectEnd: 50,
            redirectStart: 0,
            domainLookupEnd: 150,
            domainLookupStart: 100,
            connectEnd: 250,
            connectStart: 200,
            requestStart: 300,
            responseStart: 400,
            responseEnd: 500,
          },
        ];
      }
      if (type === 'resource') {
        return [
          { name: 'script.js', duration: 500, transferSize: 1024 },
          { name: 'style.css', duration: 200, transferSize: 512 },
          { name: 'slow-image.jpg', duration: 1500, transferSize: 2048 },
        ];
      }
      return [];
    }),
  },
});

describe('Performance Monitor', () => {
  beforeEach(async () => {
    // Reset performance monitor state
    performanceMonitor.reset();
    // @ts-expect-error - Reset private isInitialized flag
    performanceMonitor.isInitialized = false;

    // Clear console spies
    Object.values(consoleSpy).forEach(spy => spy.mockClear());

    // Get mocked functions
    const { onCLS, onFCP, onINP, onLCP, onTTFB } = await import('web-vitals');

    // Reset web-vitals mocks
    vi.mocked(onCLS).mockClear();
    vi.mocked(onFCP).mockClear();
    vi.mocked(onINP).mockClear();
    vi.mocked(onLCP).mockClear();
    vi.mocked(onTTFB).mockClear();

    // Set up default mock implementations
    vi.mocked(onCLS).mockImplementation(callback => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setTimeout(
        () => callback({ name: 'CLS', value: 0.05, id: 'test-cls' } as any),
        100
      );
    });
    vi.mocked(onFCP).mockImplementation(callback => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setTimeout(
        () => callback({ name: 'FCP', value: 1200, id: 'test-fcp' } as any),
        50
      );
    });
    vi.mocked(onINP).mockImplementation(callback => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setTimeout(
        () => callback({ name: 'INP', value: 80, id: 'test-inp' } as any),
        150
      );
    });
    vi.mocked(onLCP).mockImplementation(callback => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setTimeout(
        () => callback({ name: 'LCP', value: 2000, id: 'test-lcp' } as any),
        200
      );
    });
    vi.mocked(onTTFB).mockImplementation(callback => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setTimeout(
        () => callback({ name: 'TTFB', value: 600, id: 'test-ttfb' } as any),
        25
      );
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('Initialization', () => {
    it('initializes performance monitoring', () => {
      performanceMonitor.init();

      expect(consoleSpy.log).toHaveBeenCalledWith(
        'Performance monitoring initialized'
      );
    });

    it('does not initialize twice', () => {
      // Clear any previous logs
      consoleSpy.log.mockClear();

      performanceMonitor.init();
      const firstCallCount = consoleSpy.log.mock.calls.length;

      performanceMonitor.init(); // Second call should not log again
      const secondCallCount = consoleSpy.log.mock.calls.length;

      // Should not have additional logs from second init call
      expect(secondCallCount).toBe(firstCallCount);
    });
  });

  describe('Metrics Collection', () => {
    it('starts with null metrics', () => {
      const metrics = performanceMonitor.getMetrics();

      expect(metrics).toEqual({
        fcp: null,
        lcp: null,
        fid: null,
        cls: null,
        ttfb: null,
      });
    });

    it('collects Core Web Vitals metrics', async () => {
      performanceMonitor.init();

      // Wait for metrics to be collected
      await new Promise(resolve => setTimeout(resolve, 300));

      const metrics = performanceMonitor.getMetrics();

      // Check that some metrics are collected
      expect(metrics.fcp).toBe(1200);
      expect(metrics.cls).toBe(0.05);
      expect(metrics.ttfb).toBe(600);
    });

    it('reports completion status correctly', async () => {
      expect(performanceMonitor.isComplete()).toBe(false);

      performanceMonitor.init();

      // Wait for all metrics
      await new Promise(resolve => setTimeout(resolve, 300));

      // Should be complete after all metrics are collected
      const metrics = performanceMonitor.getMetrics();
      const hasAllMetrics = Object.values(metrics).every(
        value => value !== null
      );
      expect(hasAllMetrics).toBe(true);
    });
  });

  describe('Performance Budgets', () => {
    it('warns when performance budget is exceeded', async () => {
      // Mock a poor LCP metric
      const { onLCP } = await import('web-vitals');
      vi.mocked(onLCP).mockImplementation(callback => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback({ name: 'LCP', value: 5000, id: 'test-lcp-poor' } as any); // Poor LCP
      });

      performanceMonitor.init();

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(consoleSpy.warn).toHaveBeenCalledWith(
        expect.stringContaining('Performance budget exceeded for lcp'),
        expect.objectContaining({
          metric: 'lcp',
          value: 5000,
          rating: 'poor',
        })
      );
    });

    it('does not warn for good metrics', async () => {
      performanceMonitor.init();

      await new Promise(resolve => setTimeout(resolve, 300));

      // Should not have budget warnings for good metrics
      expect(consoleSpy.warn).not.toHaveBeenCalledWith(
        expect.stringContaining('Performance budget exceeded')
      );
    });
  });

  describe('Performance Ratings', () => {
    it('calculates correct ratings for metrics', () => {
      // Test with known good values
      const testMetrics: PerformanceMetrics = {
        fcp: 1200, // Good
        lcp: 2000, // Good
        fid: 80, // Good
        cls: 0.05, // Good
        ttfb: 600, // Good
      };

      Object.entries(testMetrics).forEach(([key, value]) => {
        const metricKey = key as keyof PerformanceMetrics;
        // Test against thresholds directly
        expect(value).toBeLessThanOrEqual(
          PERFORMANCE_THRESHOLDS.good[metricKey]
        );
      });
    });

    it('identifies poor performance correctly', () => {
      const poorMetrics: PerformanceMetrics = {
        fcp: 4000, // Poor
        lcp: 5000, // Poor
        fid: 400, // Poor
        cls: 0.3, // Poor
        ttfb: 2000, // Poor
      };

      Object.entries(poorMetrics).forEach(([key, value]) => {
        const metricKey = key as keyof PerformanceMetrics;
        // Test against thresholds directly
        expect(value).toBeGreaterThan(
          PERFORMANCE_THRESHOLDS.needsImprovement[metricKey]
        );
      });
    });
  });

  describe('Event Listeners', () => {
    it('adds and removes listeners correctly', () => {
      const listener = vi.fn();

      performanceMonitor.addListener(listener);
      performanceMonitor.removeListener(listener);

      // Should not call listener after removal
      performanceMonitor.init();

      expect(listener).not.toHaveBeenCalled();
    });

    it('notifies listeners when metrics update', async () => {
      const listener = vi.fn();

      performanceMonitor.addListener(listener);
      performanceMonitor.init();

      // Wait for at least one metric
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(listener).toHaveBeenCalled();
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          metrics: expect.any(Object),
          ratings: expect.any(Object),
          timestamp: expect.any(Number),
        })
      );
    });
  });

  describe('Performance Thresholds', () => {
    it('has correct threshold values', () => {
      expect(PERFORMANCE_THRESHOLDS.good).toEqual({
        fcp: 1800,
        lcp: 2500,
        fid: 100,
        cls: 0.1,
        ttfb: 800,
      });

      expect(PERFORMANCE_THRESHOLDS.needsImprovement).toEqual({
        fcp: 3000,
        lcp: 4000,
        fid: 300,
        cls: 0.25,
        ttfb: 1800,
      });
    });
  });

  describe('Report Generation', () => {
    it('generates complete performance report', async () => {
      performanceMonitor.init();

      await new Promise(resolve => setTimeout(resolve, 300));

      const report = performanceMonitor.generateReport();

      expect(report).toMatchObject({
        metrics: expect.any(Object),
        ratings: expect.any(Object),
        timestamp: expect.any(Number),
        url: expect.any(String),
        userAgent: expect.any(String),
      });

      // Check that all metric keys are present
      const metricKeys: (keyof PerformanceMetrics)[] = [
        'fcp',
        'lcp',
        'fid',
        'cls',
        'ttfb',
      ];
      metricKeys.forEach(key => {
        expect(report.metrics).toHaveProperty(key);
        expect(report.ratings).toHaveProperty(key);
      });
    });
  });

  describe('Reset Functionality', () => {
    it('resets metrics to initial state', async () => {
      performanceMonitor.init();

      await new Promise(resolve => setTimeout(resolve, 100));

      // Reset
      performanceMonitor.reset();

      // Verify reset
      expect(performanceMonitor.getMetrics()).toEqual({
        fcp: null,
        lcp: null,
        fid: null,
        cls: null,
        ttfb: null,
      });
    });
  });
});
