import { Module } from '@nestjs/common';

import { ConfigService } from '$config/index';

import { AuthenticationController } from './authentication.controller';
import { FacebookOAuthModule } from './strategy/facebook';
import { GoogleOAuthModule } from './strategy/google';
import { JwtAuthModule } from './strategy/jwt';

@Module({
  imports: [JwtAuthModule, GoogleOAuthModule, FacebookOAuthModule],
  controllers: [AuthenticationController],
  providers: [ConfigService],
  exports: [],
})
export class AuthenticationModule {}
