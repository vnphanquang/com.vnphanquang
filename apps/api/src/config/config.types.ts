import { Mode } from './config.enum';

export interface ConfigCookieOptionsSchema {
  name: string;
  domain?: string;
  httpOnly: boolean;
  secure: boolean;
  signed: boolean;
}

export interface ConfigCookiesSchema {
  secret: string;
  session: ConfigCookieOptionsSchema;
}

export interface ConfigJwtSchema {
  secret: string;
  audience: string;
  issuer: string;
  expiresIn: string;
}

export interface ConfigUrlsSchema {
  web: string;
}

export interface ConfigOAuthOptionsSchema {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
}

export interface ConfigOAuthSchema {
  google: ConfigOAuthOptionsSchema;
  facebook: ConfigOAuthOptionsSchema;
}

export interface ConfigSchema {
  mode: Mode;
  host: string;
  port: number;
  urls: ConfigUrlsSchema;
  oauth: ConfigOAuthSchema;
  jwt: ConfigJwtSchema;
  cookies: ConfigCookiesSchema;
}
