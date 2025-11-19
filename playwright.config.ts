import type { PlaywrightTestConfig } from '@playwright/test';
import path from 'path';

const config: PlaywrightTestConfig = {
  testDir: path.join(__dirname, 'tests'),
  timeout: 30_000,
  expect: { timeout: 5000 },
  retries: 0,
  reporter: [ ['list'], ['dot'], [path.join(__dirname, 'reporters', 'json-reporter.ts')] ],
  projects: [
    {
      name: 'chromium-headless',
      use: { browserName: 'chromium', headless: true }
    },
    {
      name: 'chromium-headed',
      use: { browserName: 'chromium', headless: false }
    }
  ],
  use: {
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    baseURL: 'https://demowebshop.tricentis.com'
  }
};

export default config;
