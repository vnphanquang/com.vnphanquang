export interface AppConfigSchema {
  mode: 'unknown' | 'development' | 'production';
  urls: {
    web: '' | 'https://vnphanquang.com';
    api: 'http://localhost:3001/graphql' | 'https://api.vnphanquang.com/graphql';
  };
  env: {
    gtagMeasurementId: string;
  };
  cookies: {
    session: 'vnphanquang__session-dev' | 'vnphanquang__session';
  };
}
export const BaseConfig: AppConfigSchema = {
  mode: 'unknown',
  urls: {
    web: '',
    api: 'http://localhost:3001/graphql',
  },
  env: {
    gtagMeasurementId: import.meta.env.VITE_GTAG_MEASUREMENT_ID,
  },
  cookies: {
    session: 'vnphanquang__session-dev',
  },
};
