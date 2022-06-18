import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^$config/(.*)$': '<rootDir>/../src/config/$1',
    '^$domains/(.*)$': '<rootDir>/../src/domains/$1',
    '^$services/(.*)$': '<rootDir>/../src/services/$1',
  },
};
export default config;
