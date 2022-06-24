import { Type } from 'class-transformer';
import { IsString, IsEnum, IsNotEmptyObject, IsBoolean } from 'class-validator';

import { Mode } from './config.enum';
import {
  ConfigCookieOptionsSchema,
  ConfigCookiesSchema,
  ConfigJwtSchema,
  ConfigOAuthDiscordOptionsSchema,
  ConfigOAuthOptionsSchema,
  ConfigOAuthSchema,
  ConfigSchema,
  ConfigUrlsSchema,
} from './config.types';

export class ConfigCookieOptions implements ConfigCookieOptionsSchema {
  @IsString()
  public readonly name!: string;

  @IsString()
  public readonly domain?: string;

  @IsBoolean()
  public readonly httpOnly!: boolean;

  @IsBoolean()
  public readonly secure!: boolean;

  @IsBoolean()
  public readonly signed!: boolean;
}

export class ConfigCookies implements ConfigCookiesSchema {
  @IsString()
  public readonly secret: ConfigCookiesSchema['secret'];

  @Type(() => ConfigCookieOptions)
  @IsNotEmptyObject()
  public readonly session!: ConfigCookieOptions;
}

export class ConfigJwt implements ConfigJwtSchema {
  @IsString()
  public readonly secret!: ConfigJwtSchema['secret'];

  @IsString()
  public readonly audience!: ConfigJwtSchema['audience'];

  @IsString()
  public readonly issuer!: ConfigJwtSchema['issuer'];

  @IsString()
  public readonly expiresIn!: ConfigJwtSchema['expiresIn'];
}

export class ConfigUrls implements ConfigUrlsSchema {
  @IsString()
  public readonly web!: ConfigUrlsSchema['web'];

  @IsString()
  public readonly api!: ConfigUrlsSchema['api'];
}

export class ConfigOAuthOptions implements ConfigOAuthOptionsSchema {
  @IsString()
  public readonly clientID!: ConfigOAuthOptionsSchema['clientID'];

  @IsString()
  public readonly clientSecret!: ConfigOAuthOptionsSchema['clientSecret'];
}

export class ConfigOAuthDiscordOptions
  extends ConfigOAuthOptions
  implements ConfigOAuthDiscordOptionsSchema
{
  @IsString()
  public readonly generatedURL!: ConfigOAuthDiscordOptionsSchema['generatedURL'];
}

export class ConfigOAuth implements ConfigOAuthSchema {
  @Type(() => ConfigOAuthOptions)
  @IsNotEmptyObject()
  public readonly google!: ConfigOAuthSchema['google'];

  @Type(() => ConfigOAuthOptions)
  @IsNotEmptyObject()
  public readonly facebook!: ConfigOAuthSchema['google'];

  @Type(() => ConfigOAuthOptions)
  @IsNotEmptyObject()
  public readonly github!: ConfigOAuthSchema['github'];

  @Type(() => ConfigOAuthDiscordOptions)
  @IsNotEmptyObject()
  public readonly discord!: ConfigOAuthDiscordOptions;

  @Type(() => ConfigOAuthOptions)
  @IsNotEmptyObject()
  public readonly spotify!: ConfigOAuthSchema['spotify'];
}

export class Config implements ConfigSchema {
  @IsEnum(Mode)
  public readonly mode!: ConfigSchema['mode'];

  @IsString()
  public readonly host!: ConfigSchema['host'];

  @IsString()
  public readonly port!: ConfigSchema['port'];

  @Type(() => ConfigUrls)
  @IsNotEmptyObject()
  public readonly urls!: ConfigUrls;

  @Type(() => ConfigOAuth)
  @IsNotEmptyObject()
  public readonly oauth!: ConfigOAuth;

  @Type(() => ConfigJwt)
  @IsNotEmptyObject()
  public readonly jwt!: ConfigJwt;

  @Type(() => ConfigCookies)
  @IsNotEmptyObject()
  public readonly cookies!: ConfigCookies;
}
