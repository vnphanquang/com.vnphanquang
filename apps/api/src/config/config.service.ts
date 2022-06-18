import { join } from 'path';

import { Injectable } from '@nestjs/common';
import { fileLoader, selectConfig, TypedConfigModule } from 'nest-typed-config';

import { Config } from './config';

/** https://github.com/Nikaple/nest-typed-config */
export const ConfigDynamicModule = TypedConfigModule.forRoot({
  schema: Config,
  load: fileLoader({
    absolutePath: join(process.cwd(), `.env.${process.env.NODE_ENV}.js`),
  }),
});

const config = selectConfig(ConfigDynamicModule, Config);

@Injectable()
export class ConfigService {
  get() {
    return config;
  }
}
