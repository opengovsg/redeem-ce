import React from 'react'
import { HStack, Text } from '@chakra-ui/react'
import { isVoided } from 'helpers/utils'
import MaskedIdDisplay from 'components/MaskedIdDisplay'

type GroupRecipientIdCellBodyProps = {
  group: any // TODO: Stricter typing
}

const GroupRecipientIdCellBody: React.FC<GroupRecipientIdCellBodyProps> = ({
  group,
}) => {
  return (
    <HStack display="flex" spacing="8px">
      <Text>
        <MaskedIdDisplay recipientId={group?.recipientId} fallbackElement="-" />
      </Text>
      {isVoided(group) && (
        <Text
          textStyle="caption1"
          padding="4px"
          color="primary.100"
          background="neutral.700"
          borderRadius="4px"
        >
          Void
        </Text>
      )}
    </HStack>
  )
}

export default GroupRecipientIdCellBody
