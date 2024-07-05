import React from 'react'
import { Link } from '@chakra-ui/react'

const FindTwilioCredentials = () => {
  return (
    <Link
      color="primary.500"
      fontWeight={500}
      // We can link to our link when we set up our gitbook
      // TODO: To use feature flag :) So we can dynamic update our gitbook link
      href="https://support.twilio.com/hc/en-us/articles/223136147-Where-are-my-Twilio-Test-Credentials-"
      rel="noopener noreferrer"
      target="_blank"
    >
      How to find your credentials ↪
    </Link>
  )
}

export default FindTwilioCredentials
