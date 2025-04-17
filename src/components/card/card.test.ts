import Card from './card.component'

describe('Card component', (): void => {
  it('should exist and be a function', (): void => {
    expect(Card).toBeDefined()
    expect(typeof Card).toBe('function')
  })
})
