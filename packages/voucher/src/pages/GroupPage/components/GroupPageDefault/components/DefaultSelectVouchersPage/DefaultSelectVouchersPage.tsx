import React, {useCallback} from 'react'
import {Flex, useDisclosure} from '@chakra-ui/react'
import {
  useGetIsVoucherSelected,
  useUnselectUsedVouchers,
} from 'pages/GroupPage/hooks'
import {useClipboard} from 'hooks/useClipboard'
import {Campaign} from 'types/campaign'
import {Voucher} from 'types/voucher'
import GroupPageBottomOverlay from '../../../GroupPageBottomOverlay'
import GroupPageHeader from '../../../GroupPageHeader'
import GroupPageMain from '../../../GroupPageMain'
import InfoAndHelpDrawer from '../../../InfoAndHelpDrawer'
import {getHasVoidedVoucher, getVouchersAmountLeft} from 'helpers/vouchers'
import {useNavigateWithCurrentSearchParams} from 'helpers/navigate'
import TransactionHistoryDrawer from 'pages/GroupPage/components/TransactionHistoryDrawer'
import GroupPageCampaignError from 'pages/GroupPage/components/GroupPageCampaignError'

type DefaultSelectVouchersPageProps = {
  selectedVouchers: Voucher[]
  vouchersToRender: Voucher[]
  onClickVoucher: (voucher: Voucher) => void
  isLimitReached: boolean
  address: string
  groupId: string
  campaign: Campaign
  unselectVouchersById: (voucherIds: string[]) => void
}

const DefaultSelectVouchersPage = ({
  vouchersToRender,
  selectedVouchers,
  onClickVoucher,
  isLimitReached,
  address,
  groupId,
  campaign,
  unselectVouchersById,
}: DefaultSelectVouchersPageProps) => {
  const navigateWithCurrentSearchParams = useNavigateWithCurrentSearchParams()
  const {
    onClose: closeInfoAndHelpDrawer,
    onOpen: openInfoAndHelpDrawer,
    isOpen: isInfoAndHelpDrawerOpen,
  } = useDisclosure({defaultIsOpen: false})
  const {
    onClose: closeTransactionHistoryDrawer,
    onOpen: openTransactionHistoryDrawer,
    isOpen: isTransactionHistoryDrawerOpen,
  } = useDisclosure({defaultIsOpen: false})
  useUnselectUsedVouchers({selectedVouchers, unselectVouchersById})

  const amountLeft = getVouchersAmountLeft(vouchersToRender)
  const hasVoidedVoucher = getHasVoidedVoucher(vouchersToRender)
  const selectedVouchersTotalValue = getVouchersAmountLeft(selectedVouchers)

  const getIsVoucherSelected = useGetIsVoucherSelected(selectedVouchers)
  const onClickCopy = useClipboard({textToCopy: window.location.href})
  const onClickShowQr = useCallback(
    () => navigateWithCurrentSearchParams('show'),
    [navigateWithCurrentSearchParams],
  )

  const isCampaignValid = campaign.validity === 'campaign_valid'
  const isInteractionDisabled = !isCampaignValid

  return (
    <>
      <Flex
        alignItems='center'
        flexDirection='column'
        flexGrow={1}
        background={isInteractionDisabled ? 'neutral.200' : 'primary.800'}
        id='voucher-group-page'
      >
        <GroupPageHeader
          logoBackgroundColor={campaign?.logoBackgroundColor}
          logoSrc={campaign?.logoUrl}
          address={address}
          onClickCopy={onClickCopy}
          onClickHelp={openInfoAndHelpDrawer}
          isInteractionDisabled={isInteractionDisabled}
          hasVoidedVoucher={hasVoidedVoucher}
          colorScheme='primary'
          campaignName={campaign?.name}
          campaignExpiresAt={campaign?.validityEnd}
          campaignOrganiserFeedbackUrl={campaign?.organiserFeedbackUrl}
          campaignMerchantListUrl={campaign?.merchantListUrl}
        />
        {/* Only if campaign is within the valid period then we will render normally. 
            Otherwise, assume it is an error and throw to GroupPageCampaignError to handle. */}
        {isCampaignValid ? (
          <>
            <GroupPageMain
              vouchersToRender={vouchersToRender}
              getIsVoucherSelected={getIsVoucherSelected}
              onClickVoucher={onClickVoucher}
              isLimitReached={isLimitReached}
              isScrollable={false}
              amountLeft={amountLeft}
              campaignTncUrl={campaign?.tncUrl}
              onClickHistory={openTransactionHistoryDrawer}
            />
            <GroupPageBottomOverlay
              selectedVouchersTotalValue={selectedVouchersTotalValue}
              onClickNext={onClickShowQr}
              showButton={!!selectedVouchers.length}
            />
          </>
        ) : (
          <GroupPageCampaignError campaign={campaign} />
        )}
      </Flex>
      <InfoAndHelpDrawer
        isOpen={isInfoAndHelpDrawerOpen}
        onClickCopy={onClickCopy}
        onCloseClick={closeInfoAndHelpDrawer}
        campaignAdvisoryUrl={campaign?.advisoryUrl}
        campaignOrganiserName={campaign?.organiserName}
        campaignOrganiserFeedbackUrl={campaign?.organiserFeedbackUrl}
        campaignOrganiserLocation={campaign?.organiserLocation}
        campaignOrganiserContactNumber={campaign?.organiserContactNumber}
        campaignMerchantListUrl={campaign?.merchantListUrl}
        campaignTncUrl={campaign?.tncUrl}
      />
      <TransactionHistoryDrawer
        isOpen={isTransactionHistoryDrawerOpen}
        onCloseClick={closeTransactionHistoryDrawer}
        groupId={groupId}
      />
    </>
  )
}

export default React.memo(DefaultSelectVouchersPage)
