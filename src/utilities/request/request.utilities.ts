import type { RequestProps } from './request.types'

export const request = async <T>({
  url,
  method,
  body
}: RequestProps): Promise<T> => {
  const fetchOptions: RequestInit = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }

  if (body) fetchOptions.body = JSON.stringify(body)

  const response = await fetch(url, fetchOptions)

  const { ok } = response

  if (!ok) throw new Error('Network error')

  return (await response.json()) as T
}
