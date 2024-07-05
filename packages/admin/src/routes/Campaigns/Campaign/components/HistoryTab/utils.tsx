import React from 'react'
import _ from 'lodash'
import { VoucherValue } from 'services/RedeemApi/types'
import { Text } from '@chakra-ui/react'
import moment from 'moment'
import { PERMISSION_GROUPS } from '../SettingsTab/constants'

export function getMerchantType(type: string) {
  switch (type) {
    case 'regular':
      return 'Vouchers'
    case 'supermarket':
      return 'Supermarket Vouchers'
    default:
      return ''
  }
}

export const getPrettyVoucherValues = (voucherValues: VoucherValue[] | null) =>
  voucherValues
    ? voucherValues
        // \u00D7 is the character ×
        .map(({ quantity, value }) => `${quantity} \u00D7 $${value}`)
        .join(', ')
    : 'null'

export const getPrettyDate = (timestamp: string) =>
  moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')

export const getPrettyRoles = (roles: string[]) => {
  const permissionGroups: {
    [role: string]: { label: string; description: string }
  } = PERMISSION_GROUPS
  return roles
    .map((role) => _.get(permissionGroups, role, null)?.label || role)
    .map((s) => s.toLowerCase())
    .join(', ')
}

// Transforms key from "thisIsMyKey" -> "This is my key"
// TODO: this does not follow the figma exactly. Can change in the future.
const getReadableKey = (key: string) => _.capitalize(_.lowerCase(key))

export const getCreatedText = <K extends string, V>(
  object: { [key in K]: V } & { [key: string]: unknown },
  key: K,
  options?: {
    displayKey?: string // If provided, displays this instead of getReadableKey
    transformValue?: (value: V) => string
  }
) => {
  const transformValue = options?.transformValue
  const value = transformValue
    ? transformValue(object[key])
    : String(object[key])
  return (
    <Text key={key}>
      {options?.displayKey || getReadableKey(key)} was created as{' '}
      <Text as="span" color="primary.500">
        {value}
      </Text>
    </Text>
  )
}

export const getEditedText = <K extends string, V>(
  before: { [key in K]: V } & { [key: string]: unknown },
  after: { [key in K]: V } & { [key: string]: unknown },
  key: K,
  options?: {
    displayKey?: string
    transformValue?: (value: V) => string
  }
) => {
  const transformValue = options?.transformValue
  const oldValue = transformValue
    ? transformValue(before[key])
    : String(before[key])
  const newValue = transformValue
    ? transformValue(after[key])
    : String(after[key])
  return oldValue === newValue ? null : (
    <Text key={key}>
      {options?.displayKey || getReadableKey(key)} was edited from {oldValue} to{' '}
      <Text as="span" color="primary.500">
        {newValue}
      </Text>
    </Text>
  )
}

export const getEditedToText = (entity: string, value: string) => {
  return (
    <Text>
      <Text as="span" textStyle="subhead2" color="neutral.700">
        {entity}
      </Text>
      {' was edited to '}
      <Text as="span" textStyle="subhead2" color="primary.500">
        {value}
      </Text>
    </Text>
  )
}
