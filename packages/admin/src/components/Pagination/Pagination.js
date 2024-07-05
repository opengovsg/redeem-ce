import React from 'react'
import PropTypes from 'prop-types'

import {
  Pagination as ChakraPagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
  PaginationSeparator,
} from '@ajna/pagination'
import { IconButton, Icon } from '@chakra-ui/react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

export default function Pagination({
  totalPages,
  pageNumber,
  onClickPage,
  pagesToShow,
}) {
  return (
    <ChakraPagination
      pagesCount={totalPages}
      currentPage={pageNumber}
      onPageChange={onClickPage}
      pagesToShow={pagesToShow}
    >
      <PaginationContainer align="center" justify="center" p={4} w="full">
        <PaginationPrevious
          variant="unstyled"
          as={IconButton}
          paddingInline={0}
          height="fit-content"
          width="24px"
          display="flex"
          textAlign="center"
          size="xs"
          icon={
            <Icon
              as={BiChevronLeft}
              width="24px"
              height="24px"
              color="primary.500"
            />
          }
        />
        <PaginationPageGroup
          isInline
          align="center"
          margin={[0, '4px']}
          separator={
            <PaginationSeparator
              textStyle="body2"
              background="none"
              width="28px"
              height="28px"
              color="primary.500"
              margin={['0', '1px']}
              jumpSize={2}
            >
              ...
            </PaginationSeparator>
          }
        >
          {pagesToShow.map((page) => (
            <PaginationPage
              width="30px"
              height="28px"
              margin={['0', '1px']}
              key={`pagination_page_${page}`}
              page={page}
              textStyle="body2"
              background="none"
              color="primary.500"
              _current={{
                textStyle: 'subhead2',
                background: 'primary.500',
                color: 'white',
              }}
            />
          ))}
        </PaginationPageGroup>
        <PaginationNext
          variant="unstyled"
          as={IconButton}
          paddingInline={0}
          height="fit-content"
          width="24px"
          display="flex"
          size="xs"
          textAlign="center"
          icon={
            <Icon
              as={BiChevronRight}
              width="24px"
              height="24px"
              color="primary.500"
            />
          }
        />
      </PaginationContainer>
    </ChakraPagination>
  )
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  onClickPage: PropTypes.func.isRequired,
  pagesToShow: PropTypes.arrayOf(PropTypes.number).isRequired,
}
