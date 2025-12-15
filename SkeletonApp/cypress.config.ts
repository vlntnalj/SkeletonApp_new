import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8100',
    video: false,
    viewportWidth: 390,
    viewportHeight: 844,
  },
});
