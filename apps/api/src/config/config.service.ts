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
  oauth: {
    $path: (params?: { separator?: string; depth?: number }) => '/oauth',
    $key: () => 'oauth',
    google: {
      $path: (params?: { separator?: string; depth?: number }) => '/oauth/google',
      $key: () => 'google',
      redirect: {
        $path: (params?: { separator?: string; depth?: number }) =>
          params?.depth === undefined ? '/oauth/google/redirect' : '/google/redirect',
        $key: () => 'redirect',
      },
    },
    facebook: {
      $path: (params?: { separator?: string; depth?: number }) => '/oauth/facebook',
      $key: () => 'facebook',
      redirect: {
        $path: (params?: { separator?: string; depth?: number }) =>
          params?.depth === undefined ? '/oauth/facebook/redirect' : '/facebook/redirect',
        $key: () => 'redirect',
      },
    },
    github: {
      $path: (params?: { separator?: string; depth?: number }) => '/oauth/github',
      $key: () => 'github',
      redirect: {
        $path: (params?: { separator?: string; depth?: number }) =>
          params?.depth === undefined ? '/oauth/github/redirect' : '/github/redirect',
        $key: () => 'redirect',
      },
    },
    discord: {
      $path: (params?: { separator?: string; depth?: number }) => '/oauth/discord',
      $key: () => 'discord',
      redirect: {
        $path: (params?: { separator?: string; depth?: number }) =>
          params?.depth === undefined ? '/oauth/discord/redirect' : '/discord/redirect',
        $key: () => 'redirect',
      },
    },
    spotify: {
      $path: (params?: { separator?: string; depth?: number }) => '/oauth/spotify',
      $key: () => 'spotify',
      redirect: {
        $path: (params?: { separator?: string; depth?: number }) =>
          params?.depth === undefined ? '/oauth/spotify/redirect' : '/spotify/redirect',
        $key: () => 'redirect',
      },
    },
  },
} as const;
