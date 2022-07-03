import { GFetch } from '@leveluptuts/g-query';

import { AppConfig } from '$config';

export const g = new GFetch({
  path: AppConfig.urls.api,
});
