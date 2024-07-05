import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import CreateCampaignModal from './CreateCampaignModal'

export default function CreateCampaignModalContainer({
  isOpen,
  onPrimaryClick,
  isPrimaryLoading,
  onCloseClick,
}) {
  const [campaignName, setCampaignName] = useState('')
  const [campaignDescription, setCampaignDescription] = useState('')
  const [campaignOrganiserName, setCampaignOrganiserName] = useState('')
  const [campaignOrganiserEmail, setCampaignOrganiserEmail] = useState('')
  const [campaignOrganiserLocation, setCampaignOrganiserLocation] = useState('')
  const [campaignAdvisoryUrl, setCampaignAdvisoryUrl] = useState('')

  const resetForm = () => {
    setCampaignName('')
    setCampaignDescription('')
    setCampaignOrganiserName('')
    setCampaignOrganiserEmail('')
    setCampaignAdvisoryUrl('')
    setCampaignOrganiserLocation('')
  }

  // Every time the modal opens or closes, reset the form data
  useEffect(() => resetForm(), [isOpen])

  return (
    <CreateCampaignModal
      isOpen={isOpen}
      onPrimaryClick={() =>
        onPrimaryClick({
          campaignName,
          campaignDescription,
          campaignOrganiserName,
          campaignOrganiserEmail,
          campaignAdvisoryUrl,
          campaignOrganiserLocation,
        })
      }
      isPrimaryLoading={isPrimaryLoading}
      onCloseClick={onCloseClick}
      // Create campaign form data
      campaignName={campaignName}
      campaignDescription={campaignDescription}
      campaignOrganiserName={campaignOrganiserName}
      campaignOrganiserEmail={campaignOrganiserEmail}
      campaignAdvisoryUrl={campaignAdvisoryUrl}
      campaignOrganiserLocation={campaignOrganiserLocation}
      setCampaignName={setCampaignName}
      setCampaignDescription={setCampaignDescription}
      setCampaignOrganiserName={setCampaignOrganiserName}
      setCampaignOrganiserEmail={setCampaignOrganiserEmail}
      setCampaignAdvisoryUrl={setCampaignAdvisoryUrl}
      setCampaignOrganiserLocation={setCampaignOrganiserLocation}
    />
  )
}

CreateCampaignModalContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onPrimaryClick: PropTypes.func.isRequired,
  isPrimaryLoading: PropTypes.bool.isRequired,
  onCloseClick: PropTypes.func.isRequired,
}
