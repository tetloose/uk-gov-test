export type Methods = 'PUT' | 'PATCH' | 'POST' | 'DELETE'

export type RequestMethod = 'GET' | Methods

export type RequestProps = {
  url: string
  method: RequestMethod
  body?: Record<string, unknown>
}
