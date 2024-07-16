import React from 'react'
import { Skeleton } from '@chakra-ui/react'

const ValueCardSkeleton = () => (
  <>
    <Skeleton
      w='60%'
      h={6}
      marginBottom={2}
    />
    <Skeleton h={10} />
  </>
)

export default ValueCardSkeleton
