import { BaseConfig, type AppConfigSchema } from './config.base';

export const AppConfig: AppConfigSchema = {
  ...BaseConfig,
  mode: 'production',
  urls: {
    web: 'https://vnphanquang.com',
    api: {
      index: 'https://api.vnphanquang.com',
      graphql: 'https://api.vnphanquang.com/graphql',
      webWordFrequency: 'https://api.vnphanquang.com/web-word-frequency',
    },
  },
  cookies: {
    session: 'vnphanquang__session',
  },
};
