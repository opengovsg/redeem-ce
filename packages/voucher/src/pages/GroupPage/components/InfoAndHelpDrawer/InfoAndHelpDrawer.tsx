import React from 'react'
import {useTranslation} from 'react-i18next'
import {
  DrawerBody,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  VStack,
} from '@chakra-ui/react'
import OrganiserContactSection from '../OrganiserContactSection'
import DrawerHeaderWithCloseButton from '../DrawerHeaderWithCloseButton'
import HowToSection from './components/HowToSection'

type HelpDrawerProps = {
  isOpen: boolean
  onClickCopy?: () => void
  onCloseClick: () => void
  campaignAdvisoryUrl?: string | null
  campaignOrganiserName?: string | null
  campaignMerchantListUrl?: string | null
  campaignOrganiserFeedbackUrl?: string | null
  campaignOrganiserLocation?: string | null
  campaignOrganiserContactNumber?: string | null
  campaignTncUrl?: string | null
}

function InfoAndHelpDrawer({
  isOpen,
  onClickCopy,
  onCloseClick,
  campaignOrganiserName,
  campaignOrganiserFeedbackUrl,
  campaignOrganiserLocation,
  campaignOrganiserContactNumber,
  campaignAdvisoryUrl,
  campaignTncUrl,
}: HelpDrawerProps) {
  const {t} = useTranslation('infoAndHelp', {
    keyPrefix: 'info_and_help',
  })

  return (
    // TODO: Consider useMultiStyleConfig
    <Drawer isOpen={isOpen} onClose={onCloseClick} placement='bottom'>
      <DrawerOverlay />
      <DrawerContent overflow='auto' height='90%' background='primary.100'>
        {/* We want this drawer header to be sticky, so we have it ontop of DrawerBody. */}
        <DrawerHeaderWithCloseButton
          title={t('title')}
          backgroundColor='primary.100'
          closeActiveColor='primary.200'
          onCloseClick={onCloseClick}
          closeButtonId='info-and-help-close-button'
        />
        {/* DrawerBody comes with auto padding of 24px on top and bottom which we don't want. */}
        <DrawerBody paddingY='0'>
          <VStack
            align='stretch'
            maxWidth='512px'
            height='100%'
            margin='0 auto'
            spacing='0'
          >
            <HowToSection
              onClickCopy={onClickCopy}
              campaignAdvisoryUrl={campaignAdvisoryUrl}
            />
            <OrganiserContactSection
              campaignOrganiserName={campaignOrganiserName}
              campaignOrganiserLocation={campaignOrganiserLocation}
              campaignOrganiserContactNumber={campaignOrganiserContactNumber}
              campaignOrganiserFeedbackUrl={campaignOrganiserFeedbackUrl}
              campaignTncUrl={campaignTncUrl}
              backgroundColor='white'
            />
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default React.memo(InfoAndHelpDrawer)
