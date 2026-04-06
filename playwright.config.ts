import { defineConfig, devices } from "@playwright/test";
require('dotenv').config({ override: false });


export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: "tests",

  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: "html",

  //  globalSetup: require.resolve("./tests/setup/global-setup.ts"),


  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    // baseURL: "https://guest:welcome2qauto@qauto.forstudy.space",
    // baseURL: "https://qauto.forstudy.space",

    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.AUTH_USERNAME!,
      password: process.env.AUTH_PASSWORD!,
    },

    // Collect trace when retrying the failed test.
    trace: "on-first-retry",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "setup",
      testMatch: "**/setup/auth.setup.ts",
    },
    {
       name: 'e2e-smoke',
       testIgnore: 'tests/setup/**.setup.ts',
       testMatch: 'tests/**.spec.ts',
       use: { ...devices['Desktop Chrome'] },
       dependencies: ['setup'],
    },
  ],
  // Run your local dev server before starting the tests.
  // webServer: {
  //   command: "npm run start",
  //   url: "http://localhost:3000",
  //   reuseExistingServer: !process.env.CI,
  // },
});