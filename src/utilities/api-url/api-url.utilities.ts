import { apiUrls } from './api-url.constants'
import type { ApiUrlProps, ApiUrlReturn } from './api-url.types'

export const apiUrl = ({
  url,
  resource,
  params,
  page
}: ApiUrlProps): ApiUrlReturn => {
  let apiUrl: string

  apiUrl = apiUrls[url]
  apiUrl += resource ? `/${resource}` : ''

  if (params || page) {
    const queryParams = new URLSearchParams()

    if (params) {
      params.split('&').forEach((param) => {
        const [key, value] = param.split('=')

        queryParams.append(key, value)
      })
    }

    if (page) queryParams.append('page', page.toString())

    apiUrl += `${queryParams.toString() ? '?' : ''}${queryParams.toString()}`
  }

  return apiUrl
}
