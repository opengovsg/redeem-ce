import {Flex, Text} from '@chakra-ui/react'
import {useTranslation} from 'react-i18next'

// TODO: Consider use of useMultiStyleConfig
const RedeemedStampSmall = () => {
  const {t} = useTranslation('main')
  return (
    <Flex
      position='absolute'
      zIndex={2}
      alignItems='center'
      justifyContent='center'
      width='100%'
      height='100%'
    >
      <Flex
        alignItems='center'
        textAlign='center'
        _before={{
          width: '8px',
          height: '0px',
          content: '""',
          color: 'danger.500',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'danger.500',
          marginRight: '0.2rem',
        }}
        _after={{
          width: '8px',
          content: '""',
          height: '0px',
          color: 'danger.500',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'danger.500',
          marginLeft: '0.2rem',
        }}
        transform='matrix(1, 0.05, -0.06, 1, 0, 0)'
      >
        <Text
          textStyle='stamp'
          paddingTop='1px'
          color='danger.500'
          fontSize='1rem'
          fontWeight={600}
          borderStyle='solid'
          borderColor='danger.500'
          borderTopWidth='2px'
          borderBottomWidth='2px'
          paddingY='4px'
        >
          {t('redeemed_stamp_label')}
        </Text>
      </Flex>
    </Flex>
  )
}

export default RedeemedStampSmall
