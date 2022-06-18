import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
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
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      path: '/graphql',
      autoSchemaFile: 'src/generated/schema.gql',
      sortSchema: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
