import { useEffect, useLayoutEffect, useRef } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export const OPEN_DIALOG_CLASS = 'has-open-dialog';

export function getFocusableElements(container) {
  return [...container.querySelectorAll(FOCUSABLE)].filter(
    (element) => !element.closest('[hidden], [inert]'),
  );
}

/**
 * Modal behavior for a dialog rendered in `layerRef` (a direct child of <body>):
 * everything else becomes inert, page scrolling stops, Escape closes and Tab wraps.
 */
export function useModalDialog({ layerRef, panelRef, onClose }) {
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useLayoutEffect(() => {
    const layer = layerRef.current;
    const panel = panelRef.current;
    const root = document.documentElement;
    const background = [...document.body.children].filter(
      (element) => element !== layer && !element.hasAttribute('inert'),
    );
    background.forEach((element) => element.setAttribute('inert', ''));
    // Replace the hidden scrollbar with padding so the page does not shift sideways.
    const scrollbarWidth = root.clientWidth > 0 ? window.innerWidth - root.clientWidth : 0;
    if (scrollbarWidth > 0) root.style.setProperty('--scrollbar-gap', `${scrollbarWidth}px`);
    root.classList.add(OPEN_DIALOG_CLASS);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = getFocusableElements(panel);
      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const outside = !panel.contains(active) || active === panel;
      if (event.shiftKey && (active === first || outside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || outside)) {
        event.preventDefault();
        first.focus();
      }
    };
    const onFocusIn = (event) => {
      if (!layer.contains(event.target)) (getFocusableElements(panel)[0] ?? panel).focus();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('focusin', onFocusIn);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('focusin', onFocusIn);
      background.forEach((element) => element.removeAttribute('inert'));
      root.classList.remove(OPEN_DIALOG_CLASS);
      root.style.removeProperty('--scrollbar-gap');
    };
  }, [layerRef, panelRef]);
}
