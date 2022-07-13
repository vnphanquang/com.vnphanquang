import { Locale } from '$lib/services/i18n';

const localeMapping = {
  [Locale.En]: 'en-GB',
  [Locale.Vi]: 'vi',
} as const;

export const fullDateFormat = (locale: Locale) =>
  new Intl.DateTimeFormat(localeMapping[locale], { dateStyle: 'full' });

export function blogDate(date: Date | string, locale: Locale) {
  return fullDateFormat(locale).format(new Date(date));
}
