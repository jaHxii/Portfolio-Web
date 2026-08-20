import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class RouteErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to monitoring service
    console.error('Route Error Boundary caught an error:', error, errorInfo);

    // In production, you would send this to your error tracking service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='min-h-screen flex items-center justify-center bg-background p-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='text-center max-w-md mx-auto space-y-6'
          >
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className='flex justify-center'
            >
              <div className='w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center'>
                <AlertTriangle className='w-10 h-10 text-destructive' />
              </div>
            </motion.div>

            {/* Error Message */}
            <div className='space-y-2'>
              <h1 className='text-2xl font-bold text-foreground'>
                Oops! Something went wrong
              </h1>
              <p className='text-muted-foreground'>
                We encountered an error while loading this page. This might be a
                temporary issue.
              </p>
            </div>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 0.4 }}
                className='bg-destructive/5 border border-destructive/20 rounded-lg p-4 text-left'
              >
                <h3 className='font-semibold text-destructive mb-2'>
                  Error Details:
                </h3>
                <pre className='text-xs text-muted-foreground overflow-auto max-h-32'>
                  {this.state.error.message}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className='flex flex-col sm:flex-row gap-3 justify-center'
            >
              <Button
                onClick={this.handleRetry}
                className='flex items-center gap-2'
                variant='outline'
              >
                <RefreshCw className='w-4 h-4' />
                Try Again
              </Button>

              <Button
                onClick={this.handleGoHome}
                className='flex items-center gap-2'
              >
                <Home className='w-4 h-4' />
                Go Home
              </Button>
            </motion.div>

            {/* Help Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className='text-sm text-muted-foreground'
            >
              If the problem persists, please{' '}
              <Link to='/contact' className='text-primary hover:underline'>
                contact support
              </Link>
              .
            </motion.p>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default RouteErrorBoundary;
