import {useState, useEffect, useMemo, useCallback} from 'react'
import {Voucher} from 'types/voucher'
import _ from 'lodash'
import moment from 'moment-timezone'
import {SELECTED_VOUCHERS_LIMIT} from 'constants/limits'
import toast, {ToastOptions} from 'react-hot-toast'
import Toast, {ToastProps} from 'components/Toast'
import {useTranslation} from 'react-i18next'
import {logLimitReached} from '../../helpers/monitoring'

type VoucherOrder = Record<string, string[]> | null

export const useSortedVouchersGroupedByType = (
  voucherGroup: Voucher[],
): Record<string, Voucher[]> => {
  // Create sorting order for vouchers in group. Identified by their id.
  // This is to preserve ordering even after a voucher has been redeemed.
  const [voucherOrder, setVoucherOrder] = useState<VoucherOrder>(null)
  useEffect(() => {
    if (_.size(voucherOrder)) {
      return
    }
    const voucherOrderGroupedByType = _(voucherGroup)
      .groupBy((voucher) => voucher.type)
      .mapValues((vouchersOfSameType) => {
        const usedVouchers = vouchersOfSameType.filter(
          (voucher) => voucher.state === 'redeemed',
        )
        const voidedVouchers = vouchersOfSameType.filter(
          (voucher) => voucher.state === 'voided',
        )
        const unusedVouchers = vouchersOfSameType.filter(
          (voucher) => voucher.state === 'unused',
        )

        // Unused vouchers sorted by value in reverse order
        const unusedVouchersSorted = _.sortBy(
          unusedVouchers,
          (voucher) => voucher.voucherValue,
        )

        // Voided vouchers sorted by value in reverse order
        const voidedVouchersSorted = _.sortBy(
          voidedVouchers,
          (voucher) => voucher.voucherValue,
        )

        // Used vouchers sorted by last redeemed time
        const usedVouchersSorted = _.sortBy(usedVouchers, (voucher) =>
          moment(voucher.lastRedeemedTimestamp).unix(),
        )

        const vouchersSorted = _.concat(
          unusedVouchersSorted,
          usedVouchersSorted,
          voidedVouchersSorted,
        )
        return _.map(vouchersSorted, (voucher) => voucher.id)
      })
      .value()

    setVoucherOrder(voucherOrderGroupedByType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!voucherGroup?.length])

  const sortedVouchersGroupedByType = useMemo(() => {
    // Populate vouchersToRender array with vouchers in previously sorted order
    // whenever the vouchers array changes. (e.g voucher has been redeemed)
    const sortedVouchers = _.mapValues(voucherOrder, (voucherIds) =>
      // Create list of vouchers in sorted order based on order defined as voucherOrder
      _(voucherIds)
        .map((voucherId) =>
          _.find(voucherGroup, (voucher) => voucher.id === voucherId),
        )
        .compact()
        .value(),
    )
    return sortedVouchers
  }, [voucherGroup, voucherOrder])

  return sortedVouchersGroupedByType
}

// TODO: Find a way to split this hook further in a way that makes sense
export const useSelectableVouchers = ({vouchers}: {vouchers: Voucher[]}) => {
  const [selectedVoucherIds, setSelectedVoucherIds] = useState<string[]>([])
  const [isLimitReached, setIsLimitReached] = useState(false)
  const {t} = useTranslation('toasts')
  const selectedVouchers = useMemo(
    () =>
      _.filter(vouchers, (unfilteredVoucher) =>
        selectedVoucherIds.includes(unfilteredVoucher.id),
      ),
    [vouchers, selectedVoucherIds],
  )

  // TODO: Consider useToast hook
  const renderLimitSelectReached = useCallback(
    ({id, visible}: Pick<ToastProps & ToastOptions, 'id' | 'visible'>) => (
      <Toast
        header={t('max_vouchers.header', {
          voucher_limit: SELECTED_VOUCHERS_LIMIT,
        })}
        type='warning'
        visible={visible}
        onClose={() => {
          toast.dismiss(id)
        }}
      />
    ),
    [t],
  )

  const toggleSelectVoucher = useCallback((voucher: Voucher) => {
    const voucherId = voucher.id
    setSelectedVoucherIds((selectedVoucherIds) => {
      if (selectedVoucherIds.includes(voucherId)) {
        setIsLimitReached(false)
        return selectedVoucherIds.filter(
          (selectedVoucherId) => selectedVoucherId !== voucherId,
        )
      } else {
        if (selectedVoucherIds.length + 1 >= SELECTED_VOUCHERS_LIMIT) {
          logLimitReached(SELECTED_VOUCHERS_LIMIT)
          toast.custom(renderLimitSelectReached, {duration: 8000})
          setIsLimitReached(true)
        }
        return [...selectedVoucherIds, voucherId]
      }
    })
  }, [])

  useEffect(() => {
    if (selectedVoucherIds.length < SELECTED_VOUCHERS_LIMIT) {
      setIsLimitReached(false)
    }
  }, [selectedVoucherIds.length])

  const unselectVouchersById = (voucherIdsToBeUnselected: string[]) => {
    setSelectedVoucherIds((currentSelectedVoucherIds) =>
      _.filter(
        currentSelectedVoucherIds,
        (selectedVoucherId) =>
          !voucherIdsToBeUnselected.includes(selectedVoucherId),
      ),
    )
  }

  return {
    toggleSelectVoucher,
    unselectVouchersById,
    selectedVouchers,
    selectedVoucherIds,
    isLimitReached,
  }
}

export const useUnselectUsedVouchers = ({
  selectedVouchers,
  unselectVouchersById,
}: {
  selectedVouchers: Voucher[]
  unselectVouchersById: (voucherIds: string[]) => void
}) => {
  useEffect(() => {
    // Deselect any redeemed vouchers if RedemptionDrawer is not open
    const voucherIdsToBeUnselected = _(selectedVouchers)
      .filter((selectedVoucher) => selectedVoucher.state !== 'unused')
      .map((voucher) => voucher.id)
      .value()

    if (_.isEmpty(voucherIdsToBeUnselected)) {
      return
    }

    unselectVouchersById(voucherIdsToBeUnselected)
  }, [selectedVouchers, unselectVouchersById])
}

export const useGetIsVoucherSelected = (selectedVouchers: Voucher[]) => {
  return useCallback(
    (voucher: Voucher) =>
      selectedVouchers.some(
        (selectedVoucher) => voucher.id === selectedVoucher.id,
      ),
    [selectedVouchers],
  )
}
