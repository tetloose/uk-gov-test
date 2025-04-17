import Test from './test.component'

describe('Test component', (): void => {
  it('should exist and be a function', (): void => {
    expect(Test).toBeDefined()
    expect(typeof Test).toBe('function')
  })
})
