import React from 'react'
import html2pdf from 'html2pdf.js'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'theme'
import _ from 'lodash'
import { generateVoucherQrCodeSvg } from 'services/utils'
import PrintableVouchers from '../routes/Campaigns/Campaign/components/VouchersTab/components/PrintableVouchers'
import { PRINTABLE_VOUCHERS_PER_PAGE } from '../constants/vouchers'

/**
 * Generates svg for qr codes
 */
async function generateQrCodeSvgs(vouchers, extraQrPrefix) {
  const voucherIds = _.map(vouchers, (voucher) => voucher.id)
  const qrCodePromises = _.map(voucherIds, (voucherId) =>
    generateVoucherQrCodeSvg(voucherId, extraQrPrefix)
  )
  const generatedQrCodeSvgs = await Promise.all(qrCodePromises)
  // Add svg strings to voucher objects
  return _(vouchers)
    .zipWith(generatedQrCodeSvgs, (voucher, qrCodeSvgString) => ({
      ...voucher,
      qrCodeSvgString,
    }))
    .value()
}

export async function printVouchers({
  onPrintDialogOpen,
  vouchers,
  name,
  campaignName,
  campaignExpiresAt,
  extraQrPrefix,
}) {
  const vouchersWithSvg = await generateQrCodeSvgs(vouchers, extraQrPrefix)
  const el = document.createElement('div')
  const vouchersGroupedByType = _(vouchersWithSvg)
    .groupBy((voucher) => voucher.type || '')
    .mapValues((vouchersWithSvgOfSameType) =>
      _.sortBy(vouchersWithSvgOfSameType, ['voucherValue', 'id'])
    )
    .value()
  const numPages = _(vouchersGroupedByType)
    .values()
    .sumBy((vouchersOfSameType) =>
      // +1 to account for the first cell being used for campaign and group info
      Math.ceil((vouchersOfSameType.length + 1) / PRINTABLE_VOUCHERS_PER_PAGE)
    )

  document.body.appendChild(el)
  // eslint-disable-next-line react/no-deprecated
  ReactDOM.render(
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <PrintableVouchers
          vouchersGroupedByType={vouchersGroupedByType}
          name={name}
          campaignName={campaignName}
          campaignExpiresAt={campaignExpiresAt}
        />
      </ChakraProvider>
    </React.StrictMode>,
    el
  )
  return html2pdf()
    .set({
      jsPDF: { format: 'A4', orientation: 'portrait' },
      html2canvas: { scale: 1.5 },
    })
    .from(el)
    .toPdf()
    .get('pdf')
    .then((pdfObj) => {
      // Set pdf to auto open print dialog once opened
      pdfObj.autoPrint()
      let pageCount = pdfObj.internal.getNumberOfPages()
      // Trim extra pages if numPages is provided
      while (numPages && numPages < pageCount) {
        pdfObj.deletePage(pageCount)
        pageCount = pdfObj.internal.getNumberOfPages()
      }
      // Opens pdf in new tab
      window.open(pdfObj.output('bloburl'), '_blank')
      document.body.removeChild(el)
      // Calls callback function if it is provided
      if (onPrintDialogOpen) {
        onPrintDialogOpen()
      }
    })
}
