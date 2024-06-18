import React from 'react'
import {useTranslation} from 'react-i18next'
import redeemLogoLight from 'images/redeem-logo-light.svg'
import redeemLogoDark from 'images/redeem-logo.svg'

import {BiHelpCircle, BiMap, BiShare} from 'react-icons/bi'
import DesktopAlertOverlay from 'components/DesktopAlertOverlay'
import VoidInlineMessage from './components/VoidInlineMessage'
import {
  HStack,
  Image,
  VStack,
  Icon,
  useMultiStyleConfig,
  Center,
} from '@chakra-ui/react'
import LanguageSelector from 'components/LanguageSelector'
import GroupPageHeaderButton from './components/GroupPageHeaderButton'
import {REDEEM_CONSTANTS} from 'constants/config'
import {isDesktop} from 'react-device-detect'
import {openInNewTab} from 'helpers/utils'
import GroupPageHeaderInfo from './components/GroupPageHeaderInfo'
import {formatDateString} from 'helpers/date'
import {DDAction} from 'constants/datadog'

type GroupPageHeaderProps = {
  logoBackgroundColor?: string | null
  logoSrc?: string | null
  address: string
  buttonActiveBackgroundColor?: string
  buttonBackgroundColor?: string
  onClickCopy: () => void
  onClickHelp: () => void
  isInteractionDisabled: boolean
  hasVoidedVoucher: boolean
  colorScheme: string
  campaignName?: string | null
  campaignExpiresAt?: string | null
  campaignOrganiserFeedbackUrl: string | null
  campaignMerchantListUrl?: string | null
}

function GroupPageHeader({
  logoBackgroundColor,
  logoSrc,
  address,
  buttonActiveBackgroundColor,
  buttonBackgroundColor,
  onClickCopy,
  onClickHelp,
  isInteractionDisabled,
  hasVoidedVoucher,
  colorScheme,
  campaignName,
  campaignExpiresAt,
  campaignOrganiserFeedbackUrl,
  campaignMerchantListUrl,
}: GroupPageHeaderProps) {
  const {t} = useTranslation('header')
  const redeemLogo = isInteractionDisabled ? redeemLogoDark : redeemLogoLight
  const topLeftLogo = logoSrc

  const formattedCampaignExpiresAt = t('use_by', {
    expiryDate: formatDateString(campaignExpiresAt || ''),
  })

  const groupedPageHeaderVariant = isInteractionDisabled
    ? 'interactionDisabled'
    : 'baseStyle'

  const styles = useMultiStyleConfig('GroupPageHeader', {
    variant: groupedPageHeaderVariant,
  })

  const imageStyle = styles.logoImage

  return (
    <VStack
      sx={styles.container}
      align='stretch'
      flexShrink={0}
      width='100vw'
      maxWidth='512px'
      padding='24px 24px'
      id='voucher-group-page-header'
      spacing='0px'
    >
      <HStack align='stretch' justify='space-between'>
        {logoBackgroundColor ? (
          <Center
            width='52px'
            height='52px'
            borderRadius='50%'
            backgroundColor={logoBackgroundColor}
          >
            <Image
              maxWidth='38px'
              maxHeight='30px'
              alt='Campaign Logo'
              fallbackSrc={redeemLogo}
              src={topLeftLogo || redeemLogo}
            />
          </Center>
        ) : (
          <Image
            sx={imageStyle}
            alt='Campaign Logo'
            fallbackSrc={redeemLogo}
            src={topLeftLogo || redeemLogo}
          />
        )}

        <LanguageSelector
          isInteractionDisabled={isInteractionDisabled}
          color='dark'
        />
      </HStack>
      <GroupPageHeaderInfo
        campaignName={campaignName}
        formattedCampaignExpiresAt={formattedCampaignExpiresAt}
        address={address}
        contentContainerStyle={styles.contentContainer}
      />
      <HStack
        align='stretch'
        justify='center'
        paddingTop='20px'
        paddingBottom={isDesktop ? '16px' : '0'}
      >
        {!campaignMerchantListUrl && (
          <GroupPageHeaderButton
            datadogActionName={DDAction.SHARE_VOUCHER_BUTTON}
            buttonActiveBackgroundColor={
              buttonActiveBackgroundColor
                ? buttonActiveBackgroundColor
                : 'primary.600'
            }
            backgroundColor={
              buttonBackgroundColor ? buttonBackgroundColor : 'primary.500'
            }
            isInteractionDisabled={isInteractionDisabled}
            icon={<Icon as={BiShare} boxSize='16px' transform='scaleX(-1)' />}
            id='share-voucher-button'
            onClickAction={onClickCopy}
            text={t('share')}
          />
        )}
        {campaignMerchantListUrl && (
          <GroupPageHeaderButton
            datadogActionName={DDAction.WHERE_TO_USE_BUTTON}
            buttonActiveBackgroundColor={
              buttonActiveBackgroundColor
                ? buttonActiveBackgroundColor
                : 'primary.600'
            }
            backgroundColor={
              buttonBackgroundColor ? buttonBackgroundColor : 'primary.500'
            }
            icon={<Icon as={BiMap} boxSize='16px' />}
            id='where-to-use-button'
            isInteractionDisabled={isInteractionDisabled}
            // TODO: Replace REDEEM_BASE_URL with something else if campaign
            // has no campaignMerchantListUrl.
            onClickAction={() =>
              openInNewTab(
                campaignMerchantListUrl || REDEEM_CONSTANTS.landingPage,
              )
            }
            text={t('where_to_use')}
          />
        )}
        <GroupPageHeaderButton
          datadogActionName={DDAction.INFO_AND_HELP_BUTTON}
          buttonActiveBackgroundColor={
            buttonActiveBackgroundColor
              ? buttonActiveBackgroundColor
              : `${colorScheme}.600`
          }
          backgroundColor={
            buttonBackgroundColor ? buttonBackgroundColor : `${colorScheme}.500`
          }
          icon={<Icon as={BiHelpCircle} boxSize='16px' />}
          id='open-help-drawer-button'
          isInteractionDisabled={isInteractionDisabled}
          onClickAction={onClickHelp}
          text={t('info_and_help')}
        />
      </HStack>
      <DesktopAlertOverlay />
      {hasVoidedVoucher && (
        <VoidInlineMessage
          campaignOrganiserFeedbackUrl={campaignOrganiserFeedbackUrl}
        />
      )}
    </VStack>
  )
}

export default React.memo(GroupPageHeader)
