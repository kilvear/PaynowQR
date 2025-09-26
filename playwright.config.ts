import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:4173/webapp/',
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    command: 'npx http-server . -p 4173 -a 127.0.0.1 -c-1',
    port: 4173,
    reuseExistingServer: !process.env.CI,
    timeout: 15_000,
  },
});
