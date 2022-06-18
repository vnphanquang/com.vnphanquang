import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';

import { AuthenticationDomainModule } from '$domains/authentication';
import { AuthenticationResolver } from '$domains/authentication/authentication.resolver';
import { CommentDomainModule } from '$domains/comment';
import { CommentResolver } from '$domains/comment/comment.resolver';
import { PostDomainModule } from '$domains/post';
import { PostResolver } from '$domains/post/post.resolver';
import { UserDomainModule } from '$domains/user';
import { UserResolver } from '$domains/user/user.resolver';

@Module({
  imports: [
    AuthenticationDomainModule,
    UserDomainModule,
    PostDomainModule,
    CommentDomainModule,
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      path: '/graphql',
      autoSchemaFile: join(process.cwd(), 'src/services/graphql/schema.generated.gql'),
      sortSchema: true,
    }),
  ],
  providers: [AuthenticationResolver, UserResolver, PostResolver, CommentResolver],
})
export class GraphqlModule {}
