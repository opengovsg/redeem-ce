import {
  defaultCampaign,
  defaultPerson,
  endedCampaign,
  notStartedCampaign,
} from './common'
import {
  moreThanMaximumVouchers,
  redeemedAndVoidedNoTypesVouchers,
  redeemedNoTypesVouchers,
  unusedNoTypesVouchers,
} from './vouchers'

export const unusedGroupedVouchersResponse = {
  ...defaultCampaign,
  data: {
    ...defaultPerson,
    vouchers: unusedNoTypesVouchers,
  },
}

export const redeemedGroupedVouchersResponse = {
  ...defaultCampaign,
  data: {
    ...defaultPerson,
    vouchers: redeemedNoTypesVouchers,
  },
}

export const redeemedAndVoidedGroupedVouchersResponse = {
  ...defaultCampaign,
  data: {
    ...defaultPerson,
    vouchers: redeemedAndVoidedNoTypesVouchers,
  },
}

export const moreThanMaximumGroupedVouchersResponse = {
  ...defaultCampaign,
  data: {
    ...defaultPerson,
    vouchers: moreThanMaximumVouchers,
  },
}

export const endedGroupedVouchersResponse = {
  ...endedCampaign,
  data: {
    ...defaultPerson,
    vouchers: unusedNoTypesVouchers,
  },
}

export const notStartedGroupedVouchersResponse = {
  ...notStartedCampaign,
  data: {
    ...defaultPerson,
    vouchers: unusedNoTypesVouchers,
  },
}
