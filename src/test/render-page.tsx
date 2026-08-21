import React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { TooltipProvider } from '@/components/ui/tooltip';

/**
 * Wraps a component in all the providers that every page expects:
 * BrowserRouter, HelmetProvider, TooltipProvider.
 */
export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <HelmetProvider>
        <TooltipProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    ),
    ...options,
  });
}
