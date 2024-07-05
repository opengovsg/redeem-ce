import { CAMPAIGN1_ID } from '../constants'
import { campaignsPageTest as test } from './CampaignsPage.fixture'

test.describe('Campaigns page tests', () => {
  test.beforeEach(async ({ campaignsPage }) => {
    await campaignsPage.injectUserToken()
    await campaignsPage.mockApiGetUserRoles()
  })

  test('Should display campaigns', async ({ campaignsPage }) => {
    await campaignsPage.mockCampaignsOkResponse()
    await campaignsPage.goto()

    // Check that all campaigns are rendered
    await campaignsPage.waitForCampaignToRender('6 July CDC Trial')
    await campaignsPage.waitForCampaignToRender('8 July CDC Trial')
    await campaignsPage.waitForCampaignToRender('10 July CDC Trial')
  })

  test('Should redirect to campaign on click', async ({ campaignsPage }) => {
    await campaignsPage.mockCampaignsOkResponse()
    await campaignsPage.goto()

    await Promise.all([
      campaignsPage.waitForRedirectToCampaign(CAMPAIGN1_ID),
      campaignsPage.getManageCampaignButton(CAMPAIGN1_ID).click(),
    ])
  })

  // TODO: Test create campaign
})
