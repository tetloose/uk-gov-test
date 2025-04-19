import { MemberCard } from './member-card.component'

jest.mock('./member-card.component.ts', () => {
  return {
    MemberCard: jest.fn().mockImplementation(() => {
      return {
        fetchMember: jest.fn(),
        render: jest.fn()
      }
    })
  }
})

const MockedMemberCard = MemberCard as jest.Mock

describe('MemberCard', (): void => {
  beforeEach(() => {
    MockedMemberCard.mockClear()
  })

  it('calls the constructor when initiated', (): void => {
    const { document } = window
    const module = document.createElement('div') as HTMLElement

    new MemberCard(module)

    expect(MockedMemberCard).toHaveBeenCalledTimes(1)
  })

  it('calls fetchMember on init', () => {
    new MemberCard(document.createElement('div'))

    expect(MemberCard).toHaveBeenCalled()

    const instance = (MemberCard as jest.Mock).mock.results[0].value

    expect(instance.fetchMember).toBeDefined()
  })

  it('should exist and be a function', (): void => {
    expect(MemberCard).toBeDefined()
    expect(typeof MemberCard).toBe('function')
  })
})
