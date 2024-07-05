import React, { FC } from 'react'
import {
  ComponentWithAs,
  forwardRef,
  Icon,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  Text,
  useStyleConfig,
} from '@chakra-ui/react'

import { BiLinkExternal } from 'react-icons/bi'

const ExternalIcon: FC = (): JSX.Element => {
  return (
    <Icon
      as={BiLinkExternal}
      verticalAlign="middle"
      marginLeft="0.25rem"
      aria-hidden
    />
  )
}
// ts-unused-exports:disable-next-line
export interface LinkProps extends ChakraLinkProps {
  externalLinkIcon?: React.ReactElement
  isDisabled?: boolean
}

type LinkWithParts = ComponentWithAs<'a', LinkProps> & {
  ExternalIcon: typeof ExternalIcon
}
// ts-unused-exports:disable-next-line
export const Link = forwardRef<LinkProps, 'a'>(
  (
    {
      externalLinkIcon = <Link.ExternalIcon />,
      isDisabled,
      children,
      ...props
    },
    ref
  ) => {
    const styles = useStyleConfig('Link', props)

    if (isDisabled) {
      return (
        <Text
          ref={ref}
          as="a"
          sx={props.sx ?? styles}
          alignItems="center"
          aria-disabled
        >
          {children}
          {props.isExternal && externalLinkIcon}
        </Text>
      )
    }

    return (
      <ChakraLink
        alignItems="center"
        display="inline-flex"
        {...props}
        ref={ref}
      >
        {children}
        {props.isExternal && externalLinkIcon}
      </ChakraLink>
    )
  }
) as LinkWithParts

Link.displayName = 'Link'

Link.ExternalIcon = ExternalIcon
Link.ExternalIcon.displayName = 'Link.ExternalIcon'
