import React from 'react'
import {Box, Icon} from '@chakra-ui/react'
import Modal from 'components/Modal'
import {BiRightArrowAlt} from 'react-icons/bi'
import {useTranslation} from 'react-i18next'

type RedemptionErrorModalProps = {
  errorObject: {
    title: string
    content: React.ReactNode
  }
  isOpen: boolean
  onCloseClick: () => void
}

const RedemptionErrorModal = ({
  errorObject,
  isOpen,
  onCloseClick,
}: RedemptionErrorModalProps) => {
  const {t} = useTranslation('redemption')
  return (
    <Modal header={errorObject.title} isOpen={isOpen} type='error'>
      <Box textAlign='center'>
        {errorObject.content}
        <button
          type='button'
          className='base-button primary stretch icon-right'
          style={{marginTop: '1.5rem'}}
          onClick={onCloseClick}
        >
          {t('close')}
          <Icon as={BiRightArrowAlt} width='24px' height='24px' />
        </button>
      </Box>
    </Modal>
  )
}

export default React.memo(RedemptionErrorModal)
