import { MASK_COMPONENT_ON_MONITORING_PROPS } from 'constants/monitoring'
import React from 'react'

type MaskedOnMonitoringProps = {
  children: React.ReactNode
}

// Component that masks children elements' text on monitoring service
const MaskedOnMonitoring = ({ children }: MaskedOnMonitoringProps) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, MASK_COMPONENT_ON_MONITORING_PROPS)
    }
    return child
  })

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{childrenWithProps}</>
}

export default MaskedOnMonitoring
