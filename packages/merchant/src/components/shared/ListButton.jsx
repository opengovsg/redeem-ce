import React from 'react'
import PropTypes from 'prop-types'

import { Flex, Icon, Button } from '@chakra-ui/react'

const ListButton = ({ icon, text, isActive, onClick }) => (
  <Button
    h={16}
    gap={4}
    paddingX={icon ? 4 : 6}
    justifyContent='start'
    variant='clear'
    color='brand.primary.700'
    borderRadius={0}
    borderTop='1px solid #EEEEEE'
    onClick={onClick}
    isActive={isActive}
  >
    {icon && (
      <Flex
        padding={2}
        borderRadius={20}
        backgroundColor='brand.primary.50'
      >
        <Icon
          boxSize={6}
          as={icon}
        />
      </Flex>
    )}
    {text}
  </Button>
)

ListButton.propTypes = {
  icon: PropTypes.func, // should take in a functional component
  text: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
}

export default ListButton
