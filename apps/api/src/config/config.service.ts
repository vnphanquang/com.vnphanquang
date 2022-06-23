import { join } from 'path';

import { Injectable } from '@nestjs/common';
import { selectConfig, TypedConfigModule, dotenvLoader } from 'nest-typed-config';

import { Config } from './config';

/** https://github.com/Nikaple/nest-typed-config */
export const ConfigDynamicModule = TypedConfigModule.forRoot({
  schema: Config,
  load: dotenvLoader({
    separator: '__',
    envFilePath: [join(process.cwd(), '.default.env'), join(process.cwd(), '.env')],
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
