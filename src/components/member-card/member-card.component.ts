import { ComponentClass } from '@utilities/component-class.utilities'
import { request } from '@utilities/request.utilities'
import template from './member.template.hbs'
import type { MemberCardData, MemberCardResponse } from './member-card.types'
import './member-card.styles.scss'

export class MemberCard extends ComponentClass {
  private memberId: string

  constructor(module: HTMLElement) {
    super(module)
    this.memberId = module.dataset.id || ''

    this.fetchMember()
  }

  async fetchMember() {
    const { module, memberId } = this
    const publicApi = process.env.PUBLIC_API

    if (!module || !publicApi || !memberId) return

    try {
      const response = await request<MemberCardResponse>({
        url: `${publicApi}/api/Members/${memberId}`,
        method: 'GET'
      })

      if (!response) return

      const { value } = response

      if (!value) return

      const currentDate = new Date()
      const endDate = value.latestHouseMembership.membershipEndDate

      const data: MemberCardData = {
        image: value.thumbnailUrl || '',
        party: value.latestParty.name || '',
        name: value.nameDisplayAs || '',
        constituency: value.latestHouseMembership.membershipFrom || '',
        theme: value.latestParty.backgroundColour || '',
        active: endDate ? new Date(endDate) < currentDate : false,
        status: 'No Longer Serving'
      }

      const html = template<MemberCardData>(data)

      this.render(html)
    } catch (error) {
      module.innerHTML = `<p>${error}</p>`
    }
  }
}

export default (module: HTMLElement) => new MemberCard(module)
