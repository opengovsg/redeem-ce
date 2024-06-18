import React from 'react'
import WarningIcon from 'images/warning-icon.svg'

import {useTranslation, Trans} from 'react-i18next'
import {VStack, Image, Text} from '@chakra-ui/react'
import {customMonitorClick} from 'helpers/monitoring'
import {formatDateString} from 'helpers/date'
import {Campaign, CampaignValidity} from 'types/campaign'

type ValidityTranslationKey = 'inactive' | 'expired'

function getValidityTranslationKey(
  campaignValidity: CampaignValidity,
): ValidityTranslationKey {
  switch (campaignValidity) {
    case 'campaign_not_started':
      return 'inactive'
    case 'campaign_ended':
      return 'expired'
    // Should not ever reach here.
    default:
      return 'inactive'
  }
}

type GroupPageCampaignErrorComponentProps = {
  campaign: Campaign
  setIsOrganiserContactSectionOpen: (newVal: boolean) => void
}

function GroupPageCampaignErrorComponent({
  campaign,
  setIsOrganiserContactSectionOpen,
}: GroupPageCampaignErrorComponentProps) {
  const validityTranslationKey = getValidityTranslationKey(campaign.validity)
  const expiryDate = formatDateString(campaign.validityEnd)
  const {t} = useTranslation('campaignErrors', {
    keyPrefix: validityTranslationKey,
  })

  const campaignName = campaign.name

  return (
    <>
      <VStack spacing='24px'>
        <VStack spacing='12px'>
          <Image
            maxWidth='63px'
            maxHeight='56px'
            alt='Warning Icon'
            src={WarningIcon}
          />
          <Text textStyle='h3' color='neutral.800'>
            {t('header')}
          </Text>
        </VStack>
        <Text textStyle='body1' textColor='neutral.800'>
          {campaign.validity === 'campaign_ended' ? (
            <Text as='span' textStyle='subhead1'>
              {campaignName}{' '}
            </Text>
          ) : null}
          <Trans i18nKey='body' t={t}>
            {campaign.validity === 'campaign_ended' ? (
              <>
                cannot be used as they expired on
                {{expiryDate}}. For more help, please
              </>
            ) : (
              <>
                The voucher(s) cannot be used as campaign is not active. For
                more help, please
              </>
            )}
            <Text
              as='span'
              color='primary.500'
              fontWeight='500'
              textDecoration='underline'
              cursor='pointer'
              id='contact-organiser-text'
              onClick={() => {
                customMonitorClick('Call organiser contact number button')
                setIsOrganiserContactSectionOpen(true)
              }}
            >
              contact the organiser
            </Text>
            .
          </Trans>
        </Text>
      </VStack>
    </>
  )
}

export default GroupPageCampaignErrorComponent
