import { Button, Divider, Flex, VStack } from '@chakra-ui/react'
import _ from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import SideNavbar from 'components/SideNavbar'
import { MerchantTypeInput } from './components/MerchantTypesInput'
import { RolesInput } from './components/RolesInput'
import { UncontrolledTextInput } from './components/UncontrolledTextInput'
import { OperationsPageProps } from './types'
import { AttachmentInput } from './components/AttachmentInput'
import { OperationsHeader } from './components/OperationsHeader'
import {
  TEMPLATE_CAMPAIGN_ID,
  TEMPLATE_CATEGORY,
  TEMPLATE_MERCHANT_ID,
  TEMPLATE_USER_ID,
} from '../../constants/template'

export const OperationsPage = ({
  isLoading,
  results,
  setResults,
  operation,
  campaignId,
  setCampaignId,
  campaignIdFrom,
  setCampaignIdFrom,
  campaignIdTo,
  setCampaignIdTo,
  userId,
  setUserId,
  merchantId,
  setMerchantId,
  parsedCsv,
  setParsedCsv,
  onClick,
  roles,
  setRoles,
  merchantType,
  setMerchantType,
  category,
  setCategory,
  style,
}: OperationsPageProps): JSX.Element => {
  const hiddenCsvLinkRef = React.createRef<
    CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }
  >()
  const [csvFile, setCsvFile] = useState<File | undefined>(undefined)

  // TODO: CLEANUP, this is unreadable, terrible
  // We need to determine when sufficient input is filled up for each operation to enable the run operations button.
  const isCSVFilledUp = !!csvFile && !!parsedCsv
  const isCampaignIdFilledUp = !_.isUndefined(campaignId) && !!campaignId

  // 1. Adding/Removing Global Permissions
  // Input: Roles, CSV
  const isGlobalPermissionsFilledUp =
    !_.isUndefined(roles) && !_.isEmpty(roles) && isCSVFilledUp

  // 2. Create And Add Merchants To Campaign / Remove Merchants From Campaign
  // Input: Campaign ID, CSV
  const isCreateAndAddOrRemoveMerchantsFilledUp =
    isCampaignIdFilledUp && isCSVFilledUp && _.isUndefined(merchantType)

  // 3. Add Merchants To Campaign
  // Input: Campaign ID, CSV, merchant type
  const isAddMerchantsToCampaignFilledUp =
    isCampaignIdFilledUp &&
    isCSVFilledUp &&
    !_.isUndefined(merchantType) &&
    !!merchantType

  // 4. Send Access Codes, Create Users
  // Input: CSV
  const isSendAccessCodesOrCreateUsersFilledUp =
    isCSVFilledUp &&
    _.isUndefined(campaignId) &&
    _.isUndefined(category) &&
    _.isUndefined(campaignId) &&
    _.isUndefined(merchantType) &&
    _.isUndefined(roles)

  // 7. Voucher Category
  // Input: Category, CSV
  const isCategoryFilledUp =
    !_.isUndefined(category) && !!category && isCSVFilledUp

  // 8. Create API key
  // Input: User ID, merchant ID optional
  const isCreateApiKeyFilledUp = !_.isUndefined(userId) && !!userId

  // 9. Copy Merchants
  // Input: Campaign ID from, Campaign ID to
  const isCopyMerchantsFilledUp =
    !_.isUndefined(campaignIdFrom) &&
    !!campaignIdFrom &&
    !_.isUndefined(campaignIdTo) &&
    !!campaignIdTo

  // 10. UAT
  const isUatFilledUp = !_.isUndefined(merchantId) && isCSVFilledUp

  const isInputFilledUp =
    isGlobalPermissionsFilledUp ||
    isCreateAndAddOrRemoveMerchantsFilledUp ||
    isAddMerchantsToCampaignFilledUp ||
    isSendAccessCodesOrCreateUsersFilledUp ||
    isCategoryFilledUp ||
    isCreateApiKeyFilledUp ||
    isCopyMerchantsFilledUp ||
    isUatFilledUp

  // Autodownload only after
  // 1. all input is filled up
  // 2. results have been set through api call
  useEffect(() => {
    if (isInputFilledUp && !_.isEmpty(results)) {
      hiddenCsvLinkRef?.current?.link.click()
      setResults([])
    }
  }, [isInputFilledUp, results, setResults])

  return (
    <Flex minWidth="100%">
      <SideNavbar id="merchant-nav-tabs" to="/merchants" />
      <VStack
        alignItems="flex-start"
        padding="40px 32px"
        backgroundColor="white"
        spacing={4}
        width="100%"
        // To override pre-defined styling
        style={style}
      >
        <OperationsHeader operation={operation} />
        <Divider />
        {!_.isUndefined(merchantType) && setMerchantType ? (
          <MerchantTypeInput
            merchantType={merchantType}
            setMerchantType={setMerchantType}
          />
        ) : null}
        {setCampaignId ? (
          <UncontrolledTextInput
            title="Campaign ID"
            template={TEMPLATE_CAMPAIGN_ID}
            setText={setCampaignId}
          />
        ) : null}
        {setCampaignIdFrom ? (
          <UncontrolledTextInput
            title="Campaign ID From"
            template={TEMPLATE_CAMPAIGN_ID}
            setText={setCampaignIdFrom}
          />
        ) : null}
        {setCampaignIdTo ? (
          <UncontrolledTextInput
            title="Campaign ID To"
            template={TEMPLATE_CAMPAIGN_ID}
            setText={setCampaignIdTo}
          />
        ) : null}
        {setUserId ? (
          <UncontrolledTextInput
            title="User ID"
            template={TEMPLATE_USER_ID}
            setText={setUserId}
          />
        ) : null}
        {setMerchantId ? (
          <UncontrolledTextInput
            title="Merchant ID"
            template={TEMPLATE_MERCHANT_ID}
            setText={setMerchantId}
          />
        ) : null}
        {setCategory ? (
          <UncontrolledTextInput
            title="Category"
            template={TEMPLATE_CATEGORY}
            setText={setCategory}
          />
        ) : null}
        {roles && setRoles ? (
          <RolesInput roles={roles} setRoles={setRoles} />
        ) : null}
        {parsedCsv && setParsedCsv ? (
          <AttachmentInput
            csvFile={csvFile}
            setCsvFile={setCsvFile}
            setParsedCsv={setParsedCsv}
          />
        ) : null}
        <CSVLink
          data={results}
          filename={`${moment()}-${operation.path}-results.csv`}
          ref={hiddenCsvLinkRef}
          target="_blank"
        />
        <Button
          isDisabled={!isInputFilledUp}
          isLoading={isLoading}
          onClick={onClick}
          variant="solid"
        >
          Run operations
        </Button>
      </VStack>
    </Flex>
  )
}
