import React, {useState} from 'react'

import {VStack, Flex} from '@chakra-ui/react'
import {Campaign} from 'types/campaign'
import GroupPageCampaignErrorComponent from './components/GroupPageCampaignErrorComponent'
import GroupPageCampaignErrorOrganiserSection from './components/GroupPageErrorCampaignOrganiserSection'

type GroupPageCampaignErrorProps = {
  campaign: Campaign
}

function GroupPageCampaignError({campaign}: GroupPageCampaignErrorProps) {
  const [isOrganiserContactSectionOpen, setIsOrganiserContactSectionOpen] =
    useState(false)

  return (
    <Flex
      alignItems='flex-start'
      justifyContent='center'
      flexGrow={1}
      width='100vw'
      padding={0}
      borderTopRadius='16px'
      backgroundColor='neutral.100'
    >
      <VStack
        align='stretch'
        justify='space-between'
        width='100%'
        maxWidth='512px'
        height='100%'
        padding='24px 24px'
      >
        {isOrganiserContactSectionOpen ? (
          <GroupPageCampaignErrorOrganiserSection
            campaignOrganiserName={campaign.organiserName}
            campaignOrganiserLocation={campaign.organiserLocation}
            campaignOrganiserContactNumber={campaign.organiserContactNumber}
            campaignOrganiserFeedbackUrl={campaign.organiserFeedbackUrl}
            setIsOrganiserContactSectionOpen={setIsOrganiserContactSectionOpen}
          />
        ) : (
          <GroupPageCampaignErrorComponent
            campaign={campaign}
            setIsOrganiserContactSectionOpen={setIsOrganiserContactSectionOpen}
          />
        )}
      </VStack>
    </Flex>
  )
}

export default GroupPageCampaignError
