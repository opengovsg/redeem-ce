import { useState, useMemo } from 'react'
import { searchFilter } from 'services/utils'

export default function useAdminFilter(
  admins: any[] /* TODO: Stricter typing */
) {
  const [filterValue, setFilterValue] = useState('')
  const filteredAdmins = useMemo(
    () => searchFilter(admins, 'email', filterValue),
    [admins, filterValue]
  )

  return {
    admins: filteredAdmins,
    setFilterValue,
    filterValue,
  }
}
