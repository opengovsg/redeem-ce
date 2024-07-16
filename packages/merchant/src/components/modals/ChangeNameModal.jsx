import React from 'react'
import PropTypes from 'prop-types'
import InputSettingsModal from 'components/modals/InputSettingsModal'
import { useTranslation } from 'react-i18next'

import { isClientError } from 'helpers/utils'
import { validateName } from 'helpers/validators'
import { useRequestUpdateUserName } from 'hooks/Session'
import useErrorToast from 'hooks/useErrorToast'

import { REQUEST_STATE } from 'constants/api'
import I18N_KEYS from 'constants/i18n-keys'

const ChangeNameModal = ({ isOpen, onCancel }) => {
  // ui
  const { KEY, TEXT } = I18N_KEYS.COMMON
  const { t } = useTranslation(KEY)
  const errorToast = useErrorToast()

  // logic
  const { requestUpdateUserName, requestUpdateUserNameStatus } =
    useRequestUpdateUserName()

  const handleChangeShop = async ({ setInvalidInputText }, name) => {
    try {
      await requestUpdateUserName(name)

      // close modal
      onCancel()
    } catch (apiError) {
      console.log(apiError)
      if (isClientError(apiError)) {
        setInvalidInputText(
          'Please enter a valid name with no special characters.',
        )
      } else {
        errorToast(apiError)
      }
    }
  }

  return (
    <InputSettingsModal
      isOpen={isOpen}
      title={t(TEXT.CHANGE_NAME)}
      description={t(TEXT.CHANGE_NAME_PROMPT)}
      validator={validateName}
      submitTitle={t(TEXT.SAVE_NAME)}
      submitLoading={requestUpdateUserNameStatus === REQUEST_STATE.LOADING}
      onSubmit={handleChangeShop}
      onCancel={onCancel}
    />
  )
}

ChangeNameModal.propTypes = {
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
}

export default ChangeNameModal
