import {Trans, useTranslation} from 'react-i18next'

import {Link, Text} from '@chakra-ui/react'
import {customMonitorClick} from 'helpers/monitoring'
import {DDAction} from 'constants/datadog'

interface ContactFooterProps {
  campaignTncUrl: string
}

const ViewTermsAndConditionsText = ({campaignTncUrl}: ContactFooterProps) => {
  const {t} = useTranslation('main', {keyPrefix: 'footer'})

  return (
    <Text textStyle='caption2' color='neutral.800' textAlign='center'>
      <Trans t={t} i18nKey='view_terms_and_conditions'>
        View
        <Link
          color='primary.500'
          textDecoration='none'
          href={campaignTncUrl}
          isExternal
          onClick={() => {
            customMonitorClick(DDAction.VIEW_TERMS_AND_CONDITIONS_BUTTON)
          }}
        >
          terms and conditions
        </Link>
      </Trans>
    </Text>
  )
}

export default ViewTermsAndConditionsText
