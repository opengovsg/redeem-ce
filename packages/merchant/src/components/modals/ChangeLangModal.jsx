import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import BaseSettingsModal from 'components/modals/BaseSettingsModal'
import LanguageList from 'components/shared/LanguageList'

import i18n, { changeLanguage } from 'services/localisation/i18n'
import I18N_KEYS from 'constants/i18n-keys'

const ChangeLangModal = ({ isOpen, onCancel }) => {
  const { KEY, TEXT } = I18N_KEYS.CHOOSE_LANG_SCREEN
  const { t } = useTranslation(KEY)

  // ui
  const [selectedLang, setSelectedLang] = useState(i18n.language)

  // save initial language if user cancels
  const [originalLang, setOriginalLang] = useState('')
  useEffect(() => {
    setOriginalLang(i18n.language)
  }, [isOpen])

  // logic
  const handleSubmit = () => {
    try {
      changeLanguage(selectedLang)

      // close modal
      onCancel()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <BaseSettingsModal
      title={t(TEXT.HEADER)}
      fullWidthBody
      isOpen={isOpen}
      primaryActionTitle={t(TEXT.CONFIRM_BUTTON)}
      onPrimaryAction={handleSubmit}
      showCancel
      onCancel={() => {
        changeLanguage(originalLang)
        onCancel()
      }}
    >
      <LanguageList
        selectedLang={selectedLang}
        setSelectedLang={(key) => {
          setSelectedLang(key)
          changeLanguage(key)
        }}
      />
    </BaseSettingsModal>
  )
}

ChangeLangModal.propTypes = {
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
}

export default ChangeLangModal
