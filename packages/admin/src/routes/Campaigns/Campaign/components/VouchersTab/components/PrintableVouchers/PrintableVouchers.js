import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { PRINTABLE_VOUCHERS_PER_PAGE } from 'constants/vouchers'
import { Box } from '@chakra-ui/react'
import { isHideNonProductionFlags } from 'constants'
import styles from './PrintableVouchers.module.scss'
import PrintableVouchersInfoCell from './components/PrintableVouchersInfoCell'
import PrintableVoucherCell from './components/PrintableVoucherCell'

// TODO: Explore other PDF generation methods that are potentially more
// reliable. We use relative positioning a lot here to compensate for
// text and SVGs rendering at the wrong position.
// TODO: Fully refactor to Typescript / Chakra
export default function PrintableVouchers({
  vouchersGroupedByType,
  name,
  campaignName,
  campaignExpiresAt,
}) {
  const voucherPagesByType = _(vouchersGroupedByType)
    .mapValues((vouchersOfSameType) => [
      // First page of each type has 1 less voucher due to one
      // cell being used for campaign and group information
      _.slice(vouchersOfSameType, 0, PRINTABLE_VOUCHERS_PER_PAGE - 1),
      // Then group the remaining vouchers (i.e not on first page) into
      // pages of size PRINTABLE_VOUCHERS_PER_PAGE
      ..._(vouchersOfSameType)
        .slice(PRINTABLE_VOUCHERS_PER_PAGE - 1)
        .chunk(PRINTABLE_VOUCHERS_PER_PAGE),
    ])
    .value()
  return (
    <div>
      {/* Watermark that only shows in testing environments. i.e not production */}
      {!isHideNonProductionFlags && (
        <Box
          position="absolute"
          zIndex="overlay"
          width="100%"
          height="100%"
          backgroundImage={
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='200px' width='212px'><text font-family='Inter' transform='translate(24, 200) rotate(-45)' fill='rgba(0,0,0,0.5)' font-size='24'>For testing purposes only</text></svg>\")"
          }
        />
      )}
      {_(voucherPagesByType)
        .toPairs()
        .map(([voucherType, voucherPages]) =>
          _.map(voucherPages, (voucherPage, voucherPageNum) => (
            <section
              className={styles.printableVouchersPage}
              key={`page-${voucherPageNum}`}
            >
              <section className={styles.printableVouchersPageBody}>
                {/* Include cell with campaign and group info on first page */}
                {voucherPageNum === 0 && (
                  <PrintableVouchersInfoCell
                    voucherType={voucherType}
                    campaignName={campaignName}
                    campaignExpiresAt={campaignExpiresAt}
                    name={name}
                  />
                )}
                {_.map(voucherPage, (voucher, voucherNumOnPage) => (
                  <PrintableVoucherCell
                    voucherType={voucherType}
                    campaignName={campaignName}
                    campaignExpiresAt={campaignExpiresAt}
                    totalNumVouchers={voucherPages.flat().length}
                    voucherNum={
                      (voucherPageNum > 0 ? 0 : 1) +
                      // Voucher numbering starts from 1 and
                      // account for first page having 1 less voucher
                      voucherPageNum * PRINTABLE_VOUCHERS_PER_PAGE +
                      voucherNumOnPage
                    }
                    voucher={voucher}
                  />
                ))}
              </section>
            </section>
          ))
        )
        .value()}
    </div>
  )
}

PrintableVouchers.propTypes = {
  vouchersGroupedByType: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        voucherValue: PropTypes.number.isRequired,
        qrCodeSvgString: PropTypes.string.isRequired,
      })
    )
  ).isRequired,
  name: PropTypes.string,
  campaignName: PropTypes.string,
  campaignExpiresAt: PropTypes.string,
}
