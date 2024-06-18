import React from 'react'
import {Button, Icon, Link, Text} from '@chakra-ui/react'
import {BiMap} from 'react-icons/bi'
import {useTranslation} from 'react-i18next'

type WhereToUseButtonProps = {
  campaignMerchantListUrl: string
  colorScheme: string
  datadogActionName: string
  id: string
}

const WhereToUseButton = ({
  campaignMerchantListUrl,
  colorScheme,
  datadogActionName,
  id,
}: WhereToUseButtonProps) => {
  const {t} = useTranslation('voucherTypeSelectVouchers')
  return (
    <Link href={campaignMerchantListUrl} isExternal>
      <Button
        flexShrink={0}
        borderRadius='30px'
        _hover={{
          backgroundColor: `${colorScheme}.900`,
        }}
        _active={{
          backgroundColor: `${colorScheme}.900`,
        }}
        backgroundColor={`${colorScheme}.800`}
        data-dd-action-name={datadogActionName}
        id={id}
        leftIcon={<Icon as={BiMap} width='16px' height='16px' />}
        mixBlendMode='normal'
      >
        <Text textStyle='subhead2' color='white'>
          {t('where_to_use')}
        </Text>
      </Button>
    </Link>
  )
}

export default WhereToUseButton
