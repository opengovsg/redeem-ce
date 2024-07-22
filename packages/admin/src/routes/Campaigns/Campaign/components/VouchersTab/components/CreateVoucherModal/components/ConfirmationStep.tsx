import {
  ButtonGroup,
  Button,
  VStack,
  Box,
  Text,
  Spinner,
} from '@chakra-ui/react'
import { getTotalSumOfDenominations } from 'helpers/denomination'
import React, { useMemo } from 'react'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import MaskedIdDisplay from 'components/MaskedIdDisplay'
import MaskedOnMonitoring from 'components/MaskedOnMonitoring'
import { isCreateVoucherAddressUsePrefill } from 'constants/street-addresses'
import { useVouchersTabContext } from '../../../VouchersTabContext'
import { VOUCHER_TYPES } from '../constants'
import {
  CreateVoucherStoredFormContent,
  VoucherRecipientModalFocusState,
} from '../types'
import CheckerResult from './common/CheckerResult'
import { useDebouncedSearch } from '../hooks'

import StepCard from './common/StepCard'

type FormatAddressClaimedBeforeParams = {
  voucherPostalCodeParam: string
  voucherBlockNumberParam: string
  voucherStreetNameParam: string
  voucherFloorNumberParam: string
  voucherUnitNumberParam: string
}

function formatAddress({
  voucherPostalCodeParam,
  voucherBlockNumberParam,
  voucherStreetNameParam,
  voucherFloorNumberParam,
  voucherUnitNumberParam,
}: FormatAddressClaimedBeforeParams) {
  const addressArray = [
    voucherBlockNumberParam && voucherStreetNameParam
      ? `${voucherBlockNumberParam} ${voucherStreetNameParam}`
      : '',
    voucherFloorNumberParam && voucherUnitNumberParam
      ? `${voucherFloorNumberParam}-${voucherUnitNumberParam}`
      : '',
    `Postal code ${voucherPostalCodeParam}`,
  ].filter(Boolean)

  return addressArray.join('\n')
}

const ReviewVoucherTag = ({ campaignName }: { campaignName: string }) => {
  return (
    <Box padding="8px 12px" background="primary.100" borderRadius="4px">
      <Text textStyle="subhead3" color="primary.500">
        {campaignName}
      </Text>
    </Box>
  )
}

type ConfirmationStepProps = {
  storedFormContent: CreateVoucherStoredFormContent
  setVoucherRecipientModalFocusState: React.Dispatch<
    React.SetStateAction<VoucherRecipientModalFocusState>
  >
}

const ConfirmationStep = ({
  storedFormContent,
  setVoucherRecipientModalFocusState,
}: ConfirmationStepProps) => {
  const { campaignName, campaignDefaultVouchers } = useCampaignContext()
  const {
    advanceStep,
    selectedVoucherType,
    onCreateVoucherModalApplySearch,
    getIsVoucherGroupsMatchingQueryExists,
    checkIfRecipientNotInWhitelistForCampaign,
    createCampaignVoucher,
    setIsLoadingCreateVoucherOpen,
  } = useVouchersTabContext()

  const {
    voucherRecipientIdParam,
    voucherNameParam,
    voucherContactNumberParam,
    voucherCountryCodeParam,
    voucherPostalCodeParam,
    voucherBlockNumberParam,
    voucherStreetNameParam,
    voucherFloorNumberParam,
    voucherUnitNumberParam,
    addressValueToSearch,
  } = storedFormContent

  const memoizedRecipientId = useMemo(
    () =>
      voucherRecipientIdParam
        ? {
            recipientId: voucherRecipientIdParam,
          }
        : null,
    []
  )

  const memoizedAddress = useMemo(() => addressValueToSearch, [])

  const {
    isLoading: isLoadingMatchingRecipientIds,
    isHidden: isSearchRecipientIdResultsHidden,
  } = useDebouncedSearch({
    valueToSearch: memoizedRecipientId,
    apiCall: getIsVoucherGroupsMatchingQueryExists,
  })

  const {
    isLoading: isLoadingSearchRecipientIdInWhitelist,
    isHidden: isSearchRecipientIdWhitelistResultsHidden,
  } = useDebouncedSearch({
    valueToSearch: memoizedRecipientId,
    apiCall: checkIfRecipientNotInWhitelistForCampaign,
  })

  const {
    isLoading: isLoadingMatchingAddresses,
    isHidden: isSearchAddressesResultsHidden,
  } = useDebouncedSearch({
    valueToSearch: memoizedAddress,
    apiCall: getIsVoucherGroupsMatchingQueryExists,
  })

  const totalValueOfVouchers = getTotalSumOfDenominations(
    campaignDefaultVouchers ?? []
  )

  const onPrimaryClick = async () => {
    setIsLoadingCreateVoucherOpen(true)
    await createCampaignVoucher({
      voucherNameParam,
      voucherContactNumberParam:
        voucherCountryCodeParam +
        voucherContactNumberParam.replace(`+${voucherCountryCodeParam}`, ''),
      voucherRecipientIdParam,
      voucherBlockNumberParam,
      voucherStreetNameParam,
      voucherPostalCodeParam,
      voucherFloorNumberParam,
      voucherUnitNumberParam,
      // We can make this assertion because campaginDefaultVouchers cannot be null before this modal is open. see @CreateVoucherButton
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      voucherGroupDenominationsParam: campaignDefaultVouchers!,
    })
  }

  /**
   * These booleans determine if the different orange checkers should be shown.
   * If vouchers have claimed before, show orange claimed before orange checkers
   * If not claimed before and it's a whitelist campaign, show if not in whitelist if user not in whitelist
   * If not claimed before and campaign is address type, show if address in denylist else dont show any orange checker
   */
  const isShowRecipientIdClaimedBefore =
    voucherRecipientIdParam && !isSearchRecipientIdResultsHidden
  const isShowRecipientIdNotInWhitelist =
    voucherRecipientIdParam &&
    isSearchRecipientIdResultsHidden &&
    !isSearchRecipientIdWhitelistResultsHidden
  const isShowRecipientIdValue =
    voucherRecipientIdParam &&
    isSearchRecipientIdResultsHidden &&
    isSearchRecipientIdWhitelistResultsHidden

  const isShowAddressClaimedBefore =
    voucherPostalCodeParam && !isSearchAddressesResultsHidden
  const isShowAddressInDenylist =
    voucherPostalCodeParam &&
    isCreateVoucherAddressUsePrefill &&
    isSearchAddressesResultsHidden
  const isShowAddressValue =
    voucherPostalCodeParam && isSearchAddressesResultsHidden

  const isOrangeCheckerShowing =
    !voucherRecipientIdParam ||
    isShowRecipientIdClaimedBefore ||
    isShowRecipientIdNotInWhitelist ||
    !voucherPostalCodeParam ||
    isShowAddressClaimedBefore ||
    isShowAddressInDenylist

  const formattedAddress = formatAddress({
    voucherBlockNumberParam,
    voucherFloorNumberParam,
    voucherPostalCodeParam,
    voucherStreetNameParam,
    voucherUnitNumberParam,
  })

  return (
    <StepCard
      header="Review voucher"
      cardBody={
        isLoadingMatchingRecipientIds ||
        isLoadingSearchRecipientIdInWhitelist ||
        isLoadingMatchingAddresses ? (
          <Spinner colorScheme="primary" size="xl" />
        ) : (
          <VStack align="start" width="100%" spacing="24px">
            <ReviewVoucherTag campaignName={campaignName} />
            <VStack align="start" width="100%" spacing="8px">
              <Text textStyle="caption2" color="neutral.700">
                Recipient id
              </Text>
              {!voucherRecipientIdParam && (
                <CheckerResult
                  id="confirmation-step-recipient-id-checker-result-empty"
                  text={
                    <Text textStyle="subhead1" color="neutral.800">
                      Recipient id is empty
                    </Text>
                  }
                  onClickDetails={() => {
                    setVoucherRecipientModalFocusState('recipientId')
                    advanceStep(-2)
                  }}
                  buttonText="Edit"
                  showIcon={false}
                />
              )}
              {isShowRecipientIdClaimedBefore && (
                <CheckerResult
                  id="confirmation-step-recipient-id-checker-result-claimed-before"
                  text={
                    <VStack align="start" spacing="8px">
                      <Text textStyle="subhead1" color="neutral.800">
                        Recipient claimed before
                      </Text>
                      <MaskedIdDisplay
                        textStyle="body2"
                        color="neutral.900"
                        id="recipient-details-recipient-id-field"
                        recipientId={voucherRecipientIdParam}
                      />
                    </VStack>
                  }
                  onClickDetails={() =>
                    onCreateVoucherModalApplySearch(voucherRecipientIdParam)
                  }
                  buttonText="Details"
                  showIcon
                />
              )}
              {isShowRecipientIdNotInWhitelist && (
                <CheckerResult
                  id="confirmation-step-recipient-id-whitelist-checker-result-not-in-whitelist"
                  text={
                    <VStack align="start" spacing="8px">
                      <Text textStyle="subhead1" color="neutral.800">
                        Recipient not eligible for campaign
                      </Text>
                      <MaskedIdDisplay
                        textStyle="body2"
                        color="neutral.900"
                        id="recipient-details-recipient-id-field"
                        recipientId={voucherRecipientIdParam}
                      />
                    </VStack>
                  }
                />
              )}
              {isShowRecipientIdValue && (
                <MaskedIdDisplay
                  textStyle="subhead1"
                  color="neutral.900"
                  id="recipient-details-recipient-id-field"
                  recipientId={voucherRecipientIdParam}
                />
              )}
            </VStack>
            <VStack align="start" width="100%" spacing="8px">
              <Text textStyle="caption2" color="neutral.700">
                Address
              </Text>
              {!voucherPostalCodeParam && (
                <CheckerResult
                  id="confirmation-step-address-checker-result-empty"
                  text={
                    <Text textStyle="subhead1" color="neutral.800">
                      Address is empty
                    </Text>
                  }
                  onClickDetails={() => {
                    setVoucherRecipientModalFocusState('address')
                    advanceStep(-2)
                  }}
                  buttonText="Edit"
                  showIcon={false}
                />
              )}
              {isShowAddressClaimedBefore && (
                <CheckerResult
                  id="confirmation-step-address-checker-result-claimed-before"
                  text={
                    <VStack align="start" spacing="8px">
                      <Text textStyle="subhead1" color="neutral.800">
                        Address claimed before
                      </Text>
                      <VStack>
                        <Text
                          textStyle="body2"
                          color="neutral.900"
                          whiteSpace="pre-line"
                        >
                          {formattedAddress}
                        </Text>
                      </VStack>
                    </VStack>
                  }
                  onClickDetails={() =>
                    onCreateVoucherModalApplySearch(voucherRecipientIdParam)
                  }
                  buttonText="Details"
                  showIcon
                />
              )}
              {isShowAddressInDenylist && (
                <CheckerResult
                  id="confirmation-step-address-checker-in-denylist"
                  text={
                    <VStack align="start" spacing="8px">
                      <Text textStyle="subhead1" color="neutral.800">
                        Address not eligible for campaign
                      </Text>
                      <VStack>
                        <Text
                          textStyle="body2"
                          color="neutral.900"
                          whiteSpace="pre-line"
                        >
                          {formattedAddress}
                        </Text>
                      </VStack>
                    </VStack>
                  }
                />
              )}
              {isShowAddressValue && (
                <Text
                  textStyle="subhead1"
                  color="neutral.900"
                  whiteSpace="pre-line"
                  id="recipient-details-address-field"
                >
                  {formattedAddress}
                </Text>
              )}
            </VStack>
            <VStack align="start" width="100%" spacing="4px">
              <Text textStyle="caption2" color="neutral.700">
                Name
              </Text>
              <Text
                sx={{ wordWrap: 'break-word' }}
                textStyle="subhead1"
                width="inherit"
                color="neutral.900"
                id="recipient-details-name-field"
              >
                {voucherNameParam || '-'}
              </Text>
            </VStack>
            <VStack align="start" width="100%" spacing="4px">
              <Text textStyle="caption2" color="neutral.700">
                Mobile Number
              </Text>
              <MaskedOnMonitoring>
                <Text
                  sx={{ wordWrap: 'break-word' }}
                  textStyle="subhead1"
                  width="inherit"
                  color="neutral.900"
                  id="recipient-details-contact-number-field"
                >
                  {voucherContactNumberParam || '-'}
                </Text>
              </MaskedOnMonitoring>
            </VStack>
          </VStack>
        )
      }
      cardFooter={
        <ButtonGroup>
          <Button
            data-dd-action-name="Create vouchers edit button"
            id="confirmation-step-back"
            onClick={() => advanceStep(-2)}
            variant="neutralOutline"
          >
            Edit recipient
          </Button>
          <Button
            data-dd-action-name={`Create vouchers${
              isOrangeCheckerShowing ? ' with orange checker' : ''
            }`}
            id="confirmation-step-next"
            onClick={onPrimaryClick}
          >
            {selectedVoucherType === VOUCHER_TYPES.DIGITAL &&
              `Send $${totalValueOfVouchers} vouchers via SMS`}
            {selectedVoucherType === VOUCHER_TYPES.PAPER &&
              `Print $${totalValueOfVouchers} vouchers`}
          </Button>
        </ButtonGroup>
      }
    />
  )
}

export default React.memo(ConfirmationStep)
