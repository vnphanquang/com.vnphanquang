import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';

import { CommentModule } from '$domains/comment';
import { PostModule } from '$domains/post';
import { UserModule } from '$domains/user';

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      path: '/graphql',
      autoSchemaFile: join(process.cwd(), 'src/services/graphql/schema.generated.gql'),
      sortSchema: true,
    }),
    UserModule,
    PostModule,
    CommentModule,
  ],
})
export class GraphqlModule {}
