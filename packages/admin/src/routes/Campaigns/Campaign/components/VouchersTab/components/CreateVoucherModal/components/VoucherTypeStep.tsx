import React from 'react'
import { HStack, Button } from '@chakra-ui/react'
import Tile from 'components/Tile'

import { BiMobileAlt, BiNote } from 'react-icons/bi'

import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import { VOUCHER_TYPES } from '../constants'
import { useVouchersTabContext } from '../../../VouchersTabContext'
import StepCard from './common/StepCard'

const CreateVoucherVoucherTypeStep = () => {
  const { campaignDefaultVouchers } = useCampaignContext()
  const { setCurrentCreateStep, setSelectedVoucherType, selectedVoucherType } =
    useVouchersTabContext()

  const hasDefaultVouchers = Boolean(
    campaignDefaultVouchers && campaignDefaultVouchers.length
  )
  const onClickNext = () => {
    setCurrentCreateStep((step) => step + 1)
  }

  return (
    <StepCard
      header="Voucher Type"
      cardBody={
        <HStack width="100%" spacing="8px">
          <Tile
            id="paper-voucher-tile"
            icon={BiNote}
            title="Paper voucher"
            subtitle="Print voucher for recipient"
            onClick={() => setSelectedVoucherType(VOUCHER_TYPES.PAPER)}
            isSelected={selectedVoucherType === VOUCHER_TYPES.PAPER}
          />
          <Tile
            id="digital-voucher-tile"
            icon={BiMobileAlt}
            title="Digital voucher"
            subtitle="Send voucher link to recipient via SMS"
            onClick={() => setSelectedVoucherType(VOUCHER_TYPES.DIGITAL)}
            isSelected={selectedVoucherType === VOUCHER_TYPES.DIGITAL}
          />
        </HStack>
      }
      cardFooter={
        <Button
          disabled={!hasDefaultVouchers || !selectedVoucherType}
          id="voucher-type-next-button"
          onClick={onClickNext}
        >
          Next
        </Button>
      }
    />
  )
}

export default CreateVoucherVoucherTypeStep
