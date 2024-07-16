import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Flex, Icon, Text } from '@chakra-ui/react'
import {
  BiCalendarWeek,
  BiDollarCircle,
  BiStoreAlt,
  BiUser,
} from 'react-icons/bi'
import { HiOutlineTicket } from 'react-icons/hi'

export const ICON_TYPE = {
  USER: BiUser,
  MERCHANT: BiStoreAlt,
  CALENDAR: BiCalendarWeek,
  VOUCHER: HiOutlineTicket,
  PAYMENT: BiDollarCircle,
}

const IconTextRow = ({ iconType, text, fontSize = 16, style }) => (
  <Flex
    flexDir='row'
    gap={2}
    {...style}
  >
    <Icon
      // aligns icon with text
      marginTop={`${fontSize / 4}px`}
      fontSize={fontSize + 2}
      as={iconType}
    />
    <Text
      fontSize={fontSize}
      fontWeight='500'
    >
      {text}
    </Text>
  </Flex>
)

IconTextRow.propTypes = {
  iconType: PropTypes.oneOf(_.values(ICON_TYPE)).isRequired,
  text: PropTypes.string,
  fontSize: PropTypes.number,
  style: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.any),
  ]),
}

export default IconTextRow
