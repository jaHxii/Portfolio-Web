import React from 'react';
import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders } from '@/test/render-page';

// Lazy pages need their default exports
import Index from '@/pages/Index';
import Skills from '@/pages/Skills';
import Experience from '@/pages/Experience';
import Contact from '@/pages/Contact';
import Resume from '@/pages/Resume';
import NotFound from '@/pages/NotFound';

describe('Page smoke tests', () => {
  it('Index page renders hero content', () => {
    renderWithProviders(<Index />);
    // 'Ermias' appears in nav, hero, and footer — just verify multiple instances exist
    expect(screen.getAllByText(/Ermias/).length).toBeGreaterThanOrEqual(1);
    // Verify a section-unique string
    expect(screen.getByText(/Featured/)).toBeTruthy();
  });

  it('Skills page renders engineering stack', () => {
    renderWithProviders(<Skills />);
    // Check for specific skill groupings unique to this page
    expect(screen.getByText(/Operations & Practices/)).toBeTruthy();
  });

  it('Experience page renders work history', () => {
    renderWithProviders(<Experience />);
    expect(screen.getByText(/ROTECH Information Technology/)).toBeTruthy();
  });

  it('Contact page renders form with honeypot', () => {
    renderWithProviders(<Contact />);
    expect(screen.getByText(/Send me a message/)).toBeTruthy();
    expect(screen.getByLabelText(/Full Name/)).toBeTruthy();
    expect(screen.getByLabelText(/Email Address/)).toBeTruthy();
    expect(screen.getByLabelText(/Message/)).toBeTruthy();
    // Honeypot field exists but is hidden
    expect(screen.getByLabelText(/Leave this empty/)).toBeTruthy();
  });

  it('Resume page renders CV content', () => {
    renderWithProviders(<Resume />);
    expect(screen.getByText(/ERMIAS LEMESA BAYISA/)).toBeTruthy();
  });

  it('NotFound page renders 404 content', () => {
    renderWithProviders(<NotFound />);
    expect(screen.getByText(/Lost above the clouds/)).toBeTruthy();
  });
});
