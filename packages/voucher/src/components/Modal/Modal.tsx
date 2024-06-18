import React, {ReactNode, useEffect} from 'react'
import {ReactComponent as XCircleSolidDanger} from 'images/x-circle-solid-danger.svg'

import useKeyPress from 'hooks/useKeyPress'

import './Modal.scss'
import {Text} from '@chakra-ui/react'

interface ModalProps {
  isOpen: boolean
  children: ReactNode
  type: 'error'
  // TODO: Stricter types
  header?: ReactNode
  onCloseClick?: () => void
}

const Modal = ({isOpen, onCloseClick, children, type, header}: ModalProps) => {
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

  // On unmount, enable scroll as well
  useEffect(() => {
    return () => document.body.classList.remove('disable-scroll')
  }, [])

  return (
    <>
      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <section className='modal-main'>
          <section className='modal-icon'>
            {type === 'error' && <XCircleSolidDanger />}
          </section>
          <section className='modal-content'>
            <Text textStyle='h3' className={`modal-header ${type}`}>
              {header}
            </Text>
            <section className='modal-body body-1'>{children}</section>
          </section>
        </section>
      </div>
    </>
  )
}

export default Modal
