import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import {
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Text,
  Td,
  Button,
  Flex,
} from '@chakra-ui/react'
import NextPrevPagination from 'components/NextPrevPagination'
import { TABLE_COLUMN_CONFIG } from '../../../../constants'
import MerchantTableLoadingRows from './components/MerchantTableLoadingRows'

export default function MerchantsTable({
  merchants,
  canEditMerchants,
  isLoading,
  isLoadingNextPage,
  isLoadingPreviousPage,
  getNextPage,
  getPreviousPage,
}) {
  const { url } = useRouteMatch()
  return (
    <>
      <Table>
        <Thead>
          <Tr>
            {_.map(TABLE_COLUMN_CONFIG, ({ key, display }) => (
              <Th key={key}>
                <Flex>
                  <Text>{display}</Text>
                </Flex>
              </Th>
            ))}
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!!merchants &&
            !!merchants.length &&
            _.map(merchants, (merchant) => (
              <Tr key={merchant.id}>
                {/* 
                NOTE: Pass each merchant into the config;
                Let the display be decided on the data level
                */}
                {_.map(TABLE_COLUMN_CONFIG, ({ key, formatValue }) => (
                  <Td key={key}>{formatValue(merchant)}</Td>
                ))}
                <Td>
                  {canEditMerchants && (
                    <Link to={`${url}/${merchant.id}`}>
                      <Button colorScheme="primary" variant="outline">
                        Edit
                      </Button>
                    </Link>
                  )}
                </Td>
              </Tr>
            ))}
          {/* Loading state */}
          {isLoading && !merchants && <MerchantTableLoadingRows />}
        </Tbody>
      </Table>
      <NextPrevPagination
        onClickNext={getNextPage}
        onClickPrevious={getPreviousPage}
        isLoadingPreviousPage={isLoadingPreviousPage}
        isLoadingNextPage={isLoadingNextPage}
      />
    </>
  )
}

MerchantsTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  merchants: PropTypes.arrayOf(PropTypes.object),
  canEditMerchants: PropTypes.bool,
  isLoading: PropTypes.bool,
  isLoadingNextPage: PropTypes.bool,
  isLoadingPreviousPage: PropTypes.bool,
  getNextPage: PropTypes.func,
  getPreviousPage: PropTypes.func,
}
