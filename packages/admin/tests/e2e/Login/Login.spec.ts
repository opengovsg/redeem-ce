import { test, expect } from '@playwright/test'
import percySnapshot from '@percy/playwright'
import _ from 'lodash'
import { LOCAL_STORAGE_USER, LOCAL_STORAGE_USER_KEY } from '../constants'
import { LoginPage } from './LoginPage.fixture'

test.describe('Login page tests', () => {
  test('Should save state and redirect to campaigns on successful login', async ({
    page,
    baseURL,
  }) => {
    const login = new LoginPage(page, baseURL)
    await login.mockNoResponseForAllUnmockedRoutes()
    await login.mockApiRegisterOtpSuccess()
    await login.mockApiVerifyOtpSuccess()
    await login.goto()

    await login.typeEmail('team@redeem.gov.sg')
    await percySnapshot(page, 'Login page email filled')
    await login.submit()

    await login.typeOtp('12345678')
    await percySnapshot(page, 'Login page otp filled')
    await login.submit()

    // Wait for redirect to login page on successful otp verification. Will fail if not redirected before timeout
    await page.waitForURL(`${baseURL}/campaigns`)

    const localStorageUserInfo = JSON.parse(
      (await page.evaluate(
        ({ userKey }) => window.localStorage.getItem(userKey),
        {
          userKey: LOCAL_STORAGE_USER_KEY,
        }
      )) || ''
    )
    const expectedLocalStorageUserInfo = Object.fromEntries(
      Object.entries(LOCAL_STORAGE_USER).map(([k, v]) => [_.camelCase(k), v])
    )

    expect(localStorageUserInfo).toStrictEqual(expectedLocalStorageUserInfo)
  })

  test('Should not be able to submit invalid email', async ({
    page,
    baseURL,
  }) => {
    const login = new LoginPage(page, baseURL)
    await login.goto()
    await login.mockApiRegisterOtpSuccess()

    await login.typeEmail('notanemail')
    await login.submit()

    // Check if email input is still on screen
    await login.emailInput.elementHandle({ timeout: 1000 })
  })
})
