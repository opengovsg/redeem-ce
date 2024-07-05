import { test as originalBase, Page } from '@playwright/test'
import _ from 'lodash'
import percySnapshot from '@percy/playwright'
import {
  API_ROUTE_GET_USER_ROLES,
  TEST_USER_ID,
  GLOBAL_ACTIONS,
  CAMPAIGN1_ID,
  CAMPAIGN_ACTIONS,
  API_URL,
  DEFAULT_RESPONSE_HEADERS,
  LOCAL_STORAGE_USER,
  LOCAL_STORAGE_USER_KEY,
} from './constants'

export class RedeemAdminPage {
  readonly page: Page

  readonly baseUrl: string | undefined

  constructor(page: Page, baseUrl: string | undefined) {
    this.page = page
    this.baseUrl = baseUrl
  }

  waitForTimeout(timeoutInMs: number): Promise<void> {
    return this.page.waitForTimeout(timeoutInMs)
  }

  testSnapshot(label: string): Promise<void> {
    return percySnapshot(this.page, label, { widths: [1280] })
  }

  injectUserToken(): Promise<void> {
    return this.page.addInitScript(
      ({ userKey, userValue }: { userKey: string; userValue: string }) => {
        window.localStorage.setItem(userKey, userValue)
      },
      {
        userKey: LOCAL_STORAGE_USER_KEY,
        userValue: JSON.stringify(LOCAL_STORAGE_USER),
      }
    )
  }

  mockAllApiCallsAsUnauthorized(): Promise<void> {
    return this.page.route(
      (url) => url.toString().startsWith(API_URL),
      (route) =>
        route.fulfill({
          status: 402,
        })
    )
  }

  mockNoResponseForAllUnmockedRoutes(): Promise<void> {
    return this.page.route(
      (url) => {
        return url.origin === API_URL
      },
      (route) => route.abort()
    )
  }

  mockApiGetUserRoles(
    params: { excludeActions?: string[] } = { excludeActions: [] }
  ) {
    const { excludeActions } = params
    return this.page.route(`${API_URL}${API_ROUTE_GET_USER_ROLES}`, (route) =>
      route.fulfill({
        status: 200,
        headers: DEFAULT_RESPONSE_HEADERS,
        body: JSON.stringify({
          object: 'user_actions',
          data: [
            {
              createdAt: '2022-01-21T16:28:11.873+08:00',
              updatedAt: '2022-01-21T16:28:11.873+08:00',
              expiresAt: null,
              actorId: TEST_USER_ID,
              resourceId: '*',
              metadata: {},
              roles: ['merchant_admin_non_payment', 'dashboard_user'],
              actions: _.without(GLOBAL_ACTIONS, ...(excludeActions || [])),
            },
            {
              createdAt: '2021-12-12T02:14:46.336+08:00',
              updatedAt: '2021-12-12T02:14:46.336+08:00',
              expiresAt: null,
              actorId: TEST_USER_ID,
              resourceId: CAMPAIGN1_ID,
              metadata: {},
              roles: ['fakerole'],
              actions: _.without(CAMPAIGN_ACTIONS, ...(excludeActions || [])),
            },
          ],
        }),
      })
    )
  }

  waitForNewPage(): Promise<Page> {
    return this.page.context().waitForEvent('page')
  }
}

type BaseFixture = {
  basePage: RedeemAdminPage
}

export const baseTest = originalBase.extend<BaseFixture>({
  basePage: async ({ page, baseURL }, use) => {
    const redeemAdminPage = new RedeemAdminPage(page, baseURL)
    await use(redeemAdminPage)
  },
})
