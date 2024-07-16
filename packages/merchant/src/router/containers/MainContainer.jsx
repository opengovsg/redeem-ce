import React, { useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import {
  BiCog,
  BiDollarCircle,
  BiHomeAlt,
  BiPurchaseTagAlt,
} from 'react-icons/bi'
import _ from 'lodash'

import NavbarItem from 'components/navigation/NavbarItem'
import { ROUTES } from 'router/routes'
import I18N_KEYS from 'constants/i18n-keys'

const MainContainer = () => {
  const { KEY, TEXT } = I18N_KEYS.COMMON
  const { t } = useTranslation(KEY)

  const getDisplayForRoute = useCallback((route) => {
    switch (route) {
      case ROUTES.MAIN.PATHS.HOME:
        return {
          icon: BiHomeAlt,
          title: t(TEXT.HOME),
        }
      case ROUTES.MAIN.PATHS.TRANSACTIONS:
        return {
          icon: BiPurchaseTagAlt,
          title: t(TEXT.TRANSACTIONS),
        }
      case ROUTES.MAIN.PATHS.PAYOUTS:
        return {
          icon: BiDollarCircle,
          title: t(TEXT.PAYOUTS),
        }
      case ROUTES.MAIN.PATHS.SETTINGS:
        return {
          icon: BiCog,
          title: t(TEXT.SETTINGS),
        }
      default:
        return {
          icon: '',
          title: '?',
        }
    }
  }, [])

  return (
    <Flex
      w='100vw'
      h='100vh'
      flexDir='column'
      justifyContent='end'
    >
      <Outlet />
      <Flex
        w='100%'
        paddingY='12px'
        paddingX='8px'
        flexDir='row'
        borderRadius='8px 8px 0 0'
        shadow='md'
        flexShrink={0}
      >
        {_.values(ROUTES.MAIN.PATHS).map((route) => {
          const display = getDisplayForRoute(route)
          return (
            <NavbarItem
              route={route}
              icon={display.icon}
              title={display.title}
              key={route}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default MainContainer
