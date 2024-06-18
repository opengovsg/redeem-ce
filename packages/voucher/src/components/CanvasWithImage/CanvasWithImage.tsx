import React, {useCallback} from 'react'

type CanvasWithImageProps = {
  src: string
  alt: string
  id: string
  cssToUse?: 'voucher-logo-redeem-voucher-overlay' | 'voucher-logo-overlay'
}

function CanvasWithImage({
  src,
  alt,
  id,
  cssToUse = 'voucher-logo-overlay',
}: CanvasWithImageProps) {
  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (!canvas) {
        return
      }

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        return
      }

      const img = new Image()
      img.src = src
      img.alt = alt
      canvas.style.objectFit = 'scale-down'

      img.onload = function () {
        // // Taken from https://stackoverflow.com/questions/23104582/scaling-an-image-to-fit-on-canvas
        const hRatio = canvas.width / img.width
        const vRatio = canvas.height / img.height
        const ratio = Math.min(hRatio, vRatio)
        const centerShift_x = (canvas.width - img.width * ratio) / 2
        const centerShift_y = (canvas.height - img.height * ratio) / 2
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShift_x,
          centerShift_y,
          img.width * ratio,
          img.height * ratio,
        )
      }
    },
    [src, alt],
  )

  // This empty div is important such that when running the e2e helper function `replaceWholeCanvasIntoAnImageForTest`, it will not crash.
  // I am not sure whats the exact reason but need to investigate.
  return (
    <div>
      <canvas ref={canvasRef} className={cssToUse} id={id} />
    </div>
  )
}

export default CanvasWithImage
