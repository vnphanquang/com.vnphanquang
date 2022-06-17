import { Type } from 'class-transformer';
import { IsString, IsNumber, IsEnum, IsNotEmptyObject } from 'class-validator';

import { Mode } from './config.enum';
import { ConfigSchema, ConfigUrlsSchema } from './config.types';

export class ConfigUrls implements ConfigUrlsSchema {
  @IsString()
  public readonly web: ConfigUrlsSchema['web'] = 'http://localhost:3000';
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
}
