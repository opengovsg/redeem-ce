import React from 'react'
import PropTypes from 'prop-types'
import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import BaseSettingsModal from 'components/modals/BaseSettingsModal'

import useLogout from 'hooks/Logout'
import I18N_KEYS from 'constants/i18n-keys'

const LogoutModal = ({ isOpen, onCancel }) => {
  const { KEY, TEXT } = I18N_KEYS.COMMON
  const { t } = useTranslation(KEY)
  const { logout, isLoggingOut } = useLogout()

  return (
    <BaseSettingsModal
      title={t(TEXT.LOGOUT_TITLE)}
      isOpen={isOpen}
      primaryActionTitle={t(TEXT.LOGOUT)}
      primaryActionLoading={isLoggingOut}
      onPrimaryAction={() => logout()}
      showCancel
      onCancel={onCancel}
    >
      <Text
        textAlign='left'
        textStyle='subhead-1'
      >
        {t(TEXT.LOGOUT_DESCRIPTION)}
      </Text>
    </BaseSettingsModal>
  )
}

LogoutModal.propTypes = {
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
}

export default LogoutModal
