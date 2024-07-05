import { Text } from '@chakra-ui/react'
import React from 'react'
import { PERMISSION_GROUPS } from '../../../../../../constants'

type AdminRoleTagProps = {
  role: keyof typeof PERMISSION_GROUPS
}

const AdminRoleTag: React.FC<AdminRoleTagProps> = ({ role }) => {
  return (
    <Text
      key={role}
      textStyle="subhead2"
      color="neutral.800"
      background="neutral.200"
      borderRadius="20px"
      paddingX="8px"
      paddingY="4px"
    >
      {PERMISSION_GROUPS[role]?.label}
    </Text>
  )
}

export default AdminRoleTag
