import React from 'react'
import { Flex, Image } from '@chakra-ui/react'
import redeemLogo from 'images/redeem-logo.svg'
import Scanner from './Scanner'

const ScannerContainer = (props) => (
  <Flex
    h='auto'
    marginY={4}
    padding={4}
    borderRadius={4}
    shadow='md'
    flexGrow={2}
    flexDir='column'
    gap={4}
  >
    <Scanner {...props} />
    <Image
      height='10%'
      maxHeight='20px'
      objectFit='cover'
      marginX='auto'
      src={redeemLogo}
    />
  </Flex>
)

ScannerContainer.propTypes = Scanner.propTypes

export default ScannerContainer
