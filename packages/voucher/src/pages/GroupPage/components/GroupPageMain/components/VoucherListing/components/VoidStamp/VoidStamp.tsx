import {Flex, Text} from '@chakra-ui/react'
import {useTranslation} from 'react-i18next'

const VoidStamp = () => {
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
      <Text
        textStyle='stamp'
        color='primary.800'
        fontSize='1.5rem'
        fontWeight={600}
        transform='rotate(-6deg)'
      >
        {t('voided_stamp_label')}
      </Text>
    </Flex>
  )
}

export default VoidStamp
