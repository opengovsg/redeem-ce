import { Page, expect } from '@playwright/test'
import {
  API_ROUTE_GET_CAMPAIGN,
  API_ROUTE_GET_CAMPAIGN_STATS,
  API_URL,
  CAMPAIGN1_ID,
  DEFAULT_RESPONSE_HEADERS,
  API_ROUTE_GET_TWILIO_CREDENTIALS,
  API_ROUTE_GET_TWILIO_SMS_USAGE,
} from '../../constants'
import { baseTest, RedeemAdminPage } from '../../base.fixture'
import {
  API_GET_CAMPAIGN_RESPONSE,
  API_GET_CAMPAIGN_STATS_RESPONSE,
  API_GET_CAMPAIGN_WITH_WHITELIST_RESPONSE,
  API_GET_TWILIO_CREDENTIALS_EMPTY_RESPONSE,
  API_GET_TWILIO_SMS_USAGE,
} from './Campaign.responses'

export class CampaignPage extends RedeemAdminPage {
  readonly page: Page

  readonly baseUrl: string | undefined

  constructor(page: Page, baseUrl: string | undefined) {
    super(page, baseUrl)
    this.page = page
    this.baseUrl = baseUrl
  }

  async goto() {
    await this.page.goto(`${this.baseUrl}/campaigns/${CAMPAIGN1_ID}`)
  }

  async mockGetCampaignOkResponse() {
    await this.page.route(`${API_URL}${API_ROUTE_GET_CAMPAIGN}`, (route) => {
      return route.fulfill({
        status: 200,
        headers: DEFAULT_RESPONSE_HEADERS,
        body: JSON.stringify(API_GET_CAMPAIGN_RESPONSE),
      })
    })
  }

  async mockGetCampaignStatsResponse() {
    await this.page.route(
      `${API_URL}${API_ROUTE_GET_CAMPAIGN_STATS}`,
      (route) => {
        return route.fulfill({
          status: 200,
          headers: DEFAULT_RESPONSE_HEADERS,
          body: JSON.stringify(API_GET_CAMPAIGN_STATS_RESPONSE),
        })
      }
    )
  }

  async mockGetTwilioCredentialsOkResponse() {
    await this.page.route(
      `${API_URL}${API_ROUTE_GET_TWILIO_CREDENTIALS}`,
      async (route) => {
        return route.fulfill({
          status: 200,
          headers: DEFAULT_RESPONSE_HEADERS,
          body: JSON.stringify(API_GET_TWILIO_CREDENTIALS_EMPTY_RESPONSE),
        })
      }
    )
  }

  async mockGetTwilioSmsUsageOkResponse() {
    await this.page.route(
      `${API_URL}${API_ROUTE_GET_TWILIO_SMS_USAGE}`,
      async (route) => {
        return route.fulfill({
          status: 200,
          headers: DEFAULT_RESPONSE_HEADERS,
          body: JSON.stringify(API_GET_TWILIO_SMS_USAGE),
        })
      }
    )
  }

  async mockGetCampaignWithWhitelistEligibilityOkResponse() {
    await this.page.route(`${API_URL}${API_ROUTE_GET_CAMPAIGN}`, (route) => {
      return route.fulfill({
        status: 200,
        headers: DEFAULT_RESPONSE_HEADERS,
        body: JSON.stringify(API_GET_CAMPAIGN_WITH_WHITELIST_RESPONSE),
      })
    })
  }

  async expectNavTabVisible(label: string): Promise<void> {
    return expect(
      this.page.locator(`#campaign-nav-tabs >> text="${label}"`)
    ).toBeVisible()
  }

  async expectNavTabHidden(label: string): Promise<void> {
    await expect(
      this.page.locator(`#campaign-nav-tabs >> text="${label}"`)
    ).toBeHidden()
  }
}

type CampaignPageFixture = {
  campaignPage: CampaignPage
}

export const campaignPageTest = baseTest.extend<CampaignPageFixture>({
  campaignPage: async ({ page, baseURL }, use) => {
    const campaignPage = new CampaignPage(page, baseURL)
    await use(campaignPage)
  },
})
