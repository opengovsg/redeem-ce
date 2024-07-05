import {
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Box,
  Center,
  Icon,
  Button,
  HStack,
  VStack,
} from '@chakra-ui/react'
import Pagination from 'components/Pagination'
import _ from 'lodash'
import moment from 'moment'
import React from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { PERMISSION_GROUPS } from '../../../../constants'
import AdminRoleTag from './components/AdminRoleTag'

type AdminsTableProps = {
  admins: any[] // TODO: Stricter typing
  pageNumber: number
  totalPages: number
  pagesToShow: number[]
  onClickPage: (pageNumber: number) => void
  onClickDelete: (id: string) => void
  onClickEdit: (admin: any) => void
}

const AdminsTable: React.FC<AdminsTableProps> = ({
  admins,
  pageNumber,
  totalPages,
  pagesToShow,
  onClickPage,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <VStack align="stretch">
      <Box minHeight="24.125rem">
        <Table>
          <Thead>
            <Tr>
              <Th key="email" width="11.25rem">
                User
              </Th>
              <Th key="permissions">Permissions</Th>
              <Th key="lastUpdated" width="9rem">
                <Box width="9rem">Last updated</Box>
              </Th>
              <Th key="actions" width="3.25rem">
                <Box width="3.25rem" />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {_.map(admins, (admin) => (
              <Tr
                key={admin.actorId}
                _hover={{
                  background: 'primary.100',
                }}
                role="group"
              >
                <Td key="email">{admin.email}</Td>
                <Td key="permissions">
                  <HStack minWidth="30rem" spacing="8px">
                    {admin?.roles
                      ?.sort?.()
                      .map((role: keyof typeof PERMISSION_GROUPS) => (
                        <AdminRoleTag role={role} key={role} />
                      ))}
                  </HStack>
                </Td>
                <Td
                  _groupHover={{
                    display: 'none',
                  }}
                >
                  {moment(admin.updatedAt).format('Do MMM YYYY')}
                </Td>
                <Td
                  key="actions"
                  display="none"
                  padding="10px 32px"
                  _groupHover={{
                    display: 'table-cell',
                  }}
                  colSpan={2}
                >
                  <HStack
                    justify="end"
                    width="100%"
                    paddingRight="12px"
                    spacing="8px"
                  >
                    <Button
                      key="edit"
                      colorScheme="primary"
                      onClick={() => onClickEdit(admin)}
                      variant="outline"
                    >
                      Edit
                    </Button>
                    <Button
                      key="delete"
                      colorScheme="primary"
                      onClick={() => onClickDelete(admin)}
                      variant="outline"
                    >
                      Delete
                    </Button>
                  </HStack>
                </Td>
                <Td
                  key="dots-icon"
                  _groupHover={{
                    display: 'none',
                  }}
                >
                  <Center>
                    <Icon
                      as={BiDotsHorizontalRounded}
                      width="1.5rem"
                      height="1.5rem"
                    />
                  </Center>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Pagination
        totalPages={totalPages}
        pageNumber={pageNumber}
        onClickPage={onClickPage}
        pagesToShow={pagesToShow}
      />
    </VStack>
  )
}

export default AdminsTable
