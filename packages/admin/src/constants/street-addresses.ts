export const isCreateVoucherAddressUsePrefill =
  process.env.REACT_APP_IS_CREATE_VOUCHER_ADDRESS_USE_PREFILL === 'true'

export const addresses = (
  process.env.REACT_APP_STREET_ADDRESSES
    ? JSON.parse(process.env.REACT_APP_STREET_ADDRESSES)
    : {}
) as Record<string, Record<string, Record<string, string[]>>>
