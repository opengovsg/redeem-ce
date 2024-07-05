import { convertNumberWithCommaDelimiters } from 'utils/string'

export function convertValueToMonetaryFormat(
  value: unknown,
  isMonetary?: boolean
) {
  return `${
    isMonetary ? `$${convertNumberWithCommaDelimiters(Number(value))}` : value
  }`
}
