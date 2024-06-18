import {test, expect} from '@playwright/test'
import {GROUP_VOUCHER_URL} from './constants/voucher'
import {CDC_ADVISORY_URL, REDEEM_FEEDBACK_URL} from './mocks/common'
import {
  mockConnectionLost,
  percySnapshot,
  waitForInitialFontLoad,
  replaceWholeCanvasIntoAnImageForTest,
  getCDCMerchantListRedirectURL,
} from './utils/helpers'
import {
  mockEmptyTransactionHistoryApiResponse,
  mockEndedGroupVoucherApiResponse,
  mockMoreThanMaximumGroupedVouchersApiResponse,
  mockNotFoundGroupVoucherApiResponse,
  mockNotStartedGroupVoucherApiResponse,
  mockRedeemedAndVoidedGroupVoucherApiResponse,
  mockRedeemedGroupVoucherApiResponse,
  mockTransactionHistoryContentApiResponse,
  mockUnusedGroupVoucherApiResponse,
} from './utils/network'

// TODO: create fixtures for each page to reduce duplication of code
test.describe('GroupPageDefault tests', () => {
  test.beforeEach(async ({context, page, baseURL}) => {
    await mockUnusedGroupVoucherApiResponse(context)
    // Go to the starting url before each test.
    await page.goto(`${baseURL}${GROUP_VOUCHER_URL}`)
    // Wait for Inter font to load
    await waitForInitialFontLoad(page)
    // Disable animations to prevent race conditions due to incomplete animation states
    await page.addStyleTag({
      content: `*,
          *::before,
          *::after {
          -moz-animation: none !important;
          -moz-transition: none !important;
          animation: none !important;
          caret-color: transparent !important;
          transition: none !important;
          }`,
    })
    await page.waitForSelector('#voucher-group-page')
  })

  test('no types golden path snapshot tests', async ({
    context,
    page,
    browserName,
  }) => {
    if (browserName === 'chromium') {
      await percySnapshot(page, 'Default Main Page')
    }
    // Click on two vouchers
    await page.click('#voucher-button_v_enT791mQRuqgi03OhaNQB')
    await page.click('#voucher-button_v_BZpRLJBLfaCpqAvM6nmVU')
    await page.waitForSelector(
      '#voucher-button_v_BZpRLJBLfaCpqAvM6nmVU[aria-checked="true"]',
    )
    // Snapshot with vouchers selected
    if (browserName === 'chromium') {
      await percySnapshot(page, 'Default Main Page Vouchers Selected')
    }
    // Open redemption page
    await page.click('#redeem-button')
    await page.waitForTimeout(2000)
    if (browserName === 'chromium') {
      await replaceWholeCanvasIntoAnImageForTest(page)
      await percySnapshot(page, 'Default Redemption Page')
    }

    await mockRedeemedGroupVoucherApiResponse(context)
    await page.waitForSelector('.voucher-redeemed-stamp')
    // Wait for Dosis font to load
    // There is no reliable way to wait for this font to load so a timeout is used
    await page.waitForTimeout(2000)
    if (browserName === 'chromium') {
      await replaceWholeCanvasIntoAnImageForTest(page)
      await percySnapshot(page, 'Default Redemption Page Redeemed')
    }
  })

  test('default campaign ended test', async ({context, page, browserName}) => {
    await mockEndedGroupVoucherApiResponse(context)

    // Reload to trigger campaign ended
    await page.reload()

    // Where to use and open help drawer buttons should be not be selectable.
    const whereToUseButton = page.locator('#where-to-use-button')
    await expect(whereToUseButton).toBeDisabled()

    const openHelpDrawerButton = page.locator('#open-help-drawer-button')
    await expect(openHelpDrawerButton).toBeDisabled()

    // Language Selector should still be selectable
    const languageSelector = page.locator('#language-select-dropdown-button')
    await expect(languageSelector).toBeEnabled()

    if (browserName === 'chromium') {
      await percySnapshot(page, 'Default Campaign Ended Page')
    }

    // Organiser contact details
    await page.click('#contact-organiser-text')
    await page.waitForSelector('#organiser-contact-section')
    if (browserName === 'chromium') {
      await percySnapshot(page, 'Default Campaign Ended Organiser Details Page')
    }
    await page.click('#organiser-contact-section-close-button')
  })

  test('default campaign not started test', async ({
    context,
    page,
    browserName,
  }) => {
    await mockNotStartedGroupVoucherApiResponse(context)

    // Reload to trigger campaign not started
    await page.reload()

    // Where to use and open help drawer buttons should be not be selectable.
    const whereToUseButton = page.locator('#where-to-use-button')
    await expect(whereToUseButton).toBeDisabled()

    const openHelpDrawerButton = page.locator('#open-help-drawer-button')
    await expect(openHelpDrawerButton).toBeDisabled()

    // Language Selector should still be selectable
    const languageSelector = page.locator('#language-select-dropdown-button')
    await expect(languageSelector).toBeEnabled()

    if (browserName === 'chromium') {
      await percySnapshot(page, 'Default Campaign Not Started Page')
    }

    // Organiser contact details
    await page.click('#contact-organiser-text')
    await page.waitForSelector('#organiser-contact-section')
    await page.click('#organiser-contact-section-close-button')
  })

  test('default voided vouchers test', async ({context, page, browserName}) => {
    await mockRedeemedAndVoidedGroupVoucherApiResponse(context)
    // Reload to reset order of vouchers
    await page.reload()
    await waitForInitialFontLoad(page)
    if (browserName === 'chromium') {
      await percySnapshot(page, 'Default Main Page Redeemed and Voided')
    }
    // Voided voucher should not be selectable
    const voidedVoucherSelector = '#voucher-button_v_yQMFlMU7t0IpPLYOQq0Nt'
    const voidedVoucherElement = page.locator(voidedVoucherSelector)
    await expect(voidedVoucherElement).toBeDisabled()
    expect(await page.locator('#redeem-button').isVisible()).toBeFalsy()
  })

  test('default max vouchers selected test', async ({
    context,
    page,
    browserName,
  }) => {
    await mockMoreThanMaximumGroupedVouchersApiResponse(context)
    // Reload to reset order of vouchers
    await page.reload()
    await waitForInitialFontLoad(page)
    // Click on 15 vouchers
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 15; i++) {
      // eslint-disable-next-line no-await-in-loop
      await page
        .locator('button[id*=\'voucher-button_\']:not([aria-checked="true"])')
        .first()
        .click()
    }
    if (browserName === 'chromium') {
      await percySnapshot(page, 'Default Main Page Max Vouchers Selected')
    }

    expect(
      await page
        .locator('button[id*=\'voucher-button_\']:not([aria-checked="true"])')
        .first()
        .isDisabled(),
    ).toBeTruthy()
  })

  test('default lost connection test', async ({page, browserName}) => {
    await mockConnectionLost(page)
    await page.waitForSelector('#error-template')
    if (browserName === 'chromium') {
      await percySnapshot(page, 'Default Main Page Service Unavailable')
    }
  })

  test('default voucher not found test', async ({
    context,
    page,
    browserName,
    baseURL,
  }) => {
    await mockNotFoundGroupVoucherApiResponse(context)
    await page.goto(`${baseURL}/non-existant`)
    await page.waitForSelector('#error-template')
    if (browserName === 'chromium') {
      await percySnapshot(page, 'Default Main Page Voucher Not Found')
    }
  })

  test('default where to use button test', async ({page}) => {
    const cdcMerchantListRedirectUrl = await getCDCMerchantListRedirectURL()

    await page.click('#where-to-use-button')

    const popup = await page.waitForEvent('popup')
    expect(popup.url()).toBe(cdcMerchantListRedirectUrl)
    await popup.close()
  })

  test('default info and help drawer test', async ({page, browserName}) => {
    await page.click('#open-help-drawer-button')
    await page.waitForTimeout(2000)
    if (browserName === 'chromium') {
      // TODO: Improve interface for this helper function to reduce code duplication
      // and clarity of params.
      await percySnapshot(page, 'Default Help Drawer Page', undefined, 1300)
    }

    await page.click('#info-and-help-general-info-button')
    const popupGeneralInfo = await page.waitForEvent('popup')
    expect(popupGeneralInfo.url()).toBe(CDC_ADVISORY_URL)
    await popupGeneralInfo.close()

    await page.waitForTimeout(2000)

    await page.click('#info-and-help-give-feedback-button')
    const popupGiveFeedback = await page.waitForEvent('popup')
    expect(popupGiveFeedback.url()).toBe(REDEEM_FEEDBACK_URL)
    await popupGiveFeedback.close()
  })

  test('default transaction history drawer empty test', async ({
    context,
    page,
    browserName,
  }) => {
    await mockEmptyTransactionHistoryApiResponse(context)
    await page.click('#transaction-history-button')
    await page.waitForTimeout(2000)

    await page.waitForSelector('#empty-transaction-history-container')
    if (browserName === 'chromium') {
      await percySnapshot(page, 'Default Empty Transaction History Container')
    }
  })

  test('default transaction history drawer has content test', async ({
    context,
    page,
    browserName,
  }) => {
    await mockTransactionHistoryContentApiResponse(context)
    await page.click('#transaction-history-button')
    await page.waitForTimeout(2000)

    await page.waitForSelector('#content-transaction-history-container')
    if (browserName === 'chromium') {
      await percySnapshot(
        page,
        'Default Transaction History Container With Content',
      )
    }
  })

  test('default error modal snapshot test', async ({
    context,
    page,
    browserName,
  }) => {
    // Click on two vouchers
    await page.click('#voucher-button_v_enT791mQRuqgi03OhaNQB')
    await page.click('#voucher-button_v_yQMFlMU7t0IpPLYOQq0Nt')
    await page.waitForSelector(
      '#voucher-button_v_yQMFlMU7t0IpPLYOQq0Nt[aria-checked="true"]',
    )
    // Open redemption page
    await page.click('#redeem-button')

    await mockRedeemedGroupVoucherApiResponse(context)
    await page.waitForSelector('.modal-main')
    if (browserName === 'chromium') {
      await replaceWholeCanvasIntoAnImageForTest(page)
      await percySnapshot(page, 'Default Redemption Page Error Modal')
    }
  })

  test('default language settings test', async ({page, baseURL}) => {
    // Only checks if one text element is updated.
    // TODO: Update to check all translations once implementation and translations finalized
    await page.click('#language-select-dropdown-button')
    const zh = page.locator('button[role=menuitem]:text("中文")')
    await zh.click()
    // "Share link" was refactored to "Where to use" for default group page
    // To add "Where to use" in other languages in the future.
    // await page.waitForSelector(':text("分享链接")')
    await expect(page).toHaveURL(`${baseURL}${GROUP_VOUCHER_URL}?lang=zh`)
    await zh.waitFor({state: 'hidden'})

    await page.click('#language-select-dropdown-button')
    const en = page.locator('button[role=menuitem]:text("English")')
    await en.click()
    // await page.waitForSelector(':text("Share link")')
    await page.waitForSelector(':text("Where to use")')
    await expect(page).toHaveURL(`${baseURL}${GROUP_VOUCHER_URL}?lang=en`)
    await en.waitFor({state: 'hidden'})

    await page.click('#language-select-dropdown-button')
    const ms = page.locator('button[role=menuitem]:text("Melayu")')
    await ms.click()
    // await page.waitForSelector(':text("Kongsi pautan")')
    await expect(page).toHaveURL(`${baseURL}${GROUP_VOUCHER_URL}?lang=ms`)
    await ms.waitFor({state: 'hidden'})
  })
})
