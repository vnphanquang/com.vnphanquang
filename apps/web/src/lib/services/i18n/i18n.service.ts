import i18n from 'sveltekit-i18n';
import type { Config } from 'sveltekit-i18n';

import { browser } from '$app/env';
import { Locale } from '$lib/services/api/graphql/queries/types.gq';

import { I18NS } from './i18n.enum';

import { AppConfig } from '$config';

const lang = {
  [Locale.En]: 'English',
  [Locale.Vi]: 'Vietnamese',
};

function getInitLocale(): Locale {
  if (browser && navigator) {
    const lang = navigator.language?.substring(0, 2);
    if (Object.values(Locale).some((le) => le === lang)) {
      return lang as Locale;
    }
  }
  return Locale.En;
}

const config: Config = {
  initLocale: getInitLocale(),
  log: {
    level: AppConfig.mode === 'development' ? 'debug' : 'error',
  },
  translations: {
    [Locale.En]: { lang },
    [Locale.Vi]: { lang },
  },
  loaders: [
    // error
    {
      locale: Locale.En,
      key: I18NS.navbar,
      loader: async () => (await import('./translations/en/navbar.json')).default,
    },
    {
      locale: Locale.Vi,
      key: I18NS.navbar,
      loader: async () => (await import('./translations/vi/navbar.json')).default,
    },
    {
      locale: Locale.En,
      key: I18NS.error,
      // routes: [],
      loader: async () => (await import('./translations/en/error.json')).default,
    },
    {
      locale: Locale.Vi,
      key: I18NS.error,
      // routes: [],
      loader: async () => (await import('./translations/vi/error.json')).default,
    },
    {
      locale: Locale.En,
      key: I18NS.blog,
      routes: [`/en/blog`],
      loader: async () => (await import('./translations/en/blog.json')).default,
    },
    {
      locale: Locale.Vi,
      key: I18NS.blog,
      routes: [`/vi/blog`],
      loader: async () => (await import('./translations/vi/blog.json')).default,
    },
    {
      locale: Locale.En,
      key: I18NS.experiment,
      routes: [`/en/experiment`],
      loader: async () => (await import('./translations/en/experiment.json')).default,
    },
    {
      locale: Locale.Vi,
      key: I18NS.experiment,
      routes: [`/vi/experiment`],
      loader: async () => (await import('./translations/vi/experiment.json')).default,
    },
    // home
    // {
    //   locale: Locale.En,
    //   key: I18NS.home,
    //   routes: [`/${Locale.En}`],
    //   loader: async () => (await import('./translations/en/home.json')).default,
    // },
    // {
    //   locale: Locale.Vi,
    //   key: I18NS.home,
    //   routes: [`/${Locale.Vi}`],
    //   loader: async () => (await import('./translations/vi/home.json')).default,
    // },
  ],
};

export const { t, locale, locales, loading, loadTranslations, translations } = new i18n(config);
export { Locale } from '$lib/services/api/graphql/queries/types.gq';

// Translations logs
// loading.subscribe(async ($loading) => {
//   if ($loading) {
//     console.log('Loading translations...');

//     await loading.toPromise();
//     console.log('Updated translations', translations.get());
//   }
// });
