/* eslint-disable @typescript-eslint/no-empty-function */
import { expect } from '@playwright/test'

import { campaignTabEligibilityTypeTest as test } from './EligibilityTypePage.fixture'

test.describe('Campaign page campaign tab eligibility tab tests', () => {
  test.beforeEach(async ({ campaignTabEligibilityTypePage }) => {
    await campaignTabEligibilityTypePage.injectUserToken()
    await campaignTabEligibilityTypePage.mockApiGetUserRoles()
    await campaignTabEligibilityTypePage.mockGetCampaignStatsResponse()
    await campaignTabEligibilityTypePage.mockGetCampaignRolesOkResponse()
    await campaignTabEligibilityTypePage.mockGetTwilioCredentialsOkResponse()
    await campaignTabEligibilityTypePage.mockGetTwilioSmsUsageOkResponse()
  })

  // TODO: These test will all fail when there is a setup flow as there wouldnt be a case whereby we will see the attachment by default if there exist a setup flow
  test('Should show the default ui of eligibility type page when visiting a brand new campaign', async ({
    campaignTabEligibilityTypePage,
  }) => {
    await campaignTabEligibilityTypePage.mockGetCampaignWithWhitelistEligibilityOkResponse()
    await campaignTabEligibilityTypePage.goto()

    // Checks if all the defaults are being shown
    await expect(
      campaignTabEligibilityTypePage.downloadTemplateCsvButton
    ).toBeVisible()
    await expect(campaignTabEligibilityTypePage.copyLinkButton).toBeVisible()
    await expect(
      campaignTabEligibilityTypePage.campaignSignUpLinkPane
    ).toContainText(
      [
        'Campaign sign up link',
        'Public',
        'Please send eligible residents this sign up link to claim their vouchers.',
        'Copy link',
      ].join('\n\n'),
      { useInnerText: true }
    )
    await expect(
      campaignTabEligibilityTypePage.replaceWhitelistCsvButton
    ).toBeHidden()

    expect(
      await campaignTabEligibilityTypePage.campaignSignUpLinkInputLink.getAttribute(
        'placeholder'
      )
    ).toMatch(/^http:\/\/localhost:5162\/campaign_.+$/)

    await expect(
      campaignTabEligibilityTypePage.whitelistContainerPane
    ).toContainText(
      [
        'Whitelisting by Recipient Identifier',
        'Residents who are whitelisted will be able to claim vouchers via the campaign sign up link. To upload a whitelist, download the CSV template and list out eligible recipients according to the required fields.',
        'REQUIRED FIELDS',
        'Identifier',
        'Identifier of the eligible recipient using capital letters, eg.S9123456A (case sensitive)',
        'Download CSV template',
        'Upload whitelist',
        'Choose file or drag and drop here',
        'Maximum file size: 30 MB',
      ].join('\n\n'),
      { useInnerText: true }
    )

    await expect(
      campaignTabEligibilityTypePage.whitelistAttachmentWithModal
    ).toBeVisible()
    await expect(
      campaignTabEligibilityTypePage.whitelistAttachmentWithModal
    ).toContainText(
      [
        'Upload whitelist',
        'Choose file or drag and drop here',
        'Maximum file size: 30 MB',
      ].join('\n\n'),
      {
        useInnerText: true,
      }
    )
  })

  test('Should test the download feature of the template csv', async ({
    campaignTabEligibilityTypePage,
  }) => {
    await campaignTabEligibilityTypePage.mockGetCampaignWithWhitelistEligibilityOkResponse()
    await campaignTabEligibilityTypePage.mockDownloadTemplateCsvOkResponse()
    await campaignTabEligibilityTypePage.goto()

    await Promise.all([
      campaignTabEligibilityTypePage.downloadTemplateCsvButton.click(),
      campaignTabEligibilityTypePage.waitForDownloadTemplateCsvRequest(),
    ])
  })

  test('Receiving a list of whitelist logs and interactions with the replace whitelist csv button', async ({
    campaignTabEligibilityTypePage,
  }) => {
    await campaignTabEligibilityTypePage.mockGetCampaignWithWhitelistEligibilityAndListOfUploadedWhitelistsOkResponse()
    await campaignTabEligibilityTypePage.goto()

    // If there are uploaded whitelists, by default we should see a list of logs and no attachemnt being shown
    await expect(
      campaignTabEligibilityTypePage.whitelistAttachmentWithModal
    ).toBeHidden()
    await expect(
      campaignTabEligibilityTypePage.getNumWhitelistlogRendered()
    ).resolves.toBe(8)
    await expect(
      campaignTabEligibilityTypePage.replaceWhitelistCsvButton
    ).toBeVisible()

    // Expect the whitelist attachment to be shown
    await campaignTabEligibilityTypePage.replaceWhitelistCsvButton.click()
    await expect(
      campaignTabEligibilityTypePage.whitelistAttachmentWithModal
    ).toBeVisible()
  })
})
