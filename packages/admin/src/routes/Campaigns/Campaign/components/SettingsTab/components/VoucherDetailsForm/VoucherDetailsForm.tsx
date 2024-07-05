import React from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import _ from 'lodash'

import Input from 'components/Input'
import { DEFAULT_NUMBER_RADIX } from 'constants/string'
import { Text } from '@chakra-ui/react'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import { VoucherValue } from 'services/RedeemApi/types'
import styles from './VoucherDetailsForm.module.scss'
import VoucherGroupInput from '../../../VoucherGroupInput'
import { useSettingsTabContext } from '../../SettingsTabContext'

const URL_PREFIX = 'https://'
const MAX_LENGTH = 2048

type UncleanedVoucherValue = {
  quantity: number | string
  value: number | string
  type: string
}

type FormValues = {
  campaignDefaultVouchers: UncleanedVoucherValue[] | null
  campaignAdvisoryUrl: string | null
  campaignTncUrl: string | null
}

type DefaultVouchersType = VoucherValue | Omit<VoucherValue, 'type'>

export default function VoucherDetailsForm() {
  const {
    campaignAdvisoryUrl: infoUrl,
    campaignTncUrl: tncUrl,
    campaignDefaultVouchers: defaultVouchers,
  } = useCampaignContext()
  const {
    onUpdateCampaignVoucherDetails: onPrimaryClick,
    isUpdateCampaignVoucherDetailsLoading: isPrimaryLoading,
  } = useSettingsTabContext()

  // NOTE: docs for react-hook-forms are here https://react-hook-form.com/get-started#IntegratingwithUIlibraries
  // The hook manages state through the use of a controller (for a controlled component);
  // when the handleSubmit function is called, the wrapped function gets passed all the values of the form
  // as a single object with keys as the name prop of the controller
  const {
    handleSubmit,
    control,
    reset: resetTextFields,
    register,
    watch,
  } = useForm({
    defaultValues: {
      campaignDefaultVouchers: defaultVouchers || [],
      campaignAdvisoryUrl: infoUrl,
      campaignTncUrl: tncUrl,
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'campaignDefaultVouchers',
  })
  const reset = () => {
    resetTextFields()
  }
  const onSubmit = (data: FormValues) => {
    const campaignDefaultVouchers =
      data.campaignDefaultVouchers?.map((defaultVoucherEntry) => {
        let parsedVoucherEntry: DefaultVouchersType = {
          ...defaultVoucherEntry,
          quantity: parseInt(
            defaultVoucherEntry.quantity.toString(),
            DEFAULT_NUMBER_RADIX
          ),
          value: parseInt(
            defaultVoucherEntry.value.toString(),
            DEFAULT_NUMBER_RADIX
          ),
        }

        if (_.isEmpty(defaultVoucherEntry.type)) {
          parsedVoucherEntry = _.omit(parsedVoucherEntry, ['type']) as Omit<
            VoucherValue,
            'type'
          >
        }

        return parsedVoucherEntry
      }) || ([] as DefaultVouchersType[])
    const campaignAdvisoryUrl =
      data.campaignAdvisoryUrl === '' ? null : data.campaignAdvisoryUrl
    const campaignTncUrl =
      data.campaignTncUrl === '' ? null : data.campaignTncUrl

    onPrimaryClick({
      ...data,
      campaignDefaultVouchers,
      campaignAdvisoryUrl,
      campaignTncUrl,
    })
  }
  const chosenDefaultVouchers = watch('campaignDefaultVouchers')
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <div className="input-group">
          <div className={styles.textContainer}>
            <label htmlFor="campaign-default-vouchers">
              Default Voucher Group
            </label>
            <Text
              textStyle="caption2"
              color="neutral.600"
              id="campaign-default-vouchers-description"
            >
              Default voucher values and quantities to be given as a group to
              receipients.
            </Text>
            <VoucherGroupInput
              getFormProps={(
                path: 'quantity' | 'type' | 'value',
                index: number
              ) =>
                register(`campaignDefaultVouchers.${index}.${path}` as const, {
                  min: 1,
                })
              }
              fieldName="campaignDefaultVouchers"
              fields={fields}
              denominations={chosenDefaultVouchers}
              append={append}
              remove={remove}
              allowEmpty
            />
          </div>
        </div>
        <div className="input-group">
          <div className={styles.textContainer}>
            <label htmlFor="campaign-logo">Campaign Logo</label>
            <Text
              textStyle="caption2"
              color="neutral.600"
              id="campaign-logo-description"
            >
              Campaign logo cannot be changed. Please create a new campaign if
              you need to change it.
            </Text>
          </div>
        </div>

        <div className={`input-group ${styles.textContainer}`}>
          <label htmlFor="general-info-url">General Info URL</label>
          <Text
            textStyle="caption2"
            color="neutral.600"
            id="general-info-url-description"
          >
            this is the url where recipients can read general information about
            the voucher
          </Text>
          <Controller
            name="campaignAdvisoryUrl"
            defaultValue={infoUrl || ''}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                value={value}
                type="url"
                required={false}
                placeholder={URL_PREFIX}
                maxLength={MAX_LENGTH}
              />
            )}
          />
        </div>

        <div className={`input-group ${styles.textContainer}`}>
          <label htmlFor="terms-and-conditions-info-url">
            Terms And Conditions URL
          </label>
          <Text
            textStyle="caption2"
            color="neutral.600"
            id="terms-and-conditions-url-description"
          >
            This is the URL where recipients can read terms and conditions of
            the voucher.
          </Text>
          <Controller
            name="campaignTncUrl"
            defaultValue={tncUrl || ''}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                value={value}
                type="url"
                required={false}
                placeholder={URL_PREFIX}
                maxLength={MAX_LENGTH}
              />
            )}
          />
        </div>
      </div>
      <div className="btn-group align-right">
        <button
          className="btn btn-lg btn-link-primary"
          type="button"
          onClick={reset}
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
