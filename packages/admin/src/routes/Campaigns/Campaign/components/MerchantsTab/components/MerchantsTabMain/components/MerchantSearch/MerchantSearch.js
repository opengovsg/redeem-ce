import React from 'react'
import PropTypes from 'prop-types'

import { Box, Icon } from '@chakra-ui/react'
import { BiSearch, BiX } from 'react-icons/bi'
import BaseInput from 'components/BaseInput'
import IconButton from 'components/IconButton'

export default function MerchantSearch({ searchValue, setSearchedValue }) {
  return (
    <Box>
      <BaseInput
        placeholder="Search by name, address or postal code"
        leftElement={<Icon as={BiSearch} width="1.25rem" height="1.25rem" />}
        rightElement={
          searchValue && (
            <IconButton
              icon={BiX}
              variant="unstyled"
              onClick={() => setSearchedValue('')}
            />
          )
        }
        width="34.25rem"
        value={searchValue}
        onChange={(e) => setSearchedValue(e.target.value)}
      />
    </Box>
  )
}

MerchantSearch.propTypes = {
  searchValue: PropTypes.string,
  setSearchedValue: PropTypes.func.isRequired,
}
