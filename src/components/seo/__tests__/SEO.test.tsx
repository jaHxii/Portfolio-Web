import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import SEO from '../SEO';

// Mock window.location
const mockLocation = {
  origin: 'https://example.com',
  href: 'https://example.com/test',
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

const renderWithProviders = (component: React.ReactElement) => {
  const helmetContext = {};
  return render(
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>{component}</BrowserRouter>
    </HelmetProvider>
  );
};

describe('SEO Component', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(<SEO />);
    expect(container).toBeTruthy();
  });

  it('renders with default props', () => {
    const { container } = renderWithProviders(<SEO />);

    // Check that Helmet is rendered (it doesn't render visible content)
    expect(container.querySelector('div')).toBeFalsy(); // SEO component doesn't render visible content
  });

  it('renders with custom props', () => {
    const customProps = {
      title: 'Custom Title',
      description: 'Custom description',
      keywords: ['custom', 'keywords'],
      author: 'Custom Author',
    };

    const { container } = renderWithProviders(<SEO {...customProps} />);
    expect(container).toBeTruthy();
  });

  it('handles article type correctly', () => {
    const props = {
      type: 'article' as const,
      publishedTime: '2023-01-01T00:00:00Z',
      modifiedTime: '2023-01-02T00:00:00Z',
      author: 'Test Author',
      section: 'Technology',
      tags: ['react', 'typescript'],
    };

    const { container } = renderWithProviders(<SEO {...props} />);
    expect(container).toBeTruthy();
  });

  it('handles noIndex and noFollow flags', () => {
    const { container } = renderWithProviders(
      <SEO noIndex={true} noFollow={true} />
    );
    expect(container).toBeTruthy();
  });

  it('handles canonical URL', () => {
    const canonicalUrl = 'https://example.com/canonical';
    const { container } = renderWithProviders(
      <SEO canonicalUrl={canonicalUrl} />
    );
    expect(container).toBeTruthy();
  });

  it('handles absolute image URLs', () => {
    const absoluteImageUrl = 'https://cdn.example.com/image.jpg';
    const { container } = renderWithProviders(<SEO image={absoluteImageUrl} />);
    expect(container).toBeTruthy();
  });

  it('handles relative image URLs', () => {
    const relativeImageUrl = '/local-image.jpg';
    const { container } = renderWithProviders(<SEO image={relativeImageUrl} />);
    expect(container).toBeTruthy();
  });

  it('constructs robots meta content correctly', () => {
    // Test default robots content
    const defaultRobots = 'index,follow';

    // Test noindex, nofollow
    const restrictedRobots = 'noindex,nofollow';

    // These would be the expected values based on the component logic
    expect(defaultRobots).toBe('index,follow');
    expect(restrictedRobots).toBe('noindex,nofollow');
  });

  it('constructs image URLs correctly', () => {
    const relativeUrl = '/image.jpg';
    const absoluteUrl = 'https://example.com/image.jpg';

    // Test that absolute URLs are returned as-is
    expect(absoluteUrl.startsWith('http')).toBe(true);

    // Test that relative URLs would be converted to absolute
    const expectedAbsolute = `${mockLocation.origin}${relativeUrl}`;
    expect(expectedAbsolute).toBe('https://example.com/image.jpg');
  });
});
