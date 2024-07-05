import React, { useEffect } from 'react'
import { PropTypes } from 'prop-types'
import _ from 'lodash'
import { useForm, Controller, FormProvider } from 'react-hook-form'
import {
  VStack,
  Text,
  RadioGroup,
  Radio,
  HStack,
  Button,
  Select,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react'

import FormInput from 'components/FormInput'
import {
  PAYMENT_RELATED_STRING_CHARACTER_REGEX,
  VALID_BANK_NAMES,
} from 'constants/merchants'

import { FIELD_REQUIRED_MESSAGE } from 'constants/messages'
import styles from './MerchantUpdatePaymentDetailsForm.module.scss'

const BANK_TRANSFER_FORM_FIELDS = {
  MERCHANT_BANK_NAME: {
    id: 'paymentBankName',
    display: 'Bank Name',
    maxLength: 100,
    type: 'select',
    required: true,
    defaultValue: ({ paymentBankName }) => paymentBankName || '',
    selectOptions: Object.values(VALID_BANK_NAMES),
  },
  MERCHANT_BANK_ACCOUNT_HOLDER_NAME: {
    id: 'paymentBankAccountHolderName',
    display: 'Bank Account Holder Name',
    maxLength: 100,
    type: 'text',
    required: true,
    isInputValid: (input) => PAYMENT_RELATED_STRING_CHARACTER_REGEX.test(input),
    defaultValue: ({ paymentBankAccountHolderName }) =>
      paymentBankAccountHolderName || '',
  },
  MERCHANT_BANK_ACCOUNT_NUMBER: {
    id: 'paymentBankAccountNumber',
    display: 'Bank Account Number',
    maxLength: 100,
    type: 'text',
    required: true,
    isInputValid: (input) => /^\d+$/.test(input),
    defaultValue: ({ paymentBankAccountNumber }) =>
      paymentBankAccountNumber || '',
  },
}

export default function MerchantUpdatePaymentDetailsForm({
  merchant,
  onPrimaryClick,
  isPrimaryLoading,
}) {
  // NOTE: docs for react-hook-forms are here https://react-hook-form.com/get-started#IntegratingwithUIlibraries
  // The hook manages state through the use of a controller (for a controlled component);
  // when the handleSubmit function is called, the wrapped function gets passed all the values of the form
  // as a single object with keys as the name prop of the controller
  const formMethods = useForm()
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = formMethods
  const preferredPaymentMethod = watch('paymentPreferredPaymentMethod')
  const onSubmit = (data) => {
    let fieldsToSend = { paymentPreferredPaymentMethod: preferredPaymentMethod }
    if (preferredPaymentMethod === 'BANK_TRANSFER') {
      // If preferred payment method is bank transfer, then add bank transfer related fields
      const bankTransferFields = _.pick(
        data,
        _.map(BANK_TRANSFER_FORM_FIELDS, (field) => field.id)
      )
      fieldsToSend = { ...fieldsToSend, ...bankTransferFields }
    }

    onPrimaryClick(fieldsToSend)
  }

  // Reset form to reflect any changes to merchant after it has been updated on
  // the backend.
  useEffect(() => {
    const allFields = {
      ...BANK_TRANSFER_FORM_FIELDS,
    }
    // Apply field.defaultValue to merchant.
    const defaultValues = _(allFields)
      .map((field) => [field.id, field.defaultValue(merchant)])
      .fromPairs()
      .value()
    reset({
      ...defaultValues,
      paymentPreferredPaymentMethod: merchant.paymentPreferredPaymentMethod,
    })
  }, [merchant, reset])
  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.merchantUpdatePaymentDetailsFormContainer}
      >
        <VStack
          align="stretch"
          maxWidth="42.5rem"
          paddingY="40px"
          spacing="32px"
        >
          <VStack align="stretch" spacing="12px">
            <div className={styles.formLabelRow}>
              <Text textStyle="subhead1" color="neutral.900">
                Preferred Payment Method
              </Text>
            </div>
            <Controller
              name="paymentPreferredPaymentMethod"
              defaultValue={merchant.paymentPreferredPaymentMethod}
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioGroup
                  colorScheme="primary"
                  onChange={onChange}
                  value={value}
                >
                  <VStack align="start" spacing={0}>
                    <Radio value="BANK_TRANSFER">Bank Transfer</Radio>
                  </VStack>
                </RadioGroup>
              )}
            />
          </VStack>
          {preferredPaymentMethod === 'BANK_TRANSFER' && (
            <>
              {_.map(
                BANK_TRANSFER_FORM_FIELDS,
                ({
                  id,
                  display,
                  maxLength,
                  type,
                  required,
                  defaultValue,
                  isInputValid,
                  selectOptions,
                }) => {
                  // Todo: Refactor to FormSelect component in the future
                  if (type === 'select') {
                    return (
                      <div key={id} className="input-group">
                        <FormControl isInvalid={errors[id]}>
                          <FormLabel htmlFor={id}>{display}</FormLabel>
                          <Select
                            background="white"
                            id={id}
                            placeholder="Select bank name"
                            {...formMethods.register(id, {
                              required: required
                                ? FIELD_REQUIRED_MESSAGE
                                : false,
                            })}
                          >
                            {_.map(selectOptions, (option) => (
                              <option value={option}>{option}</option>
                            ))}
                          </Select>
                          <FormErrorMessage>
                            {errors[id] && errors[id].message}
                          </FormErrorMessage>
                        </FormControl>
                      </div>
                    )
                  }

                  return (
                    <div key={id} className="input-group">
                      <FormInput
                        label={display}
                        name={id}
                        defaultValue={defaultValue(merchant)}
                        registerOptions={{
                          required: required && FIELD_REQUIRED_MESSAGE,
                        }}
                        inputProps={{
                          maxLength,
                          type,
                        }}
                        isInputValid={isInputValid}
                      />
                    </div>
                  )
                }
              )}
            </>
          )}

          <HStack spacing="24px">
            <Button
              colorScheme="primary"
              isLoading={isPrimaryLoading}
              type="submit"
              variant="solid"
            >
              Save
            </Button>
            <Button
              colorScheme="primary"
              onClick={() => reset()}
              variant="link"
            >
              Cancel changes
            </Button>
          </HStack>
        </VStack>
      </form>
    </FormProvider>
  )
}

MerchantUpdatePaymentDetailsForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  merchant: PropTypes.objectOf(PropTypes.any).isRequired,
  onPrimaryClick: PropTypes.func.isRequired,
  isPrimaryLoading: PropTypes.bool.isRequired,
}
