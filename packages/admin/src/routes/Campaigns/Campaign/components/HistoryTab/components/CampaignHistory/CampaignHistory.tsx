import { HStack, VStack, Box, Text } from '@chakra-ui/react'
import NextPrevPagination from 'components/NextPrevPagination'
import moment from 'moment'
import React from 'react'
import { CampaignEvent } from 'services/RedeemApi/types'
import { CampaignEventBody } from './CampaignEventBody'

type CampaignHistoryProps = {
  events?: CampaignEvent[]
  getNextPage: (() => void) | null
  getPreviousPage: (() => void) | null
  isLoadingNextPage: boolean
  isLoadingPreviousPage: boolean
}

const getReadableEventLabel = (event: string) => {
  switch (event) {
    case 'campaign_create':
      return 'created a campaign'
    case 'campaign_edit_settings':
      return 'edited campaign'
    case 'campaign_create_user_roles':
      return 'added a campaign user'
    case 'campaign_delete_user_roles':
      return 'removed a campaign user'
    case 'campaign_update_user_roles':
      return "edited a campaign user's permissions"
    case 'campaign_export_settlements':
      return 'exported payout report'
    case 'campaign_export_vouchers':
      return 'exported voucher report'
    case 'campaign_export_transactions':
      return 'exported transaction report'
    case 'campaign_upload_whitelist':
      return 'uploaded recipient whitelist'
    case 'campaign_download_user_roles':
      return 'exported user permissions report'
    case 'campaign_add_twilio_credentials':
      return 'added Twilio credentials to campaign'
    case 'campaign_export_voucher_links':
      return 'exported voucher link report'
    case 'campaign_bulk_create':
      return 'bulk created vouchers'
    case 'campaign_add_merchant':
      return 'added a merchant from campaign'
    case 'campaign_remove_merchant':
      return 'removed a merchant from campaign'
    case 'campaign_add_payout_source':
      return 'added bank account for the campaign'
    case 'campaign_enable_payout':
      return `enabled payouts from the campaign's bank account`
    case 'campaign_disable_payout':
      return `disabled payouts from the campaign's bank account`
    default:
      return event
  }
}

const CampaignHistory: React.FC<CampaignHistoryProps> = ({
  events,
  getNextPage,
  getPreviousPage,
  isLoadingNextPage,
  isLoadingPreviousPage,
}) => {
  return (
    <VStack align="stretch">
      <VStack align="stretch" spacing={0}>
        {events?.map((event) => (
          <HStack
            key={event.id}
            align="start"
            justify="space-between"
            borderStyle="solid"
            borderColor="neutral.300"
            borderBottomWidth="1px"
            paddingX="36px"
            paddingY="18px"
          >
            <VStack align="start" spacing="16px">
              <Box color="neutral.900" textAlign="start">
                <Text textStyle="subhead1" display="inline">
                  {event.actorEmail}
                </Text>{' '}
                <Text textStyle="body1" display="inline">
                  {getReadableEventLabel(event.event)}
                </Text>
              </Box>
              <Box textStyle="subhead2" color="neutral.700">
                <CampaignEventBody event={event.event} data={event.data} />
              </Box>
            </VStack>
            <Text textStyle="body1" color="neutral.700" textAlign="end">
              {moment(event.createdAt).format('Do MMM YY, HH:mm')}
            </Text>
          </HStack>
        ))}
      </VStack>
      <NextPrevPagination
        isLoadingNextPage={isLoadingNextPage}
        isLoadingPreviousPage={isLoadingPreviousPage}
        onClickNext={getNextPage}
        onClickPrevious={getPreviousPage}
      />
    </VStack>
  )
}

export default React.memo(CampaignHistory)
