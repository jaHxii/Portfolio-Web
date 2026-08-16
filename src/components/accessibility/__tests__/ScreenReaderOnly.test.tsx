import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ScreenReaderOnly from '../ScreenReaderOnly';

describe('ScreenReaderOnly', () => {
  it('wraps children in sr-only element', () => {
    render(<ScreenReaderOnly>Hidden text</ScreenReaderOnly>);

    const el = screen.getByText(/hidden text/i);
    expect(el.tagName.toLowerCase()).toBe('span');
    expect(el.className).toContain('sr-only');
  });
});
