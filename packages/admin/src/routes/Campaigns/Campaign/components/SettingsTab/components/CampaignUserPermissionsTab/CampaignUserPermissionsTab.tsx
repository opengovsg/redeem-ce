import { VStack, Flex, Box, Button, Icon, HStack } from '@chakra-ui/react'
import React from 'react'
import { BiPlusCircle, BiDownload } from 'react-icons/bi'
import { downloadAdminUsers } from 'services/RedeemApi'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import { openInNewTab } from 'helpers/utils'
import AdminsTable from './components/AdminsTable'
import DeleteAdminModal from '../DeleteAdminModal'
import AdminSearch from './components/AdminSearch'
import ManageAdminModal from './components/ManageAdminModal'
import { useSettingsTabContext } from '../../SettingsTabContext'

const CampaignUserPermissionsTab = () => {
  const { campaignId } = useCampaignContext()
  const { onOpenAddAdminModal: onClickAddAdmin } = useSettingsTabContext()
  return (
    <>
      <VStack align="stretch" marginTop="24px" spacing="24px">
        <Flex
          justifyContent="space-between"
          paddingRight="36px"
          paddingLeft="32px"
        >
          <Box>
            <AdminSearch />
          </Box>
          {/* Filter dropdown and Add button */}
          <HStack spacing="8px">
            <Button
              colorScheme="primary"
              leftIcon={
                <Icon as={BiPlusCircle} width="1.5rem" height="1.5rem" />
              }
              onClick={onClickAddAdmin}
            >
              Add user
            </Button>
            <Button
              as="a"
              leftIcon={<BiDownload size={20} />}
              onClick={async () => {
                const { downloadUrl } = await downloadAdminUsers(campaignId)
                openInNewTab(downloadUrl)
              }}
              variant="outline"
            >
              Download users
            </Button>
          </HStack>
        </Flex>
        <AdminsTable />
      </VStack>
      <ManageAdminModal />
      <DeleteAdminModal />
    </>
  )
}

export default CampaignUserPermissionsTab
