import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Text } from '@chakra-ui/react'
import IconTextRow, { ICON_TYPE } from 'components/shared/IconTextRow'

import BREAKPOINTS from 'constants/breakpoints'

const MainHeader = ({
  headerText,
  bgOverlapSize,
  merchantName,
  userName,
  bankDetails,
  children,
}) => (
  <Flex
    backgroundColor='#21234b'
    color='white'
    flexDir='column'
    paddingX={BREAKPOINTS.HORIZONTAL_RESPONSIVE.PADDING_X}
    paddingTop={2}
    paddingBottom={4 + (bgOverlapSize ?? 0)}
    marginBottom={bgOverlapSize * -1}
  >
    <Text textAlign='right'>v1.8.0</Text>
    <Text
      fontSize='3xl'
      fontWeight='900'
      marginBottom={2}
    >
      {headerText}
    </Text>
    <Flex
      flexDir='column'
      gap={1}
    >
      {!!merchantName && (
        <IconTextRow
          iconType={ICON_TYPE.MERCHANT}
          text={merchantName}
        />
      )}
      {!!userName && (
        <IconTextRow
          iconType={ICON_TYPE.USER}
          text={userName}
        />
      )}
      {!!bankDetails && (
        <IconTextRow
          iconType={ICON_TYPE.PAYMENT}
          text={bankDetails}
        />
      )}
    </Flex>
    {children}
  </Flex>
)

MainHeader.propTypes = {
  headerText: PropTypes.string.isRequired,
  bgOverlapSize: PropTypes.number.isRequired,
  merchantName: PropTypes.string,
  userName: PropTypes.string,
  bankDetails: PropTypes.string,
  children: PropTypes.node,
}

export default MainHeader
