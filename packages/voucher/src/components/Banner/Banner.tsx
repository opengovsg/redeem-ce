import React, {useMemo} from 'react'
import {
  As,
  Box,
  CloseButton,
  Collapse,
  Flex,
  Icon,
  StylesProvider,
  useDisclosure,
  useMultiStyleConfig,
} from '@chakra-ui/react'

import {BannerVariant} from 'theme/components/Banner'

import {BiErrorCircle, BiInfoCircle, BiX} from '../icons'

interface BannerProps {
  variant?: BannerVariant
  children: React.ReactNode
  /**
   * Whether to allow collapsing of the banner.
   * Defaults to `true` if `info` variant is used, `false` otherwise.
   */
  isDismissable?: boolean
  /**
   * The icon to use for the banner. Defaults to the variant's icon.
   */
  icon?: As
  /**
   * The close button to use for the banner.
   * Defaults to the variant's close button.
   * If `null`, the close button will not be rendered.
   */
  closeButton?: React.ReactNode
}

const Banner = ({
  variant = 'info',
  children,
  isDismissable: isDismissableProp,
  icon: iconProp,
  closeButton,
}: BannerProps): JSX.Element => {
  const {isOpen, onToggle} = useDisclosure({
    defaultIsOpen: true,
  })

  const styles = useMultiStyleConfig('Banner', {variant})

  const iconToUse = useMemo(() => {
    if (iconProp) {
      return iconProp
    }
    return variant === 'info' ? BiInfoCircle : BiErrorCircle
  }, [iconProp, variant])

  const isDismissable = useMemo(() => {
    if (isDismissableProp !== undefined) {
      return isDismissableProp
    }
    return variant === 'info'
  }, [isDismissableProp, variant])

  const closeButtonRendered = useMemo(() => {
    if (!isDismissable) return null
    if (closeButton !== undefined) return closeButton
    return (
      <CloseButton sx={styles.close} onClick={onToggle}>
        <BiX />
      </CloseButton>
    )
  }, [closeButton, isDismissable, onToggle, styles.close])

  return (
    <StylesProvider value={styles}>
      <Collapse animateOpacity in={isOpen} style={{flexShrink: 0}}>
        <Box __css={styles.banner}>
          <Flex sx={styles.item}>
            <Flex>
              <Icon as={iconToUse} __css={styles.icon} />
              {children}
            </Flex>
            {closeButtonRendered}
          </Flex>
        </Box>
      </Collapse>
    </StylesProvider>
  )
}

export default Banner
