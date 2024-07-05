import type { Locator, Page, Request } from '@playwright/test'
import { baseTest } from '../../../../base.fixture'
import { CampaignPage } from '../../CampaignPage.fixture'
import {
  API_ROUTE_GET_CAMPAIGN,
  API_ROUTE_GET_CAMPAIGN_ROLES,
  API_ROUTE_GET_WHITELIST_TEMPLATE_DOWNLOAD,
  API_URL,
  CAMPAIGN1_ID,
  DEFAULT_RESPONSE_HEADERS,
} from '../../../../constants'
import {
  API_GET_CAMPAIGN_ROLES_RESPONSE,
  API_GET_TEMPLATE_WHITELIST_DOWNLOAD_RESPONSE,
  API_GET_CAMPAIGN_WITH_WHITELIST_AND_LIST_OF_WHITELISTS_RESPONSE,
} from './EligibilityType.response'

export class CampaignTabEligibilityTypePage extends CampaignPage {
  readonly page: Page

  readonly baseUrl: string | undefined

  readonly downloadTemplateCsvButton: Locator

  readonly copyLinkButton: Locator

  readonly campaignSignUpLinkPane: Locator

  readonly whitelistContainerPane: Locator

  readonly requiredFieldsPane: Locator

  readonly whitelistAttachmentWithModal: Locator

  readonly campaignSignUpLinkBadge: Locator

  readonly campaignSignUpLinkInputLink: Locator

  readonly replaceWhitelistCsvButton: Locator

  constructor(page: Page, baseUrl: string | undefined) {
    super(page, baseUrl)
    this.page = page
    this.baseUrl = baseUrl
    this.downloadTemplateCsvButton = page.locator(
      'button:has-text("Download CSV template")'
    )
    this.copyLinkButton = page.locator('button:has-text("Copy link")')
    this.campaignSignUpLinkPane = page.locator('#campaign-sign-up-link-pane')
    this.whitelistContainerPane = page.locator('#whitelist-container-pane')
    this.requiredFieldsPane = page.locator(
      '#whitelist-recipient-id-required-fields-pane'
    )
    this.whitelistAttachmentWithModal = page.locator(
      '#whitelist-attachment-with-modal'
    )
    this.campaignSignUpLinkBadge = page.locator(
      '#campaign-sign-up-link-visibility-badge'
    )
    this.campaignSignUpLinkInputLink = page.locator(
      '#campaign-sign-up-link-pane input'
    )
    this.replaceWhitelistCsvButton = page.locator(
      'button:has-text("Replace whitelist CSV")'
    )
  }

  async goto() {
    await this.page.goto(`${this.baseUrl}/campaigns/${CAMPAIGN1_ID}/settings`)
  }

  async mockGetCampaignRolesOkResponse() {
    await this.page.route(
      `${API_URL}${API_ROUTE_GET_CAMPAIGN_ROLES}`,
      async (route) => {
        return route.fulfill({
          status: 200,
          headers: DEFAULT_RESPONSE_HEADERS,
          body: JSON.stringify(API_GET_CAMPAIGN_ROLES_RESPONSE),
        })
      }
    )
  }

  async mockDownloadTemplateCsvOkResponse() {
    await this.page.route(
      `${API_URL}${API_ROUTE_GET_WHITELIST_TEMPLATE_DOWNLOAD}`,
      async (route) => {
        return route.fulfill({
          status: 200,
          headers: DEFAULT_RESPONSE_HEADERS,
          body: JSON.stringify(API_GET_TEMPLATE_WHITELIST_DOWNLOAD_RESPONSE),
        })
      }
    )
  }

  async mockGetCampaignWithWhitelistEligibilityAndListOfUploadedWhitelistsOkResponse() {
    await this.page.route(`${API_URL}${API_ROUTE_GET_CAMPAIGN}`, (route) => {
      return route.fulfill({
        status: 200,
        headers: DEFAULT_RESPONSE_HEADERS,
        body: JSON.stringify(
          API_GET_CAMPAIGN_WITH_WHITELIST_AND_LIST_OF_WHITELISTS_RESPONSE
        ),
      })
    })
  }

  async getNumWhitelistlogRendered(): Promise<number> {
    return (await this.page.locator('#whitelist-log-body > *').elementHandles())
      .length
  }

  waitForDownloadTemplateCsvRequest(): Promise<Request> {
    return this.page.waitForRequest((request) => {
      return (
        request.url() ===
          `${API_URL}/v1/campaigns/whitelist/template/download?type=recipientId` &&
        request.method() === 'GET'
      )
    })
  }
}

type CampaignTabEligibilityTypeFixture = {
  campaignTabEligibilityTypePage: CampaignTabEligibilityTypePage
}

export const campaignTabEligibilityTypeTest =
  baseTest.extend<CampaignTabEligibilityTypeFixture>({
    campaignTabEligibilityTypePage: async ({ page, baseURL }, use) => {
      const campaignTabEligibilityTypePage = new CampaignTabEligibilityTypePage(
        page,
        baseURL
      )
      await use(campaignTabEligibilityTypePage)
    },
  })
