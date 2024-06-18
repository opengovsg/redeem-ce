// Constants
import {FaFacebookF, FaLinkedinIn} from 'react-icons/fa'
import {
  Container,
  Divider,
  Flex,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import * as CSS from 'csstype'

import OgpLogoImage from 'images/ogp-logo-black.svg'
import RedeemLogoPng from 'images/redeem-full.png'
import RedeemLogoSvg from 'images/redeem-full.svg'
import {REDEEM_CONSTANTS} from 'constants/config'

import OGPLogo from './OGPLogo'

interface FooterProps {
  desktopPosition?: CSS.Property.Position
}

export const Footer = ({desktopPosition = 'absolute'}: FooterProps) => {
  const isMobileWidth = useBreakpointValue({base: true, lg: false})

  return isMobileWidth ? (
    <Container
      width='100vw'
      maxWidth='1504px'
      backgroundColor='primary.100'
      paddingX={{base: 8, md: 12}}
    >
      <Stack
        textStyle='body2'
        alignItems={{md: 'flex-end'}}
        justifyContent={{md: 'space-between'}}
        direction={{base: 'column', md: 'row'}}
        paddingTop={{base: '56px', md: '48px'}}
        paddingBottom='40px'
        color='secondary.500'
        spacing='24px'
      >
        <Stack
          direction={{base: 'column', md: 'row'}}
          color='primary.500'
          spacing={{base: '8px', md: '16px'}}
        >
          <Image
            maxWidth='40%'
            fallbackSrc={RedeemLogoPng}
            src={RedeemLogoSvg}
          />
          <Text color='primary.500'>
            The trusted voucher system of the Singapore Government
          </Text>
        </Stack>
        <Stack
          direction={{base: 'column', md: 'row'}}
          color='primary.500'
          spacing={{base: '16px', md: '22px'}}
        >
          <Link href={REDEEM_CONSTANTS.privacy} isExternal>
            <Text textStyle='body2'>Privacy</Text>
          </Link>
          <Link href={REDEEM_CONSTANTS.termsOfUse} isExternal>
            <Text textStyle='body2'>Terms of Use</Text>
          </Link>
          <Link href={REDEEM_CONSTANTS.reportVulnerability} isExternal>
            <Text textStyle='body2'>Report Vulnerability</Text>
          </Link>
        </Stack>
      </Stack>
      <Divider color='neutral.300' />
      <Stack
        alignItems={{md: 'flex-end'}}
        justifyContent={{md: 'space-between'}}
        direction={{base: 'column', md: 'row'}}
        color='primary.500'
        paddingY='48px'
        spacing={{base: '32px', md: '0px'}}
      >
        <VStack
          alignItems={{base: 'flex-start', md: 'center'}}
          justifyContent='flex-start'
        >
          <Text textStyle='caption1' width='100%'>
            Built by
          </Text>
          <Link href='https://open.gov.sg' isExternal>
            <Image
              alt='Open Government Products Logo'
              htmlHeight='47px'
              htmlWidth='160px'
              loading='lazy'
              src={OgpLogoImage}
            />
          </Link>
        </VStack>

        <VStack align='stretch'>
          <HStack justifyContent={{md: 'flex-end'}} color='black'>
            <Link
              color='standard.black'
              _hover={{
                color: 'secondary.500',
              }}
              href='https://www.linkedin.com/company/open-government-products/'
              isExternal
            >
              <FaLinkedinIn size='28' style={{marginRight: '5px'}} />
            </Link>
            <Link
              color='standard.black'
              _hover={{
                color: 'secondary.500',
              }}
              href='https://www.facebook.com/opengovsg'
              isExternal
            >
              <FaFacebookF size='24' style={{marginRight: '5px'}} />
            </Link>
            <Link
              color='standard.black'
              _hover={{
                color: 'secondary.500',
              }}
              href='https://open.gov.sg'
              isExternal
            >
              <OGPLogo />
            </Link>
          </HStack>
          <Link href='https://open.gov.sg' isExternal>
            <Text
              textStyle='legal'
              _hover={{
                color: 'primary.500',
              }}
            >
              ©2021 Open Government Products, Government Technology Agency of
              Singapore
            </Text>
          </Link>
        </VStack>
      </Stack>
    </Container>
  ) : (
    <HStack
      position={desktopPosition}
      bottom={0}
      align='end'
      justify='start'
      width='100%'
      padding='20px'
      spacing='0px'
    >
      <VStack align='start' minWidth='40%' paddingLeft='5%' spacing='8px'>
        <Image
          maxHeight='30px'
          fallbackSrc={RedeemLogoPng}
          src={RedeemLogoSvg}
        />
        <Text textStyle='footer'>
          &copy; 2021 Open Government Products, GovTech Singapore
        </Text>
      </VStack>
      <Flex justifyContent='center' flex={1}>
        <HStack
          textStyle='footer'
          justify='space-between'
          width='514px'
          opacity='0.85'
        >
          <Link
            href={REDEEM_CONSTANTS.privacy}
            isExternal
            variant='footerDesktop'
          >
            Privacy
          </Link>
          <Link
            href={REDEEM_CONSTANTS.termsOfUse}
            isExternal
            variant='footerDesktop'
          >
            Terms of Use
          </Link>
          <Link
            href={REDEEM_CONSTANTS.reportVulnerability}
            isExternal
            variant='footerDesktop'
          >
            Report Vulnerability
          </Link>
        </HStack>
      </Flex>
    </HStack>
  )
}
