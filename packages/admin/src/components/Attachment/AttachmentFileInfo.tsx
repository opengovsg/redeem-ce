import React, { useEffect, useMemo, useState } from 'react'
import {
  Flex,
  forwardRef,
  Image,
  Stack,
  Text,
  VisuallyHidden,
  useStyles,
} from '@chakra-ui/react'
import { dataAttr } from '@chakra-ui/utils'

import { BiTrash } from 'react-icons/bi'
import IconButton from '../IconButton'

import { getReadableFileSize } from './utils/getReadableFileSize'

interface AttachmentFileInfoProps {
  file: File
  handleRemoveFile: () => void
  imagePreview?: 'small' | 'large'
  isDisabled?: boolean
  isReadOnly?: boolean
}

export const AttachmentFileInfo = forwardRef<AttachmentFileInfoProps, 'div'>(
  ({ file, handleRemoveFile, imagePreview, isDisabled, isReadOnly }, ref) => {
    const [previewSrc, setPreviewSrc] = useState('')
    const styles = useStyles()
    const readableFileSize = useMemo(
      () => getReadableFileSize(file.size),
      [file.size]
    )

    useEffect(() => {
      let objectUrl = ''
      // create the preview
      if (file.type.startsWith('image/')) {
        objectUrl = URL.createObjectURL(file)
        setPreviewSrc(objectUrl)
      }

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    return (
      <Flex ref={ref} sx={styles.fileInfoContainer} aria-disabled={isDisabled}>
        <VisuallyHidden>
          File attached: {file.name} with file size of {readableFileSize}
        </VisuallyHidden>
        {imagePreview && previewSrc && (
          <Image
            sx={styles.fileInfoImage}
            alt="uploaded image preview"
            src={previewSrc}
          />
        )}
        <Flex sx={styles.fileInfo}>
          <Stack flexDirection="column" aria-hidden spacing="0.25rem">
            <Text>{file.name}</Text>
            <Text
              sx={styles.fileInfoDescription}
              data-disabled={dataAttr(isDisabled)}
            >
              {readableFileSize}
            </Text>
          </Stack>
          <IconButton
            variant="clear"
            aria-label="Remove file"
            icon={BiTrash}
            onClick={handleRemoveFile}
            isDisabled={isDisabled || isReadOnly}
            _hover={{
              bg: 'rgba(192, 52, 52, 0.04)',
            }}
            color="#c03434"
          />
        </Flex>
      </Flex>
    )
  }
)

AttachmentFileInfo.displayName = 'AttachmentFileInfo'
