import React from 'react'
import { Table, Tbody, Td, Text, Tr, HStack, Tag } from '@chakra-ui/react'
import { removeContactNumberPrefix } from 'helpers/utils'

type BeforeAndAfterTextProps = {
  before: string
  after: string
}

function BeforeAndAfterText({ before, after }: BeforeAndAfterTextProps) {
  return (
    <Text textStyle="body2" color="neutral.800">
      {`${before} to `}
      <Text as="span" textStyle="subhead2" color="primary.500">
        {after}
      </Text>
    </Text>
  )
}

type VoucherEventDetailsProps = {
  event: any
}
// The extra union type is because the old code assumes all to be string - string mapping which makes it harder to render a new component that requires
// a more complicated display. This might incur an extra <Text> wrapper but it shouldnt be much of a UI issue in terms of loading and looks
function getEventDetails(event: any): Record<string, string | React.ReactNode> {
  switch (event.event) {
    case 'grouped_voucher_send':
      return {
        Administrator: event.actorEmail,
        'Mobile number': removeContactNumberPrefix(event.data.contactNumber),
      }
    case 'grouped_voucher_create': {
      const metadata = event.data?.whitelistMetadata
      return {
        'Total value': `${event.data.totalVoucherValue}`,
        ...(metadata && {
          Eligibility: (
            <HStack>
              <Text>{`Recipient ${metadata.isInWhitelist ? '' : 'not '}in ${
                metadata?.fileName
              }`}</Text>
              <Tag
                textStyle="caption1"
                padding="4px"
                color="white"
                fontSize="12px"
                borderRadius="4px"
                backgroundColor="neutral.700"
              >{`V${metadata?.versionIndex}`}</Tag>
            </HStack>
          ),
        }),
        Administrator: event.actorEmail,
      }
    }
    case 'grouped_voucher_bulk_create': {
      return {
        'Total value': `${event.data.totalVoucherValue}`,
        Administrator: event.actorEmail,
      }
    }
    case 'grouped_voucher_print':
      return {
        Administrator: event.actorEmail,
      }
    case 'grouped_voucher_edit': {
      const beforeContactNumber = event.data.before.contactNumber
      const afterContactNumber = event.data.after.contactNumber
      const beforeName = event.data.before.name
      const afterName = event.data.after.name

      const hasMobileNumberChanges = beforeContactNumber !== afterContactNumber
      const hasNameChanges = beforeName !== afterName
      return {
        Administrator: event.actorEmail,
        ...(hasMobileNumberChanges && {
          'Mobile number': (
            <BeforeAndAfterText
              before={removeContactNumberPrefix(beforeContactNumber) || '-'}
              after={removeContactNumberPrefix(afterContactNumber) || '-'}
            />
          ),
        }),
        ...(hasNameChanges && {
          Name: (
            <BeforeAndAfterText
              before={beforeName || '-'}
              after={afterName || '-'}
            />
          ),
        }),
      }
    }
    case 'grouped_voucher_redemption':
      return {
        'Amount used': `$${event.data.totalVoucherValue}`,
        'Merchant name': event.data.merchantShopName,
        'Merchant shop': event.data.merchantId,
        'Transaction ID': event.data.transactionId,
      }
    case 'grouped_voucher_void':
      return {
        Administrator: event.actorEmail,
      }
    default:
      return event.data
  }
}

const VoucherEventDetails: React.FC<VoucherEventDetailsProps> = ({ event }) => {
  const details = getEventDetails(event)
  return (
    <Table variant="unstyled">
      <Tbody>
        {Object.keys(details).map((key) => (
          <Tr key={key} paddingY={0}>
            <Td
              paddingTop="8px"
              paddingRight="16px"
              paddingBottom={0}
              _first={{ paddingLeft: 0 }}
            >
              <Text textStyle="body2" color="neutral.700">
                {key}
              </Text>
            </Td>
            <Td paddingTop="8px" paddingBottom={0} paddingLeft={0}>
              <Text textStyle="body2" color="neutral.700">
                {details[key]}
              </Text>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default VoucherEventDetails
