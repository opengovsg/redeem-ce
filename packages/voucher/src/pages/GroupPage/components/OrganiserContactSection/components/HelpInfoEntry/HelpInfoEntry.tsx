import {HStack, Icon} from '@chakra-ui/react'
import {IconType} from 'react-icons/lib'

type HelpInfoEntryProps = {
  icon: IconType
  children: React.ReactNode
  isFlipIcon?: boolean
}

const HelpInfoEntry = ({
  icon,
  children,
  isFlipIcon = false,
}: HelpInfoEntryProps) => {
  return (
    <HStack color='neutral.800' spacing='16px'>
      <Icon
        as={icon}
        boxSize='24px'
        color='neutral.700'
        transform={isFlipIcon ? 'scaleX(-1)' : undefined}
      />
      {children}
    </HStack>
  )
}

export default HelpInfoEntry
