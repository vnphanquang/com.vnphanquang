import { route } from '$generated/routing';
import { locale } from '$lib/services/i18n';

import { Locale } from '../api/graphql/queries/types.gq';

export function to(path: string, ...args: string[]) {
  return `/${locale.get() ?? Locale.En}${route(path, ...args)}`;
}

export function withLocale(path: string, locale: Locale) {
  // assuming ISO 639-1 (/<iso_locale>/.length = 4)
  return `/${locale}/${path.substring(4)}`;
}

export { AppRoutes } from '$generated/routing';
