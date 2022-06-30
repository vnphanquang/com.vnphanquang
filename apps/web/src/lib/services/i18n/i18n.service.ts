import i18n from 'sveltekit-i18n';
import type { Config } from 'sveltekit-i18n';

import { Locale, I18NS } from './i18n.enum';

import { AppConfig } from '$config';

const lang = {
  [Locale.en]: 'English',
  [Locale.vi]: 'Vietnamese',
};

const config: Config = {
  log: {
    level: AppConfig.mode === 'development' ? 'debug' : 'error',
  },
  translations: {
    [Locale.en]: { lang },
    [Locale.vi]: { lang },
  },
  loaders: [
    // error
    {
      locale: Locale.en,
      key: I18NS.error,
      // routes: [],
      loader: async () => (await import('./translations/en/error.json')).default,
    },
    {
      locale: Locale.vi,
      key: I18NS.error,
      // routes: [],
      loader: async () => (await import('./translations/vi/error.json')).default,
    },
    // home
    // {
    //   locale: Locale.en,
    //   key: I18NS.home,
    //   routes: [`/${Locale.en}`],
    //   loader: async () => (await import('./translations/en/home.json')).default,
    // },
    // {
    //   locale: Locale.vi,
    //   key: I18NS.home,
    //   routes: [`/${Locale.vi}`],
    //   loader: async () => (await import('./translations/vi/home.json')).default,
    // },
  ],
};

export const { t, locale, locales, loading, loadTranslations, translations } = new i18n(config);

// Translations logs
// loading.subscribe(async ($loading) => {
//   if ($loading) {
//     console.log('Loading translations...');

//     await loading.toPromise();
//     console.log('Updated translations', translations.get());
//   }
// });
