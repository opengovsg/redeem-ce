import React from 'react'
import {
  VStack,
  UnorderedList,
  ListItem,
  Text,
  Button,
  HStack,
} from '@chakra-ui/react'
import { BiDownload } from 'react-icons/bi'
import { openInNewTab } from 'helpers/utils'

type ReviewListProps = {
  numberOfRows: number
  numberOfMissingMobileNumber: number
  numberOfMissingName: number
  numberOfMissingRecipientIds: number
  numberOfDuplicateMobileNumber: number
  numberOfDuplicateName: number
  numberOfDuplicateRecipientIds: number
  href: string
}

const ReviewList = (props: ReviewListProps): JSX.Element => {
  const {
    numberOfRows,
    numberOfMissingMobileNumber,
    numberOfMissingName,
    numberOfMissingRecipientIds,
    numberOfDuplicateMobileNumber,
    numberOfDuplicateName,
    numberOfDuplicateRecipientIds,
    href,
  } = props

  const createListItem = (
    numberOfItemsToReport: number,
    text: string
  ): JSX.Element | null => {
    if (numberOfItemsToReport > 0) {
      const boldTextContent =
        numberOfItemsToReport === numberOfRows
          ? `All ${numberOfItemsToReport}`
          : `${numberOfItemsToReport}`
      return (
        <ListItem key={text}>
          <Text>
            <Text as="b">{boldTextContent}</Text> voucher link
            {numberOfItemsToReport === 1 ? '' : 's'} will be created{' '}
            <Text as="b">{text}</Text>
          </Text>
        </ListItem>
      )
    }
    return null
  }

  const listItems = [
    createListItem(numberOfMissingRecipientIds, 'without recipient identifier'),
    createListItem(numberOfMissingMobileNumber, 'without mobile number'),
    createListItem(numberOfMissingName, 'without name'),
    createListItem(
      numberOfDuplicateRecipientIds,
      'with duplicate recipient ids'
    ),
    createListItem(
      numberOfDuplicateMobileNumber,
      'with duplicate mobile numbers'
    ),
    createListItem(numberOfDuplicateName, 'with duplicate names'),
  ].filter(Boolean)

  return (
    <VStack
      alignItems="left"
      width="100%"
      padding="24px 24px"
      background="warning.100"
      borderRadius="4px"
      spacing="16px"
    >
      <Text textStyle="h4" textColor="neutral.900">
        Review this before you proceed
      </Text>
      <HStack alignItems="flex-end" justifyContent="space-between">
        <VStack alignItems="left" width="100%">
          <Text>Based on the file you uploaded,</Text>
          <UnorderedList paddingLeft="24px">{listItems}</UnorderedList>
        </VStack>
        <Button
          as="a"
          minWidth="max-content"
          marginLeft="16px"
          colorScheme="warning"
          download="bulk-create-review-csv"
          id="download-bulk-create-csv-details"
          leftIcon={<BiDownload size={20} />}
          onClick={() => openInNewTab(href)}
          rel="noopener noreferrer"
          variant="warningOutline"
        >
          Download CSV with details
        </Button>
      </HStack>
    </VStack>
  )
}
export default ReviewList
