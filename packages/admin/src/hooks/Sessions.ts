import { useMutation, useQueryClient } from 'react-query'
import { logout } from 'services/RedeemApi'

export function useLogout() {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries('selfUserPermissions')
    },
  })

  return {
    logout: mutateAsync,
  }
}
