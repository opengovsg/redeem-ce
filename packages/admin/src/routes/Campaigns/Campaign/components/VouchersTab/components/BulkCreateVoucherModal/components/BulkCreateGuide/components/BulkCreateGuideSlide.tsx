import React from 'react'
import { Text, VStack } from '@chakra-ui/react'

type BulkCreateGuideSlideProps = {
  title: string
  description: string
  slide: React.ReactNode
}

const BulkCreateGuideSlide = ({
  title,
  description,
  slide,
}: BulkCreateGuideSlideProps): JSX.Element => {
  return (
    <VStack
      alignItems="left"
      width="100%"
      maxWidth="1064px" // To not allow image to expand past aspect ratios
      spacing="12px"
    >
      <Text textStyle="h3" textColor="neutral.900">
        {title}
      </Text>
      <Text textStyle="body1" paddingBottom="12px" textColor="neutral.700">
        {description}
      </Text>
      {slide}
    </VStack>
  )
}

export default BulkCreateGuideSlide
