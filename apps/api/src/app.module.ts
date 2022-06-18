import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { Role } from '@prisma/client';
import { TypedConfigModule, fileLoader } from 'nest-typed-config';

import { Config } from '$config/index';
import { CommentModule } from '$modules/comment';
import { PostModule } from '$modules/post';
import { UserModule } from '$modules/user';

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
      autoSchemaFile: join(process.cwd(), 'src/generated/schema.gql'),
      sortSchema: true,
    }),
    UserModule,
    PostModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// Extract to own module?
registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});
