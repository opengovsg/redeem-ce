import { UserActions } from 'constants/permissions'

export type CampaignNavTabsType = {
  key: string
  display: string
  requiredActions: UserActions[]
}[]
