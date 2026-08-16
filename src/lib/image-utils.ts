/**
 * Image optimization utilities for responsive images and performance
 */

export interface ImageBreakpoint {
  width: number;
  height?: number;
  quality?: number;
}

export interface ImageConfig {
  src: string;
  alt: string;
  breakpoints?: ImageBreakpoint[];
  formats?: ('avif' | 'webp' | 'jpg' | 'png')[];
  quality?: number;
  priority?: boolean;
}

// Standard responsive breakpoints
export const DEFAULT_BREAKPOINTS: ImageBreakpoint[] = [
  { width: 320, quality: 70 }, // Mobile small
  { width: 480, quality: 75 }, // Mobile large
  { width: 768, quality: 80 }, // Tablet
  { width: 1024, quality: 85 }, // Desktop small
  { width: 1280, quality: 85 }, // Desktop medium
  { width: 1920, quality: 90 }, // Desktop large
];

// Image format priority (best to worst)
export const FORMAT_PRIORITY: ('avif' | 'webp' | 'jpg' | 'png')[] = [
  'avif',
  'webp',
  'jpg',
  'png',
];

/**
 * Generate optimized image URL with parameters
 */
export function generateOptimizedUrl(
  src: string,
  width: number,
  height?: number,
  format: string = 'webp',
  quality: number = 75
): string {
  // For external URLs, return as-is
  if (src.startsWith('http') || src.startsWith('//')) {
    return src;
  }

  // For local images, we would typically use a service like Cloudinary, ImageKit, or Next.js Image Optimization
  // For now, we'll return the original src with query parameters that could be processed by a build tool
  const params = new URLSearchParams({
    w: width.toString(),
    ...(height && { h: height.toString() }),
    f: format,
    q: quality.toString(),
  });

  return `${src}?${params}`;
}

/**
 * Generate srcSet string for responsive images
 */
export function generateSrcSet(
  src: string,
  breakpoints: ImageBreakpoint[] = DEFAULT_BREAKPOINTS,
  format: string = 'webp'
): string {
  return breakpoints
    .map(bp => {
      const url = generateOptimizedUrl(
        src,
        bp.width,
        bp.height,
        format,
        bp.quality
      );
      return `${url} ${bp.width}w`;
    })
    .join(', ');
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizes(
  breakpoints?: { breakpoint: string; size: string }[]
): string {
  if (!breakpoints) {
    return '100vw';
  }

  return (
    breakpoints
      .map(bp => `(max-width: ${bp.breakpoint}) ${bp.size}`)
      .join(', ') + ', 100vw'
  );
}

/**
 * Calculate aspect ratio from dimensions
 */
export function calculateAspectRatio(width: number, height: number): number {
  return width / height;
}

/**
 * Get optimal dimensions for a container
 */
export function getOptimalDimensions(
  containerWidth: number,
  containerHeight: number,
  imageWidth: number,
  imageHeight: number,
  objectFit: 'cover' | 'contain' | 'fill' = 'cover'
): { width: number; height: number } {
  const containerRatio = containerWidth / containerHeight;
  const imageRatio = imageWidth / imageHeight;

  if (objectFit === 'cover') {
    if (imageRatio > containerRatio) {
      // Image is wider, fit to height
      return {
        width: Math.round(containerHeight * imageRatio),
        height: containerHeight,
      };
    } else {
      // Image is taller, fit to width
      return {
        width: containerWidth,
        height: Math.round(containerWidth / imageRatio),
      };
    }
  } else if (objectFit === 'contain') {
    if (imageRatio > containerRatio) {
      // Image is wider, fit to width
      return {
        width: containerWidth,
        height: Math.round(containerWidth / imageRatio),
      };
    } else {
      // Image is taller, fit to height
      return {
        width: Math.round(containerHeight * imageRatio),
        height: containerHeight,
      };
    }
  }

  // Fill mode
  return { width: containerWidth, height: containerHeight };
}

/**
 * Generate blur placeholder data URL
 */
export function generateBlurPlaceholder(
  width: number = 10,
  height: number = 10,
  color1: string = '#f3f4f6',
  color2: string = '#e5e7eb'
): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL('image/jpeg', 0.1);
}

/**
 * Preload critical images
 */
export function preloadImage(src: string, format?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;

    if (format && format !== 'jpg' && format !== 'png') {
      // For modern formats, create a picture element to test support
      const picture = document.createElement('picture');
      const source = document.createElement('source');
      const fallbackImg = document.createElement('img');

      source.srcset = src;
      source.type = `image/${format}`;
      fallbackImg.src = src;

      picture.appendChild(source);
      picture.appendChild(fallbackImg);

      fallbackImg.onload = () => resolve();
      fallbackImg.onerror = reject;
    } else {
      img.src = src;
    }
  });
}

/**
 * Check if browser supports modern image formats
 */
export function checkImageFormatSupport(): Promise<{
  avif: boolean;
  webp: boolean;
}> {
  return Promise.all([
    checkFormatSupport('avif'),
    checkFormatSupport('webp'),
  ]).then(([avif, webp]) => ({ avif, webp }));
}

function checkFormatSupport(format: 'avif' | 'webp'): Promise<boolean> {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img.width === 1);
    img.onerror = () => resolve(false);

    // Test images (1x1 pixel)
    const testImages = {
      avif: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=',
      webp: 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA',
    };

    img.src = testImages[format];
  });
}

/**
 * Get device pixel ratio for high-DPI displays
 */
export function getDevicePixelRatio(): number {
  return typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
}

/**
 * Calculate optimal image size for device
 */
export function getOptimalImageSize(
  displayWidth: number,
  displayHeight: number,
  maxWidth: number = 1920
): { width: number; height: number } {
  const dpr = getDevicePixelRatio();
  const targetWidth = Math.min(displayWidth * dpr, maxWidth);
  const targetHeight = displayHeight * dpr;

  return {
    width: Math.round(targetWidth),
    height: Math.round(targetHeight),
  };
}
