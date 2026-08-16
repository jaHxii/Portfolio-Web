import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SkipLink from '../SkipLink';

describe('SkipLink', () => {
  it('renders anchor with correct href and label', () => {
    render(<SkipLink targetId='main-content' label='Skip to main' />);

    const link = screen.getByRole('link', { name: /skip to main/i });
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('uses sr-only + focus-visible styling classes', () => {
    render(<SkipLink targetId='main-content' />);

    const link = screen.getByRole('link', { name: /skip to content/i });
    expect(link.className).toContain('sr-only');
    expect(link.className).toContain('focus:not-sr-only');
  });
});
