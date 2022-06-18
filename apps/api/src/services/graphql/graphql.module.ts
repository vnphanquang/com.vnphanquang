import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';

import { CommentModule, CommentResolver } from '$domains/comment';
import { PostModule, PostResolver } from '$domains/post';
import { UserModule, UserResolver } from '$domains/user';

@Module({
  imports: [
    UserModule,
    PostModule,
    CommentModule,
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      path: '/graphql',
      autoSchemaFile: join(process.cwd(), 'src/services/graphql/schema.generated.gql'),
      sortSchema: true,
    }),
  ],
  providers: [UserResolver, PostResolver, CommentResolver],
})
export class GraphqlModule {}
