import React from 'react'
import { Td, Text, Tr, Tag, Button, HStack, Box } from '@chakra-ui/react'
import { formatTime } from 'services/utils'

const WhitelistStatus = ({ isFirst }: { isFirst: boolean }) => {
  return (
    <HStack>
      <Box
        width="8px"
        minWidth="8px"
        height="8px"
        minHeight="8px"
        borderRadius="full"
        backgroundColor={isFirst ? 'success.500' : 'neutral.700'}
      />
      <Text textStyle="body2" color={isFirst ? 'neutral.900' : 'neutral.700'}>
        {isFirst ? 'In Use' : 'Not in Use'}
      </Text>
    </HStack>
  )
}

type WhitelistLogRowProps = {
  isFirst: boolean
  fileName: string
  versionIndex: string
  lastModified: string // This is in ZULU time
  numRecipients: string
  onDownload: () => void
}

const WhitelistLogRow = ({
  isFirst,
  fileName,
  versionIndex,
  lastModified,
  numRecipients,
  onDownload,
}: WhitelistLogRowProps) => {
  return (
    <Tr backgroundColor="white" paddingY={0}>
      <Td
        verticalAlign="middle"
        padding="16px"
        paddingBottom={0}
        _first={{ paddingLeft: '16px' }}
      >
        <Text
          textStyle="subhead2"
          color={isFirst ? 'neutral.900' : 'neutral.500'}
        >
          {fileName}
        </Text>
      </Td>
      <Td verticalAlign="middle" padding="10px 16px">
        <Tag
          color={isFirst ? 'white' : 'neutral.700'}
          backgroundColor={isFirst ? 'primary.500' : 'neutral.200'}
        >
          {`V${versionIndex}`}
        </Tag>
      </Td>
      <Td padding="16px">
        <Text textStyle="body2" color={isFirst ? 'neutral.700' : 'neutral.500'}>
          {`Uploaded on ${formatTime(lastModified)}`}
        </Text>
      </Td>
      <Td verticalAlign="middle" padding="16px">
        <Text textStyle="body2" color={isFirst ? 'neutral.700' : 'neutral.500'}>
          {`${numRecipients} recipients`}
        </Text>
      </Td>
      <Td verticalAlign="middle" padding="10px 16px">
        <WhitelistStatus isFirst={isFirst} />
      </Td>
      <Td verticalAlign="middle" padding="4px 16px">
        <Button
          padding="10px 16px"
          color={isFirst ? 'primary.500' : 'neutral.700'}
          onClick={onDownload}
          variant="clear"
        >
          Download
        </Button>
      </Td>
    </Tr>
  )
}

export default WhitelistLogRow
