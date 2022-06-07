import { route } from '$generated/routing';
import { locale, Locale } from '$lib/services/i18n';

export function to(path: string, ...args: string[]) {
  return `/${locale.get() ?? Locale.en}${route(path, ...args)}`;
}

export { AppRoutes } from '$generated/routing';