import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FormControl, Text } from '@chakra-ui/react'
import { FormErrorMessage, Input } from '@opengovsg/design-system-react'
import { useTranslation } from 'react-i18next'

import I18N_KEYS from 'constants/i18n-keys'
import BaseSettingsModal from './BaseSettingsModal'

// requires a validator that returns a result in the shape of
// (input) => {res, isValid, error}
const InputSettingsModal = ({
  title,
  description,
  isOpen,
  validator,
  submitTitle,
  submitLoading,
  onSubmit,
  onCancel,
}) => {
  // eslint-disable-
  const { t } = useTranslation(I18N_KEYS.COMMON.KEY)

  const [inputText, setInputText] = useState('')
  const [invalidInputText, setInvalidInputText] = useState('')

  const onModalSubmit = () => {
    const { isValid, error } = validator(inputText)

    if (!isValid) {
      setInputText('')
      setInvalidInputText(error)
      return
    }

    // submit on successful validation and reset modal
    onSubmit({ setInputText, setInvalidInputText }, inputText)
    setInputText('')
  }

  return (
    <BaseSettingsModal
      title={title}
      isOpen={isOpen}
      primaryActionTitle={submitTitle}
      primaryActionLoading={submitLoading}
      onPrimaryAction={onModalSubmit}
      showCancel
      onCancel={onCancel}
    >
      <FormControl
        textAlign='left'
        isInvalid={invalidInputText !== ''}
      >
        <Text
          marginBottom={2}
          textStyle='subhead-1'
        >
          {description}
        </Text>
        <Input
          value={inputText}
          onChange={(e) => {
            setInvalidInputText('')
            setInputText(e.target.value)
          }}
        />
        <FormErrorMessage>{t(invalidInputText)}</FormErrorMessage>
      </FormControl>
    </BaseSettingsModal>
  )
}

InputSettingsModal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  isOpen: PropTypes.bool,
  validator: PropTypes.func,
  submitTitle: PropTypes.string,
  submitLoading: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
}

export default InputSettingsModal
