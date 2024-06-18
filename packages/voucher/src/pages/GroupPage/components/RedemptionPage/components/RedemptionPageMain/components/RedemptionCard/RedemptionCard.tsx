import moment from 'moment-timezone'
import React from 'react'

import {ReactComponent as BxsCheckCircleDanger} from 'images/bxs-check-circle-danger.svg'

import {Center, Flex, HStack, Text} from '@chakra-ui/react'
import {useTranslation} from 'react-i18next'
import {Campaign} from 'types/campaign'
import QrCode from 'components/QrCode'
import {formatDateString} from 'helpers/date'
import {VouchersState} from 'types/voucher'

import CanvasWithImage from 'components/CanvasWithImage'
import RedemptionCardFooter from './RedemptionCardFooter'

import './RedemptionCard.scss'

type RedemptionCardProps = {
  vouchersValue: number
  vouchersState: VouchersState
  qrCodeValue: string
  lastRedeemedTimestamp?: moment.Moment
  transactionId?: string
  merchantName?: string
  campaign: Campaign
}

const RedemptionCard = ({
  vouchersState,
  vouchersValue,
  qrCodeValue,
  lastRedeemedTimestamp,
  transactionId,
  merchantName,
  campaign,
}: RedemptionCardProps) => {
  const {t} = useTranslation('redemption')
  const qrLogo = campaign.logoQrUrl
  return (
    /// TODO: Refactor to use chakra
    <div className={`redemption-card vouchers-state-${vouchersState}`}>
      <div className='redemption-card-top'>
        <Text textStyle='h3' color='neutral.800'>
          {t('instructions')}
        </Text>
        <HStack align='center' spacing='4px'>
          <Text textStyle='subhead1'>$</Text>
          <Text textStyle='display2'>{vouchersValue}</Text>
        </HStack>
      </div>
      <div className='redemption-card-border' />
      <div className='redemption-card-bottom'>
        <Flex
          position='relative'
          alignItems='center'
          justifyContent='center'
          flexGrow={1}
          width='100%'
          id='qrcode-reference-container'
        >
          {qrCodeValue && <QrCode code={qrCodeValue} />}
          {vouchersState === 'unused' && qrLogo && (
            <CanvasWithImage
              src={qrLogo}
              alt='qr logo'
              id='logo-for-qr-code'
              cssToUse='voucher-logo-overlay'
            />
          )}
          {vouchersState === 'redeemed' && (
            <div className='voucher-redeemed-stamp'>
              <div className='voucher-redeemed-stamp-top'>
                <div className='voucher-redeemed-stamp-top-line' />
                <BxsCheckCircleDanger />
                <div className='voucher-redeemed-stamp-top-line' />
              </div>
              <div className='voucher-redeemed-stamp-main'>
                <div className='voucher-redeemed-stamp-center-line' />
                <div className='voucher-redeemed-stamp-text-container'>
                  <div className='voucher-redeemed-stamp-text-title'>
                    {t('redeemed_stamp_label')}
                  </div>
                  <div className='voucher-redeemed-stamp-timestamp'>
                    {moment(lastRedeemedTimestamp).format('DD MMM YYYY h:mm a')}
                  </div>
                  {!!merchantName && (
                    <div className='voucher-redeemed-stamp-location'>
                      at {merchantName}
                    </div>
                  )}
                </div>
                <div className='voucher-redeemed-stamp-center-line' />
              </div>
              <div className='voucher-redeemed-stamp-bottom' />
            </div>
          )}
        </Flex>
        {vouchersState === 'redeemed' && (
          <Text
            textStyle='legal'
            color='neutral.700'
            textAlign='center'
            marginY='8px'
          >
            {transactionId}
          </Text>
        )}
        {vouchersState === 'unused' && !!campaign?.validityEnd && (
          <Text textStyle='legal' color='neutral.700' marginY='8px'>
            {t('use_by', {
              expiryDate: formatDateString(campaign.validityEnd),
            })}
          </Text>
        )}
      </div>
      {(!!campaign?.advisoryUrl || !!campaign?.tncUrl) &&
        vouchersState === 'unused' && (
          <Center marginTop='16px'>
            <RedemptionCardFooter
              campaignAdvisoryUrl={campaign.advisoryUrl}
              campaignTncUrl={campaign.tncUrl}
            />
          </Center>
        )}
    </div>
  )
}

export default React.memo(RedemptionCard)
