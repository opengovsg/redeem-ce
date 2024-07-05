import React, { useCallback } from 'react'
import { Text, Divider } from '@chakra-ui/react'
import Card from 'components/Card'
import { useDownloadTemplateWhitelist } from 'hooks/Whitelist'
import FieldsTextAndDownloadTemplate from 'components/FieldsTextAndDownloadTemplate'
import WhitelistLog from './components/WhitelistLog'

const WHITELIST_HEADER = 'Whitelisting by Recipient Identifier'
const WHITELIST_DESCRIPTION =
  'Residents who are whitelisted will be able to claim vouchers via the campaign sign up link. To upload a whitelist, download the CSV template and list out eligible recipients according to the required fields.'
const REQUIRED_FIELDS = [
  {
    title: 'Identifier',
    description:
      'Identifier of the eligible recipient using capital letters, eg.S9123456A (case sensitive)',
  },
]

const WhitelistContainer = () => {
  const { downloadTemplateWhitelist, isDownloadTemplateWhitelistLoading } =
    useDownloadTemplateWhitelist()

  // TODO: Extend to address in the future
  const onClickDownload = useCallback(() => {
    downloadTemplateWhitelist()
  }, [downloadTemplateWhitelist])

  return (
    <Card id="whitelist-container-pane" padding="40px 32px">
      <Text textStyle="h3">{WHITELIST_HEADER}</Text>
      <Text textStyle="body1" textColor="neutral.700">
        {WHITELIST_DESCRIPTION}
      </Text>
      <FieldsTextAndDownloadTemplate
        fields={REQUIRED_FIELDS}
        downloadFunction={onClickDownload}
        isLoading={isDownloadTemplateWhitelistLoading}
        headerText="REQUIRED FIELDS"
      />
      <Divider />
      <WhitelistLog />
    </Card>
  )
}

export default WhitelistContainer
