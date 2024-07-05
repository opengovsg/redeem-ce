import React from 'react'
import {
  Button,
  Flex,
  Icon,
  Text,
  useBoolean,
  VStack,
  HStack,
} from '@chakra-ui/react'
import { BiDownload } from 'react-icons/bi'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import { useCampaignSettlementReports } from 'hooks/CampaignReports'
import MerchantSearch from './components/MerchantSearch'
import MerchantsTable from './components/MerchantsTable'
import DownloadSettlementReportsModal from './components/DownloadSettlementReportsModal'

type MerchantsTabMainProps = {
  totalNumberOfMerchants: number
  campaignMerchants: any[]
  searchedValue: string
  setSearchedValue: (newVal: string) => void
  canViewSettlementReports?: boolean
  isLoading: boolean
  isLoadingNextPage: boolean
  isLoadingPreviousPage: boolean
  getNextPage: (() => void) | null
  getPreviousPage: (() => void) | null
}

const MerchantsTabMain = ({
  totalNumberOfMerchants,
  campaignMerchants,
  searchedValue,
  setSearchedValue,
  canViewSettlementReports,
  isLoading,
  isLoadingNextPage,
  isLoadingPreviousPage,
  getNextPage,
  getPreviousPage,
}: MerchantsTabMainProps) => {
  const { campaignId } = useCampaignContext()
  const [
    isDownloadSettlementReportModalOpen,
    setIsDownloadSettlementReportOpen,
  ] = useBoolean(false)
  const {
    off: onCloseDownloadSettlementReportModal,
    on: onOpenDownloadSettlementReportModal,
  } = setIsDownloadSettlementReportOpen

  const { fetchCampaignSettlementReports, campaignSettlementReports } =
    useCampaignSettlementReports(
      campaignId,
      onOpenDownloadSettlementReportModal
    )

  return (
    <div className="card">
      <VStack align="stretch" paddingY="24px" spacing="24px">
        <HStack spacing="36px">
          <Text textStyle="h2" marginLeft="2rem" color="neutral.800">
            Merchants
          </Text>
          {!!totalNumberOfMerchants && (
            <Text textStyle="subhead1" color="neutral.900">
              {totalNumberOfMerchants} total merchants
            </Text>
          )}
        </HStack>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          paddingX="32px"
        >
          <MerchantSearch
            searchValue={searchedValue}
            setSearchedValue={setSearchedValue}
          />
          {canViewSettlementReports && (
            <Button
              colorScheme="primary"
              leftIcon={<Icon as={BiDownload} width="1.5rem" height="1.5rem" />}
              onClick={() => fetchCampaignSettlementReports()}
            >
              Export settlement reports
            </Button>
          )}
        </Flex>
        <MerchantsTable
          merchants={campaignMerchants}
          isLoadingNextPage={isLoadingNextPage}
          isLoadingPreviousPage={isLoadingPreviousPage}
          isLoading={isLoading}
          getNextPage={getNextPage}
          getPreviousPage={getPreviousPage}
        />
      </VStack>
      {canViewSettlementReports && campaignSettlementReports && (
        <DownloadSettlementReportsModal
          isOpen={isDownloadSettlementReportModalOpen}
          onClose={onCloseDownloadSettlementReportModal}
          reports={campaignSettlementReports}
          campaignId={campaignId}
        />
      )}
    </div>
  )
}

export default MerchantsTabMain
