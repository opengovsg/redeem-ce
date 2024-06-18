import {
  defaultCampaign,
  defaultPerson,
  endedCampaign,
  notStartedCampaign,
} from './common'
import {
  redeemedRegularTypesVouchers,
  redeemedSupermarketTypesVouchers,
  unusedTypesVouchers,
} from './vouchers'

export const unusedGroupedVouchersTypesResponse = {
  ...defaultCampaign,
  data: {
    ...defaultPerson,
    vouchers: unusedTypesVouchers,
  },
}

export const redeemedGroupedVouchersRegularTypesResponse = {
  ...defaultCampaign,
  data: {
    ...defaultPerson,
    vouchers: redeemedRegularTypesVouchers,
  },
}

export const redeemedGroupedVouchersSupermarketTypesResponse = {
  ...defaultCampaign,
  data: {
    ...defaultPerson,
    vouchers: redeemedSupermarketTypesVouchers,
  },
}

export const endedGroupedVouchersTypesResponse = {
  ...endedCampaign,
  data: {
    ...defaultPerson,
    vouchers: unusedTypesVouchers,
  },
}

export const notStartedGroupedVouchersTypesResponse = {
  ...notStartedCampaign,
  data: {
    ...defaultPerson,
    vouchers: unusedTypesVouchers,
  },
}
