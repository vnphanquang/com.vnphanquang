import { BaseConfig, type AppConfigSchema } from './config.base';

export const AppConfig: AppConfigSchema = {
  ...BaseConfig,
  mode: 'production',
  urls: {
    web: 'https://vnphanquang.com',
    api: 'https://api.vnphanquang.com/graphql',
  },
  cookies: {
    session: 'vnphanquang__session',
  },
};
