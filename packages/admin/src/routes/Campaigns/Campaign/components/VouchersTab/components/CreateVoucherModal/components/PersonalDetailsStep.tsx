import React, { useEffect, useRef } from 'react'
import _ from 'lodash'
import { Button, ButtonGroup, VStack } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import FormInput from 'components/FormInput'
import { PhoneNumberInput, ThemeProvider } from '@opengovsg/design-system-react'

import { useVouchersTabContext } from '../../../VouchersTabContext'
import StepCard from './common/StepCard'
import { VOUCHER_TYPES } from '../constants'
import { CreateVoucherStoredFormContent } from '../types'

type PersonalDetailsStepProps = {
  storedFormContent: CreateVoucherStoredFormContent
  onAddFormContent: (data: Partial<CreateVoucherStoredFormContent>) => void
  setStoredFormContent: React.Dispatch<
    React.SetStateAction<CreateVoucherStoredFormContent>
  >
}

const PersonalDetailsStep = ({
  storedFormContent,
  onAddFormContent,
  setStoredFormContent,
}: PersonalDetailsStepProps) => {
  const { advanceStep, selectedVoucherType } = useVouchersTabContext()

  const formMethods = useForm()
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = formMethods
  const hasErrors = !_.isEmpty(errors)

  const {
    voucherContactNumberParam: storedContactNumber,
    voucherNameParam: storedName,
    voucherCountryCodeParam: storedCountryCode,
  } = storedFormContent

  const onPrimaryClick = (data: Partial<CreateVoucherStoredFormContent>) => {
    onAddFormContent(data)
    advanceStep(1)
  }

  const isSMSVoucherType = selectedVoucherType === VOUCHER_TYPES.DIGITAL
  const contactNumber = watch('voucherContactNumberParam')
  const name = watch('voucherNameParam')
  const countryCode = watch('voucherCountryCodeParam')

  useEffect(() => {
    setValue('voucherContactNumberParam', storedContactNumber)
    setValue('voucherNameParam', storedName)
    setValue('voucherCountryCodeParam', storedCountryCode)
  }, [])

  const extensionLength = useRef(0)

  const onPhoneNumberChange = (phoneNumber: string | undefined) => {
    // tracks extension length, set on first number entry

    // NOTE: the default behaviour of PhoneNumberInput will reset
    // the inputText, so this works even if the user changes country
    // codes midway
    if (!phoneNumber || phoneNumber.length === 0) {
      extensionLength.current = 0
      setValue('voucherContactNumberParam', '')
      setValue('voucherCountryCodeParam', '')
    } else if (extensionLength.current === 0) {
      extensionLength.current = phoneNumber.length - 1
      const newCountryCode = phoneNumber.substring(0, extensionLength.current)
      setValue('voucherCountryCodeParam', newCountryCode)
    } else {
      const newCountryCode = phoneNumber.substring(1, extensionLength.current)
      setValue('voucherCountryCodeParam', newCountryCode)
    }

    // update inputText to mirror input value
    setValue('voucherContactNumberParam', phoneNumber ?? '')
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onPrimaryClick)}>
        <StepCard
          header="Personal details"
          cardBody={
            <VStack align="start" width="100%" spacing="40px">
              <FormInput
                name="voucherNameParam"
                label="Name"
                inputProps={{
                  placeholder: 'John Doe',
                  id: 'create-vouchers-name-input',
                  autoFocus: true,
                }}
              />
              <ThemeProvider>
                <PhoneNumberInput
                  className="phone-number-input"
                  onChange={onPhoneNumberChange}
                  value={contactNumber}
                  id="create-vouchers-mobile-number-input"
                  name="voucherContactNumberParam"
                  defaultCountry="SG"
                  placeholder="91234567"
                />
              </ThemeProvider>
            </VStack>
          }
          cardFooter={
            <ButtonGroup>
              <Button
                id="personal-details-step-back"
                onClick={() => {
                  setStoredFormContent((previousFormContent) => ({
                    ...previousFormContent,
                    voucherContactNumberParam: contactNumber,
                    voucherCountryCodeParam: countryCode,
                    voucherNameParam: name,
                  }))
                  advanceStep(-1)
                }}
                variant="neutralOutline"
              >
                Back
              </Button>
              <Button
                id="personal-details-step-next-button"
                isDisabled={(isSMSVoucherType && !contactNumber) || hasErrors}
                type="submit"
              >
                Next
              </Button>
            </ButtonGroup>
          }
        />
      </form>
    </FormProvider>
  )
}

export default PersonalDetailsStep
