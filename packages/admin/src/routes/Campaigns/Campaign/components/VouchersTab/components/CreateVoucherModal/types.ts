export type CreateVoucherStoredFormContent = {
  voucherBlockNumberParam: string
  voucherStreetNameParam: string
  voucherPostalCodeParam: string
  voucherFloorNumberParam: string
  voucherUnitNumberParam: string
  voucherRecipientIdParam: string
  voucherContactNumberParam: string
  voucherCountryCodeParam: string
  voucherNameParam: string
  // Additional info to be used in other steps
  addressValueToSearch: {
    block: string
    floor: string | null
    unit: string | null
    postalCode: string
  } | null
}

export type VoucherRecipientModalFocusState = 'recipientId' | 'address'
