/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  moduleNameMapper: {
    '\\.(scss|css)$': 'identity-obj-proxy',
    '\\.hbs$': '<rootDir>/__mocks__/templateMock.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utilities/(.*)$': '<rootDir>/src/utilities/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1'
  }
}
