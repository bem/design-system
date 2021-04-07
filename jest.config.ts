/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

import baseConfig from './jest.config.base'
export default {
  ...baseConfig,
  projects: ['<rootDir>/packages/*'],
}
