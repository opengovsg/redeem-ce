import React, { useEffect, useMemo } from 'react'
import { usePagination } from '@ajna/pagination'
import _ from 'lodash'
import AdminsTable from './AdminsTable'
import { useSettingsTabContext } from '../../../../SettingsTabContext'

const ROWS_TO_RENDER = 5
const INITIAL_PAGE_NUMBER = 1

type AdminsTableContainerProps = Record<string, never>

const AdminsTableContainer: React.FC<AdminsTableContainerProps> = () => {
  const {
    campaignAdmins: admins,
    onClickDeleteAdmin: onClickDelete,
    onClickEditAdmin: onClickEdit,
  } = useSettingsTabContext()
  const { offset, pagesCount, currentPage, setCurrentPage, pageSize, pages } =
    usePagination({
      total: admins.length,
      limits: {
        outer: 1,
        inner: 1,
      },
      initialState: {
        pageSize: ROWS_TO_RENDER,
        currentPage: INITIAL_PAGE_NUMBER,
      },
    })

  // Watch the page and totalPages such that when page exceeds totalPages (eg. when total number of
  // vouchers are reduced, reset the page back to INITIAL_PAGE_NUMBER)
  useEffect(() => {
    if (currentPage > pagesCount) {
      setCurrentPage(INITIAL_PAGE_NUMBER)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pagesCount])

  const adminsToRender = useMemo(
    () => _.slice(admins, offset, offset + pageSize),
    [admins, offset, pageSize]
  )

  return (
    <AdminsTable
      admins={adminsToRender}
      pageNumber={currentPage}
      totalPages={pagesCount}
      pagesToShow={pages}
      onClickPage={setCurrentPage}
      onClickDelete={onClickDelete}
      onClickEdit={onClickEdit}
    />
  )
}

export default AdminsTableContainer
