/**
 * Performance monitoring service with Core Web Vitals tracking
 */

import React from 'react';
import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from 'web-vitals';

export interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
}

export interface PerformanceBudget {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
}

export interface PerformanceThresholds {
  good: PerformanceBudget;
  needsImprovement: PerformanceBudget;
}

// Performance thresholds based on Core Web Vitals standards
export const PERFORMANCE_THRESHOLDS: PerformanceThresholds = {
  good: {
    fcp: 1800, // 1.8s
    lcp: 2500, // 2.5s
    fid: 100, // 100ms
    cls: 0.1, // 0.1
    ttfb: 800, // 800ms
  },
  needsImprovement: {
    fcp: 3000, // 3s
    lcp: 4000, // 4s
    fid: 300, // 300ms
    cls: 0.25, // 0.25
    ttfb: 1800, // 1.8s
  },
};

export type PerformanceRating = 'good' | 'needs-improvement' | 'poor';

export interface PerformanceReport {
  metrics: PerformanceMetrics;
  ratings: Record<keyof PerformanceMetrics, PerformanceRating>;
  timestamp: number;
  url: string;
  userAgent: string;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics = {
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  };
  private listeners: ((report: PerformanceReport) => void)[] = [];
  private isInitialized = false;

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Initialize performance monitoring
   */
  init(): void {
    if (this.isInitialized || typeof window === 'undefined') {
      return;
    }

    this.isInitialized = true;

    // Track Core Web Vitals
    onCLS(this.handleMetric.bind(this));
    onFCP(this.handleMetric.bind(this));
    onINP(this.handleMetric.bind(this));
    onLCP(this.handleMetric.bind(this));
    onTTFB(this.handleMetric.bind(this));

    // Track additional performance metrics
    this.trackNavigationTiming();
    this.trackResourceTiming();
    this.trackLongTasks();

    console.log('Performance monitoring initialized');
  }

  /**
   * Handle Core Web Vitals metrics
   */
  private handleMetric(metric: Metric): void {
    // Map INP (modern replacement for FID) to the 'fid' key for backward compatibility
    const rawName = metric.name.toLowerCase();
    const metricName = (
      rawName === 'inp' ? 'fid' : rawName
    ) as keyof PerformanceMetrics;
    this.metrics[metricName] = metric.value;

    console.log(`${metric.name}: ${metric.value}`, metric);

    // Check if metric exceeds budget
    this.checkPerformanceBudget(metricName, metric.value);

    // Notify listeners
    this.notifyListeners();

    // Send to analytics (in production)
    this.sendToAnalytics(metric);
  }

  /**
   * Check performance budget and warn if exceeded
   */
  private checkPerformanceBudget(
    metricName: keyof PerformanceMetrics,
    value: number
  ): void {
    const thresholds = PERFORMANCE_THRESHOLDS;
    const rating = this.getRating(metricName, value);

    if (rating === 'poor') {
      console.warn(`Performance budget exceeded for ${metricName}: ${value}`, {
        metric: metricName,
        value,
        threshold: thresholds.needsImprovement[metricName],
        rating,
      });

      // In production, you might want to send alerts
      this.sendPerformanceAlert(metricName, value, rating);
    }
  }

  /**
   * Get performance rating for a metric
   */
  private getRating(
    metricName: keyof PerformanceMetrics,
    value: number
  ): PerformanceRating {
    const thresholds = PERFORMANCE_THRESHOLDS;

    if (value <= thresholds.good[metricName]) {
      return 'good';
    } else if (value <= thresholds.needsImprovement[metricName]) {
      return 'needs-improvement';
    } else {
      return 'poor';
    }
  }

  /**
   * Track Navigation Timing API metrics
   */
  private trackNavigationTiming(): void {
    if (!('performance' in window) || !performance.getEntriesByType) {
      return;
    }

    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;
    if (!navigation) return;

    const metrics = {
      domContentLoaded:
        navigation.domContentLoadedEventEnd -
        navigation.domContentLoadedEventStart,
      domComplete: navigation.domComplete - navigation.fetchStart,
      loadComplete: navigation.loadEventEnd - navigation.fetchStart,
      redirectTime: navigation.redirectEnd - navigation.redirectStart,
      dnsTime: navigation.domainLookupEnd - navigation.domainLookupStart,
      connectTime: navigation.connectEnd - navigation.connectStart,
      requestTime: navigation.responseStart - navigation.requestStart,
      responseTime: navigation.responseEnd - navigation.responseStart,
    };

    console.log('Navigation Timing:', metrics);
  }

  /**
   * Track Resource Timing API metrics
   */
  private trackResourceTiming(): void {
    if (!('performance' in window) || !performance.getEntriesByType) {
      return;
    }

    const resources = performance.getEntriesByType(
      'resource'
    ) as PerformanceResourceTiming[];
    const slowResources = resources.filter(
      resource => resource.duration > 1000
    );

    if (slowResources.length > 0) {
      console.warn('Slow loading resources detected:', slowResources);
    }

    // Track largest resources
    const largestResources = resources
      .sort((a, b) => b.transferSize - a.transferSize)
      .slice(0, 5);

    console.log('Largest resources:', largestResources);
  }

  /**
   * Track Long Tasks API
   */
  private trackLongTasks(): void {
    if (!('PerformanceObserver' in window)) {
      return;
    }

    try {
      const observer = new PerformanceObserver(list => {
        const longTasks = list.getEntries();
        if (longTasks.length > 0) {
          console.warn('Long tasks detected:', longTasks);

          // Send long task data to analytics
          longTasks.forEach(task => {
            // Create a simple analytics event for long tasks
            if (process.env.NODE_ENV === 'development') {
              console.log('Long Task Analytics (dev):', {
                name: 'longtask',
                value: task.duration,
                timestamp: Date.now(),
                url: window.location.href,
              });
            }
          });
        }
      });

      observer.observe({ entryTypes: ['longtask'] });
    } catch (error) {
      console.warn('Long Tasks API not supported:', error);
    }
  }

  /**
   * Send metric to analytics service
   */
  private sendToAnalytics(metric: Metric): void {
    // In production, send to your analytics service
    // Example: Google Analytics, DataDog, New Relic, etc.

    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics (dev):', {
        name: metric.name,
        value: metric.value,
        rating: this.getRating(
          metric.name.toLowerCase() as keyof PerformanceMetrics,
          metric.value
        ),
        timestamp: Date.now(),
        url: window.location.href,
      });
    }

    // Example implementation for Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as any).gtag;
      gtag('event', metric.name, {
        event_category: 'Web Vitals',
        value: Math.round(
          metric.name === 'CLS' ? metric.value * 1000 : metric.value
        ),
        custom_parameter_1: metric.id,
        non_interaction: true,
      });
    }
  }

  /**
   * Send performance alert
   */
  private sendPerformanceAlert(
    metricName: string,
    value: number,
    rating: PerformanceRating
  ): void {
    // In production, send to monitoring service (e.g., Sentry, DataDog)
    console.error('Performance Alert:', {
      metric: metricName,
      value,
      rating,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    });
  }

  /**
   * Add performance listener
   */
  addListener(callback: (report: PerformanceReport) => void): void {
    this.listeners.push(callback);
  }

  /**
   * Remove performance listener
   */
  removeListener(callback: (report: PerformanceReport) => void): void {
    const index = this.listeners.indexOf(callback);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  /**
   * Notify all listeners
   */
  private notifyListeners(): void {
    const report = this.generateReport();
    this.listeners.forEach(callback => callback(report));
  }

  /**
   * Generate performance report
   */
  generateReport(): PerformanceReport {
    const ratings: Record<keyof PerformanceMetrics, PerformanceRating> = {
      fcp: this.metrics.fcp ? this.getRating('fcp', this.metrics.fcp) : 'good',
      lcp: this.metrics.lcp ? this.getRating('lcp', this.metrics.lcp) : 'good',
      fid: this.metrics.fid ? this.getRating('fid', this.metrics.fid) : 'good',
      cls: this.metrics.cls ? this.getRating('cls', this.metrics.cls) : 'good',
      ttfb: this.metrics.ttfb
        ? this.getRating('ttfb', this.metrics.ttfb)
        : 'good',
    };

    return {
      metrics: { ...this.metrics },
      ratings,
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    };
  }

  /**
   * Get current metrics
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Check if all metrics are collected
   */
  isComplete(): boolean {
    return Object.values(this.metrics).every(value => value !== null);
  }

  /**
   * Reset metrics
   */
  reset(): void {
    this.metrics = {
      fcp: null,
      lcp: null,
      fid: null,
      cls: null,
      ttfb: null,
    };
    this.isInitialized = false;
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// React hook for performance monitoring
export function usePerformanceMonitor() {
  const [report, setReport] = React.useState<PerformanceReport | null>(null);

  React.useEffect(() => {
    const handleReport = (newReport: PerformanceReport) => {
      setReport(newReport);
    };

    performanceMonitor.addListener(handleReport);
    performanceMonitor.init();

    return () => {
      performanceMonitor.removeListener(handleReport);
    };
  }, []);

  return {
    report,
    metrics: performanceMonitor.getMetrics(),
    isComplete: performanceMonitor.isComplete(),
    generateReport: () => performanceMonitor.generateReport(),
  };
}

// Initialize performance monitoring
export function initPerformanceMonitoring(): void {
  if (typeof window !== 'undefined') {
    performanceMonitor.init();
  }
}
