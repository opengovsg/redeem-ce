import React from 'react'
import { Campaign } from 'services/RedeemApi/types'
import { Box, VStack, Text } from '@chakra-ui/react'
import _ from 'lodash'
import {
  getCreatedText,
  getEditedText,
  getEditedToText,
  getMerchantType,
  getPrettyDate,
  getPrettyRoles,
  getPrettyVoucherValues,
} from '../../utils'

type CampaignEventBodyProps = {
  event: string
  data: any | null | undefined
}

export const CampaignEventBody = ({
  event,
  data,
}: CampaignEventBodyProps): JSX.Element => {
  // Events that do not have data
  if (_.isNil(data)) {
    switch (event) {
      case 'campaign_download_user_roles': {
        return (
          <Text textStyle="body2" color="neutral.700">
            User report was exported.
          </Text>
        )
      }
      case 'campaign_export_voucher_links': {
        return (
          <Text textStyle="body2" color="neutral.700">
            Voucher link report was exported.
          </Text>
        )
      }
      case 'campaign_enable_payout': {
        return (
          <Text textStyle="body2" color="neutral.700">
            Payouts have been enabled for the campaign.
          </Text>
        )
      }
      case 'campaign_disable_payout': {
        return (
          <Text textStyle="body2" color="neutral.700">
            Payouts have been disabled for the campaign.
          </Text>
        )
      }
      default:
        return <Text whiteSpace="pre">{JSON.stringify(data, null, 2)}</Text>
    }
  }

  // Events that have data
  switch (event) {
    case 'campaign_create': {
      const campaign = data.campaign as Campaign
      return (
        <>
          {getCreatedText(campaign, 'name')}
          {getCreatedText(campaign, 'description')}
          {getCreatedText(campaign, 'organiserName')}
          {getCreatedText(campaign, 'organiserEmail')}
          {getCreatedText(campaign, 'defaultVouchers', {
            transformValue: getPrettyVoucherValues,
          })}
        </>
      )
    }
    case 'campaign_edit_settings': {
      const campaignBefore = data.before as Campaign
      const campaignAfter = data.after as Campaign
      const editLines = [
        getEditedText(campaignBefore, campaignAfter, 'name'),
        getEditedText(campaignBefore, campaignAfter, 'description'),
        getEditedText(campaignBefore, campaignAfter, 'organiserName'),
        getEditedText(campaignBefore, campaignAfter, 'organiserEmail'),
        getEditedText(campaignBefore, campaignAfter, 'advisoryUrl', {
          displayKey: 'More info URL',
        }),
        getEditedText(campaignBefore, campaignAfter, 'defaultVouchers', {
          transformValue: getPrettyVoucherValues,
        }),
        getEditedText(campaignBefore, campaignAfter, 'category', {
          displayKey: 'Voucher type',
        }),
        getEditedText(campaignBefore, campaignAfter, 'eligibility', {
          displayKey: 'Campaign type',
        }),
        getEditedText(campaignBefore, campaignAfter, 'visibility', {
          displayKey: 'Visibility on signup page',
        }),
        getEditedText(campaignBefore, campaignAfter, 'validityStart', {
          displayKey: 'Campaign start date',
          transformValue: getPrettyDate,
        }),
        getEditedText(campaignBefore, campaignAfter, 'validityEnd', {
          displayKey: 'Campaign end date',
          transformValue: getPrettyDate,
        }),
      ].filter((element): element is JSX.Element => element !== null)
      return editLines.length === 0 ? (
        <Text>No changes.</Text>
      ) : (
        <Box>{editLines}</Box>
      )
    }
    case 'campaign_bulk_create': {
      return (
        <Text>
          <Text as="span" textColor="primary.500">
            {data.numVoucherLinksCreated}
          </Text>{' '}
          voucher links were created
        </Text>
      )
    }
    case 'campaign_create_user_roles': {
      const roles = data.after?.roles
      const { email } = data
      return (
        <Text>
          {email} was given access to campaign with{' '}
          <Text as="span" color="primary.500">
            {getPrettyRoles(roles)}
          </Text>{' '}
          permissions.
        </Text>
      )
    }
    case 'campaign_update_user_roles': {
      const rolesBefore = data.before?.roles
      const rolesAfter = data.after?.roles
      const { email } = data
      return (
        <Text>
          {email}&apos;s permissions was edited from{' '}
          {getPrettyRoles(rolesBefore)} to{' '}
          <Text as="span" color="primary.500">
            {getPrettyRoles(rolesAfter)}
          </Text>
          .
        </Text>
      )
    }
    case 'campaign_delete_user_roles': {
      const roles = data.before?.roles
      const { email } = data
      return (
        <Text>
          {email} with {getPrettyRoles(roles)} permissions was removed from
          campaign.
        </Text>
      )
    }
    case 'campaign_upload_whitelist': {
      const { fileName, versionIndex } = data
      return (
        <Text textStyle="subhead2" color="primary.500">
          {`${fileName} (V${versionIndex}) `}
          <Text as="span" textStyle="body2" color="neutral.800">
            was uploaded
          </Text>
        </Text>
      )
    }
    case 'campaign_add_twilio_credentials': {
      const { accountSid, messagingServiceSid } = data
      return (
        <VStack alignItems="flex-start">
          {getEditedToText('Account SID', accountSid)}
          {getEditedToText('Messaging service SID', messagingServiceSid)}
        </VStack>
      )
    }
    case 'campaign_add_merchant': {
      return (
        <Text>
          {`${data.merchantShopName} with `}
          <Text as="span" textStyle="subhead2" color="primary.500">
            merchant-ID {data.merchantId}
          </Text>
          {` was added${
            data.type !== null
              ? ` as a ${getMerchantType(data.type)} merchant`
              : ''
          }.`}
        </Text>
      )
    }
    case 'campaign_remove_merchant': {
      return (
        <Text>
          {`${data.merchantShopName} with `}
          <Text as="span" textStyle="subhead2" color="primary.500">
            merchant-ID {data.merchantId}
          </Text>
          {` was removed${
            data.type !== null
              ? ` as a ${getMerchantType(data.type)} merchant`
              : ''
          }.`}
        </Text>
      )
    }
    case 'campaign_add_payout_source': {
      return (
        <Text>
          <Text as="span" textStyle="subhead2" color="primary.500">
            {`${data.senderParty}'s `}
          </Text>
          bank account with payout source ID
          <Text as="span" textStyle="subhead2" color="primary.500">
            {` ${data.payoutSourceId} `}
          </Text>
          is used.
        </Text>
      )
    }
    case 'campaign_export_settlements': {
      return <Text>{`Payout report for ${data.key} was exported.`}</Text>
    }
    case 'campaign_export_vouchers': {
      return <Text>{`Voucher report for ${data.key} was exported.`}</Text>
    }
    case 'campaign_export_transactions': {
      return <Text>{`Transaction report for ${data.key} was exported.`}</Text>
    }
    default:
      return <Text whiteSpace="pre">{JSON.stringify(data, null, 2)}</Text>
  }
}
