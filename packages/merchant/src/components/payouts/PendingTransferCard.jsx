import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from '@chakra-ui/react'
import { Badge, BadgeRightIcon } from '@opengovsg/design-system-react'
import { BiTime } from 'react-icons/bi'

import CurrencyDisplay from 'components/shared/CurrencyDisplay'

const PendingTransferCard = ({ amountPendingTransfer = 0 }) => (
  <Flex
    padding={4}
    backgroundColor='#1B1E44'
    alignItems='center'
    rowGap={2}
    columnGap={4}
    flexWrap='wrap-reverse'
  >
    <CurrencyDisplay
      signSize={18}
      valueSize={40}
      value={amountPendingTransfer}
    />
    <Badge
      variant='solid'
      colorScheme='warning'
    >
      To be transferred
      <BadgeRightIcon
        boxSize={4}
        as={BiTime}
      />
    </Badge>
  </Flex>
)

PendingTransferCard.propTypes = {
  amountPendingTransfer: PropTypes.number,
}

export default PendingTransferCard
