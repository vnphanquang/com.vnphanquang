import { Type } from 'class-transformer';
import { IsString, IsNumber, IsEnum, IsNotEmptyObject } from 'class-validator';

import { Mode } from './config.enum';
import {
  ConfigOAuthGoogleSchema,
  ConfigOAuthSchema,
  ConfigSchema,
  ConfigUrlsSchema,
} from './config.types';

export class ConfigUrls implements ConfigUrlsSchema {
  @IsString()
  public readonly web: ConfigUrlsSchema['web'] = 'http://localhost:3000';
}

export class ConfigOAuthGoogle implements ConfigOAuthGoogleSchema {
  @IsString()
  public readonly clientID!: ConfigOAuthGoogleSchema['clientID'];

  @IsString()
  public readonly clientSecret!: ConfigOAuthGoogleSchema['clientSecret'];

  @IsString()
  public readonly callbackURL!: ConfigOAuthGoogleSchema['callbackURL'];
}

export class ConfigOAuth implements ConfigOAuthSchema {
  @Type(() => ConfigOAuthGoogle)
  @IsNotEmptyObject()
  public readonly google!: ConfigOAuthSchema['google'];
}

export class Config implements ConfigSchema {
  @IsEnum(Mode)
  public readonly mode: ConfigSchema['mode'] = Mode.development;

  @IsString()
  public readonly host: ConfigSchema['host'] = '0.0.0.0';

  @IsNumber()
  public readonly port: ConfigSchema['port'] = 3001;

  @Type(() => ConfigUrls)
  @IsNotEmptyObject()
  public readonly urls: ConfigUrls = new ConfigUrls();

  @Type(() => ConfigOAuth)
  @IsNotEmptyObject()
  public readonly oauth!: ConfigOAuth;
}
