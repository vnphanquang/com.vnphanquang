import type { ParamMatcher } from '@sveltejs/kit';

import { Locale } from '$lib/services/i18n';

export const match: ParamMatcher = (param) => {
  return param in Locale;
};
