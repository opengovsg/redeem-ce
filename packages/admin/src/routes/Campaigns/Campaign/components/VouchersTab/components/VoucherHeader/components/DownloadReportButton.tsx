import React, { useState } from 'react'
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Text,
  VStack,
  Icon,
} from '@chakra-ui/react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { useCampaignTransactionReports } from 'hooks/CampaignReports'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'

type MenuItem = {
  title: string
  description?: string
  isDisabled?: boolean
  onClick?: () => void | undefined
}

type DownloadReportButtonProps = {
  isBulkCreateCampaign: boolean
  canDownloadVouchers: boolean
  canDownloadTransactions: boolean
  canDownloadCampaignVoucherLinks: boolean
  onClickOpenDownloadTransactionModal: any // TODO: Better typing
  onClickDownloadVouchers: (() => void) | null
  onClickDownloadCampaignVoucherLinks: (() => void) | null
}

function getDownloadReportButtonMenuItems({
  isBulkCreateCampaign,
  canDownloadVouchers,
  canDownloadTransactions,
  canDownloadCampaignVoucherLinks,
  onClickDownloadVouchers,
  onClickOpenDownloadTransactionModal,
  onClickDownloadCampaignVoucherLinks,
}: DownloadReportButtonProps): MenuItem[] {
  const menuItems: MenuItem[] = []

  if (canDownloadVouchers) {
    menuItems.push({
      isDisabled: !onClickDownloadVouchers,
      onClick: onClickDownloadVouchers ?? undefined,
      title: 'Recipient vouchers report',
      description:
        'Voucher information such as recipient details, redemption status, etc',
    })
  }

  if (canDownloadTransactions) {
    menuItems.push({
      onClick: onClickOpenDownloadTransactionModal ?? undefined,
      title: 'Merchant transactions report',
      description: 'Merchant and payout information for accepted vouchers',
    })
  }

  if (isBulkCreateCampaign && canDownloadCampaignVoucherLinks) {
    menuItems.push({
      onClick: onClickDownloadCampaignVoucherLinks ?? undefined,
      title: 'Voucher links report',
      description: 'All voucher links created',
    })
  }

  return menuItems
}

export const DownloadReportButton = ({
  isBulkCreateCampaign,
  canDownloadVouchers,
  canDownloadTransactions,
  canDownloadCampaignVoucherLinks,
  onClickDownloadVouchers,
  onClickOpenDownloadTransactionModal,
  onClickDownloadCampaignVoucherLinks,
  isDownloadCampaignVoucherLinksLoading,
}: DownloadReportButtonProps & {
  isDownloadCampaignVoucherLinksLoading: boolean
}): JSX.Element => {
  const { campaignId } = useCampaignContext()

  const { fetchCampaignTransactionReports } = useCampaignTransactionReports(
    campaignId,
    onClickOpenDownloadTransactionModal
  )

  const [isDroppedDown, setIsDroppedDown] = useState(false)

  const handleIsDroppedDown = () => {
    setIsDroppedDown((prevState) => !prevState)
  }

  const menuItems = getDownloadReportButtonMenuItems({
    isBulkCreateCampaign,
    canDownloadVouchers,
    canDownloadTransactions,
    canDownloadCampaignVoucherLinks,
    onClickDownloadVouchers,
    onClickOpenDownloadTransactionModal: fetchCampaignTransactionReports,
    onClickDownloadCampaignVoucherLinks,
  })

  return (
    <Menu
      autoSelect={false}
      gutter={0}
      onClose={() => setIsDroppedDown(false)}
      placement="bottom-end"
    >
      <MenuButton
        as={Button}
        textStyle="subhead1"
        isLoading={isDownloadCampaignVoucherLinksLoading}
        onClick={handleIsDroppedDown}
        rightIcon={
          isDroppedDown ? (
            <Icon as={BiChevronUp} width="24px" height="24px" />
          ) : (
            <Icon as={BiChevronDown} width="24px" height="24px" />
          )
        }
        variant="outline"
      >
        Download
      </MenuButton>
      <MenuList
        width="19rem"
        paddingTop="8px"
        // TODO: CHECK IF BREAKING onClose={() => setIsDroppedDown(false)}
        paddingBottom="8px"
      >
        {menuItems.map(({ title, description, isDisabled, onClick }) => (
          <MenuItem
            key={title}
            isDisabled={isDisabled}
            onClick={() => {
              if (onClick) {
                onClick()
              }
              setIsDroppedDown(false)
            }}
          >
            <VStack alignItems="start" spacing="0px">
              <Text textStyle="body1">{title}</Text>
              <Text textStyle="body2" textColor="neutral.700">
                {description}
              </Text>
            </VStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
