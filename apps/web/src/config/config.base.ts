export interface AppConfigSchema {
  mode: 'unknown' | 'development' | 'production';
  urls: {
    web: '' | 'https://vnphanquang.com';
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
  },
  env: {
    gtagMeasurementId: import.meta.env.VITE_GTAG_MEASUREMENT_ID,
  },
  cookies: {
    session: 'vnphanquang__session-dev',
  },
};
