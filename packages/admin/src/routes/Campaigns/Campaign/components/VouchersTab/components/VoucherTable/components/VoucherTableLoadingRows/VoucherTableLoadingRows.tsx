import { VStack, Tr, Td, Skeleton } from '@chakra-ui/react'
import _ from 'lodash'
import React from 'react'

type VoucherTableLoadingRowsProps = Record<string, never>

const VoucherTableLoadingRows: React.FC<VoucherTableLoadingRowsProps> = () => {
  return (
    <>
      {_.range(10).map((row) => (
        <Tr key={`skeleton ${row}`}>
          {_.range(4).map((col) => (
            <Td key={`skeleton ${row}-${col}`}>
              <VStack align="stretch">
                <Skeleton height="1.5rem" />
                <Skeleton height="1.25rem" />
              </VStack>
            </Td>
          ))}
        </Tr>
      ))}
    </>
  )
}

export default VoucherTableLoadingRows
