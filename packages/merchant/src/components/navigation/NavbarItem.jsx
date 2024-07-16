import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Icon, Link, Text } from '@chakra-ui/react'
import { NavLink as ReactRouterLink } from 'react-router-dom'

const NavbarItem = ({ route, icon, title }) => (
  <Link
    as={ReactRouterLink}
    to={route}
    textDecoration='none'
    flexBasis={0}
    flexGrow={1}
  >
    {({ isActive }) => (
      <Flex
        paddingY={2}
        flexDir='column'
        gap={1}
        color={isActive ? 'white' : 'gray'}
        backgroundColor={isActive ? '#21234b' : 'white'}
        borderRadius={4}
      >
        <Icon
          as={icon}
          marginX='auto'
          boxSize='16px'
        />
        <Text
          fontSize='10px'
          textAlign='center'
        >
          {title}
        </Text>
      </Flex>
    )}
  </Link>
)

NavbarItem.propTypes = {
  route: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default NavbarItem
