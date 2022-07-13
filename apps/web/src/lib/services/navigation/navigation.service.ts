import { route } from '$generated/routing';
import { locale } from '$lib/services/i18n';

import { Locale } from '../api/graphql/queries/types.gq';

export function to(path: string, ...args: string[]) {
  return `/${locale.get() ?? Locale.En}${route(path, ...args)}`;
}

export { AppRoutes } from '$generated/routing';
