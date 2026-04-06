import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "tests",

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: process.env.BASE_URL || "https://qauto.forstudy.space",

    httpCredentials: {
      username: process.env.AUTH_USERNAME!,
      password: process.env.AUTH_PASSWORD!,
    },

    trace: "on-first-retry",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "setup",
      testMatch: "**/setup/auth.setup.ts",
      use: {
        baseURL: process.env.BASE_URL || "https://qauto.forstudy.space",
      },
    },

    {
      name: "e2e-smoke",
      testIgnore: "tests/setup/**.setup.ts",
      testMatch: "tests/**.spec.ts",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["setup"],
    },
  ],
});