import React from 'react'
import {
  Table,
  Tbody,
  Text,
  HStack,
  Button,
  useBoolean,
} from '@chakra-ui/react'
import { BiUpload } from 'react-icons/bi'
import WhitelistAttachmentWithModal from '../WhitelistAttachmentWithModal'

type WhitelistLogProps = {
  children: React.ReactNode
  currentNumRecipients: string
}

const WhitelistLog = ({
  children,
  currentNumRecipients,
}: WhitelistLogProps) => {
  const [isShowAttachment, setIsShowAttachment] = useBoolean()
  const { off: closeAttachment, on: showAttachment } = setIsShowAttachment
  return (
    <>
      <HStack justifyContent="space-between" width="full">
        <Text textStyle="subhead3" color="neutral.800">
          Whitelist log
        </Text>
        {isShowAttachment ? (
          <Button onClick={closeAttachment} variant="neutralOutline">
            Cancel
          </Button>
        ) : (
          <Button
            leftIcon={<BiUpload size={20} />}
            onClick={showAttachment}
            variant="outline"
          >
            Replace whitelist CSV
          </Button>
        )}
      </HStack>
      {isShowAttachment ? (
        <WhitelistAttachmentWithModal
          primaryTextForModal="Replace whitelist"
          onClose={closeAttachment}
          currentNumRecipients={currentNumRecipients}
        />
      ) : null}
      <Table variant="unstyled">
        <Tbody id="whitelist-log-body">{children}</Tbody>
      </Table>
    </>
  )
}

export default WhitelistLog
