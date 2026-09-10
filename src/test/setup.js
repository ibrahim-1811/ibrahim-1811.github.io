import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
  // Project dialogs write ?project=<slug>; every test starts from a clean URL.
  window.history.replaceState(null, '', '/');
});
