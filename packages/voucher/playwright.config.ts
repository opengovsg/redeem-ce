import {PlaywrightTestConfig, devices, Project} from '@playwright/test'
import _ from 'lodash'

const androidPhones = ['Moto G4']
const iosPhones = ['iPhone SE']

const androidProjects: Project[] = _.map(androidPhones, (androidPhone) => ({
  name: androidPhone,
  use: {
    browserName: 'chromium',
    ...devices[androidPhone],
  },
}))

const iosProjects: Project[] = _.map(iosPhones, (iosPhone) => ({
  name: iosPhone,
  use: {
    browserName: 'webkit',
    ...devices[iosPhone],
  },
}))

/**
 * See https://playwright.dev/docs/test-configuration.
 * See https://github.com/microsoft/playwright/issues/14814 for some of the more configuration used.
 */
const config: PlaywrightTestConfig = {
  // In signup and admin repository, there is an explicit technique to prevent situations where tests start before the dev server is ready. However
  // in voucher repository, since its light weight, there is not much of this issue. See https://github.com/microsoft/playwright/issues/14814#issuecomment-1154581680
  webServer: {
    command: 'pnpm start',
    port: 3000,
    // Increasing the timeout for web server should get rid of Timed out waiting XXXXms from config.webServer.
    // This was the common source of our first test case always failing and is being marked as flaky. See https://github.com/datagovsg/redeem-admin/pull/681#discussion_r1356016918
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  projects: _.concat(iosProjects, androidProjects),
  retries: 3,
  timeout: 2 * 60 * 1000,
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
  // Signifies that each test case within a test file is executed in parallel. It's imperative to note that this configuration presumes and necessitates
  // that test cases are truly isolated and bear no dependencies on one another for accurate, reliable results.
  fullyParallel: true,
}
export default config
