/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import redeemLogoNoText from 'img/redeem-logo-no-text.svg'

import { Button, Flex, Icon, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'

type SideNavbarProps = {
  id: string
  to: string
  children?: JSX.Element | null | (JSX.Element | null)[]
}

export default function SideNavbar({ children, id, to }: SideNavbarProps) {
  return (
    <Flex
      alignItems="stretch"
      flexDirection="column"
      flexGrow={0}
      flexShrink={0}
      alignSelf="stretch"
      width="15.5rem"
      background="white"
      borderWidth={0}
      borderStyle="solid"
      borderColor="neutral.300"
      borderRightWidth="1px"
      id={id}
    >
      <Image
        alignSelf="start"
        height="2rem"
        alt="Redeem logo"
        marginX="32px"
        marginY="44px"
        src={redeemLogoNoText}
      />
      <Button
        as={Link}
        alignItems="center"
        justifyContent="start"
        alignSelf="start"
        display="flex"
        width="100%"
        border="0"
        paddingTop="28px"
        paddingRight="32px"
        paddingBottom="28px"
        paddingLeft="32px"
        color="neutral.800"
        iconSpacing="12px"
        leftIcon={<Icon as={BiArrowBack} width="20px" height="20px" />}
        to={to}
        variant="unstyled"
      >
        Back
      </Button>
      {children}
    </Flex>
  )
}
