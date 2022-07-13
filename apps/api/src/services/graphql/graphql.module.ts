import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { FastifyReply, FastifyRequest } from 'fastify';

import { ConfigModule } from '$config/config.module';
import { AppRoutes, ConfigService } from '$config/config.service';
import { AuthenticationDomainModule, AuthenticationResolver } from '$domains/Authentication';
import { CommentDomainModule, CommentResolver } from '$domains/Comment';
import { PostDomainModule, PostResolver } from '$domains/Post';
import { PostLocaleDomainModule, PostLocaleResolver } from '$domains/PostLocale';
import { TestimonialDomainModule, TestimonialResolver } from '$domains/Testimonial';
import { UserDomainModule, UserResolver } from '$domains/User';
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
          context: (req: FastifyRequest, res: FastifyReply) => {
            let payload = null;
            const session = config.get().cookies.session;
            let token = req.cookies[session.name];
            try {
              if (token) {
                if (session.signed) {
                  const { valid, value } = req.unsignCookie(token);
                  if (valid) {
                    token = value;
                  }
                }
                payload = jwtAuthService.verify(token);
              }
              if (payload) {
                (req as any).user = payload;
              }
            } catch (error) {
              res.clearCookie(session.name);
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
