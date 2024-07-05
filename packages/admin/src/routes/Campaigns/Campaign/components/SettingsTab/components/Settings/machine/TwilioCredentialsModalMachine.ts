import { createMachine, assign } from 'xstate'
import _ from 'lodash'

type TwilioModelMachineEvent =
  | {
      type: 'OPEN'
    }
  | {
      type: 'ON_PRIMARY_CLICK'
    }
  | {
      type: 'ON_SECONDARY_CLICK'
    }
  | {
      type: 'ON_EXIT'
    }
  | {
      type: 'FORM_INPUT_CHANGE_accountSid'
      value: string
    }
  | {
      type: 'FORM_INPUT_CHANGE_authToken'
      value: string
    }
  | {
      type: 'FORM_INPUT_CHANGE_messagingServiceSid'
      value: string
    }

type TwilioModelMachineServices = {
  addTwilioCredentials: {
    data: void
  }
}

export type TwilioCredentials = {
  accountSid: string
  authToken: string
  messagingServiceSid: string
}

const defaultContext = {
  // Context for Other UI related
  secondaryButtonText: '',
  primaryButtonText: '',
  primaryButtonColorScheme: '',
  modalPrimaryText: '',
  // Context for input
  accountSid: '',
  authToken: '',
  messagingServiceSid: '',
}

// Common transitions in the form of <state><action>Transition
const openModeExitTransition = [
  {
    target: 'draftMode',
    actions: 'updateModalUiForDraftMode',
    cond: {
      type: 'isDirty' as const,
    },
  },
  {
    target: 'closedMode',
    actions: 'updateModalUiForClosedMode',
  },
]

const confirmModeExitTransition = {
  target: 'closedMode',
  actions: 'updateModalUiForClosedMode',
}

/**
 * Some UI changes was not saved here as the values are meant to be serializeable. But because react components are not (i think) and each of the modal
 * look is really different, i am leaving it back to the primitive way of checking the state and rendering the correct component
 */
export const twilioModelMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBcDuBLANug9gWRwjEzwEMBjAC3QDswA6czHWSAogYgHkAFAUQByAbQAMAXUSgADi3TJcNSSAAeiAGwAmADQgAnogCMIjQBZ6JkZpHGAnAHY7agKwBfFzrRZc7YmSq0GHCkwGh9uAQB9HgAlAEk8AEFogE0IgGEAGVi0gGlRCSQQGVg5BSVVBANtPUMNNw8MbHxCXwpqOnogkLCAMS5ovAjYgR4AVQAVdIAJBIEAcT4IinIcAFcaZABlWIARfKVi0pxFQoqjAzMbAA4TEzsNa0sbNSudfUqNDSv6ERMbAGYnP8DDYRAYDE4TPUQJ4mj4SG0Ap1gqEWhw+gMhiMJtNZgslqtkJRxjgANYhfaFQ7yY7lQxg74OQFqOzWJxAq4GN6GAz-DQ-Z4aOwmDT-ET2K51dwwxreFoI-wdLqozgYwbDMaTNIzeaLAC2cFgpCgtCgmzAACcAG7ochgbZ7cQHWQ0k6gCr2Ow-TROK5OETCwE2bmVET-NT0C7AmxOIUGG4GaGwuVEBXtBgQC2kABmyDCXEimz4aQLOySqUy2TyTqpLrKp0MV2c9E5DiuAP+JmBrxqCCuYfM7fZNhMFxsGicNiTsuaqb86fomZzebRBYifAAGrFxpTpHXaQ3KuGbD8rk3fsCOWoQ6ynD9gSCL2o1CYm9OvLPWoqM1nc-nIjE8TlukWS5LuRT7m6KiGHYvLmECDxhrBLwAiGL53pypiinYVx8tYVzvnC8rzkiKw0Nm6AWnqPj0OgECYGA4RRHEiQpCBVbgdS9buo2EaPMYBh2P89xVNU7ydiI9D2M4fy4f8YpOGohEpl+C5kRRVE0XRDFMUWJYCGWbGVmBNZ7iUrp0ggAC0470GoYoaLyLIvPcwa9ryTgGPQwITvJuFqGG8nKZ+aakccGnUS0tH0Yxa6btunGQZZ7ZeeOIKThc7IiD27y4V5OHgjGhW+lKDQfvCJEdOplGRUQ9BgMoYDkISpocBAxwMLQVpkgwpAQBA4wzmkFqQCE8ikJgsCxDQ3XkKQrqJeZ3HQQgNiCd6E5+gGXaTiGpgRrG8l-NYQp+vcwUVYiVXhTVNENU1LU0FAHCWhaOAWvQUiYPN2bvXq9B9QNQ0jUQGzoBNU0zTgc0LaZEFLQePGVE2PyPI5QkiZ8e0AuYjiQi+LKmGtULQjQLTwIUyYhZVYDOgjUEVFZFySfZAnho4VyuSGVl2He-qPJlAK87BF3EVdDBMCwbAtHTRwM4Yil8xC-ZHf8a1OCGfwRv2JjPn8k7ZUF0pU5d37It0Mu1vTlldl6fyfCIkKjoFMYhryGgnidinGLGGgsqLc7i4uv4rkQssWYe4I4fQikTvcnOeWe169pzZgeyKgm82ovLPAHqlheRt2W2ZcuWWre2O1JeOQnY1ziuyrjGzOptqTdmlRdptNW6Xh6cyG-peZKzzgmKwp-HnoXXYX7d1fdzXyE94fLRUr58T6TjCxOut2CGwJmNnEqaNGkIEW4LhAA */
    context: defaultContext,
    id: 'twilioModelMachine',

    // Initial state
    initial: 'closedMode',
    tsTypes: {} as import('./TwilioCredentialsModalMachine.typegen').Typegen0,
    schema: {
      events: {} as TwilioModelMachineEvent,
      services: {} as TwilioModelMachineServices,
    },
    // States
    states: {
      closedMode: {
        id: 'closedMode',
        on: {
          OPEN: { target: 'openMode', actions: 'updateModalUiForOpenMode' },
        },
      },
      openMode: {
        id: 'openMode',
        on: {
          ON_PRIMARY_CLICK: {
            target: 'confirmMode',
            actions: 'updateModalUiForConfirmMode',
          },
          ON_SECONDARY_CLICK: openModeExitTransition,
          ON_EXIT: openModeExitTransition,
          FORM_INPUT_CHANGE_accountSid: {
            actions: 'assignAccountSidToContext',
          },
          FORM_INPUT_CHANGE_authToken: { actions: 'assignAuthTokenToContext' },
          FORM_INPUT_CHANGE_messagingServiceSid: {
            actions: 'assignMessagingServiceSidToContext',
          },
        },
      },
      draftMode: {
        id: 'draftMode',
        on: {
          ON_SECONDARY_CLICK: {
            target: 'openMode',
            actions: 'updateModalUiForOpenMode',
          },
          ON_EXIT: confirmModeExitTransition,
          ON_PRIMARY_CLICK: confirmModeExitTransition,
        },
      },
      confirmMode: {
        id: 'confirmMode',
        initial: 'idle',
        states: {
          idle: {
            on: {
              ON_PRIMARY_CLICK: {
                target: 'executing',
              },
              ON_SECONDARY_CLICK: {
                target: '#openMode',
                actions: 'updateModalUiForOpenMode',
              },
              ON_EXIT: {
                target: '#draftMode',
                actions: 'updateModalUiForDraftMode',
              },
            },
          },
          executing: {
            invoke: {
              // Referencing the services in the machine.
              src: 'addTwilioCredentials',
              id: 'addTwilioCredentialsInvocation',
              // goes back to idle state for user to retry
              onError: {
                target: '#confirmMode',
                actions: 'updateModalUiForConfirmMode',
              },
              onDone: {
                target: '#closedMode',
                actions: 'updateModalUiForClosedMode',
              },
            },
          },
        },
      },
    },
  },
  {
    guards: {
      // Somehow the linter didnt pick this up. Need to investigate but not a problem
      isDirty: (context) => {
        const { accountSid, authToken, messagingServiceSid } = context

        return (
          !_.isEmpty(accountSid) ||
          !_.isEmpty(authToken) ||
          !_.isEmpty(messagingServiceSid)
        )
      },
    },
    actions: {
      assignAccountSidToContext: assign((_context, event) => ({
        accountSid: event.value,
      })),
      assignAuthTokenToContext: assign((_context, event) => ({
        authToken: event.value,
      })),
      assignMessagingServiceSidToContext: assign((_context, event) => ({
        messagingServiceSid: event.value,
      })),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      updateModalUiForOpenMode: assign((__) => ({
        secondaryButtonText: 'Cancel',
        primaryButtonText: 'Save credentials',
        primaryButtonColorScheme: 'primary',
        modalPrimaryText: 'Add Twilio credentials',
      })),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      updateModalUiForConfirmMode: assign((__) => ({
        secondaryButtonText: 'Edit credentials',
        primaryButtonText: 'Confirm credentials',
        primaryButtonColorScheme: 'primary',
        modalPrimaryText: 'Confirm Twilio credentials',
      })),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      updateModalUiForDraftMode: assign((__) => ({
        secondaryButtonText: 'No, go back',
        primaryButtonText: 'Yes, discard changes',
        primaryButtonColorScheme: 'danger',
        modalPrimaryText: 'You have unsaved changes',
      })),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      updateModalUiForClosedMode: assign((__) => defaultContext),
    },
  }
)

export type MachineType = typeof twilioModelMachine
