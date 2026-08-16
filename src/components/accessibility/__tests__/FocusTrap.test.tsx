import React, { useRef } from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import FocusTrap from '../FocusTrap';

describe('FocusTrap', () => {
  it('focuses initial element when activated', async () => {
    const user = userEvent.setup();

    const initialFocusRef = { current: null as HTMLElement | null };
    const App = () => {
      const ref = useRef<HTMLButtonElement | null>(null);
      initialFocusRef.current = ref.current;
      return (
        <FocusTrap active initialFocusRef={ref}>
          <button type='button'>First</button>
          <button type='button'>Second</button>
        </FocusTrap>
      );
    };

    render(<App />);

    const first = screen.getByRole('button', { name: 'First' });
    await waitFor(() => expect(first).toHaveFocus());

    // sanity check: focus can still be moved by user interaction
    await user.click(screen.getByRole('button', { name: 'Second' }));
    expect(screen.getByRole('button', { name: 'Second' })).toHaveFocus();
  });

  it('traps focus within the container (Tab wraps from last to first)', async () => {
    render(
      <FocusTrap active>
        <button type='button'>First</button>
        <button type='button'>Second</button>
      </FocusTrap>
    );

    const first = screen.getByRole('button', { name: 'First' });
    const second = screen.getByRole('button', { name: 'Second' });

    second.focus();
    await waitFor(() => expect(second).toHaveFocus());

    fireEvent.keyDown(second, { key: 'Tab' });
    await waitFor(() => expect(first).toHaveFocus());
  });

  it('traps focus within the container (Shift+Tab wraps from first to last)', async () => {
    render(
      <FocusTrap active>
        <button type='button'>First</button>
        <button type='button'>Second</button>
      </FocusTrap>
    );

    const first = screen.getByRole('button', { name: 'First' });
    const second = screen.getByRole('button', { name: 'Second' });

    first.focus();
    await waitFor(() => expect(first).toHaveFocus());

    fireEvent.keyDown(first, { key: 'Tab', shiftKey: true });
    await waitFor(() => expect(second).toHaveFocus());
  });

  it('calls onEscape when Escape is pressed', async () => {
    const onEscape = vi.fn();

    render(
      <FocusTrap active onEscape={onEscape}>
        <button type='button'>First</button>
        <button type='button'>Second</button>
      </FocusTrap>
    );

    const first = screen.getByRole('button', { name: 'First' });
    await waitFor(() => expect(first).toHaveFocus());

    // Dispatch keydown directly so jsdom focus behavior doesn't interfere.
    fireEvent.keyDown(first, { key: 'Escape' });
    expect(onEscape).toHaveBeenCalledTimes(1);
  });
});
