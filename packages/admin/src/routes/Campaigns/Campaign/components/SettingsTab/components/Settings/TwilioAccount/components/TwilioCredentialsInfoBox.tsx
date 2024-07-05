import React from 'react'
import Infobox from 'components/Infobox'
import { InfoboxVariant } from 'theme/components/Infobox'
import { BiPlus } from 'react-icons/bi'
import { Text, Button } from '@chakra-ui/react'
import { useTwilioContext } from '../../context/TwilioContext'

type TwilioCredentialsInfoBoxProps = {
  showButton?: boolean
  smsUsed: number
}

function getInfoBoxText(smsUsed: number) {
  if (smsUsed >= 3000) {
    return (
      <>
        <Text as="span" fontWeight={500}>
          {'Your campaign has run out of free SMSes. '}
        </Text>
        Please add your own Twilio credentials to continue sending SMSes.
      </>
    )
  }

  const remainingSms = 3000 - smsUsed

  // The reason why remaingSms might be negative because we are not handling race condition currently
  // so the number of sms usage might go above 3000 slightly
  return (
    <>
      <Text as="span" fontWeight={500}>{`Your campaign only has ${
        remainingSms >= 0 ? remainingSms : 0
      } free SMSes left. `}</Text>
      Please add your own Twilio credentials to continue sending SMSes.
    </>
  )
}

function getInfoBoxVariant(smsUsed: number): InfoboxVariant {
  if (smsUsed >= 3000) {
    return 'danger'
  }

  if (smsUsed >= 2400) {
    return 'warning'
  }

  return 'info'
}

const TwilioCredentialsInfoBox = ({
  showButton = true,
  smsUsed,
}: TwilioCredentialsInfoBoxProps) => {
  const infoBoxText = getInfoBoxText(smsUsed)
  const variant = getInfoBoxVariant(smsUsed)
  const { twilioService } = useTwilioContext()
  const { send } = twilioService

  return (
    <Infobox
      variant={variant}
      width="100%"
      text={
        <Text textStyle="body1" color="neutral.900">
          {infoBoxText}
        </Text>
      }
      button={
        showButton ? (
          <Button
            minWidth="max-content"
            colorScheme={variant}
            id="add-twilio-credentials"
            leftIcon={<BiPlus size={20} />}
            onClick={() => send({ type: 'OPEN' })}
            variant="solid"
          >
            Add Twilio credentials
          </Button>
        ) : null
      }
    />
  )
}

export default TwilioCredentialsInfoBox
