import React from 'react'
import { PropTypes } from 'prop-types'
import _ from 'lodash'
import { DEFAULT_NUMBER_RADIX } from 'constants/string'
import { IconContext } from 'react-icons'
import { BiPlus, BiX } from 'react-icons/bi'
import { Input } from '@chakra-ui/react'
import { getTotalSumOfDenominations } from 'helpers/denomination'
import styles from './VoucherGroupInput.module.scss'

const VoucherGroupInput = ({
  fields,
  remove,
  denominations,
  append,
  disabled = false,
  allowEmpty = false,
  getFormProps,
}) => {
  const hasChosenVoucherGroup = denominations && denominations.length > 0
  const hasEmptyFields = denominations.find(
    (denomination) =>
      !denomination || denomination.quantity === '' || denomination.value === ''
  )
  const totalVoucherGroupValue = getTotalSumOfDenominations(denominations)

  return (
    <>
      {hasChosenVoucherGroup && (
        <div className={styles.voucherValueTableContainer}>
          <table className="legacy-table">
            <tbody>
              <tr className="table-header">
                <th>Value ($)</th>
                <th>Quantity</th>
                <th>Type</th>
                <th aria-label="actions">&nbsp;</th>
              </tr>
              {_.map(
                fields,
                (
                  { value: currentValue, quantity: currentQuantity, id },
                  key
                ) => (
                  <tr key={id}>
                    <td>
                      <Input
                        aria-label="value"
                        {...getFormProps('value', key)}
                        defaultValue={currentValue.toString(
                          DEFAULT_NUMBER_RADIX
                        )}
                        isRequired
                        maxLength={10}
                        min={1}
                        prefix="$"
                        readOnly={disabled}
                        type="number"
                      />
                    </td>
                    <td>
                      <Input
                        aria-label="quantity"
                        {...getFormProps('quantity', key)}
                        defaultValue={currentQuantity.toString(
                          DEFAULT_NUMBER_RADIX
                        )}
                        isRequired
                        maxLength={10}
                        min={1}
                        readOnly={disabled}
                        type="number"
                      />
                    </td>
                    <td>
                      <Input
                        aria-label="type"
                        {...getFormProps('type', key)}
                        readOnly
                        type="string"
                        variant="filled"
                      />
                    </td>
                    <td>
                      <button
                        aria-label="remove"
                        className="btn btn-link-primary btn-icon-only"
                        type="button"
                        onClick={() => remove(key)}
                        disabled={
                          disabled || (!allowEmpty && denominations.length <= 1)
                        }
                      >
                        <IconContext.Provider value={{ className: 'icon' }}>
                          <div className="icon">
                            <BiX size={28} />
                          </div>
                        </IconContext.Provider>
                      </button>
                    </td>
                  </tr>
                )
              )}
              <tr>
                <td>
                  <button
                    aria-label="Add New Denomination"
                    className="btn btn-link-primary btn-icon-left"
                    type="button"
                    disabled={disabled}
                    onClick={() =>
                      append({
                        value: '',
                        quantity: '1',
                        type: '',
                      })
                    }
                  >
                    <IconContext.Provider value={{ className: 'icon' }}>
                      <div className="icon">
                        <BiPlus />
                      </div>
                    </IconContext.Provider>
                    Add New Denomination
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {hasChosenVoucherGroup && (
        <div className={styles.voucherValueBottom}>
          <b>
            {hasEmptyFields && <>Please fill up all rows</>}
            {!hasEmptyFields && <>Total Value: ${totalVoucherGroupValue}</>}
          </b>
        </div>
      )}
      {!hasChosenVoucherGroup && (
        <div className="btn-group align-left">
          <button
            className="btn btn-link-primary btn-icon-left"
            type="button"
            disabled={disabled}
            onClick={() => append({ value: '', quantity: '1' })}
          >
            <IconContext.Provider value={{ className: 'icon' }}>
              <div className="icon">
                <BiPlus />
              </div>
            </IconContext.Provider>
            Add Default Voucher Group
          </button>
        </div>
      )}
    </>
  )
}

VoucherGroupInput.propTypes = {
  fieldName: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool,
  remove: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  denominations: PropTypes.arrayOf(PropTypes.object),
  append: PropTypes.func,
  allowEmpty: PropTypes.bool,
  getFormProps: PropTypes.func.isRequired,
}

export default VoucherGroupInput
