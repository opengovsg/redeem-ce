import React from 'react'
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  VStack,
  Image,
  Button,
} from '@chakra-ui/react'
import checkCircleSolid from 'img/check-circle-solid-success.svg'
import errorCircleSolid from 'img/x-circle-solid.svg'
import Infobox from 'components/Infobox'

type JobCompletedProps = {
  numVouchersCreated: number
  onClickClose: () => void
}

const JobCompleted = ({
  numVouchersCreated,
  onClickClose,
}: JobCompletedProps): JSX.Element => {
  return (
    <>
      <ModalHeader minHeight="64px" />
      <ModalBody paddingY="32px">
        <VStack alignItems="left" justifyContent="space-between" spacing="24px">
          {numVouchersCreated > 0 ? (
            <>
              <Image width="40px" height="40px" src={checkCircleSolid} />
              <Text textStyle="h2" paddingTop="8px" textColor="primary.500">
                {`${numVouchersCreated} voucher ${
                  numVouchersCreated > 1 ? 'links' : 'link'
                } successfully created`}
              </Text>
              <Text textStyle="body1" textColor="neutral.700">
                You can now download all the voucher links from the Vouchers
                tab.
              </Text>
              <Infobox
                variant="info"
                text={
                  <VStack alignItems="left">
                    <Text textColor="neutral.900" fontWeight="700">
                      Send the links out yourself using your preferred channel
                    </Text>
                    <Text textStyle="body1" textColor="neutral.700">
                      Remember, anyone with access to a voucher link will be
                      able to spend it.
                    </Text>
                  </VStack>
                }
              />
            </>
          ) : null}
          {numVouchersCreated === 0 ? (
            <>
              <Image width="40px" height="40px" src={errorCircleSolid} />
              <Text textStyle="h2" paddingTop="8px" textColor="primary.500">
                Something went wrong
              </Text>
              <Text textStyle="body1" textColor="neutral.700">
                No voucher links were created. Please re-upload the CSV and try
                again.
              </Text>
            </>
          ) : null}
        </VStack>
      </ModalBody>
      <ModalFooter marginLeft="auto" padding="0px 48px 36px 48px">
        <Button onClick={onClickClose}>
          {numVouchersCreated > 0 ? 'Open Vouchers tab' : 'Back to CSV upload'}
        </Button>
      </ModalFooter>
    </>
  )
}

export default JobCompleted
