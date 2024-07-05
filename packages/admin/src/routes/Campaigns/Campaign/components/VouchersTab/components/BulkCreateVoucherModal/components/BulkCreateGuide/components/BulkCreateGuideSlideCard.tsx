import React from 'react'
import { Image, VStack } from '@chakra-ui/react'

type BulkCreateGuideSlideCardProps = {
  imageSrc: string
  title: React.ReactNode
  description: React.ReactNode
}

const BulkCreateGuideSlideCard = ({
  imageSrc,
  title,
  description,
}: BulkCreateGuideSlideCardProps): JSX.Element => {
  return (
    <VStack
      flex="1"
      overflow="hidden"
      minWidth="0"
      borderWidth="1px"
      borderColor="neutral.300"
      borderRadius="4px"
      spacing="0"
    >
      <VStack alignItems="left" width="100%" padding="24px 24px" spacing="4px">
        {title}
        {description}
      </VStack>
      <Image width="100%" height="200px" objectFit="cover" src={imageSrc} />
    </VStack>
  )
}

export default BulkCreateGuideSlideCard
