import {Icon, VStack} from '@chakra-ui/react'
import {useTranslation} from 'react-i18next'
import {customMonitorClick} from 'helpers/monitoring'
import {REDEEM_CONSTANTS} from 'constants/config'
import HelpLearnMoreButton from './components/HelpLearnMoreButton'

import {BiChevronRight} from 'react-icons/bi'
import {DDAction} from 'constants/datadog'

type HowToSectionProps = {
  onClickCopy?: () => void
  campaignAdvisoryUrl?: string | null
}

// TODO: Ask about how to pass translation object down from HelpDrawer here.
const HowToSection = ({
  onClickCopy,
  campaignAdvisoryUrl,
}: HowToSectionProps) => {
  const {t} = useTranslation('infoAndHelp', {
    keyPrefix: 'info_and_help',
  })

  return (
    <VStack align='stretch' paddingBottom='32px' paddingX='16px' spacing='16px'>
      {!!campaignAdvisoryUrl && (
        <HelpLearnMoreButton
          title={t('general_info_button.title')}
          description={t('general_info_button.desc')}
          onClick={() => {
            customMonitorClick(DDAction.GENERAL_INFO_BUTTON)
          }}
          icon={
            <Icon
              as={BiChevronRight}
              width='24px'
              height='24px'
              color='neutral.600'
            />
          }
          id='info-and-help-general-info-button'
          href={campaignAdvisoryUrl}
        />
      )}

      {/* Render the share vouchers button for generic campaign when onClickCopy is passed into this component as a prop. 
          TODO: Find a better way to do this. */}
      {onClickCopy && (
        <HelpLearnMoreButton
          title={t('share_vouchers_button.title')}
          description={t('share_vouchers_button.desc')}
          onClick={() => {
            customMonitorClick('Share vouchers how to button')
            onClickCopy()
          }}
          icon={
            <Icon
              as={BiChevronRight}
              width='24px'
              height='24px'
              color='neutral.600'
            />
          }
          id='info-and-help-share-vouchers-button'
        />
      )}
      <HelpLearnMoreButton
        title={t('give_feedback_button.title')}
        description={t('give_feedback_button.desc')}
        onClick={() => {
          customMonitorClick('Give feedback how to button')
        }}
        icon={
          <Icon
            as={BiChevronRight}
            width='24px'
            height='24px'
            color='neutral.600'
          />
        }
        id='info-and-help-give-feedback-button'
        href={REDEEM_CONSTANTS.feedbackPage}
      />
    </VStack>
  )
}

export default HowToSection
