import React from 'react'
import {VStack, Text} from '@chakra-ui/react'
import {VoucherColorScheme} from 'types/voucher'
import {getTextColorForColorScheme} from 'helpers/vouchers'
import {useTranslation} from 'react-i18next'
import BackButton from 'pages/GroupPage/components/BackButton'
import WhereToUseButton from 'pages/GroupPage/components/WhereToUseButton'
import {useIsShortDeviceInitial} from 'helpers/hooks'
import {DDAction} from 'constants/datadog'

type VoucherTypeSelectVouchersHeaderProps = {
  campaignMerchantListUrl?: string
  colorScheme: VoucherColorScheme
  header: string
  onBackClick: () => void
}

const VoucherTypeSelectVouchersHeader = ({
  campaignMerchantListUrl,
  colorScheme,
  header,
  onBackClick,
}: VoucherTypeSelectVouchersHeaderProps) => {
  const {t} = useTranslation('voucherTypeSelectVouchers')
  const isShortDevice = useIsShortDeviceInitial()

  return (
    <VStack
      align='start'
      width='100%'
      maxWidth='512px'
      paddingTop={0}
      color={getTextColorForColorScheme(colorScheme)}
      paddingX='16px'
      spacing={0}
    >
      <BackButton
        activeHoverColor={`${colorScheme}.600`}
        color='currentColor'
        id='voucher-types-select-vouchers-back-button'
        onBackClick={onBackClick}
        text={t('back')}
      />
      <VStack
        align='flex-start'
        paddingTop='12px'
        paddingLeft='8px'
        spacing='16px'
      >
        <Text textStyle={isShortDevice ? 'h4' : 'h3'}>{header}</Text>
        {!!campaignMerchantListUrl && (
          <WhereToUseButton
            campaignMerchantListUrl={campaignMerchantListUrl}
            datadogActionName={DDAction.VOUCHER_TYPES_WHERE_TO_USE_BUTTON}
            id='voucher-types-where-to-use-button'
            colorScheme={colorScheme}
          />
        )}
      </VStack>
    </VStack>
  )
}

export default VoucherTypeSelectVouchersHeader
