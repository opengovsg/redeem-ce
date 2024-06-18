export function formatContactNumberForDisplay(number: string): string {
  return `${number.slice(2, 6)} ${number.slice(6)}`
}
