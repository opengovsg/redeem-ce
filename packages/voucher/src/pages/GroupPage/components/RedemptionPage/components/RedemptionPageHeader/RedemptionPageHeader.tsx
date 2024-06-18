import {VStack, Text} from '@chakra-ui/react'
import {getTextColorForColorScheme} from 'helpers/vouchers'
import React from 'react'
import BackButton from 'pages/GroupPage/components/BackButton'
import {useTranslation} from 'react-i18next'
import {VoucherColorScheme} from 'types/voucher'
import {useIsShortDeviceInitial} from 'helpers/hooks'

type RedemptionPageHeaderProps = {
  colorScheme: VoucherColorScheme
  onBackClick: () => void
  header?: string
}

const RedemptionPageHeader = ({
  colorScheme,
  onBackClick,
  header,
}: RedemptionPageHeaderProps) => {
  const {t} = useTranslation('redemption')
  const isShortDevice = useIsShortDeviceInitial()

  return (
    <VStack
      align='start'
      width='100%'
      maxWidth='512px'
      color={getTextColorForColorScheme(colorScheme)}
      paddingX='16px'
      spacing={0}
    >
      <BackButton
        activeHoverColor={`${colorScheme}.600`}
        color='currentColor'
        id='redemption-page-back-button'
        onBackClick={onBackClick}
        text={t('back')}
      />
      <Text
        textStyle={isShortDevice ? 'h4' : 'h3'}
        paddingTop='12px'
        paddingLeft='8px'
      >
        {header}
      </Text>
    </VStack>
  )
}

export default React.memo(RedemptionPageHeader)
