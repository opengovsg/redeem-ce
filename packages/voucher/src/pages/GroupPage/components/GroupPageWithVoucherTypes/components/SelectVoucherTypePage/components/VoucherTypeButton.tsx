import {Button, Stack, Icon, HStack, Text} from '@chakra-ui/react'
import {BiChevronRight} from 'react-icons/bi'

type VoucherTypeButtonProps = {
  amountLeft: number | undefined
  backgroundColor: string
  id: string
  image: React.ReactNode
  onClick: () => void
  type: string
}

const VoucherTypeButton = ({
  amountLeft,
  backgroundColor,
  id,
  image,
  onClick,
  type,
}: VoucherTypeButtonProps) => {
  return (
    <Button
      padding={0}
      paddingRight='12px'
      border='1px solid neutral.300'
      borderColor='neutral.300'
      borderRadius='8px'
      boxShadow='0px 1px 4px 0px #00000026'
      _hover={{backgroundColor: 'primary.100'}}
      _active={{backgroundColor: 'primary.100'}}
      whiteSpace='pre-wrap'
      boxSizing='border-box'
      backgroundColor='white'
      id={id}
      onClick={onClick}
      paddingY='12px'
    >
      <HStack flexGrow={1}>
        <Stack
          align='center'
          justify='center'
          minWidth='59px'
          minHeight='56px'
          borderRightRadius='8px'
          backgroundColor={backgroundColor}
        >
          {image}
        </Stack>
        <Text textStyle='subhead1' color='neutral.800' textAlign='left'>
          {type}
        </Text>
      </HStack>
      <HStack spacing='4px'>
        <HStack spacing='2px'>
          <Text textStyle='caption1' color='neutral.800'>
            $
          </Text>
          <Text textStyle='h3' color='neutral.800'>
            {amountLeft}
          </Text>
        </HStack>
        <Icon
          as={BiChevronRight}
          width='20px'
          height='20px'
          color='neutral.800'
        />
      </HStack>
    </Button>
  )
}

export default VoucherTypeButton
