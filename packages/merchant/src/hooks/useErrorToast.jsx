import { useToast } from '@chakra-ui/react'
// TODO: migrate to ogp toasts

const useErrorToast = () => {
  const toast = useToast()

  return (error) =>
    toast({
      title: 'Error',
      description: typeof error === 'string' ? error : error.name,
      status: 'error',
      duration: 100000,
      isClosable: true,
    })
}

export default useErrorToast
