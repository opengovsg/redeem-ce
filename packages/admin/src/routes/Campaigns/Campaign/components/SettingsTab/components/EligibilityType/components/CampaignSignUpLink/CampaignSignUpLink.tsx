import React from 'react'
import { BiCheck } from 'react-icons/bi'
import { Text, HStack, Button, Input, Tooltip } from '@chakra-ui/react'

import { useToast } from 'data/Toasts'
import useClipboard from 'hooks/useClipboard'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'

import upperFirst from 'lodash/upperFirst'

import Card from 'components/Card'
import Badge from 'components/Badge'
import { signup as signupEndpoint } from 'constants/endpoints'

const CampaignSignUpLink = () => {
  const { toastSuccessWithoutTitle, toastError } = useToast()
  const { campaignId, campaignVisibility } = useCampaignContext()
  const linkToCopy = `${signupEndpoint}/${campaignId}`
  const { copyState, handleClick } = useClipboard({
    windowPromptText: `Failed to copy to clipboard for ${linkToCopy}`,
    textToCopy: linkToCopy,
    onError: () =>
      toastError({ message: 'An error occured. Please try again.' }),
    onSuccess: () =>
      toastSuccessWithoutTitle({
        primaryText: 'Campaign link copied! ',
        secondaryText:
          'Send this link to eligible applicants for them to claim their vouchers.',
      }),
  })

  const toolTipLabel =
    campaignVisibility === 'public'
      ? 'Everyone can access your campaign sign up link as it is publicly listed on Redeem'
      : 'Only people you share the campaign sign up link with has access to your campaign'

  return (
    <Card id="campaign-sign-up-link-pane" padding="40px 32px">
      <HStack spacing={4}>
        <Text textStyle="h3">Campaign sign up link</Text>
        {/* Disabling eslint for this line to prevent autoformatting of bg -> background due to this issue: https://github.com/chakra-ui/chakra-ui/issues/5283 */}
        {/* eslint-disable */}
        <Tooltip
          bg="neutral.900"
          hasArrow
          label={toolTipLabel}
          placement="top"
          shouldWrapChildren
        >
          <Badge
            color="primary.700"
            backgroundColor="primary.200"
            id="campaign-sign-up-link-visibility-badge"
          >
            {upperFirst(campaignVisibility)}
          </Badge>
        </Tooltip>
      </HStack>
      <Text textStyle="body1" color="neutral.700">
        Please send eligible residents this sign up link to claim their
        vouchers.
      </Text>
      <HStack justifyContent="space-between" width="100%" spacing={2}>
        <Input isDisabled placeholder={linkToCopy} readOnly />
        <Button width="102px" id="copy-campaign-link" onClick={handleClick}>
          {copyState ? <BiCheck size="24px" /> : 'Copy link'}
        </Button>
      </HStack>
    </Card>
  )
}

export default CampaignSignUpLink
