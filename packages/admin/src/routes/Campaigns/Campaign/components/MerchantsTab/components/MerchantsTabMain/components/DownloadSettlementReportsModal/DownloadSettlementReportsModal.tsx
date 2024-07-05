import {
  VStack,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Table,
  Text,
  Thead,
  Tr,
  Th,
  Tbody,
} from '@chakra-ui/react'
import ModalCloseButton from 'components/ModalCloseButton'
import _ from 'lodash'
import React from 'react'
import DownloadSettlementReportRow from './components/DownloadSettlementReportRow'

type DownloadSettlementReportsModalProps = {
  isOpen: boolean
  onClose: () => void
  reports: any[] // TODO: Stricter typing
  campaignId: string
}

const DownloadSettlementReportsModal: React.FC<
  DownloadSettlementReportsModalProps
> = ({ isOpen, onClose, reports, campaignId }) => {
  return (
    <Modal colorScheme="primary" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth="680px">
        <ModalCloseButton onClick={onClose} />
        <ModalHeader>Download settlements report</ModalHeader>
        <ModalBody paddingY="48px">
          <VStack align="stretch" spacing="40px">
            <Text textStyle="h2" color="primary.700">
              Settlements reports
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
                  <DownloadSettlementReportRow
                    key={report.key}
                    report={report}
                    campaignId={campaignId}
                  />
                ))}
              </Tbody>
            </Table>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default DownloadSettlementReportsModal
