import { Module } from '@nestjs/common';
import { TypedConfigModule, fileLoader } from 'nest-typed-config';

import { Config } from '$config/index';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    /** https://github.com/Nikaple/nest-typed-config */
    TypedConfigModule.forRoot({
      schema: Config,
      load: fileLoader({
        basename: `.env.${process.env.NODE_ENV}`,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
