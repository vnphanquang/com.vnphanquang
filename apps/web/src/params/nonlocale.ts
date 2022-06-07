import { Locale } from '$lib/services/i18n';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
  return Object.values(Locale).every(le => !param.startsWith(le));
};
