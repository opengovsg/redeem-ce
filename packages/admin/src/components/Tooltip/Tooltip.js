import React from 'react'
import { PropTypes } from 'prop-types'

import './Tooltip.scss'

export default function Tooltip({ label, children }) {
  return (
    <div className="tooltip">
      <span className="tooltiptext">{label}</span>
      {children}
    </div>
  )
}

Tooltip.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
}
