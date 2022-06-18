import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule, ConfigService } from '$config/index';
import { AuthenticationDomainModule } from '$domains/authentication';
import { UserDomainModule } from '$domains/user';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { GoogleStrategy } from './strategy';

@Module({
  imports: [
    UserDomainModule,
    AuthenticationDomainModule,
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => {
        const { issuer, secret, audience, expiresIn } = config.get().jwt;
        return {
          secret,
          signOptions: {
            audience,
            expiresIn,
            issuer,
          },
        };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthenticationController],
  providers: [ConfigService, AuthenticationService, GoogleStrategy],
  exports: [],
})
export class AuthenticationModule {}
