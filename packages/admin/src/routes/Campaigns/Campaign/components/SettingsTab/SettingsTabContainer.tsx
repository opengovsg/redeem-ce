import React from 'react'

import SettingsTab from './SettingsTab'
import { SettingsTabProvider } from './SettingsTabContext'

export default function SettingsTabContainer() {
  return (
    <SettingsTabProvider>
      <SettingsTab />
    </SettingsTabProvider>
  )
}
