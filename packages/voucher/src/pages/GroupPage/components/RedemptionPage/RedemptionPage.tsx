import React, {useEffect, useState} from 'react'
import {AxiosError} from 'axios'
import {Voucher} from 'types/voucher'
import useNavigatorOnline from 'hooks/useNavigatorOffline'
import {is404Error} from 'helpers/utils'
import {Flex, VStack} from '@chakra-ui/react'
import useErrorStates from 'hooks/useErrorStates'
import {Campaign} from 'types/campaign'
import AlreadyRedeemedModal from './components/AlreadyRedeemedModal'
import {
  getLastRedeemedTimestamp,
  getRedeemedMerchantName,
  getTransactionId,
  getVouchersState,
  getVouchersTotalValue,
} from 'helpers/vouchers'
import {useNavigateWithCurrentSearchParams} from 'helpers/navigate'
import RedemptionErrorModal from './components/RedemptionErrorModal'
import RedemptionPageHeader from './components/RedemptionPageHeader'
import RedemptionPageMain from './components/RedemptionPageMain'
import {useIsShortDeviceInitial} from 'helpers/hooks'

const REDEEM_PREFIX = 'rsg'

type RedemptionPageProps = {
  onBackClick: () => void
  vouchers: Voucher[]
  errorStatus: AxiosError
  campaign: Campaign
  header?: string
  colorScheme?: 'primary' | 'yellow' | 'teal'
}

const RedemptionPage = ({
  onBackClick,
  vouchers,
  errorStatus,
  campaign,
  colorScheme = 'primary',
  header,
}: RedemptionPageProps) => {
  const navigateWithCurrentSearchParams = useNavigateWithCurrentSearchParams()
  const errorStates = useErrorStates()
  const isShortDevice = useIsShortDeviceInitial()

  // Navigate back to vouchers selector if no vouchers selected
  useEffect(() => {
    if (!vouchers.length) {
      return navigateWithCurrentSearchParams('..')
    }
  }, [vouchers.length, navigateWithCurrentSearchParams])

  if (!vouchers.length) {
    onBackClick()
    return <></>
  }

  // We dynamically generate the qr code's value based on voucher ids selected by the user.
  // The rsg: prefix helps integrating merchants identify this is a Redeem voucher,
  // to be sent to Redeem backend as they might be accepting other vouchers besides ours.
  const extraQrPrefix = campaign.extraQrPrefix
  const prefix = `${REDEEM_PREFIX}${extraQrPrefix ? `-${extraQrPrefix}` : ''}`
  const qrCodeValue = `${prefix}:${vouchers
    .map((voucher) => voucher.id)
    .join(',')}`

  const vouchersState = getVouchersState(vouchers)
  const lastRedeemedTimestamp = getLastRedeemedTimestamp(vouchers)
  const transactionId = getTransactionId(vouchers)
  const merchantName = getRedeemedMerchantName(vouchers)
  const vouchersValue = getVouchersTotalValue(vouchers)

  // Error related objects
  const [isError, setIsError] = useState(false)
  const [errorObject, setErrorObject] = useState(errorStates.ServiceUnavailable)

  // Offline status checker API
  const isOnline = useNavigatorOnline()
  // For error handling within the redemption drawer.
  useEffect(() => {
    if (errorStatus) {
      setIsError(true)
      if (is404Error(errorStatus)) {
        setErrorObject(errorStates.NotFoundError)
      } else {
        setErrorObject(errorStates.ServiceUnavailable)
      }
    }
    // Handling no connection
    if (!isOnline) {
      setIsError(true)
      setErrorObject(errorStates.ServiceUnavailable)
    }
  }, [errorStatus, isOnline])

  return (
    <>
      <Flex
        position='relative'
        justifyContent='center'
        flexGrow={1}
        overflowX='hidden'
        width='100%'
        height='100%'
        minHeight={0}
        background={`${colorScheme}.500`}
      >
        <VStack
          zIndex={1}
          align='center'
          width='100%'
          paddingTop='16px'
          spacing={isShortDevice ? '24px' : '28px'}
        >
          <RedemptionPageHeader
            colorScheme={colorScheme}
            onBackClick={onBackClick}
            header={header}
          />
          <RedemptionPageMain
            qrCodeValue={qrCodeValue}
            vouchersValue={vouchersValue}
            vouchersState={vouchersState}
            campaign={campaign}
            lastRedeemedTimestamp={lastRedeemedTimestamp}
            transactionId={transactionId}
            merchantName={merchantName}
          />
        </VStack>
      </Flex>
      <AlreadyRedeemedModal
        isOpen={vouchersState === 'invalid'}
        onCloseClick={onBackClick}
      />
      <RedemptionErrorModal
        errorObject={errorObject}
        isOpen={isError}
        onCloseClick={onBackClick}
      />
    </>
  )
}

export default React.memo(RedemptionPage)
