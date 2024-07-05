import React, { useState } from 'react'

import { useAuthenticationState } from 'data/Authentication'
import useCampaigns, { useCreateCampaign } from 'hooks/Campaigns'
import Request from 'constants/request'

import { useToast } from 'data/Toasts'

import Campaigns from './Campaigns'

function CampaignsContainer() {
  const { toastError } = useToast()
  const { fetchPermissions } = useAuthenticationState()
  const {
    campaigns,
    fetchCampaignsStatus,
    isFetchingCampaigns,
    fetchCampaignsError,
  } = useCampaigns()
  const [isCreateCampaignModalOpen, setIsCreateCampaignModalOpen] =
    useState(false)
  const { createCampaign, createCampaignStatus } = useCreateCampaign()

  return (
    <Campaigns
      campaigns={campaigns}
      isCreateCampaignModalOpen={isCreateCampaignModalOpen}
      onClickCreateCampaign={() => {
        setIsCreateCampaignModalOpen(true)
      }}
      closeCreateCampaign={() => {
        setIsCreateCampaignModalOpen(false)
      }}
      submitCreateCampaign={(params) =>
        // Make create campaign call
        // Close the modal on success and use toast to display errors
        createCampaign(params)
          .then(() => setIsCreateCampaignModalOpen(false))
          .then(fetchPermissions)
          .catch((error) => toastError(error))
      }
      isCreatingCampaign={createCampaignStatus === Request.LOADING}
      fetchCampaignsStatus={fetchCampaignsStatus}
      isFetchingCampaigns={isFetchingCampaigns}
      fetchCampaignsError={fetchCampaignsError}
    />
  )
}

export default CampaignsContainer
