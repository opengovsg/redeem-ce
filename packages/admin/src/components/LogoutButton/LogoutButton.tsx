import React from 'react'
import { Button } from '@chakra-ui/react'
import { useAuthenticationState } from 'data/Authentication'
import { useLogout } from 'hooks/Sessions'

const LogoutButton = (): JSX.Element => {
  const { setAuthStateWithUser } = useAuthenticationState()
  const { logout } = useLogout()

  const onClickLogout = async () => {
    // If logout() somehow fails, still delete localStorage to not affect user experience
    await logout()
    setAuthStateWithUser(null)
  }

  return (
    <Button onClick={onClickLogout} variant="outline">
      Logout
    </Button>
  )
}

export default LogoutButton
