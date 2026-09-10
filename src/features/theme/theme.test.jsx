import { render, screen, act, fireEvent } from '@testing-library/react';
import { beforeEach, afterEach, expect, it, vi } from 'vitest';
import { ThemeProvider } from './ThemeProvider';
import ThemeToggle from '../../components/navigation/ThemeToggle';

let media;
beforeEach(() => {
  localStorage.clear();
  media = new EventTarget();
  media.matches = false;
  vi.stubGlobal('matchMedia', () => media);
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
const renderToggle = () =>
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );

it('respects system dark mode without persisting an automatic choice', () => {
  media.matches = true;
  renderToggle();
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(localStorage.getItem('portfolio-theme')).toBeNull();
});
it('uses a valid saved preference ahead of the system', () => {
  localStorage.setItem('portfolio-theme', 'dark');
  renderToggle();
  expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument();
});
it('ignores invalid saved preferences', () => {
  localStorage.setItem('portfolio-theme', 'invalid');
  renderToggle();
  expect(document.documentElement.dataset.theme).toBe('light');
});
it('persists manual selection and restores it on remount', () => {
  const { unmount } = renderToggle();
  fireEvent.click(screen.getByRole('button', { name: 'Switch to dark theme' }));
  expect(localStorage.getItem('portfolio-theme')).toBe('dark');
  expect(document.documentElement.style.colorScheme).toBe('dark');
  unmount();
  renderToggle();
  expect(document.documentElement.dataset.theme).toBe('dark');
});
it('tracks system changes until a manual choice is made', () => {
  renderToggle();
  act(() => {
    media.matches = true;
    media.dispatchEvent(new Event('change'));
  });
  expect(document.documentElement.dataset.theme).toBe('dark');
  fireEvent.click(screen.getByRole('button', { name: 'Switch to light theme' }));
  act(() => {
    media.matches = false;
    media.dispatchEvent(new Event('change'));
  });
  act(() => {
    media.matches = true;
    media.dispatchEvent(new Event('change'));
  });
  expect(document.documentElement.dataset.theme).toBe('light');
});
it('remains usable when storage reads and writes are blocked', () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new Error('blocked');
  });
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('blocked');
  });
  renderToggle();
  fireEvent.click(screen.getByRole('button', { name: 'Switch to dark theme' }));
  expect(document.documentElement.dataset.theme).toBe('dark');
});
it('syncs preference changes from another tab', () => {
  renderToggle();
  act(() =>
    window.dispatchEvent(new StorageEvent('storage', { key: 'portfolio-theme', newValue: 'dark' })),
  );
  expect(document.documentElement.dataset.theme).toBe('dark');
  act(() => window.dispatchEvent(new StorageEvent('storage', { key: null })));
  expect(document.documentElement.dataset.theme).toBe('light');
});
