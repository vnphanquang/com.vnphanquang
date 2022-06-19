import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule, ConfigService } from '$config/index';

import { JwtAuthService } from './jwt.service';
import { JwtAuthStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => {
        const { jwt } = config.get();
        const { issuer, secret, audience, expiresIn } = jwt;
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
  providers: [ConfigService, JwtAuthService, JwtAuthStrategy],
  exports: [JwtAuthService],
})
export class JwtAuthModule {}
