import React, { useContext, createContext } from 'react'
import { useInterpret } from '@xstate/react'
import { InterpreterFrom } from 'xstate'
import { useCampaignAddTwilioCredentials } from 'hooks/Campaign'
import { useCampaignContext } from 'routes/Campaigns/Campaign/context/CampaignContext'
import { twilioModelMachine } from '../machine/TwilioCredentialsModalMachine'
import TwilioCredentialsModal from '../TwilioAccount/components/TwilioCredentialsModal'

type TwilioContextProps =
  | { twilioService: InterpreterFrom<typeof twilioModelMachine> }
  | undefined

const TwilioContext = createContext<TwilioContextProps>(undefined)

type TwilioProviderProps = { children: React.ReactNode }

function TwilioProvider({ children }: TwilioProviderProps) {
  const { campaignId } = useCampaignContext()
  const { addTwilioCredentialsToCampaign } =
    useCampaignAddTwilioCredentials(campaignId)
  const twilioService = useInterpret(twilioModelMachine, {
    services: {
      addTwilioCredentials: async (context) => {
        const { accountSid, authToken, messagingServiceSid } = context
        await addTwilioCredentialsToCampaign({
          accountSid,
          authToken,
          messagingServiceSid,
        })
      },
    },
  })
  const value = { twilioService }

  return (
    <TwilioContext.Provider value={value}>{children}</TwilioContext.Provider>
  )
}

function useTwilioContext() {
  const context = useContext(TwilioContext)
  if (context === undefined) {
    throw new Error('useTwilioContext must be used inside a TwilioProvider')
  }
  return context
}

function withTwilio<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>
) {
  const WrappedComponentWithProps = (props: P) => {
    return (
      <TwilioProvider>
        <WrappedComponent {...(props as P)} />
        <TwilioCredentialsModal />
      </TwilioProvider>
    )
  }

  return WrappedComponentWithProps
}

export { useTwilioContext, withTwilio }
