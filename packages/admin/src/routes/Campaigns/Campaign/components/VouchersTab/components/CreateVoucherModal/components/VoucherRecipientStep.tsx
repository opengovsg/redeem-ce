import {
  Flex,
  Box,
  VStack,
  Link,
  Button,
  Text,
  ButtonGroup,
} from '@chakra-ui/react'
import _ from 'lodash'
import React, { useEffect, useMemo } from 'react'
import FormAutoCompleteInput from 'components/FormAutoCompleteInput'
import FormInput from 'components/FormInput'
import InlineMessage from 'components/InlineMessage'
import { validateRecipientId } from 'helpers/recipient-id'
import { FormProvider, useForm } from 'react-hook-form'
import { formatAddress } from 'helpers/utils'
import {
  useAddresses,
  useDebouncedSearch,
  useValidateRecipientIdWhenFilled,
} from '../hooks'
import {
  CreateVoucherStoredFormContent,
  VoucherRecipientModalFocusState,
} from '../types'
import StepCard from './common/StepCard'
import { useVouchersTabContext } from '../../../VouchersTabContext'
import CheckerResult from './common/CheckerResult'

type VoucherRecipientStepProps = {
  storedFormContent: CreateVoucherStoredFormContent
  onAddFormContent: (data: Partial<CreateVoucherStoredFormContent>) => void
  setStoredFormContent: React.Dispatch<
    React.SetStateAction<CreateVoucherStoredFormContent>
  >
  voucherRecipientModalFocusState: VoucherRecipientModalFocusState
}

type FormValues = {
  postalCode: string
  streetAddress: string
  floorNumber: string
  unitNumber: string
  postalCodeManual: string
  streetNameManual: string
  blockNumberManual: string
  floorNumberManual: string
  unitNumberManual: string
  voucherRecipientIdParam: string
}

type AddressFormPrefillCheckerParams = Pick<
  FormValues,
  'unitNumber' | 'floorNumber' | 'postalCode'
>

function formatOnStoredFormContent({
  streetAddress,
  unitNumber,
  floorNumber,
  postalCode,
  blockNumberManual,
  streetNameManual,
  unitNumberManual,
  floorNumberManual,
  postalCodeManual,
  voucherRecipientIdParam,
  isCreateVoucherAddressUsePrefill,
}: FormValues & {
  isCreateVoucherAddressUsePrefill: boolean
}) {
  return {
    voucherFloorNumberParam: isCreateVoucherAddressUsePrefill
      ? floorNumber
      : floorNumberManual,
    voucherUnitNumberParam: isCreateVoucherAddressUsePrefill
      ? unitNumber
      : unitNumberManual,
    voucherStreetNameParam: isCreateVoucherAddressUsePrefill
      ? streetAddress?.split(' ')?.slice(1)?.join(' ') || ''
      : streetNameManual,
    voucherBlockNumberParam: isCreateVoucherAddressUsePrefill
      ? _.first(streetAddress?.split(' ')) || ''
      : blockNumberManual,
    voucherPostalCodeParam: isCreateVoucherAddressUsePrefill
      ? postalCode
      : postalCodeManual,
    voucherRecipientIdParam,
  }
}

function checkValidAddressPrefillFormat({
  unitNumber,
  floorNumber,
  postalCode,
}: AddressFormPrefillCheckerParams) {
  return !(!!floorNumber && !!unitNumber && !postalCode)
}

function getDefaultFormValues({
  storedFormContent,
  isCreateVoucherAddressUsePrefill,
}: {
  storedFormContent: CreateVoucherStoredFormContent
  isCreateVoucherAddressUsePrefill: boolean
}) {
  const {
    voucherFloorNumberParam: storedFloorNumber,
    voucherUnitNumberParam: storedUnitNumber,
    voucherStreetNameParam: storedStreetName,
    voucherBlockNumberParam: storedBlockNumber,
    voucherPostalCodeParam: storedPostalCode,
    voucherRecipientIdParam: storedRecipientId,
  } = storedFormContent

  return isCreateVoucherAddressUsePrefill
    ? {
        voucherRecipientIdParam: storedRecipientId,
        floorNumber: storedFloorNumber,
        unitNumber: storedUnitNumber,
        postalCode: storedPostalCode,
        streetAddress:
          !!storedBlockNumber && !!storedStreetName
            ? `${storedBlockNumber} ${storedStreetName}`
            : '',
      }
    : {
        voucherRecipientIdParam: storedRecipientId,
        floorNumberManual: storedFloorNumber,
        unitNumberManual: storedUnitNumber,
        postalCodeManual: storedPostalCode,
        blockNumberManual: storedBlockNumber,
        streetNameManual: storedStreetName,
      }
}

const prefillFieldArrays = [
  'voucherRecipientIdParam',
  'postalCode',
  'streetAddress',
] as const
const manualFieldArrays = [
  'voucherRecipientIdParam',
  'postalCodeManual',
  'streetNameManual',
] as const

type KeyValuePairForFieldArrays =
  | [(typeof prefillFieldArrays)[number], string]
  | [(typeof manualFieldArrays)[number], string]

// TODO: Refactor this huge component
const VoucherRecipientStep = ({
  storedFormContent,
  onAddFormContent,
  setStoredFormContent,
  voucherRecipientModalFocusState,
}: VoucherRecipientStepProps) => {
  const {
    isCreateVoucherAddressUsePrefill,
    setIsCreateVoucherAddressUsePrefill,
    advanceStep,
    onCreateVoucherModalApplySearch,
    getIsVoucherGroupsMatchingQueryExists,
    checkIfRecipientNotInWhitelistForCampaign,
  } = useVouchersTabContext()

  const formMethods = useForm<FormValues>({
    defaultValues: getDefaultFormValues({
      isCreateVoucherAddressUsePrefill,
      storedFormContent,
    }),
  })
  const {
    watch,
    setValue,
    getValues,
    trigger,
    handleSubmit,
    clearErrors,
    formState: { isSubmitted, errors },
  } = formMethods

  const hasErrors = !_.isEmpty(errors)

  const postalCodeDescPrefix = 'Postal code '
  const addresses = useAddresses()
  const postalCodeOptions = useMemo(
    () =>
      Object.entries(addresses).flatMap(([postalCode, streetAddresses]) =>
        Object.keys(streetAddresses).map((streetAddress) => ({
          option: streetAddress,
          description: `${postalCodeDescPrefix}${postalCode}`,
        }))
      ),
    []
  )
  const recipientId = watch('voucherRecipientIdParam')
  const currentPostalCode = watch('postalCode')
  const currentStreetAddress = watch('streetAddress')
  const currentFloorNumber = watch('floorNumber') || ''
  const currentUnitNumber = watch('unitNumber') || ''
  const currentPostalCodeManual = watch('postalCodeManual')
  const currentStreetNameManual = watch('streetNameManual')
  const currentBlockNumberManual = watch('blockNumberManual')
  const currentFloorNumberManual = watch('floorNumberManual') || ''
  const currentUnitNumberManual = watch('unitNumberManual') || ''
  const fullAddressWithoutStreetName = formatAddress(
    isCreateVoucherAddressUsePrefill
      ? {
          floorNumber: currentFloorNumber,
          postalCode: currentPostalCode,
          blockNumber: _.first(currentStreetAddress?.split(' ')) || '',
          streetName: '',
          unitNumber: currentUnitNumber,
        }
      : {
          floorNumber: currentFloorNumberManual,
          postalCode: currentPostalCodeManual,
          blockNumber: currentBlockNumberManual,
          streetName: '',
          unitNumber: currentUnitNumberManual,
        }
  )
  const recipientIdToSearch = useMemo(
    () => (recipientId?.length === 9 ? { recipientId } : null),
    [recipientId]
  )

  const {
    isLoading: isLoadingMatchingRecipientIds,
    isHidden: isSearchRecipientIdResultsHidden,
  } = useDebouncedSearch({
    valueToSearch: recipientIdToSearch,
    apiCall: getIsVoucherGroupsMatchingQueryExists,
  })
  const {
    isLoading: isLoadingSearchRecipientIdInWhitelist,
    isHidden: isSearchRecipientIdWhitelistResultsHidden,
  } = useDebouncedSearch({
    valueToSearch: recipientIdToSearch,
    apiCall: checkIfRecipientNotInWhitelistForCampaign,
  })
  const addressValueToSearch = useMemo(() => {
    let result: {
      block: string
      floor: string | null
      unit: string | null
      postalCode: string
    } | null = null
    if (
      isCreateVoucherAddressUsePrefill &&
      addresses[currentPostalCode]?.[currentStreetAddress]?.[
        currentFloorNumber
      ]?.includes(currentUnitNumber)
    ) {
      result = {
        block: _.first(currentStreetAddress?.split(' ')) || '',
        floor: currentFloorNumber || null,
        unit: currentUnitNumber || null,
        postalCode: currentPostalCode,
      }
    }
    if (
      !isCreateVoucherAddressUsePrefill &&
      currentBlockNumberManual &&
      currentStreetNameManual &&
      currentPostalCodeManual &&
      !!currentFloorNumberManual === !!currentUnitNumberManual
    ) {
      result = {
        floor: currentFloorNumberManual,
        postalCode: currentPostalCodeManual,
        block: currentBlockNumberManual,
        unit: currentUnitNumberManual,
      }
    }

    return result
  }, [
    isCreateVoucherAddressUsePrefill,
    addresses,
    currentStreetNameManual,
    currentFloorNumberManual,
    currentPostalCodeManual,
    currentBlockNumberManual,
    currentUnitNumberManual,
    currentStreetAddress,
    currentFloorNumber,
    currentUnitNumber,
    currentPostalCode,
  ])

  const {
    isLoading: isLoadingMatchingAddresses,
    isHidden: isSearchAddressesResultsHidden,
  } = useDebouncedSearch({
    valueToSearch: addressValueToSearch,
    apiCall: getIsVoucherGroupsMatchingQueryExists,
  })

  useEffect(() => {
    if (currentPostalCode && isSubmitted) {
      const triggerArray = [
        'streetAddress',
        currentFloorNumber && 'floorNumber',
        currentUnitNumber && 'unitNumber',
      ].filter(Boolean) as ('streetAddress' | 'floorNumber' | 'unitNumber')[]
      trigger(triggerArray)
    }
  }, [currentPostalCode, trigger, isSubmitted])
  useValidateRecipientIdWhenFilled(recipientId, () =>
    trigger('voucherRecipientIdParam')
  )

  // Reset doesnt allow use to do validation. Thus, have to manually trigger the validation
  // I have to manually feed the array into getValues otherwise there is type error. Also not ideal with the manual casting, but we are sure of return type
  const fieldArrays = (
    isCreateVoucherAddressUsePrefill
      ? _.zip(prefillFieldArrays, getValues(prefillFieldArrays))
      : _.zip(manualFieldArrays, getValues(manualFieldArrays))
  ) as KeyValuePairForFieldArrays[]
  // On Mount we are only interested in recipient id and postal code being filled up with valid values (inherently meaning streetAddress too)
  useEffect(() => {
    _(fieldArrays)
      .filter((keyValuePair: KeyValuePairForFieldArrays) => !!keyValuePair[1])
      .forEach((keyValuePair) => trigger(keyValuePair[0]))
  }, [])

  const floorNumberOptions = _.map(
    _.keys(addresses[currentPostalCode]?.[currentStreetAddress]),
    (floorNumber) => ({ option: floorNumber })
  )
  const unitNumberOptions = _.map(
    addresses[currentPostalCode]?.[currentStreetAddress]?.[currentFloorNumber],
    (unitNumber) => ({ option: unitNumber })
  )
  const onClickManualInput = () => {
    // Selecting manual clicking
    setIsCreateVoucherAddressUsePrefill(false)
    setValue('postalCodeManual', getValues('postalCode'))
    const streetAddress = getValues('streetAddress')
    const streetAddressWords = _.split(streetAddress, ' ')
    if (streetAddressWords?.length) {
      setValue('streetNameManual', streetAddressWords.slice(1).join(' '))
      setValue('blockNumberManual', streetAddressWords[0])
    } else {
      setValue('streetNameManual', '')
      setValue('blockNumberManual', '')
    }
    setValue('floorNumberManual', getValues('floorNumber'))
    setValue('unitNumberManual', getValues('unitNumber'))

    // After setting to prefill, clear any errors that might exist in the previous error object. We can clear all errors because the errors would have belong to the non manual fields
    clearErrors()
  }
  const addressSearchResult = !isSearchAddressesResultsHidden && (
    <CheckerResult
      text={
        <Text textStyle="subhead1" color="neutral.800">
          Address claimed before
        </Text>
      }
      id="address-checker-result-see-details-button"
      onClickDetails={() =>
        onCreateVoucherModalApplySearch(fullAddressWithoutStreetName)
      }
      buttonText="Details"
      showIcon
    />
  )

  const onSubmit = ({
    streetAddress,
    unitNumber,
    floorNumber,
    postalCode,
    blockNumberManual,
    streetNameManual,
    unitNumberManual,
    floorNumberManual,
    postalCodeManual,
    voucherRecipientIdParam,
  }: FormValues) => {
    onAddFormContent({
      ...formatOnStoredFormContent({
        streetAddress,
        unitNumber,
        floorNumber,
        postalCode,
        blockNumberManual,
        streetNameManual,
        unitNumberManual,
        floorNumberManual,
        postalCodeManual,
        voucherRecipientIdParam,
        isCreateVoucherAddressUsePrefill,
      }),
      addressValueToSearch,
    })
    advanceStep(1)
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StepCard
          header="Voucher recipient"
          vStackPadding={
            isCreateVoucherAddressUsePrefill ? '40px 32px' : '40px 32px 0px'
          }
          cardBody={
            <>
              <VStack align="start" width="100%" spacing="16px">
                <FormInput
                  name="voucherRecipientIdParam"
                  label="Recipient Identifier"
                  transformInput={(input) => _.toUpper(input)}
                  inputProps={{
                    id: 'create-vouchers-recipient-id-input',
                    placeholder: 'S1234567A',
                    autoFocus:
                      voucherRecipientModalFocusState === 'recipientId',
                  }}
                  registerOptions={{
                    validate: {
                      validRecipientId: (value) => {
                        if (!value) {
                          return true
                        }
                        const result = validateRecipientId(value)
                        if (!result.valid) {
                          return 'Please enter a valid recipient id'
                        }
                        return true
                      },
                    },
                  }}
                  defaultValue={storedFormContent.voucherRecipientIdParam}
                  customOnBlur={() => trigger('voucherRecipientIdParam')}
                />
                {!isSearchRecipientIdResultsHidden && (
                  <CheckerResult
                    text={
                      <Text textStyle="subhead1" color="neutral.800">
                        Recipient claimed before
                      </Text>
                    }
                    id="recipient-claimed-before-checker-result-see-details-button"
                    onClickDetails={() =>
                      onCreateVoucherModalApplySearch(recipientId)
                    }
                    buttonText="Details"
                    showIcon
                  />
                )}
                {isSearchRecipientIdResultsHidden &&
                  !isSearchRecipientIdWhitelistResultsHidden && (
                    <CheckerResult
                      text={
                        <Text textStyle="subhead1" color="neutral.800">
                          Recipient not eligible for campaign
                        </Text>
                      }
                      id="recipient-not-in-whitelist-checker-result-see-details-button"
                    />
                  )}
              </VStack>
              <VStack
                align="start"
                width="100%"
                marginTop="40px"
                spacing="24px"
              >
                <Text textStyle="h4" color="neutral.900">
                  Address
                </Text>
                {isCreateVoucherAddressUsePrefill && (
                  <>
                    <FormAutoCompleteInput
                      autoCompleteOptions={postalCodeOptions}
                      name="postalCode"
                      id="create-vouchers-postal-code-input-group"
                      // Current dataset has a maximum of 13 street address per postal code
                      resultsLimit={13}
                      isInputValid={(value) => /^[0-9]{0,6}$/.test(value)}
                      label={
                        <VStack align="start" spacing={0}>
                          <Text>Enter postal code to search</Text>
                          <Text textStyle="body2" color="neutral.700">
                            Select the address belonging to the recipient
                          </Text>
                        </VStack>
                      }
                      registerOptions={{
                        validate: {
                          validPostalCodeCheck: (value) =>
                            !value ||
                            !!addresses[value] ||
                            'Please select a valid postal code',
                          allAddressFieldCheck: (value) =>
                            checkValidAddressPrefillFormat({
                              unitNumber: getValues('unitNumber'),
                              floorNumber: getValues('floorNumber'),
                              postalCode: value,
                            }) || 'Please select a valid postal code',
                        },
                      }}
                      useOptionNameToMatch={false}
                      onSelectOption={(option) => {
                        clearErrors([
                          'streetAddress',
                          'floorNumber',
                          'unitNumber',
                        ])

                        const postalCode = option?.description?.replace(
                          postalCodeDescPrefix,
                          ''
                        )
                        const streetAddress = option?.option
                        setValue('postalCode', postalCode || '', {
                          shouldValidate: true,
                        })
                        setValue('streetAddress', streetAddress)
                      }}
                      onChange={(e) => {
                        setValue('streetAddress', '')

                        // If we clear the value then we should remove floor number and unit number
                        if (e.target.value === '') {
                          setValue('floorNumber', '')
                          setValue('unitNumber', '')
                        }
                      }}
                      emptyStateElement={
                        <InlineMessage type="info">
                          Can&apos;t find the exact address?{' '}
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <Link
                            color="primary.500"
                            onClick={onClickManualInput}
                          >
                            Add it manually
                          </Link>
                        </InlineMessage>
                      }
                      placeholder="348937"
                      defaultValue={storedFormContent.voucherPostalCodeParam}
                      inputProps={{
                        autoFocus:
                          voucherRecipientModalFocusState === 'address',
                      }}
                    />
                    <FormInput
                      name="streetAddress"
                      label="Street name/Block no."
                      inputProps={{
                        isDisabled: true,
                        isReadOnly: true,
                      }}
                      registerOptions={{
                        validate: {
                          validStreetAddressCheck: (value) =>
                            !currentPostalCode ||
                            !!addresses[currentPostalCode]?.[value] ||
                            'Please select a valid address by searching for its postal code above',
                          allAddressFieldCheck: () =>
                            checkValidAddressPrefillFormat({
                              unitNumber: getValues('unitNumber'),
                              floorNumber: getValues('floorNumber'),
                              postalCode: getValues('postalCode'),
                            }) ||
                            'Please select a valid address by searching for its postal code above',
                        },
                      }}
                      defaultValue={storedFormContent.voucherStreetNameParam}
                    />
                    <Flex width="100%">
                      <FormAutoCompleteInput
                        id="create-vouchers-floor-number-input-group"
                        autoCompleteOptions={floorNumberOptions}
                        name="floorNumber"
                        resultsLimit={9999}
                        transformInput={(input) => _.toUpper(input)}
                        label={
                          <Flex alignItems="center">
                            Floor number
                            <Text
                              textStyle="body2"
                              marginLeft="8px"
                              color="neutral.700"
                            >
                              (if applicable)
                            </Text>
                          </Flex>
                        }
                        registerOptions={{
                          validate: {
                            requiredWithUnitNumber: (value) =>
                              !!value ||
                              !getValues('unitNumber') ||
                              'Required with unit number.',
                            digitsOnly: (value) =>
                              !value ||
                              /^[A-Z0-9]+$/.test(value) ||
                              'Please key in a valid floor number.',
                            validFloorNumber: (value) =>
                              !currentPostalCode ||
                              !!addresses[currentPostalCode]?.[
                                currentStreetAddress
                              ]?.[value || ''] ||
                              'Please key in a valid floor number.',
                            allAddressFieldCheck: (value) =>
                              !value ||
                              checkValidAddressPrefillFormat({
                                unitNumber: getValues('unitNumber'),
                                floorNumber: value,
                                postalCode: getValues('postalCode'),
                              }) ||
                              'Please enter a valid floor number',
                          },
                          maxLength: {
                            value: 3,
                            message: 'Please key in a valid floor number',
                          },
                        }}
                        onChange={() => {
                          if (isSubmitted) {
                            trigger('unitNumber')
                          }
                        }}
                        inputLeftElement={
                          <Text textStyle="body1" color="neutral.900">
                            #
                          </Text>
                        }
                        emptyStateElement={
                          <InlineMessage type="info">
                            Can&apos;t find the exact address?{' '}
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <Link
                              color="primary.500"
                              onClick={onClickManualInput}
                            >
                              Add it manually
                            </Link>
                          </InlineMessage>
                        }
                        defaultValue={storedFormContent.voucherFloorNumberParam}
                        placeholder="01"
                      />
                      <Box
                        alignSelf="flex-end"
                        width="0.75rem"
                        height={0}
                        marginBottom="22px"
                        borderWidth="1px"
                        borderStyle="solid"
                        borderColor="neutral.600"
                        marginX="16px"
                      />
                      <FormAutoCompleteInput
                        id="create-vouchers-unit-number-input-group"
                        autoCompleteOptions={unitNumberOptions}
                        name="unitNumber"
                        resultsLimit={9999}
                        transformInput={(input) => _.toUpper(input)}
                        label={
                          <Flex alignItems="center">
                            Unit number
                            <Text
                              textStyle="body2"
                              marginLeft="8px"
                              color="neutral.700"
                            >
                              (if applicable)
                            </Text>
                          </Flex>
                        }
                        onChange={() => {
                          if (isSubmitted) {
                            trigger('floorNumber')
                          }
                        }}
                        registerOptions={{
                          validate: {
                            requiredWithFloorNumber: (value) =>
                              !!value ||
                              !getValues('floorNumber') ||
                              'Required with unit number.',
                            digitsOnly: (value) =>
                              !value ||
                              /^[A-Z0-9]+$/.test(value) ||
                              'Please key in a valid unit number.',
                            validFloorNumber: (value) =>
                              !currentPostalCode ||
                              addresses[currentPostalCode]?.[
                                currentStreetAddress
                              ]?.[currentFloorNumber || '']?.includes(
                                value || ''
                              ) ||
                              'Please key in a valid unit number.',
                            allAddressFieldCheck: (value) =>
                              !value ||
                              checkValidAddressPrefillFormat({
                                unitNumber: value,
                                floorNumber: getValues('floorNumber'),
                                postalCode: getValues('postalCode'),
                              }) ||
                              'Please select a valid postal code',
                          },
                          maxLength: {
                            value: 5,
                            message: 'Please key in a valid unit number',
                          },
                        }}
                        emptyStateElement={
                          <InlineMessage type="info">
                            Can&apos;t find the exact address?{' '}
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <Link
                              color="primary.500"
                              onClick={onClickManualInput}
                            >
                              Add it manually
                            </Link>
                          </InlineMessage>
                        }
                        defaultValue={storedFormContent.voucherUnitNumberParam}
                        placeholder="01"
                      />
                    </Flex>
                    {addressSearchResult}
                  </>
                )}

                {!isCreateVoucherAddressUsePrefill && (
                  <VStack
                    align="start"
                    // Some CSS trick to negate the additional padding applied to this VStack
                    width="calc(100% + 64px)"
                    margin="0 -32px 0 !important"
                    padding="36px 32px 48px"
                    background="primary.100"
                    spacing="24px"
                  >
                    <Text textStyle="subhead3" color="primary.500">
                      Add address manually
                    </Text>
                    <FormInput
                      name="postalCodeManual"
                      label="Postal Code"
                      registerOptions={{
                        required: 'Please enter a valid postal code',
                      }}
                    />
                    <Flex width="100%">
                      <Box width="10.5rem">
                        <FormInput
                          name="blockNumberManual"
                          label="Building/House no."
                          registerOptions={{
                            validate: {
                              startWithDigitOnly: (value) =>
                                !value ||
                                /^[0-9]([0-9A-Z]+)?$/.test(value) ||
                                'Please enter a valid building or house number',
                            },
                          }}
                        />
                      </Box>
                      <Box flexGrow={1} marginLeft="44px">
                        <FormInput
                          name="streetNameManual"
                          label="Street name"
                          registerOptions={{
                            required: 'Please enter a valid street name',
                          }}
                        />
                      </Box>
                    </Flex>
                    <Flex width="100%">
                      <FormInput
                        name="floorNumberManual"
                        label={
                          <Flex alignItems="center">
                            Floor number
                            <Text
                              textStyle="body2"
                              marginLeft="8px"
                              color="neutral.700"
                            >
                              (if applicable)
                            </Text>
                          </Flex>
                        }
                        registerOptions={{
                          validate: {
                            requiredWithUnitNumber: (value) =>
                              !!value ||
                              !getValues('unitNumberManual') ||
                              'Required with unit number.',
                            digitsOnly: (value) =>
                              !value ||
                              /^[A-Z0-9]+$/.test(value) ||
                              'Please key in a valid floor number.',
                          },
                          maxLength: {
                            value: 3,
                            message: 'Please key in a valid floor number',
                          },
                        }}
                        onChange={() => {
                          if (isSubmitted) {
                            trigger('floorNumberManual')
                            trigger('unitNumberManual')
                          }
                        }}
                      />
                      <Box
                        alignSelf="flex-end"
                        width="0.75rem"
                        height={0}
                        marginBottom="22px"
                        borderWidth="1px"
                        borderStyle="solid"
                        borderColor="neutral.600"
                        marginX="16px"
                      />
                      <FormInput
                        name="unitNumberManual"
                        label={
                          <Flex alignItems="center">
                            Unit number
                            <Text
                              textStyle="body2"
                              marginLeft="8px"
                              color="neutral.700"
                            >
                              (if applicable)
                            </Text>
                          </Flex>
                        }
                        registerOptions={{
                          validate: {
                            requiredWithFloorNumber: (value) =>
                              !!value ||
                              !getValues('floorNumberManual') ||
                              'Required with floor number.',
                            digitsOnly: (value) =>
                              !value ||
                              /^[A-Z0-9]+$/.test(value) ||
                              'Please key in a valid unit number.',
                          },
                          maxLength: {
                            value: 5,
                            message: 'Please key in a valid unit number',
                          },
                        }}
                        onChange={() => {
                          if (isSubmitted) {
                            trigger('floorNumberManual')
                            trigger('unitNumberManual')
                          }
                        }}
                      />
                    </Flex>
                    {addressSearchResult}
                  </VStack>
                )}
              </VStack>
            </>
          }
          cardFooter={
            <ButtonGroup>
              <Button
                id="voucher-recipient-step-back"
                onClick={() => {
                  setStoredFormContent((previousStoredFormContent) => ({
                    ...previousStoredFormContent,
                    ...formatOnStoredFormContent({
                      streetAddress: currentStreetAddress,
                      unitNumber: currentUnitNumber,
                      floorNumber: currentFloorNumber,
                      postalCode: currentPostalCode,
                      blockNumberManual: currentBlockNumberManual,
                      streetNameManual: currentStreetNameManual,
                      unitNumberManual: currentUnitNumberManual,
                      floorNumberManual: currentFloorNumberManual,
                      postalCodeManual: currentPostalCodeManual,
                      voucherRecipientIdParam: recipientId,
                      isCreateVoucherAddressUsePrefill,
                    }),
                    addressValueToSearch,
                  }))
                  advanceStep(-1)
                }}
                variant="neutralOutline"
              >
                Back
              </Button>
              <Button
                colorScheme="primary"
                id="voucher-recipient-step-next-button"
                isDisabled={hasErrors}
                isLoading={
                  isLoadingMatchingAddresses ||
                  isLoadingMatchingRecipientIds ||
                  isLoadingSearchRecipientIdInWhitelist
                }
                loadingText="Searching..."
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

export default VoucherRecipientStep
