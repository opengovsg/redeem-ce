import {
  Link,
  Text,
  VStack,
  Center,
  Divider,
  HStack,
  Image,
} from '@chakra-ui/react'
import ViewTermsAndConditionsText from 'components/ViewTermsAndConditionsText'
import {formatContactNumberForDisplay} from 'helpers/contactNumber'
import {customMonitorClick} from 'helpers/monitoring'
import {Trans, useTranslation} from 'react-i18next'
import {BiBuildings, BiMessageSquareDetail, BiPhone} from 'react-icons/bi'
import HelpInfoEntry from './components/HelpInfoEntry'

import questionMarkSvg from 'images/question-mark.svg'

type OrganiserContactSectionProps = {
  campaignOrganiserName?: string | null
  campaignOrganiserLocation?: string | null
  campaignOrganiserContactNumber?: string | null
  campaignOrganiserFeedbackUrl?: string | null
  campaignTncUrl?: string | null
  backgroundColor: string
}

const OrganiserContactSection = ({
  campaignOrganiserName,
  campaignOrganiserLocation,
  campaignOrganiserContactNumber,
  campaignOrganiserFeedbackUrl,
  campaignTncUrl,
  backgroundColor,
}: OrganiserContactSectionProps) => {
  const {t} = useTranslation('infoAndHelp', {keyPrefix: 'contact'})
  return (
    <VStack
      align='stretch'
      justifyContent='space-between'
      flexGrow={1}
      height='100%'
      padding={backgroundColor === 'white' ? '32px 24px' : '8px 0 0 0'}
      background={backgroundColor}
      dropShadow='var(--chakra-shadows-small)'
      id='organiser-contact-section'
      spacing='24px'
    >
      <VStack align='start' spacing='16px'>
        <HStack spacing='12px'>
          <Image
            width='16px'
            height='16px'
            alt='question-mark'
            src={questionMarkSvg}
          />
          <Text textStyle='h4' color='primary.700'>
            {t('title')}
          </Text>
        </HStack>
        <VStack align='start' width='100%' spacing='8px'>
          <Text
            textStyle='subhead2'
            color='neutral.800'
            textTransform='capitalize'
          >
            {campaignOrganiserName || 'Campaign Organiser'}
          </Text>
          <VStack
            textStyle='body2'
            align='flex-start'
            color='neutral.800'
            spacing='12px'
          >
            {!!campaignOrganiserFeedbackUrl && (
              <HelpInfoEntry icon={BiMessageSquareDetail}>
                <Text textStyle='body2' color='neutral.800'>
                  <Trans t={t} i18nKey={'link'}>
                    Submit a feedback form
                    <Link
                      textStyle='subhead2'
                      color='primary.700'
                      textDecoration='underline'
                      href={campaignOrganiserFeedbackUrl}
                      isExternal
                      onClick={() =>
                        customMonitorClick('Submit enquiry to organiser button')
                      }
                    >
                      here
                    </Link>
                  </Trans>
                </Text>
              </HelpInfoEntry>
            )}
            {!!campaignOrganiserContactNumber && (
              <HelpInfoEntry icon={BiPhone}>
                <Text textStyle='body2' color='neutral.800'>
                  <Trans t={t} i18nKey='call'>
                    Call
                    <Link
                      textStyle='subhead2'
                      color='primary.700'
                      textDecoration='underline'
                      href={`tel:+${campaignOrganiserContactNumber}`}
                      onClick={() =>
                        customMonitorClick(
                          'Call organiser contact number button',
                        )
                      }
                    >
                      {formatContactNumberForDisplay(
                        campaignOrganiserContactNumber,
                      )}
                    </Link>
                  </Trans>
                </Text>
              </HelpInfoEntry>
            )}
            {!!campaignOrganiserLocation && (
              <HelpInfoEntry icon={BiBuildings}>
                <Text textStyle='body2' color='neutral.800'>
                  {campaignOrganiserLocation}
                </Text>
              </HelpInfoEntry>
            )}
          </VStack>
        </VStack>
      </VStack>
      {!!campaignTncUrl && (
        <Center>
          <VStack width='100%' spacing='24px'>
            <Divider borderColor='neutral.300' />
            <ViewTermsAndConditionsText campaignTncUrl={campaignTncUrl} />
          </VStack>
        </Center>
      )}
    </VStack>
  )
}

export default OrganiserContactSection
