import { baseTest as test } from '../base.fixture'

test.describe('Unauthorized auto logout tests', () => {
  test('Should redirect to login on 402', async ({ basePage, baseURL }) => {
    const campaignsUrl = `${baseURL}/campaigns`

    // Return status code 402 on all API calls
    await basePage.mockAllApiCallsAsUnauthorized()
    await basePage.page.goto(campaignsUrl)

    // Wait for redirect to login page. Will fail if not redirected before timeout
    await basePage.page.waitForURL(`${baseURL}`)
  })
})
