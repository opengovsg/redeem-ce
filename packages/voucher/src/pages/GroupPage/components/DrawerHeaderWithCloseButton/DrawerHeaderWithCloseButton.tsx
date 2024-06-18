import {Button, HStack, Icon, Text, DrawerHeader} from '@chakra-ui/react'
import {useTranslation} from 'react-i18next'
import {BiX} from 'react-icons/bi'

type DrawerHeaderWithCloseButtonProps = {
  backgroundColor: string
  closeActiveColor?: string
  closeButtonId: string
  onCloseClick?: () => void
  title: string
}

const DrawerHeaderWithCloseButton = ({
  backgroundColor,
  closeActiveColor,
  closeButtonId,
  onCloseClick,
  title,
}: DrawerHeaderWithCloseButtonProps) => {
  const {t} = useTranslation('drawerHeader')
  return (
    <DrawerHeader paddingTop='0' backgroundColor={backgroundColor}>
      <HStack
        justify='space-between'
        maxWidth='512px'
        margin='0 auto'
        paddingX='24px'
        paddingY='16px'
      >
        <Text textStyle='subhead3' color='neutral.900'>
          {title}
        </Text>
        {onCloseClick && (
          <Button
            padding='8px 12px'
            color='primary.500'
            _hover={{backgroundColor: closeActiveColor}}
            _active={{backgroundColor: closeActiveColor}}
            iconSpacing='4px'
            id={closeButtonId}
            onClick={onCloseClick}
            rightIcon={<Icon as={BiX} width='16px' height='16px' />}
            size='sm'
            variant='outline'
          >
            <Text textStyle='subhead2'>{t('close_button')}</Text>
          </Button>
        )}
      </HStack>
    </DrawerHeader>
  )
}

export default DrawerHeaderWithCloseButton
