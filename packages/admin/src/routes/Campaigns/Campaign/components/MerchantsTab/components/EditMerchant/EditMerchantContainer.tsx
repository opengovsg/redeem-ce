import { useToast } from 'data/Toasts'
import { functionStateWrapper } from 'helpers/utils'
import {
  useFetchMerchant,
  useUpdateMerchant,
  useUpdateMerchantPaymentDetails,
} from 'hooks/Merchants'
import React from 'react'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import { UserActions } from 'constants/permissions'
import { useAuthenticationState } from 'data/Authentication'
import EditMerchant from './EditMerchant'

type EditMerchantContainerProps = Record<string, never>

const EditMerchantContainer: React.FC<EditMerchantContainerProps> = () => {
  const { toastSuccessWithoutTitle, toastError } = useToast()
  const { merchantId } = useParams<{ merchantId: string }>()
  const { merchant, isFetchingMerchant } = useFetchMerchant(merchantId)
  const { updateMerchant, isUpdateMerchantLoading } =
    useUpdateMerchant(merchantId)
  const { permissions } = useAuthenticationState()
  const globalPermissions = permissions['*']?.actions
  const canEditMerchantShopDetails = globalPermissions?.includes(
    UserActions.UpdateMerchant
  )
  const canEditMerchantPaymentDetails = globalPermissions?.includes(
    UserActions.UpdateMerchantPayment
  )
  const {
    updateMerchantPaymentDetails,
    isUpdateMerchantPaymentDetailsLoading,
  } = useUpdateMerchantPaymentDetails(merchantId)

  const onSuccess = () =>
    toastSuccessWithoutTitle({
      primaryText: 'Success! ',
      secondaryText: 'Changes have been saved.',
    })

  // NOTE: this currently displays the error message
  // shown from backend
  const onError = (error: Error) => toastError(error)

  const withToast = functionStateWrapper(onSuccess, onError as any)

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {(!isFetchingMerchant || !_.isEmpty(merchant)) && (
        <EditMerchant
          merchant={merchant}
          onClickUpdateParticulars={withToast(updateMerchant)}
          onClickUpdateFinance={withToast(updateMerchantPaymentDetails)}
          isLoading={
            isUpdateMerchantLoading || isUpdateMerchantPaymentDetailsLoading
          }
          canEditMerchantShopDetails={canEditMerchantShopDetails}
          canEditMerchantPaymentDetails={canEditMerchantPaymentDetails}
        />
      )}
    </>
  )
}

export default EditMerchantContainer
