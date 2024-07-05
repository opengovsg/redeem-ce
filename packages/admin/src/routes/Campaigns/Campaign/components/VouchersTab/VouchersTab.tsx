import React from 'react'

import { Flex } from '@chakra-ui/react'
import VoucherTable from './components/VoucherTable'
import CreateVoucherModal from './components/CreateVoucherModal'
import BulkCreateVoucherModal from './components/BulkCreateVoucherModal'

import VoucherDetailsDrawer from './components/VoucherDetailsDrawer'

import UpdateVoucherGroupModal from './components/UpdateVoucherGroupModal'
import SendVoucherGroupModal from './components/SendVoucherGroupModal'
import VoucherHeader from './components/VoucherHeader'
import DownloadTransactionsModal from './components/DownloadTransactionsModal'
import { withTwilio } from '../SettingsTab/components/Settings/context/TwilioContext'
import {
  useVouchersTabContext,
  VouchersTabProvider,
} from './VouchersTabContext'

function VouchersTab() {
  const { bulkCreateModalKey } = useVouchersTabContext()

  return (
    <>
      <Flex flexDirection="column" minHeight="1148px" marginTop="24px">
        <VoucherHeader />
        {/* tables start here */}
        <VoucherTable />
      </Flex>
      <CreateVoucherModal />
      {/* Passing a `key` prop to the `BulkCreateVoucherModal` component ensures that the old modal's state is discarded. 
      This is necessary when the user closes the modal while the backend is still processing a CSV request. 
      By creating a new instance of the modal with a new `key`, we can ensure that the old state is discarded and 
      the new state is used instead. */}
      <BulkCreateVoucherModal key={bulkCreateModalKey} />
      <VoucherDetailsDrawer />
      <UpdateVoucherGroupModal />
      <SendVoucherGroupModal />
      <DownloadTransactionsModal />
    </>
  )
}

function VouchersTabContainer() {
  return (
    <VouchersTabProvider>
      <VouchersTab />
    </VouchersTabProvider>
  )
}

export default withTwilio(VouchersTabContainer)
