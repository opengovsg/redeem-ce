import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Text } from '@chakra-ui/react'

import CurrencyDisplay from 'components/shared/CurrencyDisplay'
import ValueCardSkeleton from 'components/shared/ValueCardSkeleton'
import CardFrame from 'components/shared/CardFrame'

const TitleValueCard = ({ title, value, isLoading }) => (
  <CardFrame>
    <Flex
      flexDir='column'
      padding={4}
      backgroundColor='white'
    >
      {isLoading || value === undefined ? (
        <ValueCardSkeleton />
      ) : (
        <>
          <Text>{title}</Text>
          <CurrencyDisplay
            signSize={18}
            valueSize={40}
            value={value}
          />
        </>
      )}
    </Flex>
  </CardFrame>
)

TitleValueCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number,
  isLoading: PropTypes.bool,
}

export default TitleValueCard
