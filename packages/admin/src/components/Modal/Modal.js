import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import useKeyPress from 'hooks/KeyPress'

import './Modal.scss'

export default function Modal({
  contentClassName,
  isOpen,
  onCloseClick,
  children,
}) {
  // Trigger close when Escape is pressed
  useKeyPress('Escape', onCloseClick)

  // Disable or Enable scroll on the html body that is in the background of the modal
  // whenever it is opened or close.
  useEffect(() => {
    // Disable when opens, enables when closed
    if (isOpen) {
      document.body.classList.add('disable-scroll')
    } else {
      document.body.classList.remove('disable-scroll')
    }
  }, [isOpen])

  return (
    <div className={isOpen ? 'modal display-block' : 'modal display-none'}>
      <section className={`${contentClassName} modal-main`}>{children}</section>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseClick: PropTypes.func,
  children: PropTypes.element,
  contentClassName: PropTypes.string,
}
