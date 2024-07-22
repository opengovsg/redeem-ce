// playwright-dev-page.ts
import {
  Page,
  ElementHandle,
  test,
  Locator,
  Request,
  expect,
} from '@playwright/test'
import _ from 'lodash'
import qs, { ParsedQs } from 'qs'
import { baseTest } from '../../../base.fixture'
import {
  API_CAMPAIGN_VOUCHERS_PAGE_1_END_CURSOR,
  API_ROUTE_ADDRESS_IN_DENYLIST_CHECK,
  API_ROUTE_CREATE_CAMPAIGN_VOUCHERS,
  API_ROUTE_GET_CAMPAIGN_VOUCHERS,
  API_ROUTE_GET_PRINT_GROUPED_VOUCHERS,
  API_ROUTE_RECIPIENT_WHITELIST_CHECK,
  API_URL,
  CAMPAIGN1_ID,
  DEFAULT_RESPONSE_HEADERS,
  NEW_GROUPED_VOUCHER1_ID,
} from '../../../constants'
import { CampaignPage } from '../CampaignPage.fixture'
import {
  API_CREATE_GROUPED_VOUCHERS_RESPONSE,
  API_GET_CAMPAIGN_VOUCHERS_EMPTY_RESPONSE,
  API_GET_CAMPAIGN_VOUCHERS_PAGE_1_RESPONSE,
  API_GET_CAMPAIGN_VOUCHERS_PAGE_2_RESPONSE,
  API_GET_PRINT_GROUPED_VOUCHERS_RESPONSE,
  API_GET_PRINT_GROUPED_VOUCHERS_EMPTY_RESPONSE,
} from './VouchersTab.responses'

export class VouchersTabPage extends CampaignPage {
  readonly page: Page

  readonly baseUrl: string | undefined

  readonly nextPageButton: Locator

  readonly prevPageButton: Locator

  readonly createVouchersButton: Locator

  readonly paperVoucherTile: Locator

  readonly digitalVoucherTile: Locator

  readonly voucherTypeNextButton: Locator

  readonly createVouchersRecipientIdInput: Locator

  readonly createVouchersPostalCodeInput: Locator

  readonly createVouchersPostalCodeAutoCompleteItems: Locator

  readonly createVouchersFloorNumberAutoCompleteItems: Locator

  readonly createVouchersUnitNumberAutoCompleteItems: Locator

  readonly createVouchersFloorNumberInput: Locator

  readonly createVouchersUnitNumberInput: Locator

  readonly voucherRecipientStepNextButton: Locator

  readonly createVouchersNameInput: Locator

  readonly createVouchersMobileNumberInput: Locator

  readonly personalDetailsStepNextButton: Locator

  readonly createVouchersConfirmButton: Locator

  readonly createVouchersConfirmRecipientIdField: Locator

  readonly createVouchersConfirmContactNumberField: Locator

  readonly createVouchersConfirmAddressField: Locator

  readonly createVouchersConfirmNameField: Locator

  readonly createVouchersAddressSeeRecipientsButton: Locator

  readonly createVouchersRecipientIdSeeRecipientsButton: Locator

  readonly voucherSearchInput: Locator

  readonly vouchersTableBody: Locator

  readonly checkerResultRecipientIdEmptyEditButton: Locator

  readonly checkerResultAddressEmptyEditButton: Locator

  constructor(page: Page, baseUrl: string | undefined) {
    super(page, baseUrl)
    this.page = page
    this.baseUrl = baseUrl
    this.nextPageButton = page.locator('[aria-label="next page"]')
    this.prevPageButton = page.locator('[aria-label="previous page"]')
    this.createVouchersButton = page.locator('#create-vouchers-button')
    this.paperVoucherTile = page.locator('#paper-voucher-tile')
    this.digitalVoucherTile = page.locator('#digital-voucher-tile')
    this.voucherTypeNextButton = page.locator('#voucher-type-next-button')
    this.createVouchersRecipientIdInput = page.locator(
      '#create-vouchers-recipient-id-input'
    )
    this.createVouchersPostalCodeInput = page.locator(
      '#create-vouchers-postal-code-input-group input'
    )
    this.createVouchersPostalCodeAutoCompleteItems = page.locator(
      '#create-vouchers-postal-code-input-group [role="menuitem"]'
    )
    this.createVouchersFloorNumberInput = page.locator(
      '#create-vouchers-floor-number-input-group input'
    )
    this.createVouchersUnitNumberInput = page.locator(
      '#create-vouchers-unit-number-input-group input'
    )
    this.createVouchersFloorNumberAutoCompleteItems = page.locator(
      '#create-vouchers-floor-number-input-group [role="menuitem"]'
    )
    this.createVouchersUnitNumberAutoCompleteItems = page.locator(
      '#create-vouchers-unit-number-input-group [role="menuitem"]'
    )
    this.voucherRecipientStepNextButton = page.locator(
      '#voucher-recipient-step-next-button'
    )
    this.createVouchersNameInput = page.locator('#create-vouchers-name-input')
    this.createVouchersMobileNumberInput = page.locator(
      '#create-vouchers-mobile-number-input'
    )
    this.personalDetailsStepNextButton = page.locator(
      '#personal-details-step-next-button'
    )
    this.createVouchersConfirmButton = page.locator('#confirmation-step-next')
    this.createVouchersConfirmRecipientIdField = page.locator(
      '#recipient-details-recipient-id-field'
    )
    this.createVouchersConfirmContactNumberField = page.locator(
      '#recipient-details-contact-number-field'
    )
    this.createVouchersConfirmAddressField = page.locator(
      '#recipient-details-address-field'
    )
    this.createVouchersConfirmNameField = page.locator(
      '#recipient-details-name-field'
    )

    this.createVouchersAddressSeeRecipientsButton = page.locator(
      '#address-checker-result-see-details-button button'
    )
    this.createVouchersRecipientIdSeeRecipientsButton = page.locator(
      '#recipient-claimed-before-checker-result-see-details-button button'
    )
    this.voucherSearchInput = page.locator('#voucher-search-input')
    this.vouchersTableBody = page.locator('#vouchers-table-body')
    this.checkerResultRecipientIdEmptyEditButton = page.locator(
      '#confirmation-step-recipient-id-checker-result-empty button'
    )
    this.checkerResultAddressEmptyEditButton = page.locator(
      '#confirmation-step-address-checker-result-empty button'
    )
  }

  async goto() {
    await this.page.goto(`${this.baseUrl}/campaigns/${CAMPAIGN1_ID}/vouchers`)
  }

  async mockGetCampaignVouchersOkResponse() {
    await this.page.route(
      `${API_URL}${API_ROUTE_GET_CAMPAIGN_VOUCHERS}`,
      async (route, request) => {
        const queryParamsString = _.last(request.url().split('?')) || '{}'
        const queryParams = qs.parse(queryParamsString)

        let responseBody
        switch (_.get(queryParams, 'after')) {
          case undefined:
            responseBody = API_GET_CAMPAIGN_VOUCHERS_PAGE_1_RESPONSE
            break
          case API_CAMPAIGN_VOUCHERS_PAGE_1_END_CURSOR:
            responseBody = API_GET_CAMPAIGN_VOUCHERS_PAGE_2_RESPONSE
            break
          default:
            break
        }

        test.fail(
          !responseBody,
          'Client sent unknown "after" cursor in get campaign vouchers request'
        )
        return route.fulfill({
          status: 200,
          headers: DEFAULT_RESPONSE_HEADERS,
          body: JSON.stringify(responseBody),
        })
      }
    )
  }

  async mockGetCampaignVouchersOkEmptyResponse() {
    await this.page.route(
      `${API_URL}${API_ROUTE_GET_CAMPAIGN_VOUCHERS}`,
      (route) => {
        return route.fulfill({
          status: 200,
          headers: DEFAULT_RESPONSE_HEADERS,
          body: JSON.stringify(API_GET_CAMPAIGN_VOUCHERS_EMPTY_RESPONSE),
        })
      }
    )
  }

  async mockCreateCampaignVouchersOkResponse() {
    await this.page.route(
      `${API_URL}${API_ROUTE_CREATE_CAMPAIGN_VOUCHERS}`,
      (route) => {
        return route.fulfill({
          status: 200,
          headers: DEFAULT_RESPONSE_HEADERS,
          body: JSON.stringify(API_CREATE_GROUPED_VOUCHERS_RESPONSE),
        })
      }
    )
  }

  async mockGetPrintVouchersOkResponse() {
    await this.page.route(
      `${API_URL}${API_ROUTE_GET_PRINT_GROUPED_VOUCHERS}`,
      (route) => {
        return route.fulfill({
          status: 200,
          headers: DEFAULT_RESPONSE_HEADERS,
          body: JSON.stringify(API_GET_PRINT_GROUPED_VOUCHERS_RESPONSE),
        })
      }
    )
  }

  async mockGetPrintVouchersEmptyResponse() {
    await this.page.route(
      `${API_URL}${API_ROUTE_GET_PRINT_GROUPED_VOUCHERS}`,
      (route) => {
        return route.fulfill({
          status: 200,
          headers: DEFAULT_RESPONSE_HEADERS,
          body: JSON.stringify(API_GET_PRINT_GROUPED_VOUCHERS_EMPTY_RESPONSE),
        })
      }
    )
  }

  async mockCheckAgainstWhitelistAndNotInWhitelistResponse() {
    await this.page.route(
      `${API_URL}${API_ROUTE_RECIPIENT_WHITELIST_CHECK}`,
      (route) => {
        return route.fulfill({
          status: 200,
          headers: DEFAULT_RESPONSE_HEADERS,
          body: JSON.stringify({ result: false }),
        })
      }
    )
  }

  async mockCheckAddressInDenylistResponse(result: boolean) {
    await this.page.route(
      `${API_URL}${API_ROUTE_ADDRESS_IN_DENYLIST_CHECK}`,
      (route) => {
        return route.fulfill({
          status: 200,
          headers: DEFAULT_RESPONSE_HEADERS,
          body: JSON.stringify({ result }),
        })
      }
    )
  }

  async getNumVoucherRowsRendered(): Promise<number> {
    return (
      await this.page.locator('#vouchers-table-body > *').elementHandles()
    ).length
  }

  waitForGetGroupedVouchersApiRequest(
    expectedQueryParams: ParsedQs
  ): Promise<Request> {
    return this.page.waitForRequest((request) => {
      const [urlWithoutQueryString, queryString] = request.url().split('?')
      const queryParams = qs.parse(queryString)
      return (
        urlWithoutQueryString ===
          `${API_URL}/v1/campaigns/${CAMPAIGN1_ID}/vouchers` &&
        request.method() === 'GET' &&
        _.isEqual(queryParams, expectedQueryParams)
      )
    })
  }

  waitForCreateVouchersApiRequest(expectedPayload: unknown): Promise<Request> {
    return this.page.waitForRequest((request) => {
      return (
        request.url() ===
          `${API_URL}/v1/campaigns/${CAMPAIGN1_ID}/vouchers/create-group` &&
        request.method() === 'POST' &&
        _.isEqual(request.postDataJSON(), expectedPayload)
      )
    })
  }

  waitForGetVouchersToPrintApiRequest(): Promise<Request> {
    return this.page.waitForRequest((request) => {
      return (
        request.url() ===
          `${API_URL}/v1/vouchers/${NEW_GROUPED_VOUCHER1_ID}/vouchers-to-print` &&
        request.method() === 'GET'
      )
    })
  }

  waitForSendVouchersApiRequest(): Promise<Request> {
    return this.page.waitForRequest((request) => {
      return (
        request.url() ===
          `${API_URL}/v1/vouchers/${NEW_GROUPED_VOUCHER1_ID}/send-group` &&
        request.method() === 'POST'
      )
    })
  }

  waitForVoucherRows(): Promise<ElementHandle<HTMLElement | SVGElement>> {
    return this.page.waitForSelector('#vouchers-table-body > *')
  }

  expectRecipientClaimedMessageNotVisible(): Promise<void> {
    return expect(
      this.page.locator(
        '#recipient-claimed-before-checker-result-see-details-button'
      )
    ).toHaveCount(0)
  }

  expectRecipientClaimedMessageVisible(): Promise<void> {
    return expect(
      this.page
        .locator('#recipient-claimed-before-checker-result-see-details-button')
        .locator('text="Recipient claimed before"')
    ).toBeVisible()
  }

  expectRecipientNotInWhitelistMessageVisible(): Promise<void> {
    return expect(
      this.page
        .locator(
          '#recipient-not-in-whitelist-checker-result-see-details-button'
        )
        .locator('text="Recipient not eligible for campaign"')
    ).toBeVisible()
  }

  expectRecipientClaimedMessageVisibleInConfirmationPage(): Promise<void> {
    return expect(
      this.page
        .locator(
          '#confirmation-step-recipient-id-checker-result-claimed-before'
        )
        .locator('text="Recipient claimed before"')
    ).toBeVisible()
  }

  expectRecipientEmptyMessageVisibleInConfirmationPage(): Promise<void> {
    return expect(
      this.page
        .locator('#confirmation-step-recipient-id-checker-result-empty')
        .locator('text="Recipient id is empty"')
    ).toBeVisible()
  }

  expectAddressEmptyMessageVisibleInConfirmationPage(): Promise<void> {
    return expect(
      this.page
        .locator('#confirmation-step-address-checker-result-empty')
        .locator('text="Address is empty"')
    ).toBeVisible()
  }

  expectRecipientNotInWhitelistMessageVisibleInConfirmationPage(): Promise<void> {
    return expect(
      this.page
        .locator(
          '#confirmation-step-recipient-id-whitelist-checker-result-not-in-whitelist'
        )
        .locator('text="Recipient not eligible for campaign"')
    ).toBeVisible()
  }

  async expectAddressClaimedMessageVisibleInConfirmationPage(): Promise<void> {
    const checkerResult = this.page.locator(
      '#confirmation-step-address-checker-result-claimed-before'
    )

    await expect(
      checkerResult.locator('text="Address claimed before"')
    ).toBeVisible()
    await expect(
      checkerResult.locator(
        'text="45 TELOK BLANGAH DRIVE\n01-173\nPostal code 100045"'
      )
    ).toBeVisible()
  }

  async expectAddressClaimedMessageNotVisibleInConfirmationPage(): Promise<void> {
    return expect(
      this.page.locator(
        '#confirmation-step-address-checker-result-claimed-before'
      )
    ).toHaveCount(0)
  }

  async expectAddressNotEligibleNotVisibleInConfirmationPage(): Promise<void> {
    const checkerResult = this.page.locator(
      '#confirmation-step-address-checker-in-denylist'
    )

    await expect(
      checkerResult.locator('text="Address not eligible for campaign"')
    ).toBeHidden()
  }

  async expectAddressNotEligibleVisibleInConfirmationPage(): Promise<void> {
    const checkerResult = this.page.locator(
      '#confirmation-step-address-checker-in-denylist'
    )

    await expect(
      checkerResult.locator('text="Address not eligible for campaign"')
    ).toBeVisible()
  }

  expectAddressClaimedMessageVisible(): Promise<void> {
    return expect(
      this.page
        .locator('#address-checker-result-see-details-button')
        .locator('text="Address claimed before"')
    ).toBeVisible()
  }

  expectAddressClaimedMessageNotVisible(): Promise<void> {
    return expect(
      this.page.locator('#address-checker-result-see-details-button')
    ).toHaveCount(0)
  }

  expectAddressNotEligibleMessageVisible(): Promise<void> {
    return expect(
      this.page
        .locator('#address-in-denylist-checker-result-see-details-button')
        .locator('text="Address not eligible for campaign"')
    ).toBeVisible()
  }

  expectAddressNotEligibleMessageNotVisible(): Promise<void> {
    return expect(
      this.page.locator(
        '#address-in-denylist-checker-result-see-details-button'
      )
    ).toHaveCount(0)
  }

  async expectToBeInVoucherRecipientPage(): Promise<void> {
    const createVoucherSteppers = this.page.locator('#voucher-recipient-active')
    await expect(createVoucherSteppers).toBeVisible()
    await expect(createVoucherSteppers).toHaveText('Voucher recipient')
  }

  async expectConfirmRecipientIdFieldToBeMasked(
    recipientId: string
  ): Promise<void> {
    const maskedComponent = this.createVouchersConfirmRecipientIdField.locator(
      '#masked-recipient-id-component'
    )
    const unmaskedComponent =
      this.createVouchersConfirmRecipientIdField.locator(
        '#unmasked-recipient-id-component'
      )
    await expect(maskedComponent).toHaveText(recipientId.substring(0, 5))
    // toHaveAttribute with an empty value does not match missing attribute anymore https://playwright.dev/docs/release-notes#behavior-changes @1.27
    await expect(maskedComponent).toHaveAttribute('data-dd-privacy', 'mask')
    await expect(unmaskedComponent).toHaveText(recipientId.substring(5))
    expect(await unmaskedComponent.getAttribute('data-dd-privacy')).toBeNull()
    await expect(this.createVouchersConfirmRecipientIdField).toHaveText(
      recipientId
    )
  }

  async expectConfirmContactNumberFieldToHaveMaskedContactNumber(
    contactNumber: string
  ): Promise<void> {
    await expect(this.createVouchersConfirmContactNumberField).toHaveText(
      contactNumber
    )
    await expect(this.createVouchersConfirmContactNumberField).toHaveAttribute(
      'data-dd-privacy',
      'mask'
    )
  }

  async expectConfirmNameFieldToHaveName(name: string): Promise<void> {
    await expect(this.createVouchersConfirmNameField).toHaveText(name)
  }

  async expectConfirmAddressFieldToHaveAddress(address: string): Promise<void> {
    await expect(this.createVouchersConfirmAddressField).toHaveText(address)
  }

  waitForVouchersTableToLoad(): Promise<void> {
    return expect(this.vouchersTableBody).toBeVisible()
  }

  waitForPostalCodeAutoCompleteItemsToHaveCount(
    expectedCount: number
  ): Promise<void> {
    return expect(this.createVouchersPostalCodeAutoCompleteItems).toHaveCount(
      expectedCount
    )
  }

  waitForFloorNumberAutoCompleteItemsToHaveCount(
    expectedCount: number
  ): Promise<void> {
    return expect(this.createVouchersFloorNumberAutoCompleteItems).toHaveCount(
      expectedCount
    )
  }

  waitForUnitNumberAutoCompleteItemsToHaveCount(
    expectedCount: number
  ): Promise<void> {
    return expect(this.createVouchersUnitNumberAutoCompleteItems).toHaveCount(
      expectedCount
    )
  }

  waitForCheckExistingToStopLoading(): Promise<void> {
    return expect
      .poll(() => this.voucherRecipientStepNextButton.isEnabled())
      .toBeTruthy()
  }

  expectRequiredAtLeast5CharacterMessageToAppear(): Promise<void> {
    return expect(this.page.locator('#voucher-table-plain-text')).toHaveText(
      'Please enter at least 5 characters'
    )
  }

  async simulateAndExpectRecipientClaimBeforeToShow(): Promise<void> {
    await this.createVouchersButton.click()

    // Select Voucher Type Page
    await this.digitalVoucherTile.click()
    await this.voucherTypeNextButton.click()

    // Check existing step
    await Promise.all([
      this.waitForGetGroupedVouchersApiRequest({
        recipient_id: 'S9912345A',
        limit: '1',
      }),
      this.createVouchersRecipientIdInput.type('S9912345A'),
    ])
    await this.expectRecipientClaimedMessageVisible()
  }

  async simulateAndExpectRecipientNotInWhitelistToShow(): Promise<void> {
    await this.createVouchersButton.click()

    // Select Voucher Type Page
    await this.digitalVoucherTile.click()
    await this.voucherTypeNextButton.click()

    // Check existing step
    await Promise.all([
      this.waitForGetGroupedVouchersApiRequest({
        recipient_id: 'S9912345A',
        limit: '1',
      }),
      this.createVouchersRecipientIdInput.type('S9912345A'),
    ])
    await this.expectRecipientNotInWhitelistMessageVisible()
  }

  async simulateAndExpectRecipientClaimedBeforeToBeSearchable(): Promise<void> {
    await Promise.all([
      this.createVouchersRecipientIdSeeRecipientsButton.click(),
      this.waitForGetGroupedVouchersApiRequest({
        search: 'S9912345A',
        limit: '10',
      }),
    ])
    await expect(this.voucherSearchInput).toHaveValue('S9912345A')
  }

  async simulateTypingAddressForAddressClaimedBefore(): Promise<void> {
    await this.createVouchersButton.click()

    await this.paperVoucherTile.click()
    await this.voucherTypeNextButton.click()

    // Check existing step
    await this.createVouchersPostalCodeInput.type('100045')

    // Wait for results to update to match 100045
    await this.waitForPostalCodeAutoCompleteItemsToHaveCount(1)
    await this.createVouchersPostalCodeAutoCompleteItems.last().click()
    await this.createVouchersFloorNumberInput.type('1')
    // Wait for results to update to match 1
    await this.waitForFloorNumberAutoCompleteItemsToHaveCount(8)
    await this.createVouchersFloorNumberAutoCompleteItems.last().click()
    await this.createVouchersUnitNumberInput.type('1')
    // Wait for results to update to match 1
    await this.waitForUnitNumberAutoCompleteItemsToHaveCount(1)
    await Promise.all([
      this.waitForGetGroupedVouchersApiRequest({
        limit: '1',
        block: '45',
        floor: '01',
        unit: '173',
        postal_code: '100045',
      }),
      this.createVouchersUnitNumberAutoCompleteItems.last().click(),
    ])
  }

  async simulateAndExpectAddressClaimedBeforeToShow(): Promise<void> {
    await this.simulateTypingAddressForAddressClaimedBefore()

    // Click away from auto complete inputs to close auto complete menus
    await this.createVouchersRecipientIdInput.click()

    await this.expectAddressClaimedMessageVisible()
  }

  async simulateAndExpectAddressClaimedBeforeToBeSearchable(): Promise<void> {
    await Promise.all([
      this.waitForGetGroupedVouchersApiRequest({
        search: '45 , 01-173, Postal code 100045',
        limit: '10',
      }),
      this.createVouchersAddressSeeRecipientsButton.click(),
    ])
    await expect(this.voucherSearchInput).toHaveValue(
      '45 , 01-173, Postal code 100045'
    )
  }
}

type VouchersTabFixture = {
  vouchersTabPage: VouchersTabPage
}

export const vouchersTabTest = baseTest.extend<VouchersTabFixture>({
  vouchersTabPage: async ({ page, baseURL }, use) => {
    const vouchersTabPage = new VouchersTabPage(page, baseURL)
    await use(vouchersTabPage)
  },
})
