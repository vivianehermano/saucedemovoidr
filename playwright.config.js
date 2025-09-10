import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : 4,

  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'relatorios/resultados.json' }],
    ['list'],
    ['github'],
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',

    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Teste-Automatizado-Chrome',
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Teste-Automatizado-Firefox',
      },
    },
    {
      name: 'mobile',
      use: {
        browserName: 'chromium',
        viewport: { width: 390, height: 844 },
        userAgent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Teste-Automatizado-Safari',
      },
    },
  ],
});
