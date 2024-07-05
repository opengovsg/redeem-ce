import { Center, HStack } from '@chakra-ui/react'
import IconButton from 'components/IconButton'
import React from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

type NextPrevPaginationProps = {
  onClickNext?: (() => void) | null
  onClickPrevious?: (() => void) | null
  isLoadingPreviousPage: boolean
  isLoadingNextPage: boolean
}

const NextPrevPagination: React.FC<NextPrevPaginationProps> = ({
  onClickNext,
  onClickPrevious,
  isLoadingPreviousPage,
  isLoadingNextPage,
}) => {
  return (
    <Center paddingY="16px">
      <HStack spacing="200px">
        <IconButton
          icon={BiChevronLeft}
          isDisabled={
            !onClickPrevious || isLoadingNextPage || isLoadingPreviousPage
          }
          onClick={onClickPrevious || undefined}
          isLoading={isLoadingPreviousPage}
          color="neutral.700"
          variant="link"
          aria-label="previous page"
        />
        <IconButton
          icon={BiChevronRight}
          isLoading={isLoadingNextPage}
          isDisabled={
            !onClickNext || isLoadingNextPage || isLoadingPreviousPage
          }
          onClick={onClickNext || undefined}
          color="neutral.700"
          variant="link"
          aria-label="next page"
        />
      </HStack>
    </Center>
  )
}

export default NextPrevPagination
