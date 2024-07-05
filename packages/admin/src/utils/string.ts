import _ from 'lodash'
/**
 This is quite hacky but can read up more about how US split their number up.
 Thousands separator: Comma is used to separate every group of three digits, counting from the right. For example, the number one million is formatted as 1,000,000.
 Decimal separator: Period is used as the decimal separator. For instance, one and a half is represented as 1.5.
 Negative numbers: Negative numbers are prefixed with a minus sign (-). For example, negative one hundred would be -100.
 */
export function convertNumberWithCommaDelimiters(num: number): string {
  return num.toLocaleString('en-US')
}

export function formatNumberOfInvalidIdentifiers(
  numberOfInvalidIds: number
): string {
  return `${numberOfInvalidIds} invalid ${
    numberOfInvalidIds === 1 ? 'identifier' : 'identifiers'
  }`
}

// TODO(sean): For whitelist to use and remove the disable next line
// ts-unused-exports:disable-next-line
export function formatNumberOfDuplicates(numberOfDuplicates: number): string {
  return `${numberOfDuplicates} duplicates`
}

export function formatNumberOfEmptyRows(numberOfEmptyRows: number): string {
  return `${numberOfEmptyRows} empty row${numberOfEmptyRows === 1 ? '' : 's'}`
}

export function formatNumberOfInvalidMobileNumbers(
  numberOfInvalidMobileNumber: number
): string {
  return `${numberOfInvalidMobileNumber} invalid mobile number${
    numberOfInvalidMobileNumber === 1 ? '' : 's'
  }`
}

export const formatNumberOfVoucherLinks = (numberOfRows: number) => {
  return `${numberOfRows} voucher link${numberOfRows === 1 ? '' : 's'}`
}

export function formatErrorStringsWithCommaAndAnd(
  errorStrings: string[]
): string {
  if (_.isEmpty(errorStrings)) {
    return ''
  }

  let errorString = _.first(errorStrings)

  if (_.size(errorStrings) === 1) {
    return errorString ?? ''
  }

  for (let i = 1; i < errorStrings.length - 1; i += 1) {
    errorString = `${errorString}, ${errorStrings[i]}`
  }
  return `${errorString} and ${errorStrings[errorStrings.length - 1]}`
}
