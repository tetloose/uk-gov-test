export type Party = {
  id: number
  name: string
  abbreviation: string
  backgroundColour: string
  foregroundColour: string
  isLordsMainParty: boolean
  isLordsSpiritualParty: boolean
  governmentType: number
  isIndependentParty: boolean
}

export type HouseMembership = {
  membershipFrom: string
  membershipFromId: number
  house: number
  membershipStartDate: string
  membershipEndDate: string | null
  membershipEndReason: string | null
  membershipEndReasonNotes: string | null
  membershipEndReasonId: number | null
  membershipStatus: MembershipStatus
}

export type MembershipStatus = {
  statusIsActive: boolean
  statusDescription: string
  statusNotes: string | null
  statusId: number
  status: number
  statusStartDate: string
}

export type Member = {
  id: number
  nameListAs: string
  nameDisplayAs: string
  nameFullTitle: string
  nameAddressAs: string | null
  latestParty: Party
  gender: string
  latestHouseMembership: HouseMembership
  thumbnailUrl: string
}

export type Links = {
  rel: string
  href: string
  method: string
}

export type MemberCardResponse = {
  value: Member
  links: Links[]
}

export type MemberCardData = {
  image: string
  party: string
  name: string
  constituency: string
  theme: string
  active: boolean
  status: string
}
