/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from 'react'
import _ from 'lodash'

import { Button, Text } from '@chakra-ui/react'
import { useHistory, useParams } from 'react-router-dom'
import { useAuthenticationState } from 'data/Authentication'
import { getAllowedActionsForResource } from 'helpers/permissions'
import { UserActions } from 'constants/permissions'
import SideNavbar from 'components/SideNavbar'
import { CampaignNavTabsType } from './types'
import { CAMPAIGN_NAV_TABS_KEYS } from '../../constants'

const CAMPAIGN_NAV_TABS: CampaignNavTabsType = [
  {
    key: CAMPAIGN_NAV_TABS_KEYS.VOUCHERS,
    display: 'Vouchers',
    requiredActions: [
      UserActions.ListGroupedVouchers,
      UserActions.CreateGroupedVouchers,
    ],
  },
  {
    key: CAMPAIGN_NAV_TABS_KEYS.MERCHANTS,
    display: 'Merchants',
    requiredActions: [UserActions.ListMerchantsForCampaign],
  },
  {
    key: CAMPAIGN_NAV_TABS_KEYS.SETTINGS,
    display: 'Campaign',
    requiredActions: [
      UserActions.UpdateCampaign,
      UserActions.ListUserRolesForCampaign,
      UserActions.UpdateUserRoles,
    ],
  },
  {
    key: CAMPAIGN_NAV_TABS_KEYS.METRICS,
    display: 'Metrics',
    requiredActions: [UserActions.GetCampaignMetrics],
  },
  {
    key: CAMPAIGN_NAV_TABS_KEYS.HISTORY,
    display: 'Security history',
    requiredActions: [
      UserActions.ListCampaignEvents,
      UserActions.ListMerchantEvents,
    ],
  },
]

type CampaignNavTabsProps = {
  url: string
}

export default function CampaignNavTabs({ url }: CampaignNavTabsProps) {
  const history = useHistory()
  const { tabKey: activeNavTab, campaignId } = useParams<{
    tabKey: string
    campaignId: string
  }>()
  const { permissions } = useAuthenticationState()
  const allowedActions = useMemo(() => {
    if (!campaignId) {
      return []
    }

    return getAllowedActionsForResource({ permissions, campaignId })
  }, [campaignId, permissions])

  const onNavTabClick = (navTabKey: string) => {
    return history.push(`${url}/${navTabKey}`)
  }

  return (
    <SideNavbar id="campaign-nav-tabs" to="/campaigns">
      {_.map(CAMPAIGN_NAV_TABS, (navTab) => {
        if (!_.intersection(allowedActions, navTab.requiredActions)?.length) {
          return null
        }

        const isActiveTab = activeNavTab === navTab.key

        return (
          <Button
            key={navTab.key}
            textStyle="subhead2"
            height="auto"
            paddingTop="16px"
            paddingBottom="16px"
            paddingLeft={isActiveTab ? '12px' : '16px'}
            color={isActiveTab ? 'primary.500' : 'neutral.700'}
            borderWidth={0}
            borderStyle="solid"
            borderColor="primary.500"
            borderLeftWidth={isActiveTab ? '4px' : 0}
            borderRadius={0}
            onClick={() => onNavTabClick(navTab.key)}
            variant="unstyled"
          >
            <Text marginLeft="16px">{navTab.display}</Text>
          </Button>
        )
      }).filter(Boolean)}
    </SideNavbar>
  )
}
