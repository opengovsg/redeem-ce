import _ from 'lodash'
import React from 'react'

import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import useAuthorization from 'routes/Campaigns/Campaign/hooks/useAuthorization'
import { useVouchersTabContext } from '../../VouchersTabContext'
import VoucherSearch from '../VoucherSearch'
import { DownloadReportButton } from './components/DownloadReportButton'
import { CreateVoucherButton } from './components/CreateVoucherButton'
import useTwilio from '../../../SettingsTab/components/Settings/hooks/useTwilio'
import TwilioCredentialsInfoBox from '../../../SettingsTab/components/Settings/TwilioAccount/components/TwilioCredentialsInfoBox'

const VoucherHeader = () => {
  const {
    isBulkCreateCampaign,
    campaignDefaultVouchers,
    totalGroupedVouchersCount,
  } = useCampaignContext()
  const {
    onOpenDownloadTransactionsModal,
    onClickCreateNew,
    onDownloadCampaignVoucherReport,
    onDownloadCampaignVoucherLinks,
    isDownloadCampaignVoucherLinksLoading,
    onClickBulkCreate,
  } = useVouchersTabContext()
  const {
    canBulkCreateVouchers,
    canCreateVouchers,
    canDownloadCampaignVoucherLinks,
    canDownloadTransactions,
    canDownloadVouchers,
  } = useAuthorization()
  const { smsUsed, showShouldSmsInfoBox, isFetchingCampaignSmsUsage } =
    useTwilio()
  const isCreateVoucherButtonDisabled = _.isNull(campaignDefaultVouchers)
  const onClickCreateNewVoucher = canCreateVouchers ? onClickCreateNew : null
  const onClickBulkCreateVouchers = canBulkCreateVouchers
    ? onClickBulkCreate
    : null
  const canViewCreateVoucherButton = canCreateVouchers || canBulkCreateVouchers
  const canViewDownloadReportButton =
    canDownloadVouchers ||
    canDownloadTransactions ||
    canDownloadCampaignVoucherLinks

  return (
    <>
      <Box marginX="32px" marginY="24px">
        {!isFetchingCampaignSmsUsage && showShouldSmsInfoBox && (
          <TwilioCredentialsInfoBox smsUsed={smsUsed} />
        )}
      </Box>
      <Flex alignItems="center">
        <Text textStyle="h2" marginLeft="32px" color="neutral.800">
          Vouchers
        </Text>
        {!!totalGroupedVouchersCount && (
          <Text textStyle="subhead1" marginLeft="36px" color="neutral.900">
            {totalGroupedVouchersCount} total recipients
          </Text>
        )}
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        marginX="32px"
        marginY="24px"
      >
        <VoucherSearch />
        <HStack spacing="8px">
          {canViewCreateVoucherButton && (
            <CreateVoucherButton
              isBulkCreateCampaign={isBulkCreateCampaign}
              onClickCreateNewVoucher={onClickCreateNewVoucher}
              onClickBulkCreateVouchers={onClickBulkCreateVouchers}
              isDisabled={isCreateVoucherButtonDisabled}
            />
          )}
          {canViewDownloadReportButton && (
            <DownloadReportButton
              isBulkCreateCampaign={isBulkCreateCampaign}
              canDownloadVouchers={canDownloadVouchers}
              canDownloadTransactions={canDownloadTransactions}
              canDownloadCampaignVoucherLinks={canDownloadCampaignVoucherLinks}
              onClickOpenDownloadTransactionModal={
                onOpenDownloadTransactionsModal
              }
              onClickDownloadVouchers={onDownloadCampaignVoucherReport}
              onClickDownloadCampaignVoucherLinks={
                onDownloadCampaignVoucherLinks
              }
              isDownloadCampaignVoucherLinksLoading={
                isDownloadCampaignVoucherLinksLoading
              }
            />
          )}
        </HStack>
      </Flex>
    </>
  )
}

export default React.memo(VoucherHeader)
