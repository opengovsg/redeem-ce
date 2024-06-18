import moment from 'moment-timezone'

moment.tz.setDefault('Asia/Singapore')

export function formatDateString(dateString: null): null
export function formatDateString(dateString: string): string
export function formatDateString(dateString: string | null): string | null {
  if (dateString === null) {
    return null
  }
  return moment(dateString).format('DD MMM YYYY')
}
