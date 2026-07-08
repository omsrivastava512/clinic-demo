import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Use node environment for pure function tests (no DOM needed)
    environment: 'node',
  },
});
