import MemberCard from './member-card.component'

describe('Card component', (): void => {
  it('should exist and be a function', (): void => {
    expect(MemberCard).toBeDefined()
    expect(typeof MemberCard).toBe('function')
  })
})
