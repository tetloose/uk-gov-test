export type ApiUrls = 'members'

export type ApiUrlProps = {
  url: ApiUrls
  resource?: string
  params?: string
  page?: number
}

export type ApiUrlReturn = string
