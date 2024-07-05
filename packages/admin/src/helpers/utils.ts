import _ from 'lodash'
import { VOUCHER_STATE } from 'constants/vouchers'
import { VoucherType } from 'services/RedeemApi/types'

const emptyFunction = () => {
  // Do nothing
}

// NOTE: this is a wrapper function to abstract over the case where
// we have functions with many similar handlers.
// This allows the same handlers to be reused throughout without
// code duplication/boilerplate
export const functionStateWrapper =
  (
    onSuccess = emptyFunction,
    onError: (error: unknown) => void = emptyFunction,
    onSettled = emptyFunction
  ) =>
  (f: any) =>
  async (...args: any) => {
    try {
      await f(...args)
      onSuccess()
    } catch (error: unknown) {
      onError(error)
    } finally {
      onSettled()
    }
  }

// TODO: Removes the country prefix for a given contact number
// Assumes that the country prefix is known, and the same for all recipients
// This function is guaranteed to return at least an empty string
export const removeContactNumberPrefix = (contactNumber?: string | null) =>
  _.slice(contactNumber, 0).join('')

type FormatAddressProps = {
  blockNumber?: string | null
  streetName?: string | null
  unitNumber?: string | null
  floorNumber?: string | null
  postalCode?: string | null
}

// Formats address fields into a single string
export function formatAddress({
  blockNumber,
  streetName,
  unitNumber,
  floorNumber,
  postalCode,
}: FormatAddressProps) {
  // : {
  //   blockNumber: string
  //   streetAddress: string
  //   unitNumber?: string
  //   floorNumber?: string
  //   postalCode: string
  // }
  const address = []
  address.push(`${blockNumber} ${streetName}`)
  if (unitNumber && floorNumber) {
    address.push(`${floorNumber}-${unitNumber}`)
  } else if (unitNumber) {
    // Have unit number but no floor
    address.push(`Unit ${unitNumber}`)
  } else if (floorNumber) {
    // Have floor number but no unit
    address.push(`Floor ${floorNumber}`)
  }
  address.push(`Postal code ${postalCode}`)

  return address.join(', ')
}

export function getAddressFromGroup(group: VoucherType | undefined | null) {
  if (!group?.postalCode) {
    return ''
  }

  const { block, street, unit, floor, postalCode } = group
  return formatAddress({
    blockNumber: block,
    streetName: street,
    unitNumber: unit,
    floorNumber: floor,
    postalCode,
  })
}

export function scrollToTop() {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

// Previously firefox will ignores clicks as the elements wasnt attached to the dom, but rather was just
// created as a reference for clicking. Thus there is a fix for older version of firefox compatibility
// @see https://stackoverflow.com/questions/62536877/delete-an-element-that-was-created-with-document-createelement
// This method of download file will prevent a new tab from being open and suddenly being close which can be viewed
// as a shuttle to the user (Has a better UX)
// ts-unused-exports:disable-next-line
export function downloadFileWithoutOpeningNewTab(url: string | null) {
  if (!url) {
    return
  }

  const downloadLink = document.createElement('a')

  downloadLink.href = url
  downloadLink.setAttribute('download', '')
  downloadLink.target = '_parent'
  document.body.appendChild(downloadLink)
  downloadLink.click()
  setTimeout(() => {
    document.body.removeChild(downloadLink)
  }, 100)
}

export function isVoided(group: VoucherType) {
  return !!group?.vouchers?.find(
    (voucher) => voucher.state === VOUCHER_STATE.VOIDED
  )
}

export function openInNewTab(url: string) {
  window.open(url, '_blank')
}
