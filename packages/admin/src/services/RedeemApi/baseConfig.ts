import axios, { AxiosRequestTransformer, AxiosResponseTransformer } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'
import qs from 'qs'

import { loadUser } from 'services/Storage'
import { api as apiEndpoint } from 'constants/endpoints'

// Casting of transformers is a known issue for Axios: https://github.com/axios/axios/issues/1910

// Config to snake_case outgoing post body and query strings, and camelCase incoming
// responses
export const baseConfiguration = {
  // Configure base url
  baseURL: `${apiEndpoint}/v1`,
  // Inject device headers into all outgoing requests.
  // headers: someHeaders,
  // Add our own transformation after the default setting transform
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosResponseTransformer[]),
    (data: Record<string, unknown>[]) => camelcaseKeys(data, { deep: true }),
  ],
  // Add our transformation before passing to default setting to transform
  transformRequest: [
    (data: Record<string, unknown>[]) => {
      return data ? snakecaseKeys(data, { deep: true }) : data
    },
    ...(axios.defaults.transformRequest as AxiosRequestTransformer[]),
  ],
  paramsSerializer: {
    serialize(params: Record<string, unknown>) {
      return qs.stringify(snakecaseKeys(params, { deep: true }))
    },
  },
}

// Helper to load user and read the token and craft the Auth Header
export function getAuthorizationHeader() {
  const user = loadUser()
  const accessToken = user.token
  return { Authorization: `Bearer ${accessToken}` }
}

// Create the api service which operational needs calls
const ApiService = axios.create(baseConfiguration)

export default ApiService
