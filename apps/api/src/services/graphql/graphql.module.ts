import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';

import { ConfigModule } from '$config/config.module';
import { AppRoutes, ConfigService } from '$config/config.service';
import { AuthenticationDomainModule } from '$domains/authentication';
import { AuthenticationResolver } from '$domains/authentication/authentication.resolver';
import { CommentDomainModule } from '$domains/comment';
import { CommentResolver } from '$domains/comment/comment.resolver';
import { PostDomainModule } from '$domains/post';
import { PostResolver } from '$domains/post/post.resolver';
import { TestimonialDomainModule, TestimonialResolver } from '$domains/testimonial';
import { UserDomainModule } from '$domains/user';
import { UserResolver } from '$domains/user/user.resolver';
import { JwtAuthModule, JwtAuthService } from '$services/authentication/strategy/jwt';
import { PrismaService } from '$services/prisma';

@Module({
  imports: [
    AuthenticationDomainModule,
    UserDomainModule,
    PostDomainModule,
    CommentDomainModule,
    TestimonialDomainModule,
    GraphQLModule.forRootAsync<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      imports: [ConfigModule, JwtAuthModule],
      useFactory: async (config: ConfigService, jwtAuthService: JwtAuthService) => {
        return {
          graphiql: false,
          ide: false,
          path: AppRoutes.graphql.$path(),
          autoSchemaFile: join(process.cwd(), 'src/services/graphql/schema.generated.graphql'),
          sortSchema: true,
          context: (req) => {
            let payload = null;
            const session = config.get().cookies.session;
            let token = req.cookies[session.name];
            if (token) {
              if (session.signed) {
                const { valid, value } = req.unsignCookie(token);
                if (valid) {
                  token = value;
                }
              }
              payload = jwtAuthService.verfiy(token);
            }
            if (payload) {
              req.user = payload;
            }
          },
        };
      },
      inject: [ConfigService, JwtAuthService],
    }),
  ],
  providers: [
    PrismaService,
    AuthenticationResolver,
    UserResolver,
    PostResolver,
    CommentResolver,
    TestimonialResolver,
  ],
})
export class GraphqlModule {}
