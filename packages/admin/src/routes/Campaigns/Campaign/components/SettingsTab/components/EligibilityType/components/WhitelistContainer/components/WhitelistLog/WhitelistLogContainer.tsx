import React from 'react'

import { useDownloadWhitelist } from 'hooks/Whitelist'
import isEmpty from 'lodash/isEmpty'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import WhitelistAttachmentWithModal from '../WhitelistAttachmentWithModal'
import WhitelistLogRow from './WhitelistLogRow'
import WhitelistLog from './WhitelistLog'

type WhitelistData = {
  fileName: string
  numRecipients: string
  lastModified: string // this is in "Zulu time" (UTC)
  s3VersionId: string
  versionIndex: string
}

const WhitelistContainer = () => {
  const { campaignId, campaignMetadata } = useCampaignContext()
  const whitelists: WhitelistData[] = campaignMetadata?.whitelistVersions ?? []
  const { downloadWhitelist } = useDownloadWhitelist()

  return (
    <>
      {isEmpty(whitelists) && (
        <WhitelistAttachmentWithModal primaryTextForModal="Confirm whitelist" />
      )}
      {!isEmpty(whitelists) && (
        <WhitelistLog currentNumRecipients={whitelists[0].numRecipients}>
          {whitelists.map(({ s3VersionId, ...rest }, index) => (
            <WhitelistLogRow
              {...rest}
              isFirst={index === 0}
              key={s3VersionId}
              onDownload={() =>
                downloadWhitelist({
                  campaignId,
                  s3VersionId,
                })
              }
            />
          ))}
        </WhitelistLog>
      )}
    </>
  )
}

export default WhitelistContainer
