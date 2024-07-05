import { ComponentStyleConfig } from '@chakra-ui/react'
import { StepsTheme } from 'chakra-ui-steps'
import _ from 'lodash'
import { textStyles } from 'theme/textStyles'

export const Steps: ComponentStyleConfig = {
  ..._.merge(StepsTheme, {
    baseStyle: (props: Record<string, any>) => ({
      steps: {
        bg: `${props.colorScheme}.100`,
        paddingX: '72px',
        paddingY: '24px',
        opacity: 1,
      },
      stepContainer: {
        flexDirection: 'column',
        opacity: 1,
      },
      label: {
        color: `${props.colorScheme}.500`,
        opacity: 1,
        whiteSpace: 'nowrap',
      },
      step: {
        color: `${props.colorScheme}.800`,
        opacity: 1,
        alignItems: 'flex-start',
        _last: {
          '> :last-child': {
            borderWidth: 0,
          },
        },
      },
      stepIconContainer: {
        opacity: 1,
        color: `${props.colorScheme}.300`,
        borderColor: 'currentColor',
        background: 'currentColor',
        _highlighted: {
          color: `${props.colorScheme}.500`,
          background: 'currentColor',
        },
        _activeStep: {
          color: `${props.colorScheme}.500`,
          background: 'none',
        },
        '> span': {
          color: `${props.colorScheme}.800`,
        },
      },
      connector: {
        marginTop: '8px', // (20px - 4px) / 2
        borderColor: `${props.colorScheme}.300`,
        borderWidth: '2px',
        marginX: 0,
        _highlighted: {
          borderColor: `${props.colorScheme}.500`,
        },
      },
      labelContainer: {
        position: 'absolute',
      },
    }),
    sizes: {
      md: {
        label: {
          ...textStyles.subhead2,
        },
        stepIconContainer: {
          width: '20px',
          height: '20px',
          borderWidth: '2px',
          marginBottom: '8px',
          '> span': {
            ...textStyles.caption1,
          },
        },
        stepContainer: {
          paddingBottom: '24px',
        },
        step: {
          ...textStyles.caption1,
        },
        labelContainer: {
          top: '28px',
        },
        icon: {
          width: '12px',
          height: '12px',
        },
      },
    },
  }),
}
