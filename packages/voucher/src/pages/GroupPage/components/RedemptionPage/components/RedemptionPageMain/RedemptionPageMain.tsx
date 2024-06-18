import React from 'react'
import moment from 'moment-timezone'
import {VStack} from '@chakra-ui/react'
import {VouchersState} from 'types/voucher'
import {Campaign} from 'types/campaign'
import RedemptionCard from './components/RedemptionCard'

type RedemptionPageMainProps = {
  qrCodeValue: string
  vouchersValue: number
  vouchersState: VouchersState
  lastRedeemedTimestamp?: moment.Moment
  transactionId?: string
  merchantName?: string
  campaign: Campaign
}

const RedemptionPageMain = ({
  qrCodeValue,
  vouchersValue,
  vouchersState,
  campaign,
  lastRedeemedTimestamp,
  transactionId,
  merchantName,
}: RedemptionPageMainProps) => {
  return (
    <VStack
      alignItems='center'
      flexGrow={1}
      alignSelf='stretch'
      padding='24px'
      borderTopRadius='16px'
      backgroundColor='neutral.100'
    >
      <VStack
        position='relative'
        alignItems='stretch'
        flexGrow={1}
        width='100%'
        maxWidth='512px'
        minHeight={0}
        spacing='24px'
      >
        <RedemptionCard
          qrCodeValue={qrCodeValue}
          vouchersValue={vouchersValue}
          vouchersState={vouchersState}
          campaign={campaign}
          lastRedeemedTimestamp={lastRedeemedTimestamp}
          transactionId={transactionId}
          merchantName={merchantName}
        />
      </VStack>
    </VStack>
  )
}

export default React.memo(RedemptionPageMain)
