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
  mockEndedGroupVoucherTypesApiResponse,
  mockNotFoundGroupVoucherApiResponse,
  mockNotStartedGroupVoucherTypesApiResponse,
  mockRedeemedGroupVoucherApiRegularTypesResponse,
  mockRedeemedGroupVoucherApiSupermarketTypesResponse,
  mockTransactionHistoryContentApiResponse,
  mockUnusedGroupVoucherTypesApiResponse,
} from './utils/network'

test.describe('GroupPageWithVoucherTypes tests', () => {
  test.beforeEach(async ({context, page, baseURL}) => {
    await mockUnusedGroupVoucherTypesApiResponse(context)
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
    await page.waitForSelector('#select-voucher-type-page')
  })

  test('regular types golden path snapshot tests', async ({
    context,
    page,
    browserName,
  }) => {
    if (browserName === 'chromium') {
      await percySnapshot(page, 'CDC Campaign Types Main Page')
    }

    await page.waitForSelector('#vouchers-button')
    await page.click('#vouchers-button')

    if (browserName === 'chromium') {
      await percySnapshot(page, 'Regular Type Select Vouchers Page')
    }

    // Click on two regular vouchers
    await page.click('#voucher-button_v_enT791mQRuqgi03OhaNQB')
    await page.click('#voucher-button_v_yQMFlMU7t0IpPLYOQq0Nt')
    await page.waitForSelector(
      '#voucher-button_v_yQMFlMU7t0IpPLYOQq0Nt[aria-checked="true"]',
    )
    // Snapshot with vouchers selected
    if (browserName === 'chromium') {
      await percySnapshot(page, 'Regular Type Vouchers Selected')
    }
    // Open redemption page
    await page.click('#redeem-button')
    await page.waitForTimeout(2000)
    if (browserName === 'chromium') {
      await replaceWholeCanvasIntoAnImageForTest(page)
      await percySnapshot(page, 'Regular Type Redemption Page')
    }

    await mockRedeemedGroupVoucherApiRegularTypesResponse(context)
    await page.waitForSelector('.voucher-redeemed-stamp')
    // Wait for Dosis font to load
    // There is no reliable way to wait for this font to load so a timeout is used
    await page.waitForTimeout(2000)
    if (browserName === 'chromium') {
      await replaceWholeCanvasIntoAnImageForTest(page)
      await percySnapshot(page, 'Regular Type Redemption Page Redeemed')
    }
  })

  test('supermarket types golden path snapshot tests', async ({
    context,
    page,
    browserName,
  }) => {
    await page.waitForSelector('#supermarket-vouchers-button')
    await page.click('#supermarket-vouchers-button')

    if (browserName === 'chromium') {
      await percySnapshot(page, 'Supermarket Type Select Vouchers Page')
    }

    // Click on two supermarket vouchers
    await page.click('#voucher-button_v_BZpRLJBLfaCpqAvM6nmVU')
    await page.click('#voucher-button_v_hhGzyoe55IpOgNKbpin40')
    await page.waitForSelector(
      '#voucher-button_v_hhGzyoe55IpOgNKbpin40[aria-checked="true"]',
    )
    // Snapshot with vouchers selected
    if (browserName === 'chromium') {
      await percySnapshot(page, 'Supermarket Type Vouchers Selected')
    }
    // Open redemption page
    await page.click('#redeem-button')
    await page.waitForTimeout(2000)
    if (browserName === 'chromium') {
      await replaceWholeCanvasIntoAnImageForTest(page)
      await percySnapshot(page, 'Supermarket Type Redemption Page')
    }

    await mockRedeemedGroupVoucherApiSupermarketTypesResponse(context)
    await page.waitForSelector('.voucher-redeemed-stamp')
    // Wait for Dosis font to load
    // There is no reliable way to wait for this font to load so a timeout is used
    await page.waitForTimeout(2000)
    if (browserName === 'chromium') {
      await percySnapshot(page, 'Supermarket Type Redemption Page Redeemed')
    }
  })

  test('voucher types campaign ended test', async ({
    context,
    page,
    browserName,
  }) => {
    await mockEndedGroupVoucherTypesApiResponse(context)

    // Reload to trigger campaign ended
    await page.reload()

    // Share voucher and open help drawer buttons should be not be selectable.
    const shareVoucherButton = page.locator('#share-voucher-button')
    await expect(shareVoucherButton).toBeDisabled()

    const openHelpDrawerButton = page.locator('#open-help-drawer-button')
    await expect(openHelpDrawerButton).toBeDisabled()

    // Language Selector should still be selectable
    const languageSelector = page.locator('#language-select-dropdown-button')
    await expect(languageSelector).toBeEnabled()

    // TODO: Add a assertion for correct date rendered
    if (browserName === 'chromium') {
      await percySnapshot(page, 'Types Campaign Ended Page')
    }

    // Organiser contact details
    await page.click('#contact-organiser-text')
    await page.waitForSelector('#organiser-contact-section')
    if (browserName === 'chromium') {
      await percySnapshot(page, 'Types Campaign Ended Organiser Details Page')
    }
    await page.click('#organiser-contact-section-close-button')
  })

  test('voucher types campaign not started test', async ({
    context,
    page,
    browserName,
  }) => {
    await mockNotStartedGroupVoucherTypesApiResponse(context)

    // Reload to trigger campaign not started
    await page.reload()

    // Share voucher and open help drawer buttons should be not be selectable.
    const shareVoucherButton = page.locator('#share-voucher-button')
    await expect(shareVoucherButton).toBeDisabled()

    const openHelpDrawerButton = page.locator('#open-help-drawer-button')
    await expect(openHelpDrawerButton).toBeDisabled()

    // Language Selector should still be selectable
    const languageSelector = page.locator('#language-select-dropdown-button')
    await expect(languageSelector).toBeEnabled()

    if (browserName === 'chromium') {
      await percySnapshot(page, 'Types Campaign Not Started Page')
    }

    // Organiser contact details
    await page.click('#contact-organiser-text')
    await page.waitForSelector('#organiser-contact-section')
    await page.click('#organiser-contact-section-close-button')
  })

  test('types lost connection test', async ({page, browserName}) => {
    await mockConnectionLost(page)
    await page.waitForSelector('#error-template')
    if (browserName === 'chromium') {
      await percySnapshot(
        page,
        'CDC Campaign Types Main Page Service Unavailable',
      )
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
      await percySnapshot(page, 'CDC Campaign Types Voucher Not Found')
    }
  })

  test('regular type voucher selector lost connection test', async ({
    page,
    browserName,
  }) => {
    await page.waitForSelector('#vouchers-button')
    await page.click('#vouchers-button')

    await mockConnectionLost(page)
    await page.waitForSelector('#error-template')
    if (browserName === 'chromium') {
      await percySnapshot(
        page,
        'Regular Type Voucher Select Page Service Unavailable',
      )
    }
  })

  test('regular type redemption page lost connection test', async ({
    page,
    browserName,
  }) => {
    await page.waitForSelector('#vouchers-button')
    await page.click('#vouchers-button')

    // Click on two regular vouchers
    await page.click('#voucher-button_v_enT791mQRuqgi03OhaNQB')
    await page.click('#voucher-button_v_yQMFlMU7t0IpPLYOQq0Nt')
    await page.waitForSelector(
      '#voucher-button_v_yQMFlMU7t0IpPLYOQq0Nt[aria-checked="true"]',
    )

    // Open redemption page
    await page.click('#redeem-button')
    await page.waitForTimeout(2000)

    await mockConnectionLost(page)
    await page.waitForSelector('#error-template')
    if (browserName === 'chromium') {
      await percySnapshot(
        page,
        'Regular Type Voucher Redemption Page Service Unavailable',
      )
    }
  })

  test('supermarket type voucher selector lost connection test', async ({
    page,
    browserName,
  }) => {
    await page.waitForSelector('#supermarket-vouchers-button')
    await page.click('#supermarket-vouchers-button')

    await mockConnectionLost(page)
    await page.waitForSelector('#error-template')
    if (browserName === 'chromium') {
      await percySnapshot(
        page,
        'Supermarket Type Voucher Select Page Service Unavailable',
      )
    }
  })

  test('supermarket type redemption page lost connection test', async ({
    page,
    browserName,
  }) => {
    await page.waitForSelector('#supermarket-vouchers-button')
    await page.click('#supermarket-vouchers-button')

    // Click on two supermarket vouchers
    await page.click('#voucher-button_v_BZpRLJBLfaCpqAvM6nmVU')
    await page.click('#voucher-button_v_hhGzyoe55IpOgNKbpin40')
    await page.waitForSelector(
      '#voucher-button_v_hhGzyoe55IpOgNKbpin40[aria-checked="true"]',
    )

    // Open redemption page
    await page.click('#redeem-button')
    await page.waitForTimeout(2000)

    await mockConnectionLost(page)
    await page.waitForSelector('#error-template')
    if (browserName === 'chromium') {
      await percySnapshot(
        page,
        'Supermarket Type Voucher Redemption Page Service Unavailable',
      )
    }
  })

  test('voucher types where to use button test', async ({page}) => {
    const cdcMerchantListRedirectUrl = await getCDCMerchantListRedirectURL()
    await page.waitForSelector('#vouchers-button')
    await page.click('#vouchers-button')

    await page.click('#voucher-types-where-to-use-button')

    const popup = await page.waitForEvent('popup')
    expect(popup.url()).toBe(cdcMerchantListRedirectUrl)
    await popup.close()
  })

  test('types info and help drawer test', async ({page, browserName}) => {
    await page.click('#open-help-drawer-button')
    await page.waitForTimeout(2000)
    if (browserName === 'chromium') {
      // TODO: Improve interface for this helper function to reduce code duplication
      // and clarity of params.
      await percySnapshot(
        page,
        'Voucher Types Help Drawer Page',
        undefined,
        1300,
      )
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

  test('voucher types transaction history drawer empty test', async ({
    context,
    page,
    browserName,
  }) => {
    await mockEmptyTransactionHistoryApiResponse(context)
    await page.click('#transaction-history-button')
    await page.waitForTimeout(2000)

    await page.waitForSelector('#empty-transaction-history-container')
    if (browserName === 'chromium') {
      await percySnapshot(
        page,
        'Voucher Types Empty Transaction History Container',
      )
    }
  })

  test('voucher types transaction history drawer has content test', async ({
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
        'Voucher Types Transaction History Container With Content',
      )
    }
  })
})
