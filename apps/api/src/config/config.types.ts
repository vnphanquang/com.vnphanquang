import { Mode } from './config.enum';

export interface ConfigUrlsSchema {
  web: string;
}

export interface ConfigOAuthGoogleSchema {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
}

export interface ConfigOAuthSchema {
  google: ConfigOAuthGoogleSchema;
}

export interface ConfigSchema {
  mode: Mode;
  host: string;
  port: number;
  urls: ConfigUrlsSchema;
}
