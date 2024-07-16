import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Text } from '@chakra-ui/react'

import FORMAT from 'constants/format'

const CurrencyDisplay = ({ signSize = 14, valueSize = 28, value, style }) => (
  <Flex
    flexDir='row'
    alignItems='center'
    fontSize={signSize}
    textStyle='h5'
    {...style}
  >
    <Text>{FORMAT.CURRENCY.PREFIX}</Text>
    <Text
      textStyle='responsive-display.heavy'
      letterSpacing='-0.11rem'
      fontSize={valueSize}
    >
      {value}
    </Text>
    <Text>{FORMAT.CURRENCY.SUFFIX}</Text>
  </Flex>
)

CurrencyDisplay.propTypes = {
  signSize: PropTypes.number,
  valueSize: PropTypes.number,
  value: PropTypes.number,
  style: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.any),
  ]),
}

export default CurrencyDisplay
