import React from 'react'
import { useSettingsTabContext } from '../../SettingsTabContext'
import DeleteAdminModal from './DeleteAdminModal'

type DeleteAdminModalContainerProps = Record<string, never>

const DeleteAdminModalContainer: React.FC<
  DeleteAdminModalContainerProps
> = () => {
  const {
    adminToDelete,
    onCloseDeleteAdminModal,
    onDeleteCampaignAdmin,
    isDeleteCampaignAdminLoading,
  } = useSettingsTabContext()
  return (
    <DeleteAdminModal
      isOpen={!!adminToDelete}
      admin={adminToDelete}
      onCloseClick={onCloseDeleteAdminModal}
      onPrimaryClick={() => {
        if (!adminToDelete) {
          return
        }
        onDeleteCampaignAdmin({
          userId: adminToDelete.actorId,
          permissionGroups: adminToDelete.roles,
        })
      }}
      isPrimaryLoading={isDeleteCampaignAdminLoading}
    />
  )
}

export default DeleteAdminModalContainer
