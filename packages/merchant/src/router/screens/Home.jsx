import React, { useEffect, useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import moment from 'moment-timezone'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'

import ScannerContainer from 'components/scanner'
import TitleValueCard from 'components/shared/TitleValueCard'
import MainHeader from 'components/shared/MainHeader'
import SuccessModal from 'components/modals/SuccessModal'
import TemplatedText from 'components/shared/TemplatedText'

import useRedeemVouchers from 'hooks/Vouchers'
import { useTransactionsTotal } from 'hooks/Transactions'
import useSession from 'hooks/Session'
import { getFailedRedemptionHeaderAndMessage } from 'helpers/errors'

import BREAKPOINTS from 'constants/breakpoints'
import { useLocation } from 'react-router-dom'
import ScanResultModal from 'components/modals/ScanResultModal'
import CurrencyDisplay from 'components/shared/CurrencyDisplay'
import IconTextRow, { ICON_TYPE } from 'components/shared/IconTextRow'
import FORMAT from 'constants/format'
import I18N_KEYS from 'constants/i18n-keys'

const Home = () => {
  // show modal if recently onboarded
  const location = useLocation()
  const [showOnboardingMessage, setShowOnboardingMessage] = useState(false)
  useEffect(() => {
    if (location.state?.justOnboardedMerchant) setShowOnboardingMessage(true)
  }, [])

  // ui
  const COMMON_TEXT = I18N_KEYS.COMMON.TEXT
  const HOME_TEXT = I18N_KEYS.HOME.TEXT
  const { t: tCommon } = useTranslation(I18N_KEYS.COMMON.KEY)
  const { t: tHome } = useTranslation(I18N_KEYS.HOME.KEY)

  const [voucherSum, setVoucherSum] = useState()
  const [voucherTimestamp, setVoucherTimestamp] = useState()
  const [transactionId, setTransactionId] = useState()
  const [showRedemptionResult, setShowRedemptionResult] = useState(false)
  const [redemptionError, setRedemptionError] = useState(null)

  // voucher redemption logic
  const { redeemVouchers } = useRedeemVouchers()
  const { fetchTransactionsTotal, merchantTotalForCurrentDate } =
    useTransactionsTotal()
  const {
    session: { userName, merchantName },
  } = useSession()

  const onQrScan = async (scannedQr) => {
    try {
      const idempotencyKey = crypto.randomUUID()
      const { vouchers: vouchersRedeemed, transaction } = await redeemVouchers(
        { qr: scannedQr, idempotencyKey },
        {
          onSuccess: fetchTransactionsTotal,
        },
      )
      // update voucher sum
      setVoucherSum(
        _.reduce(
          vouchersRedeemed,
          (sum, voucher) => sum + voucher?.voucherValue,
          0,
        ),
      )
      // set timestamp for redemption
      setVoucherTimestamp(_.get(_.head(vouchersRedeemed), 'timestamp'))
      // update transaction id
      setTransactionId(_.get(transaction, 'id').replace('transaction_', ''))
      setRedemptionError(null)
    } catch (error) {
      const { headerText, message } = getFailedRedemptionHeaderAndMessage(error)
      setRedemptionError({ headerText, message })
    } finally {
      // show scan modal
      setShowRedemptionResult(true)
    }
  }

  return (
    <>
      <MainHeader
        headerText={tHome(HOME_TEXT.HEADER)}
        bgOverlapSize={12}
        merchantName={merchantName}
        userName={userName}
      />
      <Flex
        h='100%'
        paddingX={BREAKPOINTS.HORIZONTAL_RESPONSIVE.PADDING_X}
        flexDir='column'
      >
        <TitleValueCard
          title={tHome(HOME_TEXT.HEADER_CARD_LABEL)}
          value={merchantTotalForCurrentDate}
        />
        <ScannerContainer onScan={onQrScan} />
        <SuccessModal
          isOpen={showOnboardingMessage}
          onClose={() => setShowOnboardingMessage(false)}
        >
          <TemplatedText
            style={{ marginBottom: 2, textStyle: 'subhead-1' }}
            variables={{ merchantName }}
          >
            {tCommon(COMMON_TEXT.JOIN_SUCCESS_TEXT)}
          </TemplatedText>
        </SuccessModal>
        <ScanResultModal
          isOpen={showRedemptionResult}
          onClose={() => setShowRedemptionResult(false)}
          errorTitle={
            redemptionError ? tCommon(redemptionError?.headerText) : null
          }
        >
          {redemptionError ? (
            <Text
              textStyle='body-1'
              textAlign='left'
            >
              {tCommon(redemptionError?.message)}
            </Text>
          ) : (
            <Flex
              flexDir='column'
              alignItems='center'
              gap={6}
            >
              <CurrencyDisplay
                signSize={24}
                valueSize={64}
                value={voucherSum}
                style={{
                  marginLeft: -6,
                  marginTop: 2,
                }}
              />
              <Flex
                flexDir='column'
                gap={1}
              >
                <IconTextRow
                  iconType={ICON_TYPE.VOUCHER}
                  text={transactionId ?? ''}
                  fontSize={10}
                />
                <IconTextRow
                  iconType={ICON_TYPE.CALENDAR}
                  text={moment(voucherTimestamp).format(
                    FORMAT.TIMESTAMP.SCAN_RESULT,
                  )}
                  fontSize={10}
                />
              </Flex>
            </Flex>
          )}
        </ScanResultModal>
      </Flex>
    </>
  )
}

export default Home
