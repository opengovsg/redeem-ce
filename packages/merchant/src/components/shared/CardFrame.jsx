import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from '@chakra-ui/react'

const CardFrame = ({ fitToFrame = false, children, style }) => (
  <Flex
    h={fitToFrame ? '100%' : ''}
    w={fitToFrame ? '100%' : ''}
    flexDir='inherit'
    backgroundColor='white'
    borderRadius={6}
    overflow='hidden'
    shadow='md'
    {...style}
  >
    {children}
  </Flex>
)

CardFrame.propTypes = {
  fitToFrame: PropTypes.bool,
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.any),
  ]),
}

export default CardFrame
