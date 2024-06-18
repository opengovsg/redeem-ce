import React from 'react'
import {Icon} from '@chakra-ui/react'
import Modal from 'components/Modal'
import {useTranslation} from 'react-i18next'
import {BiRightArrowAlt} from 'react-icons/bi'

type AlreadyRedeemedModalProps = {
  isOpen: boolean
  onCloseClick: () => void
}

const AlreadyRedeemedModal = ({
  isOpen,
  onCloseClick,
}: AlreadyRedeemedModalProps) => {
  const {t} = useTranslation('redemption', {
    keyPrefix: 'modals.already_redeemed',
  })

  return (
    <Modal isOpen={isOpen} type='error' header={t('title')}>
      {t('body', {
        interpolation: {escapeValue: false},
      })}
      <button
        type='button'
        className='base-button primary stretch icon-right'
        style={{marginTop: '1.5rem'}}
        onClick={onCloseClick}
      >
        {t('action')}
        <Icon as={BiRightArrowAlt} width='24px' height='24px' />
      </button>
    </Modal>
  )
}

export default React.memo(AlreadyRedeemedModal)
