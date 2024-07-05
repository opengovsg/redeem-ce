// playwright-dev-page.ts
import { ElementHandle, Locator, Page } from '@playwright/test'
import {
  API_ROUTE_GET_CAMPAIGNS,
  API_URL,
  DEFAULT_RESPONSE_HEADERS,
} from '../constants'
import { RedeemAdminPage, baseTest } from '../base.fixture'
import { API_GET_CAMPAIGNS_RESPONSE } from './Campaigns.responses'

export class CampaignsPage extends RedeemAdminPage {
  readonly page: Page

  readonly baseUrl: string | undefined

  constructor(page: Page, baseUrl: string | undefined) {
    super(page, baseUrl)
    this.page = page
    this.baseUrl = baseUrl
  }

  async goto() {
    await this.page.goto(`${this.baseUrl}/campaigns`)
  }

  async mockCampaignsOkResponse() {
    await this.page.route(`${API_URL}${API_ROUTE_GET_CAMPAIGNS}`, (route) => {
      return route.fulfill({
        status: 200,
        headers: DEFAULT_RESPONSE_HEADERS,
        body: JSON.stringify(API_GET_CAMPAIGNS_RESPONSE),
      })
    })
  }

  waitForCampaignToRender(
    label: string
  ): Promise<ElementHandle<SVGElement | HTMLElement>> {
    return this.page.waitForSelector(`text="${label}"`)
  }

  getManageCampaignButton(campaignId: string): Locator {
    return this.page.locator(`#manage-campaign-button-${campaignId}`)
  }

  waitForRedirectToCampaign(campaignId: string): Promise<void> {
    return this.page.waitForURL(`${this.baseUrl}/campaigns/${campaignId}/**`)
  }
}

type CampaignsPageFixture = {
  campaignsPage: CampaignsPage
}

export const campaignsPageTest = baseTest.extend<CampaignsPageFixture>({
  campaignsPage: async ({ page, baseURL }, use) => {
    const campaignsPage = new CampaignsPage(page, baseURL)
    await use(campaignsPage)
  },
})
