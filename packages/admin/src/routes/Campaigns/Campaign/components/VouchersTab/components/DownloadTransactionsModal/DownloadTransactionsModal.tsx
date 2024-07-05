import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Thead,
  Tbody,
  Text,
  VStack,
  Th,
  Tr,
  Box,
} from '@chakra-ui/react'
import ModalCloseButton from 'components/ModalCloseButton'
import _ from 'lodash'
import React from 'react'
import DownloadTransactionReportRow from './components/DownloadTransactionReportRow'

type DownloadTransactionsModalProps = {
  isOpen: boolean
  onClose: () => void
  reports: any[] // TODO: Stricter typings
}

const DownloadTransactionsModal: React.FC<DownloadTransactionsModalProps> = ({
  isOpen,
  onClose,
  reports,
}) => {
  return (
    <Modal colorScheme="primary" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth="680px">
        <ModalCloseButton onClick={onClose} />
        <ModalHeader>Download transactions report</ModalHeader>
        <ModalBody paddingY="48px">
          <VStack align="stretch" spacing="40px">
            <Text textStyle="h2" color="primary.700">
              Transactions reports
            </Text>
            <Table>
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th width="4.25rem">
                    <Box width="4.25rem" />
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {_.map(reports, (report) => (
                  <DownloadTransactionReportRow report={report} />
                ))}
              </Tbody>
            </Table>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default React.memo(DownloadTransactionsModal)
