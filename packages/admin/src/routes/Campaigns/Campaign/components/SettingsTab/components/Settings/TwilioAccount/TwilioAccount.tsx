import React from 'react'
import Card from 'components/Card'
import {
  VStack,
  Text,
  HStack,
  Icon,
  Button,
  Divider,
  Table,
  Tbody,
  Tr,
  Td,
} from '@chakra-ui/react'
import { BiMessage, BiPlus } from 'react-icons/bi'
import { BiXCircle, BiCheckCircle } from 'components/icons'
import { convertNumberWithCommaDelimiters } from 'utils/string'
import { TwilioCredentials } from 'services/RedeemApi/types'
import TwilioCredentialsInfoBox from './components/TwilioCredentialsInfoBox'
import FindTwilioCredentials from './components/FindTwilioCredentials'
import useTwilio from '../hooks/useTwilio'
import { useTwilioContext } from '../context/TwilioContext'

const getSmsUsageTextColor = (
  smsUsed: number,
  isCustomTwilioCredentialsEnabled: boolean
) => {
  // When Sms Usage > 3000, and still no custom credentials, we need to show a warning text to the users
  if (smsUsed > 3000 && !isCustomTwilioCredentialsEnabled) {
    return 'danger.500'
  }

  // When Sms Usage < 3000, users are still entitled to use redeem's credentials. But once their credentials are enabled
  // and sms usage is >= 3000, we will show a faded text to the user
  if (smsUsed >= 3000 && isCustomTwilioCredentialsEnabled) {
    return 'neutral.500'
  }

  return 'neutral.900'
}

const TwilioAccount = () => {
  const {
    showShouldSmsInfoBox,
    smsUsed,
    isCustomTwilioCredentialsEnabled,
    isSmsUsageAtLeast80Percent,
    twilioCredentials,
  } = useTwilio()
  const { twilioService } = useTwilioContext()
  const { send } = twilioService

  const twilioCredentialsKeyOrder: (keyof TwilioCredentials)[] = [
    'accountSid',
    'authToken',
    'messagingServiceSid',
  ]

  const isOverUsageOfSms = smsUsed > 3000

  return (
    <Card padding="40px 32px">
      <Text textStyle="h3" color="neutral.900">
        SMS Account
      </Text>
      <Text textStyle="body1" color="neutral.700">
        {
          'Redeem sends the first 3,000 SMSes for free for your campaign. To send more after, please add your own Twilio credentials. '
        }
        <FindTwilioCredentials />
      </Text>
      <VStack alignItems="flex-start" width="100%" spacing={3}>
        <HStack>
          <Icon
            as={BiMessage}
            width="1rem"
            height="1rem"
            marginRight="8px"
            color={getSmsUsageTextColor(
              smsUsed,
              isCustomTwilioCredentialsEnabled
            )}
          />
          <Text
            textStyle="h5"
            color={getSmsUsageTextColor(
              smsUsed,
              isCustomTwilioCredentialsEnabled
            )}
          >{`${convertNumberWithCommaDelimiters(smsUsed)}/3,000 ${
            isOverUsageOfSms ? '' : 'free '
          }SMSes used`}</Text>
        </HStack>
        {showShouldSmsInfoBox && <TwilioCredentialsInfoBox smsUsed={smsUsed} />}
        {!isCustomTwilioCredentialsEnabled && !isSmsUsageAtLeast80Percent && (
          <HStack
            // The reason why this position='relative' hack is used to prevent the button from occupying space which forces greater space between the two text
            position="relative"
            justifyContent="space-between"
            width="100%"
          >
            <HStack>
              <Icon
                as={BiXCircle}
                width="1rem"
                height="1rem"
                marginRight="8px"
                color="neutral.900"
              />
              <Text textStyle="h5">Twilio credentials not added</Text>
            </HStack>
            <Button
              position="absolute"
              right="0"
              bottom="0"
              minWidth="max-content"
              id="add-twilio-credentials-outline"
              leftIcon={<BiPlus size={20} />}
              onClick={() => send({ type: 'OPEN' })}
              variant="outline"
            >
              Add Twilio credentials
            </Button>
          </HStack>
        )}
        {isCustomTwilioCredentialsEnabled && !!twilioCredentials && (
          <>
            <Divider marginY="24px" />
            <HStack>
              <Icon
                as={BiCheckCircle}
                width="1rem"
                height="1rem"
                marginRight="8px"
                color="success.500"
              />
              <Text textStyle="h5">Twilio credentials added</Text>
            </HStack>
            <Table width="auto" variant="unstyled">
              <Tbody width="fit-content">
                {twilioCredentialsKeyOrder.map((key) => {
                  return (
                    <Tr key={key}>
                      <Td
                        verticalAlign="middle"
                        padding="4px"
                        _first={{ paddingLeft: '0px' }}
                      >
                        <Text textStyle="subhead2" color="neutral.700">
                          {key}
                        </Text>
                      </Td>
                      <Td verticalAlign="middle" padding="4px">
                        <Text textStyle="subhead2" color="neutral.700">
                          {twilioCredentials[key]}
                        </Text>
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </>
        )}
      </VStack>
    </Card>
  )
}

export default TwilioAccount
