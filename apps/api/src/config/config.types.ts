import { Mode } from './config.enum';

export interface ConfigUrlsSchema {
  web: string;
}

export interface ConfigSchema {
  mode: Mode;
  host: string;
  port: number;
  urls: ConfigUrlsSchema;
}
