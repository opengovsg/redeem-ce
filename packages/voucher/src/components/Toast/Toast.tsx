import React, {ReactNode} from 'react'
import './Toast.scss'
import {ReactComponent as BxsCheckCircleSuccess} from 'images/bxs-check-circle-success.svg'
import {ReactComponent as BxErrorCircle} from 'images/bx-error-circle.svg'
import {IconContext} from 'react-icons/lib'
import {BiX} from 'react-icons/bi'

export interface ToastProps {
  header: ReactNode
  type: 'success' | 'warning'
  visible: boolean
  onClose: () => void
  message?: string
}

const Toast = ({header, message, type, onClose, visible}: ToastProps) => {
  return (
    <div className={`toast ${type} ${visible ? 'visible' : ''}`}>
      {type === 'success' ? <BxsCheckCircleSuccess /> : <BxErrorCircle />}
      <div className='toast-text'>
        <span className='subhead-2'>{header}</span>
        {message && <span className='body-2'>{message}</span>}
      </div>
      <button type='button' onClick={onClose}>
        <IconContext.Provider value={{size: '24px'}}>
          <BiX />
        </IconContext.Provider>
      </button>
    </div>
  )
}

export default Toast
