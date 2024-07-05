import { Center, CenterProps, VStack } from '@chakra-ui/react'
import {
  PRINTABLE_VOUCHERS_CONTENT_PADDING_X,
  PRINTABLE_VOUCHERS_CONTENT_PADDING_Y,
} from 'constants/vouchers'
import React from 'react'
import { theme } from 'theme'

const CONTENT_SCALE = '1.33'
const CELL_BORDER_WIDTH = '1px'

type PrintableVoucherCellContainerProps = {
  children: React.ReactNode
} & CenterProps

const PrintableVoucherCellContainer = ({
  children,
  ...props
}: PrintableVoucherCellContainerProps) => {
  return (
    <Center
      sx={{
        // TODO: Consider CSS grid.
        // Add bottom border to all cells that are not
        // at the bottom of the page
        '&:nth-child(-n + 8)': {
          borderBottomWidth: CELL_BORDER_WIDTH,
        },
        // Remove right border from cells that are on the extreme
        // right of the page
        '&:nth-child(2n)': {
          borderRight: 'none',
        },
      }}
      overflow="hidden"
      // 4 rows of 2 vouchers per page
      width="calc(100% / 2)"
      height="calc(100% / 4)"
      borderWidth={0}
      borderStyle="dashed"
      borderColor={theme.colors.neutral[500]}
      borderRightWidth={CELL_BORDER_WIDTH}
      {...props}
    >
      <VStack
        align="stretch"
        width={`calc(100% / ${CONTENT_SCALE} - 2 * ${CELL_BORDER_WIDTH})`}
        height={`calc(100% / ${CONTENT_SCALE} - 2 * ${CELL_BORDER_WIDTH})`}
        paddingTop={PRINTABLE_VOUCHERS_CONTENT_PADDING_Y}
        paddingLeft={PRINTABLE_VOUCHERS_CONTENT_PADDING_X}
        transform={`scale(${CONTENT_SCALE})`}
        spacing={0}
      >
        {children}
      </VStack>
    </Center>
  )
}

export default PrintableVoucherCellContainer
