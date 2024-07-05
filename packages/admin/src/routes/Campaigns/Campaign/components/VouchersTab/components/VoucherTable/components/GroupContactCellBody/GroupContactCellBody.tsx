import { Text } from '@chakra-ui/react'
import MaskedOnMonitoring from 'components/MaskedOnMonitoring'
import { removeContactNumberPrefix } from 'helpers/utils'
import React from 'react'

type GroupContactCellBodyProps = {
  group: {
    contactNumber: string | null
  }
}

const GroupContactCellBody: React.FC<GroupContactCellBodyProps> = ({
  group,
}) => {
  return (
    <MaskedOnMonitoring>
      <Text as="span">
        {removeContactNumberPrefix(group.contactNumber) || '-'}
      </Text>
    </MaskedOnMonitoring>
  )
}

export default GroupContactCellBody
