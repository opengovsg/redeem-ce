import React from 'react'
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react'
import MerchantDetailsForm from '../MerchantDetailsForm'
import MerchantUpdatePaymentDetailsForm from '../MerchantUpdatePaymentDetailsForm'

type EditMerchantProps = {
  merchant: any
  onClickUpdateFinance: () => void
  onClickUpdateParticulars: () => void
  isLoading: boolean
  canEditMerchantShopDetails?: boolean
  canEditMerchantPaymentDetails?: boolean
}

const EditMerchant: React.FC<EditMerchantProps> = ({
  merchant,
  onClickUpdateFinance,
  onClickUpdateParticulars,
  canEditMerchantShopDetails,
  canEditMerchantPaymentDetails,
  isLoading,
}) => {
  return (
    <VStack align="stretch" paddingX="132px" paddingY="64px" spacing="40px">
      <Text textStyle="h2" color="primary.700">
        Edit merchant details
      </Text>
      <Tabs colorScheme="primary">
        <TabList borderBottom="none">
          {canEditMerchantShopDetails && (
            <Tab _first={{ marginLeft: 0 }}>Shop details</Tab>
          )}
          {canEditMerchantPaymentDetails && <Tab>Payment details</Tab>}
        </TabList>
        <TabPanels>
          {canEditMerchantShopDetails && (
            <TabPanel>
              <MerchantDetailsForm
                merchant={merchant}
                onPrimaryClick={onClickUpdateParticulars}
                isPrimaryLoading={isLoading}
              />
            </TabPanel>
          )}
          {canEditMerchantPaymentDetails && (
            <TabPanel>
              <MerchantUpdatePaymentDetailsForm
                merchant={merchant}
                onPrimaryClick={onClickUpdateFinance}
                isPrimaryLoading={isLoading}
              />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </VStack>
  )
}

export default EditMerchant
