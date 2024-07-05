import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'

import { CAMPAIGNS_ROUTE } from 'constants/routes'

import {
  Box,
  HStack,
  Text,
  VStack,
  Button,
  Icon,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
} from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'

type ListCampaignsCardProps = {
  campaigns: any[]
  onClickCreateCampaign: () => void
}

export default function ListCampaignsCard({
  campaigns,
  onClickCreateCampaign,
}: ListCampaignsCardProps) {
  const history = useHistory()
  return (
    <Box
      as="section"
      position="relative"
      bottom="136px"
      overflow="hidden"
      paddingBottom="40px"
      background="neutral.100"
      borderRadius="16px"
      dropShadow="0px 0px 20px rgba(97, 108, 137, 0.3)"
      filter="auto"
      marginX="124px"
    >
      <VStack align="start" spacing="0">
        <HStack
          align="center"
          justify="flex-end"
          width="100%"
          padding="24px"
          color="primary.200"
        >
          <Button
            leftIcon={<Icon as={BiPlus} width="24px" height="24px" />}
            onClick={onClickCreateCampaign}
          >
            Create a new campaign
          </Button>
        </HStack>
        <Table variant="campaigns">
          <Thead>
            <Tr>
              <Th>Campaign</Th>
              <Th>Organiser</Th>
              <Th>Status</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {_.map(campaigns, (campaign) => (
              <Tr
                key={campaign.id}
                _hover={{ background: 'primary.100', cursor: 'pointer' }}
                onClick={() =>
                  history.push(`${CAMPAIGNS_ROUTE}/${campaign.id}`)
                }
              >
                <Td>
                  <Box width="30rem">
                    <VStack align="start" spacing="4px">
                      <Text textStyle="h5" color="neutral.800">
                        {campaign.name}
                      </Text>{' '}
                      <Text textStyle="body2" color="neutral.700">
                        {campaign.description}
                      </Text>
                    </VStack>
                  </Box>
                </Td>
                <Td verticalAlign="middle" color="neutral.800">
                  <Box width="16rem">{campaign.organiserName}</Box>
                </Td>
                <Td verticalAlign="middle" color="neutral.800">
                  <Box>
                    {campaign.validity === 'campaign_valid'
                      ? 'Active'
                      : 'Inactive'}
                  </Box>
                </Td>
                <Td>
                  <Button
                    id={`manage-campaign-button-${campaign.id}`}
                    variant="outline"
                  >
                    Manage
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  )
}

ListCampaignsCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  campaigns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickCreateCampaign: PropTypes.func.isRequired,
}
