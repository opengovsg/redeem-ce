import {HStack, Button, Text, Icon} from '@chakra-ui/react'
import {BiRightArrowAlt} from 'react-icons/bi'
import {useTranslation} from 'react-i18next'
import {useIsShortDeviceInitial} from 'helpers/hooks'

type GroupPageBottomOverlayProps = {
  selectedVouchersTotalValue: number
  onClickNext: () => void
  showButton?: boolean
}

const GroupPageBottomOverlay = ({
  selectedVouchersTotalValue,
  onClickNext,
  showButton,
}: GroupPageBottomOverlayProps) => {
  const {t} = useTranslation('main')

  // If height is smaller than a certain number,
  // we render the button with smaller paddings.
  const isShortDevice = useIsShortDeviceInitial()

  return (
    <>
      {showButton && (
        <HStack
          position='fixed'
          zIndex='docked'
          bottom='0'
          align='stretch'
          justify='center'
          display='flex'
          width='100%'
          padding={isShortDevice ? '16px' : '24px'}
          boxShadow='var(--chakra-shadows-small)'
          backgroundColor='white'
        >
          <Button
            width='full'
            maxWidth='512px'
            padding={isShortDevice ? '8px 16px' : '16px'}
            _hover={{backgroundColor: 'primary.800'}}
            _active={{backgroundColor: 'primary.800'}}
            backgroundColor='primary.700'
            id='redeem-button'
            onClick={onClickNext}
          >
            <HStack justify='space-between' width='100%'>
              <HStack spacing='2px'>
                <Text textStyle={isShortDevice ? 'subhead2' : 'h5'}>$</Text>
                <Text textStyle={isShortDevice ? 'h2' : 'display2'}>
                  {selectedVouchersTotalValue}
                </Text>
              </HStack>
              <HStack spacing='4px'>
                <Text textStyle={isShortDevice ? 'subhead2' : 'subhead1'}>
                  {t('redeem_button')}
                </Text>
                <Icon
                  as={BiRightArrowAlt}
                  width='24px'
                  height='24px'
                  color='currentColor'
                />
              </HStack>
            </HStack>
          </Button>
        </HStack>
      )}
    </>
  )
}

export default GroupPageBottomOverlay
