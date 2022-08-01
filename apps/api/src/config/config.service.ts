import { join } from 'path';

import { Injectable } from '@nestjs/common';
import { selectConfig, TypedConfigModule, dotenvLoader } from 'nest-typed-config';

import { Config } from './config';

/** https://github.com/Nikaple/nest-typed-config */
export const ConfigDynamicModule = TypedConfigModule.forRoot({
  schema: Config,
  load: dotenvLoader({
    separator: '__',
    envFilePath: [
      // CAUTION: for merging strategy
      // files that come before will take priority
      // over those that come after
      join(process.cwd(), '.env'),
      join(process.cwd(), '.default.env'),
    ],
    ignoreEnvVars: false,
    ignoreEnvFile: false,
    expandVariables: true,
  }),
});

const config = selectConfig(ConfigDynamicModule, Config);

@Injectable()
export class ConfigService {
  get() {
    return config;
  }
}

// TODO: find a way to better represent this tree
// in a concise and elegant way that supports typing
// maybe a tree language?
export const AppRoutes = {
  graphql: {
    $path: (params?: { separator?: string; depth?: number }) => '/graphql',
    $key: () => 'graphql',
  },
  webwordfrequency: {
    $path: (params?: { separator?: string; depth?: number }) => '/web-word-frequency',
    $key: () => 'web-word-frequency',
    recent: {
      $path: (params?: { separator?: string; depth?: number }) => '/web-word-frequency/recent',
      $key: () => 'recent',
    },
    search: {
      $path: (params?: { separator?: string; depth?: number }) => '/web-word-frequency/search',
      $key: () => 'search',
    },
    scrape: {
      $path: (params?: { separator?: string; depth?: number }) => '/web-word-frequency/scrape',
      $key: () => 'scrape',
    },
  },
  auth: {
    $path: (params?: { separator?: string; depth?: number }) => '/auth',
    $key: () => 'auth',
    logout: {
      $path: (params?: { separator?: string; depth?: number }) => '/auth/logout',
      $key: () => 'logout',
    },
    oauth: {
      $path: (params?: { separator?: string; depth?: number }) => '/auth/oauth',
      $key: () => 'oauth',
      google: {
        $path: (params?: { separator?: string; depth?: number }) =>
          params?.depth === undefined ? '/auth/oauth/google' : '/oauth/google',
        $key: () => 'google',
        redirect: {
          $path: (params?: { separator?: string; depth?: number }) =>
            params?.depth === undefined ? '/auth/oauth/google/redirect' : '/oauth/google/redirect',
          $key: () => 'redirect',
        },
      },
      facebook: {
        $path: (params?: { separator?: string; depth?: number }) =>
          params?.depth === undefined ? '/auth/oauth/facebook' : '/oauth/facebook',
        $key: () => 'facebook',
        redirect: {
          $path: (params?: { separator?: string; depth?: number }) =>
            params?.depth === undefined
              ? '/auth/oauth/facebook/redirect'
              : '/oauth/facebook/redirect',
          $key: () => 'redirect',
        },
      },
      github: {
        $path: (params?: { separator?: string; depth?: number }) =>
          params?.depth === undefined ? '/auth/oauth/github' : '/oauth/github',
        $key: () => 'github',
        redirect: {
          $path: (params?: { separator?: string; depth?: number }) =>
            params?.depth === undefined ? '/auth/oauth/github/redirect' : '/oauth/github/redirect',
          $key: () => 'redirect',
        },
      },
      discord: {
        $path: (params?: { separator?: string; depth?: number }) =>
          params?.depth === undefined ? '/auth/oauth/discord' : '/oauth/discord',
        $key: () => 'discord',
        redirect: {
          $path: (params?: { separator?: string; depth?: number }) =>
            params?.depth === undefined
              ? '/auth/oauth/discord/redirect'
              : '/oauth/discord/redirect',
          $key: () => 'redirect',
        },
      },
      spotify: {
        $path: (params?: { separator?: string; depth?: number }) =>
          params?.depth === undefined ? '/auth/oauth/spotify' : '/oauth/spotify',
        $key: () => 'spotify',
        redirect: {
          $path: (params?: { separator?: string; depth?: number }) =>
            params?.depth === undefined
              ? '/auth/oauth/spotify/redirect'
              : '/oauth/spotify/redirect',
          $key: () => 'redirect',
        },
      },
    },
  },
} as const;
