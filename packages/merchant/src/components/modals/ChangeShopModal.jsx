import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import InputSettingsModal from 'components/modals/InputSettingsModal'
import { useTranslation } from 'react-i18next'

import { isClientError } from 'helpers/utils'
import { validateShopCode } from 'helpers/validators'
import { useRequestJoinMerchantWithCode } from 'hooks/Session'
import useErrorToast from 'hooks/useErrorToast'

import { REQUEST_STATE } from 'constants/api'
import { FLOWS } from 'router/routes'
import I18N_KEYS from 'constants/i18n-keys'
import { MERCHANT_CODE_NOT_FOUND } from 'helpers/errors/merchant'

const ChangeShopModal = ({ isOpen, onCancel }) => {
  const navigate = useNavigate()

  // ui
  const { KEY, TEXT } = I18N_KEYS.COMMON
  const { t } = useTranslation(KEY)
  const errorToast = useErrorToast()

  // logic
  const { requestJoinMerchantWithCode, requestJoinMerchantWithCodeStatus } =
    useRequestJoinMerchantWithCode()

  const handleChangeShop = async ({ setInvalidInputText }, code) => {
    try {
      await requestJoinMerchantWithCode(code)
      navigate(`${FLOWS.ONBOARDING.CHOOSE_SHOP.NEXT}`, {
        replace: true,
        state: {
          justOnboardedMerchant: true,
        },
      })
    } catch (apiError) {
      if (isClientError(apiError)) {
        setInvalidInputText(MERCHANT_CODE_NOT_FOUND.MESSAGE)
      } else {
        errorToast(apiError)
      }
    }
  }

  return (
    <InputSettingsModal
      isOpen={isOpen}
      title={t(TEXT.CHANGE_SHOP)}
      description={t(TEXT.CHANGE_SHOP_PROMPT)}
      validator={validateShopCode}
      submitTitle={t(TEXT.JOIN_SHOP)}
      submitLoading={
        requestJoinMerchantWithCodeStatus === REQUEST_STATE.LOADING
      }
      onSubmit={handleChangeShop}
      onCancel={onCancel}
    />
  )
}

ChangeShopModal.propTypes = {
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
}

export default ChangeShopModal
