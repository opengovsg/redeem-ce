import {BrowserContext} from '@playwright/test'
import {
  endedGroupedVouchersResponse,
  moreThanMaximumGroupedVouchersResponse,
  notStartedGroupedVouchersResponse,
  redeemedAndVoidedGroupedVouchersResponse,
  redeemedGroupedVouchersResponse,
  unusedGroupedVouchersResponse,
} from '../mocks/DefaultGroupedVouchers.response'
import type {JsonObject} from 'type-fest'
import {
  noRedemptionEventsResponse,
  redemptionEventsResponse,
} from '../mocks/GroupedVoucherEvents.response'
import {
  endedGroupedVouchersTypesResponse,
  notStartedGroupedVouchersTypesResponse,
  redeemedGroupedVouchersRegularTypesResponse,
  redeemedGroupedVouchersSupermarketTypesResponse,
  unusedGroupedVouchersTypesResponse,
} from '../mocks/TypedGroupedVouchers.response'

async function mockGroupVoucherApiResponse(
  context: BrowserContext,
  responseBody: JsonObject,
) {
  return context.route('**/public/vouchers/groups/UQGVUCIN1S6BZY3', (route) =>
    route.fulfill({
      status: 200,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify(responseBody),
    }),
  )
}

export async function mockNotFoundGroupVoucherApiResponse(
  context: BrowserContext,
) {
  return context.route('**/public/vouchers/groups/non-existant', (route) =>
    route.fulfill({
      status: 404,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify({
        error: {
          code: 'group_id_not_found',
          message: 'Could not find group with this id.',
          type: 'invalid_request_error',
        },
      }),
    }),
  )
}

export async function mockUnusedGroupVoucherApiResponse(
  context: BrowserContext,
) {
  return mockGroupVoucherApiResponse(context, unusedGroupedVouchersResponse)
}

export async function mockEndedGroupVoucherApiResponse(
  context: BrowserContext,
) {
  return mockGroupVoucherApiResponse(context, endedGroupedVouchersResponse)
}

export async function mockNotStartedGroupVoucherApiResponse(
  context: BrowserContext,
) {
  return mockGroupVoucherApiResponse(context, notStartedGroupedVouchersResponse)
}

export async function mockUnusedGroupVoucherTypesApiResponse(
  context: BrowserContext,
) {
  return mockGroupVoucherApiResponse(
    context,
    unusedGroupedVouchersTypesResponse,
  )
}

export async function mockEndedGroupVoucherTypesApiResponse(
  context: BrowserContext,
) {
  return mockGroupVoucherApiResponse(context, endedGroupedVouchersTypesResponse)
}

export async function mockNotStartedGroupVoucherTypesApiResponse(
  context: BrowserContext,
) {
  return mockGroupVoucherApiResponse(
    context,
    notStartedGroupedVouchersTypesResponse,
  )
}

export async function mockRedeemedGroupVoucherApiResponse(
  context: BrowserContext,
) {
  return mockGroupVoucherApiResponse(context, redeemedGroupedVouchersResponse)
}

export async function mockRedeemedGroupVoucherApiRegularTypesResponse(
  context: BrowserContext,
) {
  return mockGroupVoucherApiResponse(
    context,
    redeemedGroupedVouchersRegularTypesResponse,
  )
}

export async function mockRedeemedGroupVoucherApiSupermarketTypesResponse(
  context: BrowserContext,
) {
  return mockGroupVoucherApiResponse(
    context,
    redeemedGroupedVouchersSupermarketTypesResponse,
  )
}

export async function mockRedeemedAndVoidedGroupVoucherApiResponse(
  context: BrowserContext,
) {
  return mockGroupVoucherApiResponse(
    context,
    redeemedAndVoidedGroupedVouchersResponse,
  )
}

export async function mockMoreThanMaximumGroupedVouchersApiResponse(
  context: BrowserContext,
) {
  return mockGroupVoucherApiResponse(
    context,
    moreThanMaximumGroupedVouchersResponse,
  )
}

async function mockTransactionHistoryApiResponse(
  context: BrowserContext,
  responseBody: JsonObject,
) {
  return context.route('**/public/events/vouchers/UQGVUCIN1S6BZY3', (route) =>
    route.fulfill({
      status: 200,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify(responseBody),
    }),
  )
}

export async function mockEmptyTransactionHistoryApiResponse(
  context: BrowserContext,
) {
  return mockTransactionHistoryApiResponse(context, noRedemptionEventsResponse)
}

export async function mockTransactionHistoryContentApiResponse(
  context: BrowserContext,
) {
  return mockTransactionHistoryApiResponse(context, redemptionEventsResponse)
}
