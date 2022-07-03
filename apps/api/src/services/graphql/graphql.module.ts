import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';

import { ConfigModule } from '$config/config.module';
import { AppRoutes, ConfigService } from '$config/config.service';
import { AuthenticationDomainModule, AuthenticationResolver } from '$domains/authentication';
import { CommentDomainModule, CommentResolver } from '$domains/comment';
import { PostDomainModule, PostResolver } from '$domains/post';
import { PostLocaleDomainModule, PostLocaleResolver } from '$domains/postLocale';
import { TestimonialDomainModule, TestimonialResolver } from '$domains/testimonial';
import { UserDomainModule, UserResolver } from '$domains/user';
import { JwtAuthModule, JwtAuthService } from '$services/authentication/strategy/jwt';
import { PrismaService } from '$services/prisma';

@Module({
  imports: [
    AuthenticationDomainModule,
    UserDomainModule,
    PostDomainModule,
    PostLocaleDomainModule,
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
    PostLocaleResolver,
    CommentResolver,
    TestimonialResolver,
  ],
})
export class GraphqlModule {}
