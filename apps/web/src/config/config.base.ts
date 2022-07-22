export interface AppConfigSchema {
  mode: 'unknown' | 'development' | 'production';
  urls: {
    web: '' | 'https://vnphanquang.com';
    api: {
      index: 'http://localhost:3001' | 'https://api.vnphanquang.com';
      graphql: 'http://localhost:3001/graphql' | 'https://api.vnphanquang.com/graphql';
      webWordFrequency:
        | 'http://localhost:3001/web-word-frequency'
        | 'https://api.vnphanquang.com/web-word-frequency';
    };
  };
  env: {
    gtagMeasurementId: string;
    facebookAppId: string;
  };
  cookies: {
    session: 'vnphanquang__session-dev' | 'vnphanquang__session';
  };
}
export const BaseConfig: AppConfigSchema = {
  mode: 'unknown',
  urls: {
    web: '',
    api: {
      index: 'http://localhost:3001',
      graphql: 'http://localhost:3001/graphql',
      webWordFrequency: 'http://localhost:3001/web-word-frequency',
    },
  },
  env: {
    gtagMeasurementId: import.meta.env.VITE_GTAG_MEASUREMENT_ID,
    facebookAppId: import.meta.env.VITE_FACEBOOK_APP_ID,
  },
  cookies: {
    session: 'vnphanquang__session-dev',
  },
};
