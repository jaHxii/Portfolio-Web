import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

interface ImageState {
  isLoaded: boolean;
  isInView: boolean;
  hasError: boolean;
  currentSrc: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  sizes = '100vw',
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<ImageState>({
    isLoaded: false,
    isInView: false,
    hasError: false,
    currentSrc: '',
  });

  // Generate responsive image sources with modern formats
  const generateSources = useCallback((baseSrc: string) => {
    const isExternal = baseSrc.startsWith('http') || baseSrc.startsWith('//');

    if (isExternal) {
      return {
        webp: baseSrc,
        avif: baseSrc,
        fallback: baseSrc,
      };
    }

    // For local images, generate different formats and sizes
    const basePath = baseSrc.replace(/\.[^/.]+$/, '');

    return {
      avif: `${basePath}.avif`,
      webp: `${basePath}.webp`,
      fallback: baseSrc,
    };
  }, []);

  // Generate srcSet for responsive images
  const generateSrcSet = useCallback(
    (baseSrc: string, format: string) => {
      const isExternal = baseSrc.startsWith('http') || baseSrc.startsWith('//');

      if (isExternal || !width) {
        return baseSrc;
      }

      const breakpoints = [480, 768, 1024, 1280, 1920];
      const srcSet = breakpoints
        .filter(bp => bp <= (width || 1920))
        .map(bp => {
          const scaledHeight = height
            ? Math.round((height * bp) / width)
            : undefined;
          const params = new URLSearchParams({
            w: bp.toString(),
            ...(scaledHeight && { h: scaledHeight.toString() }),
            q: quality.toString(),
            f: format,
          });
          return `${baseSrc}?${params} ${bp}w`;
        })
        .join(', ');

      return srcSet || baseSrc;
    },
    [width, height, quality]
  );

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setState(prev => ({ ...prev, isInView: true }));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState(prev => ({ ...prev, isInView: true }));
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Handle image load
  const handleLoad = useCallback(() => {
    setState(prev => ({ ...prev, isLoaded: true }));
    onLoad?.();
  }, [onLoad]);

  // Handle image error
  const handleError = useCallback(() => {
    setState(prev => ({ ...prev, hasError: true }));
    onError?.();
  }, [onError]);

  // Generate blur placeholder
  const generateBlurDataURL = useCallback(() => {
    if (blurDataURL) return blurDataURL;

    // Return a simple data URL for testing environments
    if (typeof document === 'undefined') {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo=';
    }

    // Generate a simple blur placeholder
    const canvas = document.createElement('canvas');
    canvas.width = 10;
    canvas.height = 10;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 10, 10);
      gradient.addColorStop(0, '#f3f4f6');
      gradient.addColorStop(1, '#e5e7eb');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 10, 10);
      return canvas.toDataURL();
    }

    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo=';
  }, [blurDataURL]);

  const sources = generateSources(src);
  const shouldLoad = state.isInView || priority;

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      {placeholder === 'blur' && !state.isLoaded && (
        <div
          className='absolute inset-0 bg-cover bg-center filter blur-sm scale-110 transition-opacity duration-300'
          style={{
            backgroundImage: `url(${generateBlurDataURL()})`,
            opacity: shouldLoad ? 0.5 : 1,
          }}
        />
      )}

      {/* Loading skeleton */}
      {!state.isLoaded && shouldLoad && (
        <div className='absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse' />
      )}

      {/* Main image with picture element for format support */}
      {shouldLoad && (
        <picture>
          {/* AVIF format */}
          <source
            srcSet={generateSrcSet(sources.avif, 'avif')}
            sizes={sizes}
            type='image/avif'
          />

          {/* WebP format */}
          <source
            srcSet={generateSrcSet(sources.webp, 'webp')}
            sizes={sizes}
            type='image/webp'
          />

          {/* Fallback */}
          <img
            ref={imgRef}
            src={sources.fallback}
            srcSet={generateSrcSet(sources.fallback, 'jpg')}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding='async'
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-300',
              state.isLoaded ? 'opacity-100' : 'opacity-0',
              state.hasError && 'opacity-50'
            )}
          />
        </picture>
      )}

      {/* Error state */}
      {state.hasError && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500'>
          <div className='text-center'>
            <div className='text-2xl mb-2'>📷</div>
            <div className='text-sm'>Failed to load image</div>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {shouldLoad && !state.isLoaded && !state.hasError && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin' />
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
