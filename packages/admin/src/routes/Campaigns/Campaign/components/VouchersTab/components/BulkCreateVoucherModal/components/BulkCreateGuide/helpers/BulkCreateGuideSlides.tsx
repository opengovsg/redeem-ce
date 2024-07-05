import React from 'react'
import { Text, HStack } from '@chakra-ui/react'
import BulkCreateGuideOneFirstHalf from 'img/bulk-create-guide-1.1.svg'
import BulkCreateGuideOneSecondHalf from 'img/bulk-create-guide-1.2.svg'
import BulkCreateGuideTwoFirstHalf from 'img/bulk-create-guide-2.1.svg'
import BulkCreateGuideTwoSecondHalf from 'img/bulk-create-guide-2.2.svg'
import BulkCreateGuideThree from 'img/bulk-create-guide-3.svg'
import BulkCreateGuideFour from 'img/bulk-create-guide-4.svg'
import { BulkCreateGuideSlide, BulkCreateGuideSlideCard } from '../components'

export const FINAL_SLIDE = 3

const SLIDE_ONE = (
  <HStack alignItems="stretch">
    <BulkCreateGuideSlideCard
      imageSrc={BulkCreateGuideOneFirstHalf}
      title={
        <Text textStyle="body1" textColor="neutral.900" fontWeight="700">
          You may leave columns blank
        </Text>
      }
      description={
        <Text textStyle="body1" textColor="neutral.700">
          {`For example, don't fill in Mobile Number column if the campaign
          doesn't need it.`}
        </Text>
      }
    />
    <BulkCreateGuideSlideCard
      imageSrc={BulkCreateGuideOneSecondHalf}
      title={
        <Text textStyle="body1" textColor="neutral.900" fontWeight="700">
          {'Do '}
          <Text as="span" textDecoration="underline">
            not
          </Text>{' '}
          add or remove columns
        </Text>
      }
      description={
        <Text textStyle="body1" textColor="neutral.700">
          The uploaded CSV should have the same columns as the template, even if
          one of them is empty.
        </Text>
      }
    />
  </HStack>
)

const SLIDE_TWO = (
  <HStack alignItems="stretch">
    <BulkCreateGuideSlideCard
      imageSrc={BulkCreateGuideTwoFirstHalf}
      title={
        <Text textStyle="body1" textColor="neutral.900" fontWeight="700">
          Recipient identifier and Mobile Number should be in the correct format
        </Text>
      }
      description={
        <Text textStyle="body1" textColor="neutral.700">
          Recipient identifiers must be capitalised
        </Text>
      }
    />
    <BulkCreateGuideSlideCard
      imageSrc={BulkCreateGuideTwoSecondHalf}
      title={
        <Text textStyle="body1" textColor="neutral.900" fontWeight="700">
          Do not enter invalid recipient identifiers or Mobile Numbers
        </Text>
      }
      description={
        <Text textStyle="body1" textColor="neutral.700">
          If your CSV contains errors, you will need to fix and re-upload it
          before creating vouchers.
        </Text>
      }
    />
  </HStack>
)

const SLIDE_THREE = (
  <BulkCreateGuideSlideCard
    imageSrc={BulkCreateGuideThree}
    title={
      <Text textStyle="body1" textColor="neutral.900" fontWeight="700">
        You can proceed with duplicate entries if required
      </Text>
    }
    description={
      <Text textStyle="body1" textColor="neutral.700">
        {`You'll be prompted if your CSV has duplicates, but you can proceed if
        you want a recipient to have multiple voucher links.`}
      </Text>
    }
  />
)

const SLIDE_FOUR = (
  <BulkCreateGuideSlideCard
    imageSrc={BulkCreateGuideFour}
    title={
      <Text textStyle="body1" textColor="neutral.900" fontWeight="700">
        Send the links out yourself using your preferred channel
      </Text>
    }
    description={
      <Text textStyle="body1" textColor="neutral.700">
        Remember, anyone with access to a voucher link will be able to spend it.
      </Text>
    }
  />
)

export const BULK_CREATE_GUIDE_SLIDES = [
  {
    title: 'Download and fill the CSV template',
    description:
      'The CSV has 3 columns: Name, Id and Mobile Number. Some tips to remember:',
    slide: SLIDE_ONE,
    key: 'bulk-create-slide-1',
  },
  {
    title: 'Make sure your data is correct',
    description: 'This will ensure your vouchers are created without errors.',
    slide: SLIDE_TWO,
    key: 'bulk-create-slide-2',
  },
  {
    title: 'Check for duplicates before uploading your CSV',
    description:
      "We don't remove duplicates. e.g. If the same recipient identifier is in 2 rows, two voucher links will be created for that person.",
    slide: SLIDE_THREE,
    key: 'bulk-create-slide-3',
  },
  {
    title: 'Download your voucher links',
    description:
      'A link will be created for each row in your uploaded CSV, and can be found in the Vouchers tab.',
    slide: SLIDE_FOUR,
    key: 'bulk-create-slide-4',
  },
].map((slide) => (
  <BulkCreateGuideSlide
    title={slide.title}
    description={slide.description}
    slide={slide.slide}
    key={slide.key}
  />
))
