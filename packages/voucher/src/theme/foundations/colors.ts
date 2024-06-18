// TODO: Strengthen types for colors
export type ThemeColorScheme =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'teal'
  | 'yellow'
  | 'success'
  | 'warning'
  | 'danger'

export const colors: {[key in ThemeColorScheme]: Record<string, string>} = {
  teal: {
    100: '#DDF3F4',
    200: '#A0E1E5',
    300: '#71D1D7',
    400: '#41C2CA',
    500: '#21B4BD',
    600: '#20A1A9',
    700: '#0D8B93',
    800: '#0B676C',
    900: '#0A5656',
  },
  yellow: {
    100: '#FEF5DD',
    200: '#FEEBBB',
    300: '#FDE198',
    400: '#FDD776',
    500: '#FFCA00',
    600: '#E5A500',
    700: '#CC970F',
    800: '#A67906',
    900: '#7C5A01',
  },
  primary: {
    100: '#F6F7FA',
    200: '#DFE1F2',
    300: '#BCBFE3',
    400: '#868AC3',
    500: '#505798',
    600: '#3B4183',
    700: '#2F3476',
    800: '#222757',
    900: '#1B1E44',
  },
  secondary: {
    100: '#FEF5F5',
    200: '#F7CACA',
    300: '#F2A7A7',
    400: '#ED8585',
    500: '#EB6363',
    600: '#BF5151',
    700: '#994141',
    800: '#6F2F2F',
    900: '#451D1D',
  },
  success: {
    100: '#F0F8F3',
    200: '#E2F1E8',
    300: '#ADD8BE',
    400: '#77BF93',
    500: '#41A669',
    600: '#0C8C3F',
    700: '#097333',
    800: '#075C29',
    900: '#05431#',
  },
  danger: {
    100: '#FFF8F8',
    200: '#F8EAEA',
    300: '#E8C1C1',
    400: '#D88888',
    500: '#C05050',
    600: '#AD4848',
    700: '#9A4040',
    800: '#733030',
    900: '#602828',
  },
  warning: {
    100: '#FDF7F0',
    200: '#FCEFE4',
    300: '#F7D2B1',
    400: '#F1B57E',
    500: '#EC984B',
    600: '#E67C18',
    700: '#BB600B',
    800: '#97510F',
    900: '#6E3B0B',
  },
  neutral: {
    100: '#FBFCFD',
    200: '#F0F0F1',
    300: '#E1E2E4',
    400: '#C9CCCF',
    500: '#ABADB2',
    600: '#999B9F',
    700: '#636467',
    800: '#48494B',
    900: '#242425',
  },
}
