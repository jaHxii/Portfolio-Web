import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import OptimizedImage from '../optimized-image';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
const mockDisconnect = vi.fn();

mockIntersectionObserver.mockImplementation(callback => ({
  observe: mockObserve,
  unobserve: mockUnobserve,
  disconnect: mockDisconnect,
  callback,
}));

beforeEach(() => {
  window.IntersectionObserver = mockIntersectionObserver;

  // Reset mocks
  mockIntersectionObserver.mockClear();
  mockObserve.mockClear();
  mockUnobserve.mockClear();
  mockDisconnect.mockClear();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('OptimizedImage', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test image',
    width: 800,
    height: 600,
  };

  it('renders with basic props', () => {
    render(<OptimizedImage {...defaultProps} priority />);

    const img = screen.getByAltText('Test image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'Test image');
  });

  it('applies custom className', () => {
    const { container } = render(
      <OptimizedImage {...defaultProps} className='custom-class' />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('sets up intersection observer for lazy loading when not priority', () => {
    render(<OptimizedImage {...defaultProps} priority={false} />);

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );
  });

  it('does not use intersection observer when priority is true', () => {
    render(<OptimizedImage {...defaultProps} priority={true} />);

    // Should not set up intersection observer for priority images
    expect(mockIntersectionObserver).not.toHaveBeenCalled();
  });

  it('generates correct picture element with multiple formats', () => {
    render(<OptimizedImage {...defaultProps} priority />);

    const picture = screen.getByRole('img').closest('picture');
    expect(picture).toBeInTheDocument();

    const sources = picture?.querySelectorAll('source');
    expect(sources).toHaveLength(2); // AVIF and WebP sources

    // Check AVIF source
    expect(sources?.[0]).toHaveAttribute('type', 'image/avif');

    // Check WebP source
    expect(sources?.[1]).toHaveAttribute('type', 'image/webp');
  });

  it('handles image load event', async () => {
    const onLoad = vi.fn();
    render(<OptimizedImage {...defaultProps} onLoad={onLoad} priority />);

    const img = screen.getByAltText('Test image');

    // Simulate image load
    fireEvent.load(img);

    await waitFor(() => {
      expect(onLoad).toHaveBeenCalled();
    });
  });

  it('handles image error event', async () => {
    const onError = vi.fn();
    render(<OptimizedImage {...defaultProps} onError={onError} priority />);

    const img = screen.getByAltText('Test image');

    // Simulate image error
    fireEvent.error(img);

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });

  it('shows loading indicator when image is loading', () => {
    render(<OptimizedImage {...defaultProps} priority />);

    // Should show loading spinner
    const loadingSpinner = document.querySelector('.animate-spin');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('shows error state when image fails to load', async () => {
    render(<OptimizedImage {...defaultProps} priority />);

    const img = screen.getByAltText('Test image');

    // Simulate image error
    fireEvent.error(img);

    await waitFor(() => {
      expect(screen.getByText('Failed to load image')).toBeInTheDocument();
    });
  });

  it('applies blur placeholder when specified', () => {
    render(
      <OptimizedImage
        {...defaultProps}
        placeholder='blur'
        blurDataURL='data:image/jpeg;base64,test'
      />
    );

    // Should have blur placeholder element
    const blurElement = document.querySelector('.blur-sm');
    expect(blurElement).toBeInTheDocument();
  });

  it('sets loading attribute based on priority', () => {
    const { rerender } = render(<OptimizedImage {...defaultProps} priority />);

    let img = screen.getByAltText('Test image');
    expect(img).toHaveAttribute('loading', 'eager');

    rerender(<OptimizedImage {...defaultProps} priority={false} />);

    img = screen.getByAltText('Test image');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('handles external URLs correctly', () => {
    const externalSrc = 'https://example.com/image.jpg';
    render(<OptimizedImage {...defaultProps} src={externalSrc} priority />);

    const img = screen.getByAltText('Test image');
    expect(img).toHaveAttribute('src', externalSrc);
  });

  it('generates responsive srcSet for local images', () => {
    render(<OptimizedImage {...defaultProps} priority />);

    const img = screen.getByAltText('Test image');
    const srcSet = img.getAttribute('srcset');

    expect(srcSet).toContain('480w');
    expect(srcSet).toContain('768w');
    // Only check for breakpoints that should be included based on the width (800px)
    // 1024w won't be included since it's larger than the image width
  });

  it('applies custom sizes attribute', () => {
    const customSizes = '(max-width: 768px) 100vw, 50vw';
    render(<OptimizedImage {...defaultProps} sizes={customSizes} priority />);

    const sources = document.querySelectorAll('source');
    sources.forEach(source => {
      expect(source).toHaveAttribute('sizes', customSizes);
    });
  });

  it('uses custom quality parameter', () => {
    render(<OptimizedImage {...defaultProps} quality={90} priority />);

    const img = screen.getByAltText('Test image');
    const srcSet = img.getAttribute('srcset');

    expect(srcSet).toContain('q=90');
  });

  it('handles intersection observer callback', async () => {
    let intersectionCallback: (_entries: any[]) => void;

    mockIntersectionObserver.mockImplementation(callback => {
      intersectionCallback = callback;
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      };
    });

    render(<OptimizedImage {...defaultProps} priority={false} />);

    // Simulate intersection
    act(() => {
      intersectionCallback!([{ isIntersecting: true }]);
    });

    // Should load the image when in view
    await waitFor(() => {
      const img = screen.getByAltText('Test image');
      expect(img).toBeInTheDocument();
    });
  });

  it('cleans up intersection observer on unmount', () => {
    const mockDisconnect = vi.fn();

    mockIntersectionObserver.mockReturnValue({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: mockDisconnect,
    });

    const { unmount } = render(
      <OptimizedImage {...defaultProps} priority={false} />
    );

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });
});
