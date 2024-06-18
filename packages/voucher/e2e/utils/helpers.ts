import {chromium, Page} from '@playwright/test'
import originalPercySnapshot from '@percy/playwright'
import {CDC_MERCHANT_LIST_URL} from '../mocks/common'

// This function visits the hard-coded CDC merchant list url
// to retrieve the actual URL value, because they perform redirects
// on the original URL.
// Example: https://gowhere.gov.sg -> https://gowhere.gov.sg/regular?filter...
export async function getCDCMerchantListRedirectURL() {
  const browser = await chromium.launch()

  const context = await browser.newContext()
  const page = await context.newPage()

  // Navigate to the initial URL.
  await page.goto(CDC_MERCHANT_LIST_URL)

  // Wait for the page to fully load and finish any redirects.
  await page.waitForLoadState('domcontentloaded')

  // Get the final URL after any redirects.
  const redirectedUrl = page.url()

  await browser.close()

  return redirectedUrl
}

export async function waitForInitialFontLoad(page: Page) {
  await page.waitForFunction(() => document.fonts.load('12px Inter'))
}

export async function percySnapshot(
  page: Page,
  name: string,
  widths: number[] = [320, 360, 450, 600],
  minHeight = 640,
) {
  await originalPercySnapshot(page, name, {
    widths,
    minHeight,
  })
}

export async function mockConnectionLost(page: Page) {
  await page.route('**/public/vouchers/groups/UQGVUCIN1S6BZY3', (route) =>
    route.abort(),
  )
}

export async function replaceWholeCanvasIntoAnImageForTest(page: Page) {
  const qrCodeId = 'qr-code'
  const canvas = await page.$(`#${qrCodeId}`)
  if (canvas) {
    // Using jpeg as it is smaller in size
    const canvasRaw = await canvas.screenshot({type: 'jpeg'})
    const canvasBase64 = canvasRaw.toString('base64')

    await page.evaluate(
      async ([canvasBase64, canvas]) => {
        // Creates a new image with the screenshot
        const img = new Image()
        img.src = `data:image/jpeg;base64,${canvasBase64}`

        // Trick to avoid the image from being hidden / blocked
        img.style.zIndex = '100'
        img.style.position = 'relative'

        // Replace the canvas element with the screenshot
        canvas.parentNode?.replaceChild(img, canvas)

        // Remove all possible canvas because all the canvas are tainted already, and will fail the snapshot test.
        const allCanvas = document.querySelectorAll('canvas') || []
        allCanvas.forEach((toRemoveCanvas) => toRemoveCanvas.remove())
      },
      [canvasBase64, canvas] as const,
    )
  }
}
