import React, { useEffect, useState } from 'react'
import { ModalHeader, ModalBody, Spinner, Text, VStack } from '@chakra-ui/react'
import { BulkCreateJobStatus } from 'services/RedeemApi/types'

const TIME_FROM_STARTED_TILL_SHOW_WORKING_ON_IT_TEXT = 30000 // 30 seconds in milliseconds

type JobLoadingProps = {
  jobState: BulkCreateJobStatus
}

function renderJobStatusText(
  jobState: BulkCreateJobStatus,
  showStillWorkingOnItText: boolean
) {
  let headingText
  let bodyText

  switch (jobState) {
    case BulkCreateJobStatus.not_started:
      headingText = 'Submitting bulk-create request...'
      bodyText = 'This may take a few minutes.'
      break
    case BulkCreateJobStatus.started:
      headingText = showStillWorkingOnItText
        ? 'Still working on it...'
        : 'Creating voucher links...'
      bodyText = showStillWorkingOnItText
        ? 'It may take a little while if you are creating a large number of vouchers.'
        : 'This may take a few minutes.'
      break
    default:
      return null
  }

  return (
    <>
      <Text textStyle="h2" color="primary.500">
        {headingText}
      </Text>
      <Text textStyle="h5" color="neutral.700">
        {bodyText}{' '}
        <Text as="span" color="danger.500" fontWeight="700">
          Please do not exit or refresh this page.
        </Text>
      </Text>
    </>
  )
}

const JobLoading = ({ jobState }: JobLoadingProps): JSX.Element => {
  const [showStillWorkingOnItText, setShowStillWorkingOnItText] =
    useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    if (jobState === BulkCreateJobStatus.started) {
      timer = setTimeout(() => {
        setShowStillWorkingOnItText(true)
      }, TIME_FROM_STARTED_TILL_SHOW_WORKING_ON_IT_TEXT)
    }

    // Clear the timer when the component unmounts or when jobState changes
    return () => clearTimeout(timer)
  }, [jobState])

  return (
    <>
      <ModalHeader minHeight="64px" />
      <ModalBody paddingY="48px">
        <VStack align="stretch" color="neutral.900" spacing="32px">
          <Spinner width="48px" height="48px" />
          {renderJobStatusText(jobState, showStillWorkingOnItText)}
        </VStack>
      </ModalBody>
    </>
  )
}

export default JobLoading
