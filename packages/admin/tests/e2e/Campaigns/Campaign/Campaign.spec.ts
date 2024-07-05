import { campaignPageTest as test } from './CampaignPage.fixture'

test.describe('Root campaign page tests', () => {
  test.beforeEach(async ({ campaignPage }) => {
    await campaignPage.mockNoResponseForAllUnmockedRoutes()
    await campaignPage.injectUserToken()
  })

  test('Should hide only vouchers tab when user has no relevant permissions', async ({
    campaignPage,
  }) => {
    // Required for this test to pass on the CI
    await campaignPage.mockGetCampaignOkResponse()
    await campaignPage.mockGetCampaignStatsResponse()
    await campaignPage.mockApiGetUserRoles({
      excludeActions: ['listGroupedVouchers', 'createGroupedVouchers'],
    })
    await campaignPage.waitForTimeout(1000)
    await campaignPage.goto()

    await campaignPage.expectNavTabVisible('Merchants')
    await campaignPage.expectNavTabVisible('Campaign')
    await campaignPage.expectNavTabVisible('Security history')
    await campaignPage.expectNavTabHidden('Vouchers')
  })

  test('Should hide only merchants tab when user has no relevant permissions', async ({
    campaignPage,
  }) => {
    await campaignPage.mockGetCampaignOkResponse()
    await campaignPage.mockGetCampaignStatsResponse()
    await campaignPage.mockApiGetUserRoles({
      excludeActions: ['listMerchantsForCampaign'],
    })
    await campaignPage.goto()

    await campaignPage.expectNavTabVisible('Vouchers')
    await campaignPage.expectNavTabVisible('Campaign')
    await campaignPage.expectNavTabVisible('Security history')
    await campaignPage.expectNavTabHidden('Merchants')
  })

  test('Should hide only campaign tab when user has no relevant permissions', async ({
    campaignPage,
  }) => {
    await campaignPage.mockGetCampaignOkResponse()
    await campaignPage.mockGetCampaignStatsResponse()
    await campaignPage.mockApiGetUserRoles({
      excludeActions: [
        'updateUserRoles',
        'updateCampaign',
        'listUserRolesForCampaign',
      ],
    })
    await campaignPage.goto()

    await campaignPage.expectNavTabVisible('Merchants')
    await campaignPage.expectNavTabVisible('Security history')
    await campaignPage.expectNavTabVisible('Vouchers')
    await campaignPage.expectNavTabHidden('Campaign')
  })

  test('Should hide only security history tab when user has no relevant permissions', async ({
    campaignPage,
  }) => {
    await campaignPage.mockGetCampaignOkResponse()
    await campaignPage.mockGetCampaignStatsResponse()
    await campaignPage.mockApiGetUserRoles({
      excludeActions: ['listCampaignEvents', 'listMerchantEvents'],
    })
    await campaignPage.goto()

    await campaignPage.expectNavTabVisible('Merchants')
    await campaignPage.expectNavTabVisible('Campaign')
    await campaignPage.expectNavTabVisible('Vouchers')
    await campaignPage.expectNavTabHidden('Security history')
  })
})
