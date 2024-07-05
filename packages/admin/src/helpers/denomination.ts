type Denominations = {
  value: string | number
  quantity: string | number
}

export function getTotalSumOfDenominations(denominations: Denominations[]) {
  return (
    denominations.reduce(
      (total, { value, quantity }) => total + Number(value) * Number(quantity),
      0
    ) || 0
  )
}
