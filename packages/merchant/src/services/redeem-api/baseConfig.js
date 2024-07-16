import _ from 'lodash'
import axios from 'axios'
import humps from 'humps'
import qs from 'qs'

import { loadUser } from 'services/storage'

const baseURL = process.env.REACT_APP_API_ENDPOINT

// Helper to craft the Auth Header
export function getAuthorizationHeader() {
  const user = loadUser()
  return { Authorization: `Bearer ${user?.token}` }
}

export function getMerchantId() {
  const user = loadUser()
  return _.get(user, 'user.merchantId')
}

// Config to snake_case outgoing post body and query strings,
// and camelCase incoming responses
const baseConfiguration = {
  // Add our own transformation after the default setting transform
  transformResponse: [
    ...axios.defaults.transformResponse,
    (data) => humps.camelizeKeys(data),
  ],
  // Add our transformation before passing to default setting to transform
  transformRequest: [
    (data) => humps.decamelizeKeys(data),
    ...axios.defaults.transformRequest,
  ],
  paramsSerializer: (params) => qs.stringify(humps.decamelizeKeys(params)),
}

// Create the api service which operational needs calls
const ApiService = axios.create(baseConfiguration)

// Inject the correct base url depending on whether test mode or not
ApiService.interceptors.request.use(
  async (config) => ({
    ...config,
    baseURL,
  }),
  (error) => Promise.reject(error),
)

export default ApiService
