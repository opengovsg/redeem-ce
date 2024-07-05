import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 * See https://github.com/microsoft/playwright/issues/14814 for some of the more configuration used.
 */
const config: PlaywrightTestConfig = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 2 * 60 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 4 : 0,
  // Parallel tests are flaky.
  // Configuration for Worker Parallelism:
  // CI Environment: 1 worker is assigned due to the inherent flakiness of parallel tests and to conform with GitHub Actions, which has 2 cores by default.
  // Playwright, by default, utilizes 50% of available cores; thus, in CI, we opt for 1 worker.
  // Local Environment: The worker count is left undefined, allowing Playwright to autonomously determine the optimal number of cores to utilize based on the
  // machine's specifications.
  workers: process.env.CI ? 1 : undefined,
  // In CI, we are using the sharding technique to speed up our playwright test.
  // Configuration for Report Generation:
  // CI Environment: The 'blob' reporter details about the test run and can be used later to produce any other report. Their primary function is to facilitate the merging of reports from sharded tests.
  // Local Environment: The 'html' reporter is preferred to produce a consolidated, web-viewable report for all tests, generating a self-contained folder that can be served as a web page for convenient inspection and review.
  reporter: process.env.CI ? 'blob' : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    // Since the webserver is hardcoded to be http://localhost:3000, we want to ensure that all the endpoints after prefix with
    // this baseURL. To use in actions like `await page.goto('/')` whereby it is prefix with this baseURL.
    baseURL: 'http://localhost:3001',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Edge'],
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */

  webServer: {
    command:
      // Reduce memory usage on CI to prevent out of memory errors
      'pnpm start --max_old_space_size=4096',
    // Increasing the timeout for web server should get rid of Timed out waiting XXXXms from config.webServer.
    // This was the common source of our first test case always failing and is being marked as flaky. See https://github.com/datagovsg/redeem-admin/pull/681#discussion_r1356016918
    timeout: 4 * 60 * 1000,
    // Using the url option should fix the issue where tests start before the dev server is ready. See https://github.com/microsoft/playwright/issues/14814#issuecomment-1154581680
    url: 'http://localhost:3001/',
    reuseExistingServer: !process.env.CI,
    env: {
      DISABLE_ESLINT_PLUGIN: 'true',
    },
  },

  // Signifies that each test case within a test file is executed in parallel. It's imperative to note that this configuration presumes and necessitates
  // that test cases are truly isolated and bear no dependencies on one another for accurate, reliable results.
  fullyParallel: true,
}

export default config
