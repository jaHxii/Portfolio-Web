import React from 'react';
import { motion } from 'framer-motion';

interface LoadingFallbackProps {
  message?: string;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  message = 'Loading...',
}) => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className='text-center space-y-4'
      >
        {/* Loading Spinner */}
        <div className='relative'>
          <div className='w-16 h-16 border-4 border-border rounded-full animate-spin border-t-primary mx-auto' />
          <div className='absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-pulse border-t-primary/20 mx-auto' />
        </div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className='text-muted-foreground font-medium'
        >
          {message}
        </motion.p>

        {/* Loading Dots Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className='flex justify-center space-x-1'
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className='w-2 h-2 bg-primary rounded-full'
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingFallback;
