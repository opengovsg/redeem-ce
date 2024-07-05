import React from 'react'
import PropTypes from 'prop-types'

import Modal from 'components/Modal'
import Input from 'components/Input'

// View settings for create campaign form

const FORM = {
  CAMPAIGN_NAME: {
    ID: 'campaign-name-input',
    DISPLAY: 'Campaign Name',
    MAX_LENGTH: 50,
    PLACEHOLDER: 'Energy Saving Vouchers',
    TYPE: 'text',
    REQUIRED: true,
  },
  CAMPAIGN_DESCRIPTION: {
    ID: 'campaign-description-input',
    DISPLAY: 'Description',
    MAX_LENGTH: 100,
    PLACEHOLDER: 'For energy saving campaign',
    TYPE: 'text',
    REQUIRED: true,
  },
  CAMPAIGN_ORGANISER_NAME: {
    ID: 'campaign-organiser-name-input',
    DISPLAY: 'Organiser Name',
    MAX_LENGTH: 30,
    PLACEHOLDER: 'A Government Agency',
    TYPE: 'text',
    REQUIRED: true,
  },
  CAMPAIGN_ORGANISER_EMAIL: {
    ID: 'campaign-organiser-email-input',
    DISPLAY: 'Organiser Email',
    MAX_LENGTH: 50,
    PLACEHOLDER: 'example@agency.gov.sg',
    TYPE: 'email',
    REQUIRED: false,
  },
  CAMPAIGN_ADVISORY_URL: {
    ID: 'campaign-advisory-url-input',
    DISPLAY: 'Advisory URL',
    MAX_LENGTH: 2048,
    PLACEHOLDER: 'https://example.gov.sg/advisory',
    TYPE: 'url',
    REQUIRED: false,
  },
  CAMPAIGN_LOGO_URL: {
    ID: 'campaign-logo-url-input',
    DISPLAY: 'Logo URL',
    MAX_LENGTH: 2048,
    PLACEHOLDER: 'https://example.gov.sg/logo.svg',
    TYPE: 'url',
    REQUIRED: false,
  },
  CAMPAIGN_ORGANISER_LOCATION: {
    ID: 'campaign-organiser-name-input',
    DISPLAY: 'Organiser Location',
    MAX_LENGTH: 300,
    PLACEHOLDER: 'Sample Address',
    TYPE: 'text',
    REQUIRED: false,
  },
}

export default function CreateCampaignModal({
  isOpen,
  onPrimaryClick,
  isPrimaryLoading,
  onCloseClick,
  campaignName,
  campaignDescription,
  campaignOrganiserName,
  campaignOrganiserEmail,
  campaignAdvisoryUrl,
  campaignOrganiserLocation,
  setCampaignName,
  setCampaignDescription,
  setCampaignOrganiserName,
  setCampaignOrganiserEmail,
  setCampaignOrganiserLocation,
  setCampaignAdvisoryUrl,
}) {
  return (
    <Modal isOpen={isOpen} onCloseClick={onCloseClick}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="modal-header">
              <h2>Create Campaign</h2>
            </div>

            <div className="modal-body">
              <form
                id="create-campaign-form"
                onSubmit={(e) => {
                  // Prevent default which reloads the page
                  // Instead call the primary event
                  e.preventDefault()
                  onPrimaryClick()
                }}
              >
                <div className="form-group">
                  <div className="input-group">
                    <label htmlFor={FORM.CAMPAIGN_NAME.ID}>
                      {FORM.CAMPAIGN_NAME.DISPLAY}
                      <span className="required">Required</span>
                    </label>
                    <Input
                      id={FORM.CAMPAIGN_NAME.ID}
                      required={FORM.CAMPAIGN_NAME.REQUIRED}
                      type={FORM.CAMPAIGN_NAME.TYPE}
                      placeholder={FORM.CAMPAIGN_NAME.PLACEHOLDER}
                      maxLength={FORM.CAMPAIGN_NAME.MAX_LENGTH}
                      value={campaignName}
                      onChange={setCampaignName}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor={FORM.CAMPAIGN_DESCRIPTION.ID}>
                      {FORM.CAMPAIGN_DESCRIPTION.DISPLAY}
                      <span className="required">Required</span>
                    </label>
                    <Input
                      id={FORM.CAMPAIGN_DESCRIPTION.ID}
                      required={FORM.CAMPAIGN_DESCRIPTION.REQUIRED}
                      type={FORM.CAMPAIGN_DESCRIPTION.TYPE}
                      placeholder={FORM.CAMPAIGN_DESCRIPTION.PLACEHOLDER}
                      maxLength={FORM.CAMPAIGN_DESCRIPTION.MAX_LENGTH}
                      value={campaignDescription}
                      onChange={setCampaignDescription}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor={FORM.CAMPAIGN_ORGANISER_NAME.ID}>
                      {FORM.CAMPAIGN_ORGANISER_NAME.DISPLAY}
                      <span className="required">Required</span>
                    </label>
                    <Input
                      id={FORM.CAMPAIGN_ORGANISER_NAME.ID}
                      required={FORM.CAMPAIGN_ORGANISER_NAME.REQUIRED}
                      type={FORM.CAMPAIGN_ORGANISER_NAME.TYPE}
                      placeholder={FORM.CAMPAIGN_ORGANISER_NAME.PLACEHOLDER}
                      maxLength={FORM.CAMPAIGN_ORGANISER_NAME.MAX_LENGTH}
                      value={campaignOrganiserName}
                      onChange={setCampaignOrganiserName}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor={FORM.CAMPAIGN_ORGANISER_EMAIL.ID}>
                      {FORM.CAMPAIGN_ORGANISER_EMAIL.DISPLAY}
                    </label>
                    <p className="caption">
                      Contact email that voucher recipients can send their
                      enquiries.
                    </p>
                    <Input
                      id={FORM.CAMPAIGN_ORGANISER_EMAIL.ID}
                      required={FORM.CAMPAIGN_ORGANISER_EMAIL.REQUIRED}
                      type={FORM.CAMPAIGN_ORGANISER_EMAIL.TYPE}
                      placeholder={FORM.CAMPAIGN_ORGANISER_EMAIL.PLACEHOLDER}
                      maxLength={FORM.CAMPAIGN_ORGANISER_EMAIL.MAX_LENGTH}
                      value={campaignOrganiserEmail}
                      onChange={setCampaignOrganiserEmail}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor={FORM.CAMPAIGN_ORGANISER_LOCATION.ID}>
                      {FORM.CAMPAIGN_ORGANISER_LOCATION.DISPLAY}
                    </label>
                    <p className="caption">
                      Location of place where users can get support from.
                    </p>
                    <Input
                      id={FORM.CAMPAIGN_ORGANISER_LOCATION.ID}
                      required={FORM.CAMPAIGN_ORGANISER_LOCATION.REQUIRED}
                      type={FORM.CAMPAIGN_ORGANISER_LOCATION.TYPE}
                      placeholder={FORM.CAMPAIGN_ORGANISER_LOCATION.PLACEHOLDER}
                      maxLength={FORM.CAMPAIGN_ORGANISER_LOCATION.MAX_LENGTH}
                      value={campaignOrganiserLocation}
                      onChange={setCampaignOrganiserLocation}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor={FORM.CAMPAIGN_ADVISORY_URL.ID}>
                      {FORM.CAMPAIGN_ADVISORY_URL.DISPLAY}
                    </label>
                    <p className="caption">
                      Website link for the public to find out more about your
                      campaign programme.
                    </p>
                    <Input
                      id={FORM.CAMPAIGN_ADVISORY_URL.ID}
                      required={FORM.CAMPAIGN_ADVISORY_URL.REQUIRED}
                      type={FORM.CAMPAIGN_ADVISORY_URL.TYPE}
                      placeholder={FORM.CAMPAIGN_ADVISORY_URL.PLACEHOLDER}
                      maxLength={FORM.CAMPAIGN_ADVISORY_URL.MAX_LENGTH}
                      value={campaignAdvisoryUrl}
                      onChange={setCampaignAdvisoryUrl}
                    />
                  </div>
                </div>
                <div className="btn-group align-right">
                  <button
                    className="btn btn-lg btn-link-primary"
                    type="button"
                    onClick={onCloseClick}
                  >
                    Cancel
                  </button>
                  <button
                    form="create-campaign-form"
                    className={`btn btn-primary btn-lg ${
                      isPrimaryLoading && 'is-loading'
                    }`}
                    type="submit"
                  >
                    Create Campaign
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

CreateCampaignModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onPrimaryClick: PropTypes.func.isRequired,
  isPrimaryLoading: PropTypes.bool.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  campaignName: PropTypes.string.isRequired,
  campaignDescription: PropTypes.string.isRequired,
  campaignOrganiserName: PropTypes.string.isRequired,
  campaignOrganiserEmail: PropTypes.string.isRequired,
  campaignAdvisoryUrl: PropTypes.string.isRequired,
  campaignOrganiserLocation: PropTypes.string.isRequired,
  setCampaignName: PropTypes.func.isRequired,
  setCampaignDescription: PropTypes.func.isRequired,
  setCampaignOrganiserName: PropTypes.func.isRequired,
  setCampaignOrganiserEmail: PropTypes.func.isRequired,
  setCampaignAdvisoryUrl: PropTypes.func.isRequired,
  setCampaignOrganiserLocation: PropTypes.func.isRequired,
}
