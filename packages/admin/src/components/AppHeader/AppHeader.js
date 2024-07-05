import React from 'react'
import PropTypes from 'prop-types'
import redeemLogo from 'img/redeem-logo.svg'

import { useAuthenticationState } from 'data/Authentication'
import { Link } from 'react-router-dom'

import { HStack, Image, Text } from '@chakra-ui/react'
import LogoutButton from 'components/LogoutButton'
import { hasSystemRole } from 'helpers/permissions'

// Returns an AppHeader with email provided in props, else within user object
export default function AppHeader({ email }) {
  const { user, permissions } = useAuthenticationState()

  return (
    <HStack
      align="center"
      justify="space-between"
      padding="20px 32px"
      background="white"
      borderStyle="solid"
      borderColor="neutral.300"
      borderBottomWidth="1px"
    >
      <Image width="170px" src={redeemLogo} />
      {hasSystemRole({ permissions }) && (
        <HStack
          width="100%"
          paddingLeft="24px"
          spacing="16px"
          color="body.text"
          fontWeight="500"
        >
          <Link to="/campaigns">Campaigns</Link>
          <Link to="/merchants">Merchants</Link>
        </HStack>
      )}
      <HStack align="center" paddingRight="16px" spacing="16px">
        <Text textStyle="subhead1" color="neutral.700">
          {email || user.email}
        </Text>
        <LogoutButton />
      </HStack>
    </HStack>
  )
}

AppHeader.propTypes = {
  email: PropTypes.string,
}
