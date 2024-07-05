import { HStack, VStack, Box, Text } from '@chakra-ui/react'
import NextPrevPagination from 'components/NextPrevPagination'
import moment from 'moment'
import React from 'react'
import { MerchantEvent } from 'services/RedeemApi/types'
import { MerchantEventBody } from './MerchantEventBody'

type MerchantHistoryProps = {
  events?: MerchantEvent[]
  getNextPage: (() => void) | null
  getPreviousPage: (() => void) | null
  isLoadingNextPage: boolean
  isLoadingPreviousPage: boolean
}

const getReadableEventLabel = (event: string) => {
  switch (event) {
    case 'merchant_edit_general':
      return 'edited merchant shop details'
    case 'merchant_edit_finance':
      return 'edited merchant payment details'
    case 'merchant_send_access_code':
      return 'sent access code to merchant'
    case 'merchant_notify_payment_info_updated':
      return 'notified merchant about payment info update'
    case 'merchant_create_api_key':
      return 'created an API key'
    default:
      return event
  }
}

const MerchantHistory: React.FC<MerchantHistoryProps> = ({
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
                <MerchantEventBody
                  event={event.event}
                  data={event.data}
                  merchantId={event.merchantId}
                />
              </Box>
            </VStack>
            <Text textStyle="body1" color="neutral.700" textAlign="end">
              {moment(event.createdAt).format('Do MMMM YY, HH:mm')}
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

export default React.memo(MerchantHistory)
