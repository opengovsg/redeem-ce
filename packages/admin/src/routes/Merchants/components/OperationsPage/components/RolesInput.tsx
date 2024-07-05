import React from 'react'
import { Checkbox, CheckboxGroup, VStack, Text, HStack } from '@chakra-ui/react'
import _ from 'lodash'
import { RolesInputProps } from '../types'

const SELECTABLE_ROLES = [
  'merchant_admin_payment',
  'merchant_admin_non_payment',
  'system',
  'system_payment',
  'system_uat',
]

export const RolesInput = ({
  roles,
  setRoles,
}: RolesInputProps): JSX.Element => {
  return (
    <VStack alignItems="left">
      <Text textStyle="subhead1" marginBottom="12px" color="neutral.900">
        Choose Roles
      </Text>
      <CheckboxGroup
        colorScheme="primary"
        value={roles}
        onChange={(event) => {
          setRoles(event as string[])
        }}
        size="lg"
      >
        <HStack>
          {SELECTABLE_ROLES.map((role) => (
            <Checkbox
              size="sm"
              key={role}
              value={role}
              textStyle="subhead1"
              color="neutral.900"
              whiteSpace="nowrap"
            >
              {_.startCase(role)}
            </Checkbox>
          ))}
        </HStack>
      </CheckboxGroup>
    </VStack>
  )
}
