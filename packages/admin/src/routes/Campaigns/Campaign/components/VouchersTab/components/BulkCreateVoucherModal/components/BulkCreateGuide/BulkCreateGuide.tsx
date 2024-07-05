import React, { useState } from 'react'
import Card from 'components/Card'
import { Button, ModalBody } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import SwiperWithProgress from 'components/SwiperWithProgress'
import StickyFooter from '../StickyFooter'
import { BulkCreateStage } from '../../BulkCreateVoucherModal'
import {
  BULK_CREATE_GUIDE_SLIDES,
  FINAL_SLIDE,
} from './helpers/BulkCreateGuideSlides'

type BulkCreateGuideProps = {
  setBulkCreateStage: React.Dispatch<React.SetStateAction<BulkCreateStage>>
}

const BulkCreateGuide = ({
  setBulkCreateStage,
}: BulkCreateGuideProps): JSX.Element => {
  const history = useHistory()

  // First slide number is 0. There are 4 slides in total so:
  // 0, 1, 2, 3, where 3 is the final slide number.
  const [currentSlide, setCurrentSlide] = useState(0)

  const onClickNext = () => setBulkCreateStage(BulkCreateStage.UPLOAD)

  return (
    <>
      <ModalBody paddingBottom="84px">
        <Card
          padding="40px 32px 24px"
          id="bulk-create-guide-container-pane"
          width="100%"
          minWidth="1064px"
          maxWidth="1064px"
        >
          <SwiperWithProgress
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            slides={BULK_CREATE_GUIDE_SLIDES}
          />
        </Card>
      </ModalBody>
      <StickyFooter
        backButtonText="Back to vouchers"
        backButtonOnClick={() => history.goBack()}
        title="How to bulk-create vouchers"
        nextButton={
          currentSlide !== FINAL_SLIDE ? (
            <Button onClick={onClickNext} variant="outline">
              Skip guide
            </Button>
          ) : (
            <Button onClick={onClickNext}>Next: Fill CSV template</Button>
          )
        }
      />
    </>
  )
}

export default BulkCreateGuide
