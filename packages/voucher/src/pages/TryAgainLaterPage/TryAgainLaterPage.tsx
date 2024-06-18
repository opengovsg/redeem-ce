import {Center, VStack, Image, Text} from '@chakra-ui/react'
import {Footer} from 'components/Footer'
import Header from 'components/basic/Header'
import redeemLogo from 'images/redeem-logo.svg'
import voucherRedemptionGraphic from 'images/voucher-redemption-graphic.svg'

type TryAgainLaterPageProps = {
  title: string
  message: string
}

const TryAgainLaterPage = ({
  title,
  message,
}: TryAgainLaterPageProps): JSX.Element => {
  return (
    <>
      <Header campaignDescription={title} campaignTitle={title} />
      <VStack>
        <Center
          flexGrow={1}
          width='100%'
          background='white'
          id='kill-switch-container'
        >
          <VStack
            align='stretch'
            justify='space-between'
            width='100%'
            maxWidth='512px'
            height='100%'
            paddingTop='32px'
            paddingBottom='0'
            paddingX='24px'
            spacing='48px'
          >
            <VStack align='stretch' spacing='40px'>
              <Image width='8rem' height='1.5rem' src={redeemLogo} />
              <VStack align='stretch' spacing='12px'>
                <Text as='header' textStyle='h4' color='neutral.900'>
                  {title}
                </Text>
                <Text textStyle='body1' color='neutral.800'>
                  {message}
                </Text>
              </VStack>
            </VStack>
            <Image
              alt='Left column image'
              fallbackSrc={voucherRedemptionGraphic}
              src={voucherRedemptionGraphic}
            />
          </VStack>
        </Center>
        <Footer />
      </VStack>
    </>
  )
}

export default TryAgainLaterPage
