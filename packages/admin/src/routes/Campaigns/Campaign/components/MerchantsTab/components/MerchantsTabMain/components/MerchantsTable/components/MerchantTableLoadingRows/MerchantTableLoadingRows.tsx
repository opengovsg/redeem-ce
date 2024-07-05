import { VStack, Tr, Td, Skeleton } from '@chakra-ui/react'
import _ from 'lodash'
import React from 'react'

type MerchantTableLoadingRowsProps = Record<string, never>

const MerchantTableLoadingRows: React.FC<
  MerchantTableLoadingRowsProps
> = () => {
  return (
    <>
      {_.range(10).map((row) => (
        <Tr key={`skeleton ${row}`}>
          {_.range(6).map((col) => (
            <Td key={`skeleton ${row}-${col}`}>
              <VStack align="stretch">
                <Skeleton height="1.5rem" />
              </VStack>
            </Td>
          ))}
        </Tr>
      ))}
    </>
  )
}

export default MerchantTableLoadingRows
