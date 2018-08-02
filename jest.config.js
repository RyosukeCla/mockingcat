const { defaults } = require('jest-config');

module.exports = {
  testMatch: ['**/__tests__/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts'],
  testEnvironment: 'node'
}
