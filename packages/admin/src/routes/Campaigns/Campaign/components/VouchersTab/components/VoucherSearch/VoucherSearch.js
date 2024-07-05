import React from 'react'
import PropTypes from 'prop-types'
import BaseInput from 'components/BaseInput'
import { Box, Icon } from '@chakra-ui/react'
import { BiSearch, BiX } from 'react-icons/bi'
import IconButton from 'components/IconButton'

// TODO: Clean up the remaining toast examples
// import { useToast } from 'data/Toasts'
// import { TYPE } from 'components/Toast'

export default function VoucherSearch({ searchValue, onPrimaryClick }) {
  return (
    <Box>
      <BaseInput
        id="voucher-search-input"
        placeholder="Search by recipient identifier, address, or mobile"
        leftElement={<Icon as={BiSearch} width="1.25rem" height="1.25rem" />}
        rightElement={
          searchValue && (
            <IconButton
              icon={BiX}
              variant="unstyled"
              onClick={() => onPrimaryClick('')}
            />
          )
        }
        width="34.25rem"
        value={searchValue}
        onChange={(e) => onPrimaryClick(e.target.value)}
      />
    </Box>
  )
}

VoucherSearch.propTypes = {
  searchValue: PropTypes.string,
  onPrimaryClick: PropTypes.func.isRequired,
}
