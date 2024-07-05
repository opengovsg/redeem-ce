import React from 'react'
import BaseInput from 'components/BaseInput'
import { Box, Icon } from '@chakra-ui/react'
import { BiSearch, BiX } from 'react-icons/bi'
import IconButton from 'components/IconButton'

type AdminSearchProps = {
  searchValue: string
  onPrimaryClick: (value: string) => void
}

const AdminSearch: React.FC<AdminSearchProps> = ({
  searchValue,
  onPrimaryClick,
}) => {
  return (
    <Box>
      <BaseInput
        placeholder="Search all users"
        leftElement={<Icon as={BiSearch} width="1.25rem" height="1.25rem" />}
        rightElement={
          searchValue && (
            <IconButton
              aria-label="clear"
              icon={BiX}
              variant="unstyled"
              onClick={() => onPrimaryClick('')}
            />
          )
        }
        width="27rem"
        value={searchValue}
        onChange={(e) => onPrimaryClick(e.target.value)}
      />
    </Box>
  )
}

export default AdminSearch
