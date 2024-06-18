import {Divider, HStack, Text, Link} from '@chakra-ui/react'
import {DDAction} from 'constants/datadog'
import {customMonitorClick} from 'helpers/monitoring'
import {useTranslation} from 'react-i18next'

type RedemptionCardFooterProps = {
  campaignTncUrl?: string | null
  campaignAdvisoryUrl?: string | null
}

const RedemptionCardFooter = ({
  campaignAdvisoryUrl,
  campaignTncUrl,
}: RedemptionCardFooterProps) => {
  const {t} = useTranslation('redemption', {keyPrefix: 'footer'})

  return (
    <HStack
      textStyle='legal'
      height='100%'
      textAlign='center'
      divider={
        <Divider
          height='100%'
          borderColor='neutral.300'
          orientation='vertical'
        />
      }
      spacing='20px'
    >
      {!!campaignTncUrl && (
        <Text>
          <Link
            color='primary.500'
            href={campaignTncUrl}
            isExternal
            onClick={() => {
              customMonitorClick(DDAction.VIEW_TERMS_AND_CONDITIONS_BUTTON)
            }}
          >
            {t('terms_and_conditions')}
          </Link>
        </Text>
      )}
      {!!campaignAdvisoryUrl && (
        <Text>
          <Link
            color='primary.500'
            href={campaignAdvisoryUrl}
            isExternal
            onClick={() => {
              customMonitorClick(DDAction.GENERAL_INFO_BUTTON)
            }}
          >
            {t('general_info')}
          </Link>
        </Text>
      )}
    </HStack>
  )
}

export default RedemptionCardFooter
