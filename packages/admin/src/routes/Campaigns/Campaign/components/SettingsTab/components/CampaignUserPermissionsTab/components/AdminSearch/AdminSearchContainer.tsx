import React from 'react'
import { useSettingsTabContext } from '../../../../SettingsTabContext'
import AdminSearch from './AdminSearch'

type AdminSearchContainerProps = Record<string, never>

const AdminSearchContainer: React.FC<AdminSearchContainerProps> = () => {
  const { filterAdminsValue, setFilterAdminsValue } = useSettingsTabContext()
  return (
    <AdminSearch
      searchValue={filterAdminsValue}
      onPrimaryClick={setFilterAdminsValue}
    />
  )
}

export default AdminSearchContainer
