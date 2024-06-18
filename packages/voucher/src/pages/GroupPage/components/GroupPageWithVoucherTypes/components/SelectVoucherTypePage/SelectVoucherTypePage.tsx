import React from 'react'
import {VStack, useDisclosure} from '@chakra-ui/react'
import GroupPageHeader from 'pages/GroupPage/components/GroupPageHeader'
import GroupPageCampaignError from 'pages/GroupPage/components/GroupPageCampaignError'
import {Campaign} from 'types/campaign'
import {GroupedVoucher, Voucher} from 'types/voucher'
import InfoAndHelpDrawer from 'pages/GroupPage/components/InfoAndHelpDrawer'
import TransactionHistoryDrawer from 'pages/GroupPage/components/TransactionHistoryDrawer'
import SelectVoucherTypeMain from './components/SelectVoucherTypeMain'

type SelectVoucherTypePageProps = {
  campaign: Campaign
  address: string
  groupData: GroupedVoucher
  onClickCopy: () => void
  hasVoidedVoucher: boolean
  vouchersGroupedByType: Record<string, Voucher[]>
}

const SelectVoucherTypePage = ({
  campaign,
  address,
  groupData,
  onClickCopy,
  hasVoidedVoucher,
  vouchersGroupedByType,
}: SelectVoucherTypePageProps) => {
  const {
    onClose: closeTransactionHistoryDrawer,
    onOpen: openTransactionHistoryDrawer,
    isOpen: isTransactionHistoryDrawerOpen,
  } = useDisclosure({defaultIsOpen: false})
  const {
    onClose: closeInfoAndHelpDrawer,
    onOpen: openInfoAndHelpDrawer,
    isOpen: isInfoAndHelpDrawerOpen,
  } = useDisclosure({defaultIsOpen: false})

  const isCampaignValid = campaign.validity === 'campaign_valid'
  const isInteractionDisabled = !isCampaignValid

  return (
    <VStack
      align='center'
      flexGrow={1}
      background={isInteractionDisabled ? 'neutral.200' : 'primary.800'}
      id='select-voucher-type-page'
      spacing='0'
    >
      <GroupPageHeader
        logoSrc={campaign?.logoUrl}
        address={address}
        buttonActiveBackgroundColor='#4C5178'
        buttonBackgroundColor='#626588'
        onClickCopy={onClickCopy}
        onClickHelp={openInfoAndHelpDrawer}
        isInteractionDisabled={isInteractionDisabled}
        hasVoidedVoucher={hasVoidedVoucher}
        colorScheme='primary'
        campaignName={campaign?.name}
        campaignExpiresAt={campaign?.validityEnd}
        campaignOrganiserFeedbackUrl={campaign?.organiserFeedbackUrl}
      />
      {/* Only if campaign is within the valid period then we will render normally. 
            Otherwise, assume it is an error and throw to GroupPageCampaignError to handle. */}
      {isCampaignValid ? (
        <SelectVoucherTypeMain
          onClickOpen={openTransactionHistoryDrawer}
          vouchersGroupedByType={vouchersGroupedByType}
        />
      ) : (
        <GroupPageCampaignError campaign={campaign} />
      )}
      <InfoAndHelpDrawer
        isOpen={isInfoAndHelpDrawerOpen}
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
        groupId={groupData.id}
      />
    </VStack>
  )
}

export default React.memo(SelectVoucherTypePage)
