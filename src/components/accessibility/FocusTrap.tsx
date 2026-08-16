import React, { useEffect, useMemo, useRef } from 'react';

export interface FocusTrapProps {
  active: boolean;
  children: React.ReactNode;
  onEscape?: () => void;
  /**
   * If provided, FocusTrap will try to focus this element when activated.
   * Useful for modals where you want focus on the close button.
   */
  initialFocusRef?: React.RefObject<HTMLElement>;
}

const DEFAULT_FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(', ');

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = Array.from(
    container.querySelectorAll<HTMLElement>(DEFAULT_FOCUSABLE_SELECTOR)
  );
  // Only keep visible elements (best-effort for jsdom + real browsers)
  return elements.filter(el => {
    const style = window.getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden';
  });
}

/**
 * FocusTrap keeps keyboard focus within its children while `active` is true.
 * Intended for modal dialogs and similar UI overlays.
 */
export const FocusTrap: React.FC<FocusTrapProps> = ({
  active,
  children,
  onEscape,
  initialFocusRef,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const focusableSelector = useMemo(() => DEFAULT_FOCUSABLE_SELECTOR, []);

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const focusInitial = () => {
      const initialEl = initialFocusRef?.current;
      if (initialEl && container.contains(initialEl)) {
        initialEl.focus();
        return;
      }

      const focusable = getFocusableElements(container);
      focusable[0]?.focus();
    };

    // Defer focus until after mount/layout.
    const t = window.setTimeout(() => focusInitial(), 0);
    return () => window.clearTimeout(t);
  }, [active, initialFocusRef]);

  useEffect(() => {
    if (!active) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const container = containerRef.current;
      if (!container) return;

      // Ignore key presses when focus is outside the trap.
      const target = e.target as Node | null;
      if (!target || !container.contains(target)) return;

      if (e.key === 'Escape') {
        onEscape?.();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter(el => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden';
      });

      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      const activeEl = document.activeElement as HTMLElement | null;
      if (!activeEl) return;

      if (e.shiftKey) {
        if (activeEl === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (activeEl === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [active, onEscape, focusableSelector]);

  return <div ref={containerRef}>{children}</div>;
};

export default FocusTrap;
