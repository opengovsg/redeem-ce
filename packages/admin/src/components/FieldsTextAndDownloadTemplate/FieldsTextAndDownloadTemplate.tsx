import React from 'react'
import { BiDownload } from 'react-icons/bi'
import {
  VStack,
  HStack,
  Text,
  Button,
  Table,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react'
import { FieldsTextAndDownloadTemplateProps } from './types'

const FieldsTextAndDownloadTemplate = ({
  fields,
  downloadFunction,
  isLoading,
  headerText,
  isDownloadButtonDisabled = false,
}: FieldsTextAndDownloadTemplateProps): JSX.Element => {
  return (
    <HStack
      alignItems="flex-end"
      justifyContent="space-between"
      width="100%"
      spacing={6}
    >
      <VStack
        alignItems="flex-start"
        id="whitelist-recipient-id-required-fields-pane"
        spacing={2}
      >
        <Text textStyle="subhead3" textColor="neutral.500">
          {headerText}
        </Text>
        <Table width="auto" variant="unstyled">
          <Tbody width="fit-content">
            {fields.map(({ title, description }) => {
              return (
                <Tr key={title}>
                  <Td
                    verticalAlign="middle"
                    padding="4px"
                    _first={{ paddingLeft: '0px' }}
                  >
                    <Text
                      textStyle="subhead2"
                      marginRight="24px"
                      color="neutral.700"
                    >
                      {title}
                    </Text>
                  </Td>
                  <Td verticalAlign="middle" padding="4px">
                    <Text textStyle="body2" color="neutral.700">
                      {description}
                    </Text>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </VStack>
      <Button
        minWidth="max-content"
        disabled={isDownloadButtonDisabled}
        id="download-csv-template"
        isLoading={isLoading}
        leftIcon={<BiDownload size={20} />}
        onClick={downloadFunction}
        variant="outline"
      >
        Download CSV template
      </Button>
    </HStack>
  )
}

export default FieldsTextAndDownloadTemplate
