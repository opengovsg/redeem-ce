import { UserActions } from 'constants/permissions'
import _ from 'lodash'
import { UserRole } from 'services/RedeemApi/types'

type GetAllowedActionsForResourceProps = {
  campaignId: string
  permissions: Record<string, UserRole>
}

export function getAllowedActionsForResource({
  permissions,
  campaignId,
}: GetAllowedActionsForResourceProps): string[] {
  if (!permissions) {
    return []
  }
  return _.union(permissions[campaignId]?.actions, permissions['*']?.actions)
}

export function getUserRoleForResource({
  permissions,
  campaignId,
}: GetAllowedActionsForResourceProps): string[] {
  if (!permissions) {
    return []
  }

  return _.union(permissions[campaignId]?.roles, permissions['*']?.roles)
}

export function hasAdminRole(roles: string[]): boolean {
  return _.includes(roles, 'admin')
}

export function hasSystemRole({
  permissions,
}: Pick<GetAllowedActionsForResourceProps, 'permissions'>): boolean {
  return _.includes(
    getUserRoleForResource({ permissions, campaignId: '*' }),
    'system'
  )
}

export function hasViewSettlementReportsPermission({
  permissions,
  campaignId,
}: GetAllowedActionsForResourceProps): boolean {
  return permissions?.[campaignId]?.actions?.includes(
    UserActions.ListSettlementReports
  )
}
