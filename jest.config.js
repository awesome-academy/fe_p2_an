// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './'
})

/** @type {import('jest').Config} */
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1'
  },

  collectCoverage: true,
  collectCoverageFrom: [
    'app/components/main/**/*.{js,jsx,ts,tsx}',
    'app/components/common/**/*.{js,jsx,ts,tsx}',

    '!app/**/*.d.ts',
    '!app/**/*.stories.{js,jsx,ts,tsx}',
    '!app/**/__tests__/**',
    '!app/app/layout.tsx',
    '!app/lib/i18n.ts',
    '!app/middleware.ts'
  ],

  rootDir: './'
}

module.exports = createJestConfig(config)
