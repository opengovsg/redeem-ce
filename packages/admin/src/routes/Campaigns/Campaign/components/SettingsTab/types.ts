export type PermissionsModalState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; currentAdmin: any }
