import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  usePerformanceMonitor,
  PerformanceMetrics,
  PerformanceRating,
  PERFORMANCE_THRESHOLDS,
} from '@/lib/performance-monitor';
import { cn } from '@/lib/utils';

interface PerformanceDashboardProps {
  className?: string;
  showInProduction?: boolean;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  className,
  showInProduction = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { report, metrics, isComplete } = usePerformanceMonitor();

  // Only show in development unless explicitly enabled for production
  const shouldShow = process.env.NODE_ENV === 'development' || showInProduction;

  useEffect(() => {
    // Auto-show dashboard when metrics are available
    if (isComplete && shouldShow) {
      setIsVisible(true);
    }
  }, [isComplete, shouldShow]);

  if (!shouldShow) {
    return null;
  }

  const getRatingColor = (rating: PerformanceRating): string => {
    switch (rating) {
      case 'good':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'needs-improvement':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRatingIcon = (rating: PerformanceRating) => {
    switch (rating) {
      case 'good':
        return <CheckCircle className='w-4 h-4' />;
      case 'needs-improvement':
        return <Clock className='w-4 h-4' />;
      case 'poor':
        return <AlertTriangle className='w-4 h-4' />;
      default:
        return <Activity className='w-4 h-4' />;
    }
  };

  const formatMetricValue = (
    key: keyof PerformanceMetrics,
    value: number | null
  ): string => {
    if (value === null) return 'N/A';

    switch (key) {
      case 'cls':
        return value.toFixed(3);
      case 'fcp':
      case 'lcp':
      case 'fid':
      case 'ttfb':
        return `${Math.round(value)}ms`;
      default:
        return value.toString();
    }
  };

  const getOverallRating = (): PerformanceRating => {
    if (!report) return 'good';

    const ratings = Object.values(report.ratings);
    if (ratings.some(rating => rating === 'poor')) return 'poor';
    if (ratings.some(rating => rating === 'needs-improvement'))
      return 'needs-improvement';
    return 'good';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className={cn('fixed top-20 right-4 z-50 max-w-sm', className)}
        >
          <Card className='bg-background/95 backdrop-blur-sm border shadow-lg'>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium flex items-center gap-2'>
                  <Activity className='w-4 h-4' />
                  Performance Monitor
                </CardTitle>
                <div className='flex items-center gap-1'>
                  <Badge
                    variant='outline'
                    className={cn(
                      'text-xs',
                      getRatingColor(getOverallRating())
                    )}
                  >
                    {getOverallRating().toUpperCase()}
                  </Badge>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setIsExpanded(!isExpanded)}
                    className='h-6 w-6 p-0'
                  >
                    {isExpanded ? (
                      <EyeOff className='w-3 h-3' />
                    ) : (
                      <Eye className='w-3 h-3' />
                    )}
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setIsVisible(false)}
                    className='h-6 w-6 p-0'
                  >
                    ×
                  </Button>
                </div>
              </div>
            </CardHeader>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CardContent className='pt-0 space-y-3'>
                    {Object.entries(metrics).map(([key, value]) => {
                      const metricKey = key as keyof PerformanceMetrics;
                      const rating = report?.ratings[metricKey] || 'good';
                      const threshold = PERFORMANCE_THRESHOLDS.good[metricKey];

                      return (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className='flex items-center justify-between p-2 rounded-lg border bg-card'
                        >
                          <div className='flex items-center gap-2'>
                            <div
                              className={cn(
                                'p-1 rounded',
                                getRatingColor(rating)
                              )}
                            >
                              {getRatingIcon(rating)}
                            </div>
                            <div>
                              <div className='text-sm font-medium uppercase'>
                                {key}
                              </div>
                              <div className='text-xs text-muted-foreground'>
                                Target:{' '}
                                {formatMetricValue(metricKey, threshold)}
                              </div>
                            </div>
                          </div>
                          <div className='text-right'>
                            <div
                              className={cn(
                                'text-sm font-mono font-medium',
                                value === null
                                  ? 'text-muted-foreground'
                                  : 'text-foreground'
                              )}
                            >
                              {formatMetricValue(metricKey, value)}
                            </div>
                            <div className='text-xs text-muted-foreground'>
                              {rating.replace('-', ' ')}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* Additional Info */}
                    <div className='pt-2 border-t text-xs text-muted-foreground space-y-1'>
                      <div>
                        Updated:{' '}
                        {report
                          ? new Date(report.timestamp).toLocaleTimeString()
                          : 'N/A'}
                      </div>
                      <div>Complete: {isComplete ? 'Yes' : 'No'}</div>
                    </div>

                    {/* Actions */}
                    <div className='flex gap-2 pt-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => {
                          console.log('Performance Report:', report);
                          console.log('Current Metrics:', metrics);
                        }}
                        className='flex-1 text-xs'
                      >
                        Log Report
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => window.location.reload()}
                        className='flex-1 text-xs'
                      >
                        Refresh
                      </Button>
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PerformanceDashboard;
