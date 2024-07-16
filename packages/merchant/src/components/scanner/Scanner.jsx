import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Grid, IconButton, Text } from '@chakra-ui/react'
import { BiRefresh, BiScan, BiStopCircle } from 'react-icons/bi'
import { IoMdFlashlight } from 'react-icons/io'
import { useTranslation } from 'react-i18next'
import moment from 'moment-timezone'

import {
  BrowserMultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
  NotFoundException,
  ChecksumException,
  FormatException,
} from '@zxing/library'
import MediaDevices from 'media-devices'

import I18N_KEYS from 'constants/i18n-keys'

const SCAN_ATTEMPT_INTERVAL_IN_MS = 300
const DECODE_ATTEMPT_INTERVAL_IN_MS = 1500
const SAME_DECODE_INTERVAL_IN_MS = 3000

// checks if at least minInterval ms has passed since eventLastOccuredTimestamp
const isBeforeMinIntervalElapsed = (minInterval, eventLastOccurredTimestamp) =>
  eventLastOccurredTimestamp &&
  moment().isBefore(moment(eventLastOccurredTimestamp).add(minInterval, 'ms'))

const Scanner = ({
  isPaused = false,
  onScan = () => {},
  onScanInvalid = () => {},
  onOtherError = (err) => {
    // TODO: only for debugging, remove this later
    console.log('[!]: ', err)
  },
}) => {
  // translation
  const { KEY, TEXT } = I18N_KEYS.HOME
  const { t } = useTranslation(KEY)

  // scanner refs / states
  const reader = useRef(null)
  const mediaStream = useRef(null)
  const videoRef = useRef(null)
  const cameraDirection = useRef('environment')
  const [scannerEnabled, setScannerEnabled] = useState(false)

  // experimental - enable phone torchlight if supported
  const torchActivated = useRef(false)
  const [torchSupported, setTorchSupported] = useState(false)

  // scanning logic vars, to stop multiple codes from being handled at once
  const isProcessingScan = useRef(false)
  const lastDataHandledTimestamp = useRef(0)
  const lastScannedData = useRef('')

  // Add a guard, to prevent unnecessary fires whilst
  // 1. The scanner is paused due to an API call / data display modal
  // 2. The scanner is still processing a scan
  const shouldBlockDecoding = () => isPaused || isProcessingScan.current

  // Scans a Voucher QR for redemption
  const processScannedData = (data) => {
    // delay scans between processing QRs with the same data
    if (
      data === lastScannedData.current &&
      isBeforeMinIntervalElapsed(
        SAME_DECODE_INTERVAL_IN_MS,
        lastDataHandledTimestamp.current,
      )
    ) {
      // else, fire the onScan callback for processing
    } else {
      lastScannedData.current = data
      lastDataHandledTimestamp.current = moment()
      onScan(data)
    }
  }

  // called every scan interval when scanner is enabled
  const decodeCallback = (result, err) => {
    if (err) {
      // ignore not found errors
      if (err instanceof NotFoundException) return
      // this is caused by a race condition in the reader library, ignore it
      if (
        err.toString() ===
        'IndexSizeError: Index or size is negative or greater than the allowed amount'
      )
        return
      // trigger invalid scan callback
      if (err instanceof ChecksumException || err instanceof FormatException) {
        onScanInvalid()
      }
    }
    if (result) {
      if (shouldBlockDecoding() || !result) return

      // ready to process result
      isProcessingScan.current = true
      processScannedData(result.text)
      isProcessingScan.current = false
    }
  }

  // retrieves the input device facing cameraDirection and starts the reader
  const startScanner = () => {
    if (scannerEnabled) {
      MediaDevices.getUserMedia({
        video: { facingMode: cameraDirection.current },
      })
        .then((stream) => {
          // give external access to the current media stream
          mediaStream.current = stream

          // start decoding with reader
          reader.current.decodeFromStream(
            stream,
            videoRef.current,
            decodeCallback,
          )
        })
        .catch((err) => {
          // trigger error handler callback
          onOtherError(err)
        })
    }
  }

  // handle scanner stop button
  const stopScanner = useCallback(
    () => reader.current?.reset() || setScannerEnabled(false),
    [],
  )

  // toggles to the camera facing cameraDirection
  const toggleCameraDirection = () => {
    cameraDirection.current =
      cameraDirection.current === 'user' ? 'environment' : 'user'

    // restart scanner
    startScanner()
  }

  // handle flashlight toggle (EXPERIMENTAL)
  const toggleFlashlight = () => {
    torchActivated.current = !torchActivated.current
    mediaStream.current?.getVideoTracks().forEach((track) =>
      track
        .applyConstraints({
          advanced: [{ torch: torchActivated.current }],
        })
        .catch(() => {
          // silently fail, as this is experimental
        }),
    )
  }

  // trigger scanning when enabling scanner
  useEffect(() => {
    if (scannerEnabled) startScanner()
    else stopScanner()
  }, [scannerEnabled])

  // handle initial render and supply cleanup fn
  useEffect(() => {
    // initialise reader
    if (!reader.current) {
      // tell reader to scan QR Codes only
      const scannerHints = new Map([
        [DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE]],
      ])

      // create reader and define parameters
      reader.current = new BrowserMultiFormatReader(
        scannerHints,
        SCAN_ATTEMPT_INTERVAL_IN_MS,
      )
      reader.current.timeBetweenDecodingAttempts = DECODE_ATTEMPT_INTERVAL_IN_MS
    }

    // check if torchlight is supported, else disable it
    const constraints = MediaDevices.getSupportedConstraints()
    if (constraints.torch && constraints.fillLightMode?.length > 0) {
      setTorchSupported(true)
    }

    // return cleanup fn
    return () => {
      stopScanner()
    }
  }, [])

  // start preview
  return (
    <>
      <Grid
        h='100%'
        w='100%'
        overflow='hidden'
        borderRadius='inherit'
        backgroundColor='black'
      >
        <Box
          as='video'
          h='100%'
          w='100%'
          gridArea='1/1/1/1'
          objectFit='cover'
          ref={videoRef}
        >
          <track kind='captions' />
        </Box>
        <Flex
          h='100%'
          w='100%'
          gridArea='1/1/1/1'
          flexDir='column'
          justifyContent='space-between'
        >
          {scannerEnabled ? (
            <>
              <Flex
                flexDir='row'
                justifyContent='space-between'
              >
                <IconButton
                  onClick={() => {
                    toggleCameraDirection()
                  }}
                  icon={<BiRefresh color='white' />}
                  fontSize={32}
                  margin={2}
                  variant='ghost'
                  isRound
                />

                <IconButton
                  onClick={stopScanner}
                  icon={<BiStopCircle color='white' />}
                  fontSize={32}
                  margin={2}
                  variant='ghost'
                  isRound
                />
              </Flex>
              {torchSupported && (
                <IconButton
                  onClick={toggleFlashlight}
                  icon={<IoMdFlashlight color='white' />}
                  fontSize={48}
                  w={16}
                  h={16}
                  marginX='auto'
                  marginY={8}
                  variant='ghost'
                  isRound
                />
              )}
            </>
          ) : (
            <Flex
              margin='auto'
              alignItems='center'
              flexDir='column'
            >
              <IconButton
                isRound
                fontSize={36}
                w={20}
                h={20}
                icon={<BiScan />}
                marginBottom={4}
                onClick={() => setScannerEnabled(true)}
              />
              <Text
                color='white'
                margin='auto'
                fontWeight='medium'
                fontSize={20}
              >
                {t(TEXT.START_SCAN_TEXT)}
              </Text>
            </Flex>
          )}
        </Flex>
      </Grid>
    </>
  )
}

Scanner.propTypes = {
  isPaused: PropTypes.bool,
  onScan: PropTypes.func,
  onScanInvalid: PropTypes.func,
  onOtherError: PropTypes.func,
}

export default Scanner
