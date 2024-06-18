import _ from 'lodash'

interface FormatAddressParams {
  postalCode?: string | null
  block?: string | null
  unit?: string | null
  floor?: string | null
  street?: string | null
}

export function is404Error(error: unknown) {
  const errorCode = _.get(error, 'response.status')
  return errorCode && errorCode === 404
}

export function formatAddress({
  block,
  street,
  postalCode,
  floor,
  unit,
}: FormatAddressParams) {
  if (!postalCode) {
    return ''
  }
  const address = [block ? `${block} ${street}` : street]
  if (floor && unit) {
    address.push(`#${floor}-${unit}`)
  }

  address.push(`SINGAPORE ${postalCode}`)
  return address.join(', ')
}

export function openInNewTab(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}
