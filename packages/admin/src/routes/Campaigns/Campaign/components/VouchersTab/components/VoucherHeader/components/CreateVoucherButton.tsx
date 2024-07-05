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

type MenuItem = {
  title: string
  description?: string
  onClick?: () => void
}

type GetCreateVoucherButtonMenuItemsParams = {
  isBulkCreateCampaign: boolean
  onClickCreateNewVoucher: (() => void) | null
  onClickBulkCreateVouchers: (() => void) | null
}

type CreateVoucherButtonProps = GetCreateVoucherButtonMenuItemsParams & {
  isDisabled: boolean
}

function getCreateVoucherButtonMenuItems({
  isBulkCreateCampaign,
  onClickCreateNewVoucher,
  onClickBulkCreateVouchers,
}: GetCreateVoucherButtonMenuItemsParams): MenuItem[] {
  const menuItems = []

  if (onClickCreateNewVoucher) {
    menuItems.push({
      onClick: onClickCreateNewVoucher ?? undefined,
      title: 'Create a single voucher',
      description: 'Add an individual voucher recipient',
    })
  }

  if (isBulkCreateCampaign && onClickBulkCreateVouchers) {
    menuItems.push({
      onClick: onClickBulkCreateVouchers ?? undefined,
      title: 'Bulk-create vouchers',
      description:
        'Create multiple voucher links for your campaign by uploading a CSV',
    })
  }

  return menuItems
}

export const CreateVoucherButton = ({
  isBulkCreateCampaign,
  onClickCreateNewVoucher,
  onClickBulkCreateVouchers,
  isDisabled,
}: CreateVoucherButtonProps): JSX.Element => {
  const [isDroppedDown, setIsDroppedDown] = useState(false)

  const handleIsDroppedDown = () => {
    setIsDroppedDown((prevState) => !prevState)
  }

  const menuItems = getCreateVoucherButtonMenuItems({
    isBulkCreateCampaign,
    onClickCreateNewVoucher,
    onClickBulkCreateVouchers,
  })

  return (
    <>
      {/* 
      1. Create voucher single button
        Bulk create campaign with only create voucher permissions or 
        not bulk create campaign with create voucher permissions
      */}
      {(isBulkCreateCampaign &&
        onClickCreateNewVoucher &&
        !onClickBulkCreateVouchers) ||
      (!isBulkCreateCampaign && onClickCreateNewVoucher) ? (
        <Button
          id="create-vouchers-button"
          isDisabled={isDisabled}
          onClick={onClickCreateNewVoucher}
        >
          Create voucher
        </Button>
      ) : null}
      {/* 
      2. Bulk create voucher single button
        Bulk create campaign with only bulk-create voucher permissions
      */}
      {isBulkCreateCampaign &&
      !onClickCreateNewVoucher &&
      onClickBulkCreateVouchers ? (
        <Button isDisabled={isDisabled} onClick={onClickBulkCreateVouchers}>
          Bulk-create vouchers
        </Button>
      ) : null}
      {/* 
      3. Menu button
        Bulk create campaign with both create voucher permissions and 
        bulk-create voucher permissions
      */}
      {isBulkCreateCampaign &&
      onClickCreateNewVoucher &&
      onClickBulkCreateVouchers ? (
        <Menu
          autoSelect={false}
          gutter={0}
          onClose={() => setIsDroppedDown(false)}
          placement="bottom-end"
        >
          <MenuButton
            as={Button}
            textStyle="subhead1"
            isDisabled={isDisabled}
            onClick={handleIsDroppedDown}
            rightIcon={
              isDroppedDown ? (
                <Icon as={BiChevronUp} width="24px" height="24px" />
              ) : (
                <Icon as={BiChevronDown} width="24px" height="24px" />
              )
            }
          >
            Create vouchers
          </MenuButton>
          <MenuList
            width="19rem"
            paddingTop="8px"
            // TODO: CHECK IF BREAKING onClose={() => setIsDroppedDown(false)}
            paddingBottom="8px"
          >
            {menuItems.map(({ title, description, onClick }) => (
              <MenuItem
                key={title}
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
      ) : null}
    </>
  )
}
