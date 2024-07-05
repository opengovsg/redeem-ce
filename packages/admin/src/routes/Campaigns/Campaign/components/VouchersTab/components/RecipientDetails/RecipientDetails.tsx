import {
  VStack,
  Box,
  StackProps,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react'
import MaskedOnMonitoring from 'components/MaskedOnMonitoring'
import MaskedIdDisplay from 'components/MaskedIdDisplay'
import React from 'react'

type RecipientDetailsProps = {
  address?: string
  recipientId?: string | null
  contactNumber?: string
  name?: string | null
  emptyRecipientIdWarningText?: string
} & StackProps

const RecipientDetails: React.FC<RecipientDetailsProps> = ({
  address,
  recipientId,
  contactNumber,
  name,
  emptyRecipientIdWarningText,
  ...stackProps
}) => {
  return (
    <VStack
      sx={{
        '> *': {
          paddingX: '16px',
        },
      }}
      align="start"
      paddingBottom="16px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="primary.400"
      borderRadius="4px"
      spacing="16px"
      {...stackProps}
    >
      <Box
        width="100%"
        color="primary.700"
        background="primary.200"
        paddingY="8px"
      >
        <Text textStyle="subhead2">Claimed by</Text>
      </Box>
      <Stat size="text">
        <StatLabel>Identifier</StatLabel>
        <StatNumber>
          <MaskedIdDisplay
            id="recipient-details-recipient-id-field"
            recipientId={recipientId}
            fallbackElement={
              emptyRecipientIdWarningText ? (
                <Text as="span" color="danger.500" fontWeight={600}>
                  {emptyRecipientIdWarningText}
                </Text>
              ) : (
                '-'
              )
            }
          />
        </StatNumber>
      </Stat>
      <Stat size="text">
        <StatLabel>Registered Address</StatLabel>
        <StatNumber>{address || '-'}</StatNumber>
      </Stat>
      <Stat size="text">
        <StatLabel>Name</StatLabel>
        <StatNumber>{name || '-'}</StatNumber>
      </Stat>
      <Stat size="text">
        <StatLabel>Mobile number</StatLabel>
        <MaskedOnMonitoring>
          <StatNumber id="recipient-details-contact-number-field">
            {contactNumber || '-'}
          </StatNumber>
        </MaskedOnMonitoring>
      </Stat>
    </VStack>
  )
}

export default RecipientDetails
