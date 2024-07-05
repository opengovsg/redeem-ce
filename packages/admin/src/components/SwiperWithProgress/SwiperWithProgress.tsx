import React from 'react'
import { Box, Button, ButtonGroup, HStack } from '@chakra-ui/react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import ProgressIndicator from 'components/ProgressIndicator/ProgressIndicator'

type SwiperWithProgressProps = {
  currentSlide: number
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>
  slides: JSX.Element[]
}

const SwiperWithProgress = ({
  currentSlide,
  setCurrentSlide,
  slides,
}: SwiperWithProgressProps): JSX.Element => {
  const handlePrevClick = () => {
    setCurrentSlide((prevSlide) => prevSlide - 1)
  }

  const handleNextClick = () => {
    setCurrentSlide((prevSlide) => prevSlide + 1)
  }

  return (
    <Box overflow="hidden" width="100%" id="swiper-with-progress-container">
      <div
        className="slides-container"
        style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.key}
            className="slide"
            style={{
              flex: '0 0 100%',
              width: '100%',
            }}
          >
            {slide}
          </div>
        ))}
      </div>
      <HStack justifyContent="space-between" width="100%" paddingTop="24px">
        <ProgressIndicator
          activeIndicator={currentSlide}
          totalNumIndicators={slides.length}
        />
        <ButtonGroup>
          <Button
            padding="12px 12px"
            id="swiper-with-progress-button-prev"
            isDisabled={currentSlide === 0}
            onClick={handlePrevClick}
          >
            <BiChevronLeft size={24} />
          </Button>
          <Button
            padding="12px 12px"
            id="swiper-with-progress-button-next"
            isDisabled={currentSlide === slides.length - 1}
            onClick={handleNextClick}
          >
            <BiChevronRight size={24} />
          </Button>
        </ButtonGroup>
      </HStack>
    </Box>
  )
}

export default SwiperWithProgress
