import React, { useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'

import MainHeader from 'components/shared/MainHeader'
import ListButton from 'components/shared/ListButton'
import {
  BiGlobe,
  BiHelpCircle,
  BiInfoCircle,
  BiKey,
  BiLogOutCircle,
  BiMailSend,
  BiStoreAlt,
  BiUser,
} from 'react-icons/bi'
import CardFrame from 'components/shared/CardFrame'
import ShopCodeModal from 'components/modals/ShopCodeModal'

import useSession from 'hooks/Session'
import { openInNewTab } from 'helpers/utils'
import { useTranslation } from 'react-i18next'

import BREAKPOINTS from 'constants/breakpoints'
import LINKS from 'constants/links'
import ChangeShopModal from 'components/modals/ChangeShopModal'
import ChangeNameModal from 'components/modals/ChangeNameModal'
import ChangeLangModal from 'components/modals/ChangeLangModal'
import LogoutModal from 'components/modals/LogoutModal'
import I18N_KEYS from 'constants/i18n-keys'

const Settings = () => {
  const { KEY, TEXT } = I18N_KEYS.SETTINGS
  const { t } = useTranslation(KEY)

  // ui
  const [showShopCode, setShowShopCode] = useState()
  const [showChangeLang, setShowChangeLang] = useState()
  const [showChangeName, setShowChangeName] = useState()
  const [showChangeShop, setShowChangeShop] = useState()
  const [showLogout, setShowLogout] = useState()

  // logic
  const {
    session: { userName, merchantName, merchantAccessCode },
  } = useSession()

  return (
    <Box
      flexGrow={1}
      overflow='scroll'
    >
      <MainHeader
        headerText={t(TEXT.HEADER)}
        bgOverlapSize={8}
        merchantName={merchantName}
        userName={userName}
        bgShouldOverlap
      />
      <Flex
        paddingX={BREAKPOINTS.HORIZONTAL_RESPONSIVE.PADDING_X}
        paddingBottom={4}
        flexDir='column'
        gap={4}
      >
        <CardFrame>
          <ListButton
            icon={BiKey}
            text={t(TEXT.SHOW_SHOP_CODE)}
            onClick={() => {
              setShowShopCode(true)
            }}
          />
        </CardFrame>
        <CardFrame>
          <ListButton
            icon={BiHelpCircle}
            text={t(TEXT.FAQ)}
            onClick={() => openInNewTab(LINKS.FAQ)}
          />
          <ListButton
            icon={BiMailSend}
            text={t(TEXT.CONTACT_US)}
            onClick={() => openInNewTab(LINKS.CONTACT)}
          />
          <ListButton
            icon={BiInfoCircle}
            text={t(TEXT.ABOUT_REDEEM)}
            onClick={() => openInNewTab(LINKS.ABOUT)}
          />
        </CardFrame>
        <CardFrame>
          <ListButton
            icon={BiGlobe}
            text={t(TEXT.CHANGE_LANGUAGE)}
            onClick={() => setShowChangeLang(true)}
          />
          <ListButton
            icon={BiUser}
            text={t(TEXT.CHANGE_NAME)}
            onClick={() => setShowChangeName(true)}
          />
          <ListButton
            icon={BiStoreAlt}
            text={t(TEXT.CHANGE_SHOP)}
            onClick={() => setShowChangeShop(true)}
          />
        </CardFrame>
        <CardFrame>
          <ListButton
            icon={BiLogOutCircle}
            text={t(TEXT.LOGOUT)}
            onClick={() => setShowLogout(true)}
          />
        </CardFrame>
      </Flex>
      <ShopCodeModal
        shopName={merchantName}
        shopCode={merchantAccessCode}
        isOpen={showShopCode}
        onClose={() => {
          setShowShopCode(false)
        }}
      />
      <ChangeLangModal
        isOpen={showChangeLang}
        onCancel={() => setShowChangeLang(false)}
      />
      <ChangeNameModal
        isOpen={showChangeName}
        onCancel={() => setShowChangeName(false)}
      />
      <ChangeShopModal
        isOpen={showChangeShop}
        onCancel={() => setShowChangeShop(false)}
      />
      <LogoutModal
        isOpen={showLogout}
        onCancel={() => setShowLogout(false)}
      />
    </Box>
  )
}

export default Settings
