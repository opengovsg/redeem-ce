import moment from 'moment-timezone'

export const initTimezone = () => {
  moment.tz.setDefault('Asia/Singapore')
}
