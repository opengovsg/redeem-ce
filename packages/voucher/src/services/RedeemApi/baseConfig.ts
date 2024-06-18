import axios, {AxiosRequestTransformer, AxiosResponseTransformer} from 'axios'
// Constants
import {getVoucherBaseUrl} from 'constants/config'
import snakecaseKeys from 'snakecase-keys'
import camelcaseKeys from 'camelcase-keys'

// Create the api service which operational needs calls
const ApiService = axios.create({
  baseURL: `${getVoucherBaseUrl()}/v1/public`,
  transformRequest: [
    (data) => (data ? snakecaseKeys(data, {deep: true}) : data),
    ...(axios.defaults.transformRequest as AxiosRequestTransformer[]),
  ],

  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosResponseTransformer[]),
    (data) => (data ? camelcaseKeys(data, {deep: true}) : data),
  ],
})

export default ApiService
