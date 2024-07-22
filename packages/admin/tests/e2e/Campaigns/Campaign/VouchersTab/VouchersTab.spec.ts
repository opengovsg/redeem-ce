/* eslint-disable @typescript-eslint/no-empty-function */
import { expect } from '@playwright/test'
import type { Request } from '@playwright/test'

import { vouchersTabTest as test } from './VouchersTabPage.fixture'

function checkNoCampaignVoucherSearchAPIIsCalled(
  requests: Request[],
  searchRequestRegex: RegExp
) {
  return requests.every((request) => !request.url().match(searchRequestRegex))
}

test.describe('Campaign page voucher tab tests', () => {
  test.beforeEach(async ({ vouchersTabPage }) => {
    await vouchersTabPage.injectUserToken()
    await vouchersTabPage.mockApiGetUserRoles()
    await vouchersTabPage.mockGetCampaignOkResponse()
    await vouchersTabPage.mockGetCampaignStatsResponse()
    await vouchersTabPage.mockGetCampaignVouchersOkResponse()
    await vouchersTabPage.mockGetTwilioCredentialsOkResponse()
    await vouchersTabPage.mockGetTwilioSmsUsageOkResponse()
    await vouchersTabPage.mockCheckAddressInDenylistResponse(false)
  })

  test('Should show correct vouchers when next or previous page is clicked and show correct pagination state', async ({
    vouchersTabPage,
  }) => {
    await vouchersTabPage.goto()
    // Wait for voucher rows to be rendered
    await vouchersTabPage.waitForVoucherRows()

    // Check that 10 vouchers are displayed on the first page
    await expect(vouchersTabPage.getNumVoucherRowsRendered()).resolves.toBe(10)
    await vouchersTabPage.testSnapshot(
      'CampaignPage VoucherTab full table first page'
    )

    // Check pagination buttons state
    await expect(vouchersTabPage.prevPageButton).toBeDisabled()
    await expect(vouchersTabPage.nextPageButton).toBeEnabled()

    await vouchersTabPage.nextPageButton.click()
    await expect
      .poll(async () => {
        return vouchersTabPage.getNumVoucherRowsRendered()
      })
      .toBe(1)
    await expect(vouchersTabPage.getNumVoucherRowsRendered()).resolves.toBe(1)
    await vouchersTabPage.testSnapshot(
      'CampaignPage VoucherTab 1 grouped voucher last page'
    )

    // Check pagination buttons state
    await expect(vouchersTabPage.prevPageButton).toBeEnabled()
    await expect(vouchersTabPage.nextPageButton).toBeDisabled()
  })

  test('Should show users to key in more than 5 chars into search bar when only 4 chars is keyed in and empty search bar should still called the api', async ({
    vouchersTabPage,
  }) => {
    const pollConfig = {
      message: 'make sure that the debounce timeout is fully complete',
      timeout: 1000,
    }
    await vouchersTabPage.goto()
    // Wait for voucher rows to be rendered
    await vouchersTabPage.waitForVoucherRows()
    // Check that 10 vouchers are displayed on the first page
    await expect(vouchersTabPage.getNumVoucherRowsRendered()).resolves.toBe(10)
    await vouchersTabPage.voucherSearchInput.fill('abab')
    await expect(vouchersTabPage.voucherSearchInput).toHaveValue('abab')

    // we have to wait as there is debounce in the search input (500ms was in the debouncedSearch)
    // no rows are rendered due to an invalid search
    await expect
      .poll(async () => {
        const numRow = await vouchersTabPage.getNumVoucherRowsRendered()
        return numRow
      }, pollConfig)
      .toBe(0)
    await vouchersTabPage.expectRequiredAtLeast5CharacterMessageToAppear()

    // clearing the text should allow us to get back all the 10 inputs
    await vouchersTabPage.voucherSearchInput.fill('')
    await expect
      .poll(async () => {
        const numRow = await vouchersTabPage.getNumVoucherRowsRendered()
        return numRow
      }, pollConfig)
      .toBe(10)
  })

  test('Should not fire an API call for vouchers search if there is 1 to 2 characters', async ({
    vouchersTabPage,
  }) => {
    const searchRequestRegex =
      /.*\/v1\/campaigns\/campaign_.*\/vouchers\?search=.+/
    await vouchersTabPage.goto()
    // Wait for voucher rows to be rendered
    await vouchersTabPage.waitForVoucherRows()
    // Playwright doesnt have a spy method like Cypress in order to intercept and assert an API is NOT called https://github.com/microsoft/playwright/issues/16462
    const requests: Request[] = []
    vouchersTabPage.page.on('request', (request) => requests.push(request))
    await vouchersTabPage.voucherSearchInput.fill('a')
    // we have to set this timeout due to debounce as well as requests array validation is not asynchronous
    await vouchersTabPage.page.waitForTimeout(1000)
    expect(
      checkNoCampaignVoucherSearchAPIIsCalled(requests, searchRequestRegex)
    ).toBeTruthy()
    await vouchersTabPage.voucherSearchInput.fill('ab')
    await vouchersTabPage.page.waitForTimeout(1000)
    expect(
      checkNoCampaignVoucherSearchAPIIsCalled(requests, searchRequestRegex)
    ).toBeTruthy()
    await vouchersTabPage.voucherSearchInput.focus()
    await vouchersTabPage.page.keyboard.press('Backspace')
    await vouchersTabPage.page.waitForTimeout(1000)
    expect(
      checkNoCampaignVoucherSearchAPIIsCalled(requests, searchRequestRegex)
    ).toBeTruthy()
  })

  test('Should show create voucher button when user has permission', async ({
    vouchersTabPage,
  }) => {
    await vouchersTabPage.goto()
    // Check that create voucher button is rendered
    await expect(vouchersTabPage.createVouchersButton).toBeVisible()
  })

  test('Should not show create voucher button when user has no permission', async ({
    vouchersTabPage,
  }) => {
    await vouchersTabPage.mockApiGetUserRoles({
      excludeActions: ['createGroupedVouchers'],
    })
    await vouchersTabPage.goto()
    await vouchersTabPage.waitForVouchersTableToLoad()

    // Check that create voucher button is not rendered
    await expect(vouchersTabPage.createVouchersButton).toBeHidden()
  })

  test('Should create empty printed vouchers', async ({
    vouchersTabPage,
  }, testInfo) => {
    await vouchersTabPage.mockGetCampaignVouchersOkEmptyResponse()
    await vouchersTabPage.goto()
    await vouchersTabPage.createVouchersButton.click()

    // Voucher details step
    await vouchersTabPage.paperVoucherTile.click()
    await vouchersTabPage.testSnapshot(
      `${testInfo.title} - Create vouchers voucher details step paper voucher selected`
    )
    await vouchersTabPage.voucherTypeNextButton.click()

    // Check existing step
    await Promise.all([
      vouchersTabPage.waitForGetGroupedVouchersApiRequest({
        recipient_id: 'S9912345A',
        limit: '1',
      }),
      vouchersTabPage.createVouchersRecipientIdInput.type('S9912345A'),
    ])
    await vouchersTabPage.waitForCheckExistingToStopLoading()
    await vouchersTabPage.expectRecipientClaimedMessageNotVisible()
    await vouchersTabPage.createVouchersPostalCodeInput.type('100045')
    // Wait for results to update to match 100045
    await vouchersTabPage.waitForPostalCodeAutoCompleteItemsToHaveCount(1)
    await vouchersTabPage.createVouchersPostalCodeAutoCompleteItems
      .last()
      .click()
    await vouchersTabPage.createVouchersFloorNumberInput.type('1')
    // Wait for results to update to match 1
    await vouchersTabPage.waitForFloorNumberAutoCompleteItemsToHaveCount(8)
    await vouchersTabPage.createVouchersFloorNumberAutoCompleteItems
      .last()
      .click()
    await vouchersTabPage.createVouchersUnitNumberInput.type('1')
    // Wait for results to update to match 1
    await vouchersTabPage.waitForUnitNumberAutoCompleteItemsToHaveCount(1)
    await Promise.all([
      vouchersTabPage.waitForGetGroupedVouchersApiRequest({
        limit: '1',
        block: '45',
        floor: '01',
        unit: '173',
        postal_code: '100045',
      }),
      vouchersTabPage.createVouchersUnitNumberAutoCompleteItems.last().click(),
    ])
    await vouchersTabPage.waitForCheckExistingToStopLoading()
    await vouchersTabPage.expectAddressClaimedMessageNotVisible()
    await vouchersTabPage.testSnapshot(
      `${testInfo.title} - Create vouchers check existing step prefilled`
    )
    await vouchersTabPage.voucherRecipientStepNextButton.click()

    // Recipient details step
    await vouchersTabPage.createVouchersNameInput.type('TEST USER 1')
    await vouchersTabPage.createVouchersMobileNumberInput.type('91234567')
    await vouchersTabPage.testSnapshot(
      `${testInfo.title} - Create vouchers recipient details step filled`
    )
    await vouchersTabPage.personalDetailsStepNextButton.click()

    await vouchersTabPage.mockGetPrintVouchersEmptyResponse()
    await vouchersTabPage.mockCreateCampaignVouchersOkResponse()

    await vouchersTabPage.expectConfirmRecipientIdFieldToBeMasked('S9912345A')
    await vouchersTabPage.expectConfirmContactNumberFieldToHaveMaskedContactNumber(
      '91234567'
    )
    await vouchersTabPage.expectConfirmNameFieldToHaveName('TEST USER 1')
    await vouchersTabPage.expectConfirmAddressFieldToHaveAddress(
      '45 TELOK BLANGAH DRIVE\n01-173\nPostal code 100045'
    )

    await vouchersTabPage.testSnapshot('Create vouchers confirmation step')
    // Wait for requests and validate them
    const [printPage] = await Promise.all([
      vouchersTabPage.waitForNewPage(),
      // If this times out, then the correct request body/method/url is not sent.
      vouchersTabPage.waitForCreateVouchersApiRequest({
        name: 'TEST USER 1',
        contact_number: '6591234567',
        recipient_id: 'S9912345A',
        block: '45',
        unit: '173',
        floor: '01',
        postal_code: '100045',
        street: 'TELOK BLANGAH DRIVE',
        values: [
          {
            value: 1,
            quantity: 1,
          },
          {
            value: 4,
            quantity: 1,
          },
        ],
      }),
      // If this times out, then the correct request body/method/url is not sent.
      vouchersTabPage.waitForGetVouchersToPrintApiRequest(),
      vouchersTabPage.createVouchersConfirmButton.click(),
    ])
    // Switch to print tab
    await printPage.bringToFront()
    // TODO: if we figure out how to check PDF is empty, create a new test case and add it after this step
  })

  test('Should create printed vouchers', async ({
    vouchersTabPage,
  }, testInfo) => {
    await vouchersTabPage.mockGetCampaignVouchersOkEmptyResponse()
    await vouchersTabPage.goto()
    await vouchersTabPage.createVouchersButton.click()

    // Voucher details step
    await vouchersTabPage.paperVoucherTile.click()
    await vouchersTabPage.testSnapshot(
      `${testInfo.title} - Create vouchers voucher details step paper voucher selected`
    )
    await vouchersTabPage.voucherTypeNextButton.click()

    // Check existing step
    await Promise.all([
      vouchersTabPage.waitForGetGroupedVouchersApiRequest({
        recipient_id: 'S9912345A',
        limit: '1',
      }),
      vouchersTabPage.createVouchersRecipientIdInput.type('S9912345A'),
    ])
    await vouchersTabPage.waitForCheckExistingToStopLoading()
    await vouchersTabPage.expectRecipientClaimedMessageNotVisible()
    await vouchersTabPage.createVouchersPostalCodeInput.type('100045')
    // Wait for results to update to match 100045
    await vouchersTabPage.waitForPostalCodeAutoCompleteItemsToHaveCount(1)
    await vouchersTabPage.createVouchersPostalCodeAutoCompleteItems
      .last()
      .click()
    await vouchersTabPage.createVouchersFloorNumberInput.type('1')
    // Wait for results to update to match 1
    await vouchersTabPage.waitForFloorNumberAutoCompleteItemsToHaveCount(8)
    await vouchersTabPage.createVouchersFloorNumberAutoCompleteItems
      .last()
      .click()
    await vouchersTabPage.createVouchersUnitNumberInput.type('1')
    // Wait for results to update to match 1
    await vouchersTabPage.waitForUnitNumberAutoCompleteItemsToHaveCount(1)
    await Promise.all([
      vouchersTabPage.waitForGetGroupedVouchersApiRequest({
        limit: '1',
        block: '45',
        floor: '01',
        unit: '173',
        postal_code: '100045',
      }),
      vouchersTabPage.createVouchersUnitNumberAutoCompleteItems.last().click(),
    ])
    await vouchersTabPage.waitForCheckExistingToStopLoading()
    await vouchersTabPage.expectAddressClaimedMessageNotVisible()
    await vouchersTabPage.testSnapshot(
      `${testInfo.title} - Create vouchers check existing step prefilled`
    )
    await vouchersTabPage.voucherRecipientStepNextButton.click()

    // Recipient details step
    await vouchersTabPage.createVouchersNameInput.type('TEST USER 1')
    await vouchersTabPage.createVouchersMobileNumberInput.type('91234567')
    await vouchersTabPage.testSnapshot(
      `${testInfo.title} - Create vouchers recipient details step filled`
    )
    await vouchersTabPage.personalDetailsStepNextButton.click()

    await vouchersTabPage.mockGetPrintVouchersOkResponse()
    await vouchersTabPage.mockCreateCampaignVouchersOkResponse()

    await vouchersTabPage.expectConfirmRecipientIdFieldToBeMasked('S9912345A')
    await vouchersTabPage.expectConfirmContactNumberFieldToHaveMaskedContactNumber(
      '91234567'
    )
    await vouchersTabPage.expectConfirmNameFieldToHaveName('TEST USER 1')
    await vouchersTabPage.expectConfirmAddressFieldToHaveAddress(
      '45 TELOK BLANGAH DRIVE\n01-173\nPostal code 100045'
    )

    await vouchersTabPage.testSnapshot('Create vouchers confirmation step')
    // Wait for requests and validate them
    const [printPage] = await Promise.all([
      vouchersTabPage.waitForNewPage(),
      // If this times out, then the correct request body/method/url is not sent.
      vouchersTabPage.waitForCreateVouchersApiRequest({
        name: 'TEST USER 1',
        contact_number: '6591234567',
        recipient_id: 'S9912345A',
        block: '45',
        unit: '173',
        floor: '01',
        postal_code: '100045',
        street: 'TELOK BLANGAH DRIVE',
        values: [
          {
            value: 1,
            quantity: 1,
          },
          {
            value: 4,
            quantity: 1,
          },
        ],
      }),
      // If this times out, then the correct request body/method/url is not sent.
      vouchersTabPage.waitForGetVouchersToPrintApiRequest(),
      vouchersTabPage.createVouchersConfirmButton.click(),
    ])
    // Switch to print tab
    await printPage.bringToFront()
    // TODO: if we figure out how to check PDF is empty, create a new test case and add it after this step
  })

  test('Should send digital vouchers', async ({ vouchersTabPage }) => {
    await vouchersTabPage.mockGetCampaignVouchersOkEmptyResponse()
    await vouchersTabPage.goto()
    await vouchersTabPage.createVouchersButton.click()

    // Voucher details step
    await vouchersTabPage.digitalVoucherTile.click()
    await vouchersTabPage.voucherTypeNextButton.click()

    // Check existing step
    await Promise.all([
      vouchersTabPage.waitForGetGroupedVouchersApiRequest({
        recipient_id: 'S9912345A',
        limit: '1',
      }),
      vouchersTabPage.createVouchersRecipientIdInput.type('S9912345A'),
    ])
    await vouchersTabPage.waitForCheckExistingToStopLoading()
    await vouchersTabPage.expectRecipientClaimedMessageNotVisible()
    await vouchersTabPage.createVouchersPostalCodeInput.type('100045')
    // Wait for results to update to match 100045
    await vouchersTabPage.waitForPostalCodeAutoCompleteItemsToHaveCount(1)
    await vouchersTabPage.createVouchersPostalCodeAutoCompleteItems
      .last()
      .click()
    await vouchersTabPage.createVouchersFloorNumberInput.type('1')
    // Wait for results to update to match 1
    await vouchersTabPage.waitForFloorNumberAutoCompleteItemsToHaveCount(8)
    await vouchersTabPage.createVouchersFloorNumberAutoCompleteItems
      .last()
      .click()
    await vouchersTabPage.createVouchersUnitNumberInput.type('1')
    // Wait for results to update to match 1
    await vouchersTabPage.waitForUnitNumberAutoCompleteItemsToHaveCount(1)
    await Promise.all([
      vouchersTabPage.waitForGetGroupedVouchersApiRequest({
        limit: '1',
        block: '45',
        floor: '01',
        unit: '173',
        postal_code: '100045',
      }),
      vouchersTabPage.createVouchersUnitNumberAutoCompleteItems.last().click(),
    ])
    await vouchersTabPage.waitForCheckExistingToStopLoading()
    await vouchersTabPage.expectAddressClaimedMessageNotVisible()
    await vouchersTabPage.voucherRecipientStepNextButton.click()

    // Recipient details step
    await vouchersTabPage.createVouchersNameInput.type('TEST USER 1')
    await vouchersTabPage.createVouchersMobileNumberInput.type('91234567')
    await vouchersTabPage.personalDetailsStepNextButton.click()

    await vouchersTabPage.mockGetPrintVouchersOkResponse()
    await vouchersTabPage.mockCreateCampaignVouchersOkResponse()

    await vouchersTabPage.expectConfirmRecipientIdFieldToBeMasked('S9912345A')
    await vouchersTabPage.expectConfirmContactNumberFieldToHaveMaskedContactNumber(
      '91234567'
    )
    await vouchersTabPage.expectConfirmNameFieldToHaveName('TEST USER 1')
    await vouchersTabPage.expectConfirmAddressFieldToHaveAddress(
      '45 TELOK BLANGAH DRIVE\n01-173\nPostal code 100045'
    )

    // Wait for requests and validate them
    await Promise.all([
      // If this times out, then the correct request body/method/url is not sent.
      vouchersTabPage.waitForCreateVouchersApiRequest({
        name: 'TEST USER 1',
        contact_number: '6591234567',
        recipient_id: 'S9912345A',
        block: '45',
        unit: '173',
        floor: '01',
        postal_code: '100045',
        street: 'TELOK BLANGAH DRIVE',
        values: [
          {
            value: 1,
            quantity: 1,
          },
          {
            value: 4,
            quantity: 1,
          },
        ],
      }),
      // If this times out, then the correct request body/method/url is not sent.
      vouchersTabPage.waitForSendVouchersApiRequest(),
      vouchersTabPage.createVouchersConfirmButton.click(),
    ])
  })

  test('have recipient id, missing address, have contact number, missing name and clicking the edit button to go to voucher recipient page and go back to confirmation step should have all the previosuly filled fields already filled', async ({
    vouchersTabPage,
  }) => {
    await vouchersTabPage.goto()
    await vouchersTabPage.simulateAndExpectRecipientClaimBeforeToShow()
    await vouchersTabPage.simulateAndExpectRecipientClaimedBeforeToBeSearchable()

    // Repeat process to confirm page to ensure flagged recipient id is shown again
    await vouchersTabPage.simulateAndExpectRecipientClaimBeforeToShow()
    await vouchersTabPage.voucherRecipientStepNextButton.click()

    // Since we choose digital, have to fill up contact number
    await vouchersTabPage.personalDetailsStepNextButton.isDisabled()
    await vouchersTabPage.createVouchersMobileNumberInput.type('91234567')
    await vouchersTabPage.personalDetailsStepNextButton.click()

    // In confirmation page, expects Recipient claimed before to show again and with recipient id shown
    await vouchersTabPage.expectRecipientClaimedMessageVisibleInConfirmationPage()
    // Expects recipient id to be partially masked from DD and fully masked for contact number
    await vouchersTabPage.expectConfirmRecipientIdFieldToBeMasked('S9912345A')
    await vouchersTabPage.expectConfirmContactNumberFieldToHaveMaskedContactNumber(
      '91234567'
    )
    await vouchersTabPage.expectAddressEmptyMessageVisibleInConfirmationPage()
    await vouchersTabPage.expectConfirmNameFieldToHaveName('-')

    // Clicking on edit button should redirect us back to the Voucher Recipient page
    await vouchersTabPage.checkerResultAddressEmptyEditButton.click()
    await vouchersTabPage.expectToBeInVoucherRecipientPage()

    // When clicking edit, we anticipate that all the values that are present previously is still present
    await expect(vouchersTabPage.createVouchersRecipientIdInput).toHaveValue(
      'S9912345A'
    )
    await expect(vouchersTabPage.createVouchersPostalCodeInput).toHaveValue('')
    await expect(vouchersTabPage.createVouchersFloorNumberInput).toHaveValue('')
    await expect(vouchersTabPage.createVouchersUnitNumberInput).toHaveValue('')

    // Going to next page, since we have keyed in contact number before, it should still be retained
    await vouchersTabPage.voucherRecipientStepNextButton.click()
    await expect(vouchersTabPage.createVouchersMobileNumberInput).toHaveValue(
      '91234567'
    )
    await expect(vouchersTabPage.createVouchersNameInput).toHaveValue('')

    // Going back to confirmation page, all details should remain as it is
    await vouchersTabPage.personalDetailsStepNextButton.click()
    await vouchersTabPage.expectRecipientClaimedMessageVisibleInConfirmationPage()
    // Expects recipient id to be partially masked from DD and fully masked for contact number
    await vouchersTabPage.expectConfirmRecipientIdFieldToBeMasked('S9912345A')
    await vouchersTabPage.expectConfirmContactNumberFieldToHaveMaskedContactNumber(
      '91234567'
    )
    await vouchersTabPage.expectAddressEmptyMessageVisibleInConfirmationPage()
    await vouchersTabPage.expectConfirmNameFieldToHaveName('-')
  })

  test('missing recipient id, claimed before address, missing contact number, have name and clicking edit button to fill up and go back to confirmation step', async ({
    vouchersTabPage,
  }) => {
    await vouchersTabPage.goto()
    await vouchersTabPage.simulateAndExpectAddressClaimedBeforeToShow()
    await vouchersTabPage.simulateAndExpectAddressClaimedBeforeToBeSearchable()

    // Repeat process to confirm page to ensure flagged address is shown again
    await vouchersTabPage.simulateAndExpectAddressClaimedBeforeToShow()
    await vouchersTabPage.voucherRecipientStepNextButton.click()

    // Since we choose paper, no need to fill up contact number
    await vouchersTabPage.createVouchersNameInput.type('TEST USER 1')
    await vouchersTabPage.personalDetailsStepNextButton.click()

    // In confirmation page, expects Address Claimed before to show again and with address shown
    await vouchersTabPage.expectAddressClaimedMessageVisibleInConfirmationPage()
    await vouchersTabPage.expectRecipientEmptyMessageVisibleInConfirmationPage()
    await vouchersTabPage.expectConfirmContactNumberFieldToHaveMaskedContactNumber(
      '-'
    )
    await vouchersTabPage.expectConfirmNameFieldToHaveName('TEST USER 1')

    // Clicking on edit button should redirect us back to the Voucher Recipient page
    await vouchersTabPage.checkerResultRecipientIdEmptyEditButton.click()
    await vouchersTabPage.expectToBeInVoucherRecipientPage()

    // When clicking edit, we anticipate that all the values that are present previously is still present
    await expect(vouchersTabPage.createVouchersRecipientIdInput).toHaveValue('')
    await expect(vouchersTabPage.createVouchersPostalCodeInput).toHaveValue(
      '100045'
    )
    await expect(vouchersTabPage.createVouchersFloorNumberInput).toHaveValue(
      '01'
    )
    await expect(vouchersTabPage.createVouchersUnitNumberInput).toHaveValue(
      '173'
    )

    // Going to next page, since we have keyed in name before, it should still be retained
    await vouchersTabPage.voucherRecipientStepNextButton.click()
    await expect(vouchersTabPage.createVouchersMobileNumberInput).toHaveValue(
      ''
    )
    await expect(vouchersTabPage.createVouchersNameInput).toHaveValue(
      'TEST USER 1'
    )

    // Going back to confirmation page, all details should remain as it is
    await vouchersTabPage.personalDetailsStepNextButton.click()
    // Expects recipient id to be missing and address claimed before message with name filled up
    await vouchersTabPage.expectRecipientEmptyMessageVisibleInConfirmationPage()
    await vouchersTabPage.expectConfirmContactNumberFieldToHaveMaskedContactNumber(
      '-'
    )
    await vouchersTabPage.expectAddressClaimedMessageVisibleInConfirmationPage()
    await vouchersTabPage.expectConfirmNameFieldToHaveName('TEST USER 1')
  })

  test('recipient id whitelist checker present', async ({
    vouchersTabPage,
  }) => {
    // Remock the get campaign path
    await vouchersTabPage.mockGetCampaignWithWhitelistEligibilityOkResponse()
    // Remock claimed vouchers before
    await vouchersTabPage.mockGetCampaignVouchersOkEmptyResponse()
    await vouchersTabPage.goto()

    // Simulate fail whitelist check and the orange checker appears
    await vouchersTabPage.mockCheckAgainstWhitelistAndNotInWhitelistResponse()
    await vouchersTabPage.simulateAndExpectRecipientNotInWhitelistToShow()

    // Ignores the checker and navigate to next page
    await vouchersTabPage.voucherRecipientStepNextButton.click()
    // Since we choose digital, have to fill up contact number
    await vouchersTabPage.personalDetailsStepNextButton.isDisabled()
    await vouchersTabPage.createVouchersMobileNumberInput.type('91234567')
    await vouchersTabPage.personalDetailsStepNextButton.click()

    // In the confirmation page, the orange checker will appear again together with the recipient
    await vouchersTabPage.expectRecipientNotInWhitelistMessageVisibleInConfirmationPage()
    // Expects recipient id to be partially masked from DD and fully masked for contact number
    await vouchersTabPage.expectConfirmRecipientIdFieldToBeMasked('S9912345A')
    await vouchersTabPage.expectConfirmContactNumberFieldToHaveMaskedContactNumber(
      '91234567'
    )
    await vouchersTabPage.expectAddressEmptyMessageVisibleInConfirmationPage()
    await vouchersTabPage.expectConfirmNameFieldToHaveName('-')
  })

  // TODO: Implement these tests
  test.skip('Should download vouchers when user has permissions', () => {})
  test.skip('Should download transactions when user has permissions', () => {})
  test.skip('Should not show download transactions button when user does not have permissions', () => {})
  test.skip('Should not show download vouchers button when user has permissions', () => {})
})
