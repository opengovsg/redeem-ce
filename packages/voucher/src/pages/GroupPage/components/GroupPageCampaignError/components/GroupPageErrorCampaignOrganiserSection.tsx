import React from 'react'

import {Button} from '@chakra-ui/react'
import OrganiserContactSection from '../../OrganiserContactSection'

type GroupPageErrorCampaignOrganiserDrawerProps = {
  campaignOrganiserName?: string | null
  campaignOrganiserLocation?: string | null
  campaignOrganiserContactNumber?: string | null
  campaignOrganiserFeedbackUrl?: string | null
  setIsOrganiserContactSectionOpen: (newVal: boolean) => void
}

function GroupPageErrorCampaignOrganiserSection({
  campaignOrganiserName,
  campaignOrganiserLocation,
  campaignOrganiserContactNumber,
  campaignOrganiserFeedbackUrl,
  setIsOrganiserContactSectionOpen,
}: GroupPageErrorCampaignOrganiserDrawerProps) {
  return (
    <>
      <OrganiserContactSection
        campaignOrganiserName={campaignOrganiserName}
        campaignOrganiserLocation={campaignOrganiserLocation}
        campaignOrganiserContactNumber={campaignOrganiserContactNumber}
        campaignOrganiserFeedbackUrl={campaignOrganiserFeedbackUrl}
        backgroundColor='neutral.100'
      />
      <Button
        padding='16px'
        background='primary.500'
        border='1px'
        borderColor='primary.500'
        borderRadius='4px'
        id='organiser-contact-section-close-button'
        onClick={() => {
          setIsOrganiserContactSectionOpen(false)
        }}
      >
        Close
      </Button>
    </>
  )
}

export default GroupPageErrorCampaignOrganiserSection
