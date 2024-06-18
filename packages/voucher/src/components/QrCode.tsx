import React, {ReactNode, useCallback} from 'react'

import QRCode from 'qrcode'
import DOMPurify from 'dompurify'

interface QrCodeProps {
  code: string
  children?: ReactNode
}

const QrCode = ({code, children}: QrCodeProps) => {
  const purifiedCode = DOMPurify.sanitize(code)
  const canvasRef = useCallback(
    async (node: HTMLCanvasElement) => {
      if (node !== null) {
        // The magic happens when we reference our qrcode-reference-container
        const element = document.getElementById('qrcode-reference-container')
        const referenceLen = Math.min(
          element?.clientHeight ?? 0,
          element?.clientWidth ?? 0,
        )

        // Generate QR code
        // errorCorrectionLevel defaults to M without specifying.
        // L, M, Q, H - 7%, 15%, 25%, 30%
        // The downside is it reduces the symbol's capacity
        await QRCode.toCanvas(node, purifiedCode, {
          scale: 4,
          margin: 1,
          // Error correction is set to high so that they can still be scanned
          // with the logo overlaid in the middle. If the qr code becomes too
          // dense, voucher id generation logic can be changed to make them
          // shorter.
          errorCorrectionLevel: 'H',
          width: referenceLen,
        })
      }
    },
    [purifiedCode],
  )

  return (
    <>
      <div className='voucher-qrcode-container'>
        <canvas ref={canvasRef} id='qr-code' />
      </div>
      {children}
    </>
  )
}

export default QrCode
