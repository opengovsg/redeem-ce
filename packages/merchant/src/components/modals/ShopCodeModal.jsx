import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import BaseSettingsModal from 'components/modals/BaseSettingsModal'

import IconTextRow, { ICON_TYPE } from 'components/shared/IconTextRow'
import I18N_KEYS from 'constants/i18n-keys'

const ShopCodeModal = ({ isOpen, onClose, shopName, shopCode }) => {
  const { KEY, TEXT } = I18N_KEYS.COMMON
  const { t } = useTranslation(KEY)

  return (
    <BaseSettingsModal
      title={t(TEXT.SHARE_SHOP)}
      isOpen={isOpen}
      primaryActionTitle={t(TEXT.CLOSE)}
      onPrimaryAction={onClose}
    >
      <Flex
        flexDir='column'
        gap={3}
      >
        <Text
          textAlign='left'
          textStyle='subhead-1'
        >
          {t(TEXT.SHARE_SHOP_PROMPT)}
        </Text>
        <IconTextRow
          iconType={ICON_TYPE.MERCHANT}
          text={shopName}
          fontSize={18}
        />
        <Flex
          borderRadius={8}
          paddingX={4}
          paddingY={2}
          backgroundColor='grey.100'
        >
          <Text
            w='100%'
            textStyle='h2'
            fontSize={28}
            color='black'
          >
            {shopCode}
          </Text>
        </Flex>
      </Flex>
    </BaseSettingsModal>
  )
}

ShopCodeModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  shopName: PropTypes.string,
  shopCode: PropTypes.string,
}

export default ShopCodeModal
