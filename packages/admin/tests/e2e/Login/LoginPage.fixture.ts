// playwright-dev-page.ts
import { Locator, Page } from '@playwright/test'
import {
  API_ROUTE_REGISTER,
  API_ROUTE_VERIFY_OTP,
  API_URL,
  DEFAULT_RESPONSE_HEADERS,
} from '../constants'
import { RedeemAdminPage } from '../base.fixture'
import {
  API_REGISTER_OTP_SUCCESS_RESPONSE,
  API_VERIFY_OTP_SUCCESS_RESPONSE,
} from './Login.responses'

export class LoginPage extends RedeemAdminPage {
  readonly page: Page

  readonly baseUrl: string | undefined

  readonly loginButton: Locator

  readonly emailInput: Locator

  readonly otpInput: Locator

  constructor(page: Page, baseUrl: string | undefined) {
    super(page, baseUrl)
    this.page = page
    this.baseUrl = baseUrl
    this.loginButton = page.locator('#login-primary-button')
    this.emailInput = page.locator('#email-input')
    this.otpInput = page.locator('#otp-input')
  }

  async goto() {
    await this.page.goto(`${this.baseUrl}`)
  }

  async typeOtp(otp: string) {
    await this.otpInput.type(otp)
  }

  async typeEmail(email: string) {
    await this.emailInput.type(email)
  }

  async submit() {
    await this.loginButton.click()
  }

  async mockApiVerifyOtpSuccess() {
    await this.page.route(`${API_URL}${API_ROUTE_VERIFY_OTP}`, (route) => {
      return route.fulfill({
        status: 200,
        headers: DEFAULT_RESPONSE_HEADERS,
        body: JSON.stringify(API_VERIFY_OTP_SUCCESS_RESPONSE),
      })
    })
  }

  async mockApiRegisterOtpSuccess() {
    await this.page.route(`${API_URL}${API_ROUTE_REGISTER}`, (route) => {
      return route.fulfill({
        status: 200,
        headers: DEFAULT_RESPONSE_HEADERS,
        body: JSON.stringify(API_REGISTER_OTP_SUCCESS_RESPONSE),
      })
    })
  }
}
