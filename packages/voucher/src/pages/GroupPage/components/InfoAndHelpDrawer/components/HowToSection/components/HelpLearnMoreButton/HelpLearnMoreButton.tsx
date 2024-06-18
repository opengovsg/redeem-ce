import {Button, HStack, Link, LinkProps, Text, VStack} from '@chakra-ui/react'

type HelpDrawerLearnMoreButtonProps = {
  description: string
  href?: LinkProps['href']
  icon: React.ReactNode
  id: string
  title: string
  onClick: () => void
} & LinkProps

interface LinkWrapProps {
  href?: LinkProps['href']
  wrap: (children: JSX.Element) => JSX.Element
  children: JSX.Element
}

// Helper component to wrap button in Link if href is provided.
const LinkWrap = ({href, wrap, children}: LinkWrapProps): JSX.Element => {
  return href ? wrap(children) : <>{children}</>
}

const HelpDrawerLearnMoreButton = ({
  description,
  href,
  icon,
  id,
  title,
  onClick,
  ...linkProps
}: HelpDrawerLearnMoreButtonProps) => {
  return (
    <LinkWrap
      href={href}
      wrap={(children) => (
        <Link
          textDecoration='none'
          _hover={{textDecoration: 'none'}}
          href={href}
          isExternal
          {...linkProps}
        >
          {children}
        </Link>
      )}
    >
      <Button
        filter='auto'
        width='100%'
        paddingRight='12px'
        paddingLeft='24px'
        background='white'
        border='neutral.200'
        borderRadius='8px'
        dropShadow='var(--chakra-shadows-small)'
        id={id}
        onClick={onClick}
        paddingY='20px'
        variant='unstyled'
      >
        <HStack>
          <VStack align='start' flexGrow={1} textAlign='start' spacing='4px'>
            <Text textStyle='h5' color='primary.500' whiteSpace='pre-wrap'>
              {title}
            </Text>
            <Text textStyle='body2' color='neutral.800' whiteSpace='pre-wrap'>
              {description}
            </Text>
          </VStack>
          {icon}
        </HStack>
      </Button>
    </LinkWrap>
  )
}

export default HelpDrawerLearnMoreButton
