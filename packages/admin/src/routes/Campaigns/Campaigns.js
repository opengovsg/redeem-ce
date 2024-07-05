import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Request from 'constants/request'
import AppHeader from 'components/AppHeader'
import NoCampaignsCard from './components/NoCampaignsCard'
import WelcomeCard from './components/WelcomeCard'
import ListCampaignsCard from './components/ListCampaignsCard'
import CreateCampaignModal from './components/CreateCampaignModal'

function Campaigns({
  campaigns,
  isCreateCampaignModalOpen,
  onClickCreateCampaign,
  closeCreateCampaign,
  submitCreateCampaign,
  isCreatingCampaign,
  fetchCampaignsStatus,
  // This prop is used to show state for even refetches
  // eslint-disable-next-line no-unused-vars
  fetchCampaignsError,
}) {
  return (
    <>
      <AppHeader />
      <div id="campaigns-page-container">
        <WelcomeCard />
        {fetchCampaignsStatus === Request.SUCCESS && (
          <>
            {_.isEmpty(campaigns) && (
              <NoCampaignsCard onClickCreateCampaign={onClickCreateCampaign} />
            )}
            {!_.isEmpty(campaigns) && (
              <ListCampaignsCard
                campaigns={campaigns}
                onClickCreateCampaign={onClickCreateCampaign}
              />
            )}
          </>
        )}
        {fetchCampaignsStatus === Request.LOADING && (
          <div className="container"> </div>
        )}
        {fetchCampaignsStatus === Request.ERROR && (
          <div> {`Errored: ${fetchCampaignsError.message}`} </div>
        )}
        <CreateCampaignModal
          isOpen={isCreateCampaignModalOpen}
          onPrimaryClick={submitCreateCampaign}
          isPrimaryLoading={isCreatingCampaign}
          onCloseClick={closeCreateCampaign}
        />
      </div>
    </>
  )
}

export default Campaigns

Campaigns.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  campaigns: PropTypes.arrayOf(PropTypes.object).isRequired,
  isCreateCampaignModalOpen: PropTypes.bool.isRequired,
  onClickCreateCampaign: PropTypes.func.isRequired,
  closeCreateCampaign: PropTypes.func.isRequired,
  submitCreateCampaign: PropTypes.func.isRequired,
  isCreatingCampaign: PropTypes.bool.isRequired,
  fetchCampaignsStatus: PropTypes.string.isRequired,
  // Disable next line as it's for object of error
  // eslint-disable-next-line react/forbid-prop-types
  fetchCampaignsError: PropTypes.object,
}
