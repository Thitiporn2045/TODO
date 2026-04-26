import { defineConfig, devices } from '@playwright/test';

const frontendUrl = process.env.E2E_BASE_URL ?? 'http://127.0.0.1:5173';
const backendUrl = process.env.E2E_API_URL ?? 'http://127.0.0.1:3000';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: frontendUrl,
    trace: 'on-first-retry',
  },
  webServer: [
    {
      command: 'npm run dev -w backend',
      url: `${backendUrl}/todos`,
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
      env: {
        PORT: '3000',
        DATABASE_HOST: process.env.DATABASE_HOST ?? '127.0.0.1',
        DATABASE_PORT: process.env.DATABASE_PORT ?? '5433',
        DATABASE_USER: process.env.DATABASE_USER ?? 'todo',
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD ?? 'todo',
        DATABASE_NAME: process.env.DATABASE_NAME ?? 'todo_app',
        FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN ?? 'http://127.0.0.1:5173',
      },
    },
    {
      command: 'npm run dev -w frontend',
      url: frontendUrl,
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
      env: {
        VITE_API_URL: backendUrl,
      },
    },
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
