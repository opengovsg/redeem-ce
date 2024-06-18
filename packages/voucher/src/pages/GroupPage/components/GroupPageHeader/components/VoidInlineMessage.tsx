import React from 'react'
import {useTranslation, Trans} from 'react-i18next'
import InlineMessage from 'components/InlineMessage'
import {Box, Link} from '@chakra-ui/react'

// TODO: Fix message for cases where organiser has no feedback URL.
const TO_FIX_FALLBACK_VOID_SUPPORT_URL = '/'

interface VoidInlineMessageProps {
  campaignOrganiserFeedbackUrl: string | null
}

const VoidInlineMessage = ({
  campaignOrganiserFeedbackUrl,
}: VoidInlineMessageProps) => {
  const {t} = useTranslation('alerts', {keyPrefix: 'voided'})
  return (
    /* TODO: Once InlineMessage is confirmed not to be used for anything else
    modify InlineMessage styling directly instead of having a parent container with paddingTop */
    <Box paddingTop='16px'>
      <InlineMessage isHidden={false}>
        <Trans t={t} i18nKey='header'>
          Your vouchers have been void. To find out why, contact the organiser{' '}
          <Link
            href={
              campaignOrganiserFeedbackUrl || TO_FIX_FALLBACK_VOID_SUPPORT_URL
            }
            variant={'underline'}
          >
            here
          </Link>
          .
        </Trans>
      </InlineMessage>
    </Box>
  )
}

export default VoidInlineMessage
