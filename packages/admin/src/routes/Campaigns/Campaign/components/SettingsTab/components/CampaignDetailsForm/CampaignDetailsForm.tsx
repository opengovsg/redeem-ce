import React from 'react'
import _ from 'lodash'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { IconContext } from 'react-icons'
import { FaRegEye } from 'react-icons/fa'

import Input from 'components/Input'
import Tooltip from 'components/Tooltip'

import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import styles from './CampaignDetailsForm.module.scss'
import { useSettingsTabContext } from '../../SettingsTabContext'

const TOOLTIP_LABEL = 'These fields are reflected on the digital voucher.'

type FormValues = {
  campaignName: string
  campaignDescription: string
  campaignOrganiserName: string
  campaignOrganiserEmail: string
  campaignLogoUrl: string
  campaignMerchantListUrl: string
  campaignOrganiserFeedbackUrl: string
  campaignOrganiserLocation: string
}

const FORM: Record<
  string,
  {
    ID: keyof FormValues
    DISPLAY: string
    MAX_LENGTH?: number
    TYPE: string
    REQUIRED: boolean
    SHOWN_ON_VOUCHER: boolean
  }
> = {
  CAMPAIGN_NAME: {
    ID: 'campaignName',
    DISPLAY: 'Campaign Name',
    MAX_LENGTH: 50,
    TYPE: 'text',
    REQUIRED: true,
    SHOWN_ON_VOUCHER: true,
  },
  CAMPAIGN_DESCRIPTION: {
    ID: 'campaignDescription',
    DISPLAY: 'Campaign Description',
    MAX_LENGTH: 100,
    TYPE: 'text',
    REQUIRED: true,
    SHOWN_ON_VOUCHER: false,
  },
  CAMPAIGN_ORGANISER_NAME: {
    ID: 'campaignOrganiserName',
    DISPLAY: 'Organiser Name',
    MAX_LENGTH: 30,
    TYPE: 'text',
    REQUIRED: true,
    SHOWN_ON_VOUCHER: true,
  },
  CAMPAIGN_ORGANISER_EMAIL: {
    ID: 'campaignOrganiserEmail',
    DISPLAY: 'Organiser Email',
    MAX_LENGTH: 50,
    TYPE: 'email',
    REQUIRED: false,
    SHOWN_ON_VOUCHER: false,
  },
  CAMPAIGN_LOGO_URL: {
    ID: 'campaignLogoUrl',
    DISPLAY: 'Campaign Logo Url',
    MAX_LENGTH: 2048,
    TYPE: 'url',
    REQUIRED: false,
    SHOWN_ON_VOUCHER: true,
  },
  CAMPAIGN_MERCHANT_LIST_URL: {
    ID: 'campaignMerchantListUrl',
    DISPLAY: 'Campaign Merchant List Url',
    MAX_LENGTH: 50,
    TYPE: 'url',
    REQUIRED: false,
    SHOWN_ON_VOUCHER: true,
  },
  CAMPAIGN_ORGANISER_FEEDBACK_URL: {
    ID: 'campaignOrganiserFeedbackUrl',
    DISPLAY: 'Campaign Organiser Feedback Url',
    MAX_LENGTH: 100,
    TYPE: 'text',
    REQUIRED: false,
    SHOWN_ON_VOUCHER: true,
  },
  CAMPAIGN_ORGANISER_LOCATION: {
    ID: 'campaignOrganiserLocation',
    DISPLAY: 'Organiser Location',
    MAX_LENGTH: 300,
    TYPE: 'location',
    REQUIRED: false,
    SHOWN_ON_VOUCHER: true,
  },
}

const CampaignDetailsForm = () => {
  const {
    campaignId,
    campaignName,
    campaignDescription,
    campaignOrganiserName,
    campaignOrganiserEmail,
    campaignLogoUrl,
    campaignMerchantListUrl,
    campaignOrganiserFeedbackUrl,
    campaignOrganiserLocation,
  } = useCampaignContext()
  const {
    onUpdateCampaignDetailsClick: onPrimaryClick,
    isUpdateCampaignDetailsLoading: isPrimaryLoading,
  } = useSettingsTabContext()

  // NOTE: docs for react-hook-forms are here https://react-hook-form.com/get-started#IntegratingwithUIlibraries
  // The hook manages state through the use of a controller (for a controlled component);
  // when the handleSubmit function is called, the wrapped function gets passed all the values of the form
  // as a single object with keys as the name prop of the controller
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      campaignName,
      campaignDescription,
      campaignOrganiserName,
      campaignOrganiserEmail,
      campaignLogoUrl,
      campaignMerchantListUrl,
      campaignOrganiserFeedbackUrl,
      campaignOrganiserLocation,
    },
  })
  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    event?.preventDefault()
    const dataCampaignOrganiserEmail =
      data.campaignOrganiserEmail === '' ? null : data.campaignOrganiserEmail
    const dataCampaignLogoUrl =
      data.campaignLogoUrl === '' ? null : data.campaignLogoUrl
    const dataCampaignMerchantListUrl =
      data.campaignMerchantListUrl === '' ? null : data.campaignMerchantListUrl
    const dataCampaignOrganiserFeedbackUrl =
      data.campaignOrganiserFeedbackUrl === ''
        ? null
        : data.campaignOrganiserFeedbackUrl
    const dataCampaignOrganiserLocation =
      data.campaignOrganiserLocation === ''
        ? null
        : data.campaignOrganiserLocation
    onPrimaryClick({
      ...data,
      campaignOrganiserEmail: dataCampaignOrganiserEmail,
      campaignLogoUrl: dataCampaignLogoUrl,
      campaignMerchantListUrl: dataCampaignMerchantListUrl,
      campaignOrganiserFeedbackUrl: dataCampaignOrganiserFeedbackUrl,
      campaignOrganiserLocation: dataCampaignOrganiserLocation,
    })
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.campaignDetailsFormContainer}
    >
      <div className="form-group">
        <div className="input-group">
          <label htmlFor="campaignId">Campaign ID</label>
          <p id="campaignId">{campaignId}</p>
        </div>
        {_.map(
          FORM,
          ({ ID, DISPLAY, MAX_LENGTH, TYPE, REQUIRED, SHOWN_ON_VOUCHER }) => (
            <div key={ID} className="input-group">
              <div className={styles.formLabelRow}>
                <label htmlFor={ID} className={styles.formFieldLabel}>
                  {DISPLAY}
                </label>
                {SHOWN_ON_VOUCHER && (
                  <IconContext.Provider
                    value={{ color: '#788392', className: 'icon' }}
                  >
                    <Tooltip label={TOOLTIP_LABEL}>
                      <FaRegEye />
                    </Tooltip>
                  </IconContext.Provider>
                )}
              </div>
              <Controller
                name={ID}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChange={onChange}
                    value={value}
                    required={REQUIRED}
                    type={TYPE}
                    maxLength={MAX_LENGTH}
                  />
                )}
              />
            </div>
          )
        )}
      </div>
      <div className="btn-group align-right">
        <button
          className="btn btn-lg btn-link-primary"
          type="button"
          onClick={() => reset()}
        >
          Cancel Changes
        </button>
        <button
          className={`btn btn-primary btn-lg ${
            isPrimaryLoading && 'is-loading'
          }`}
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default CampaignDetailsForm
