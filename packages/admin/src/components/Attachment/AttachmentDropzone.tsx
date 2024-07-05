import React from 'react'
import { DropzoneInputProps, DropzoneState } from 'react-dropzone'
import { chakra, Icon, Text, useStyles } from '@chakra-ui/react'

import { BiCloudUpload } from 'react-icons/bi'
import { Link } from '../Link'

interface AttachmentDropzoneProps {
  inputProps: DropzoneInputProps
  isDragActive: DropzoneState['isDragActive']
}
/* eslint-disable jsx-a11y/anchor-is-valid */
export const AttachmentDropzone = ({
  inputProps,
  isDragActive,
}: AttachmentDropzoneProps): JSX.Element => {
  const styles = useStyles()

  return (
    <>
      <chakra.input {...inputProps} data-testid={inputProps.name} />
      <Icon as={BiCloudUpload} __css={styles.icon} aria-hidden />

      {isDragActive ? (
        <Text>Drop the file here ...</Text>
      ) : (
        <Text color="neutral.700" fontWeight={500}>
          {/* Manually change the link style here rather than globally! For regression purposes */}
          <Link isDisabled={inputProps.disabled} color="primary.500">
            Choose file
          </Link>{' '}
          or drag and drop here
        </Text>
      )}
    </>
  )
}
