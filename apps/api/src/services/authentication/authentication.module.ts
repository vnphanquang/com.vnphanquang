import { Module } from '@nestjs/common';

import { ConfigService } from '$config/index';

import { AuthenticationController } from './authentication.controller';
import { DiscordOAuthModule } from './strategy/discord';
import { FacebookOAuthModule } from './strategy/facebook';
import { GithubOAuthModule } from './strategy/github';
import { GoogleOAuthModule } from './strategy/google';
import { JwtAuthModule } from './strategy/jwt';

@Module({
  imports: [
    JwtAuthModule,
    GoogleOAuthModule,
    FacebookOAuthModule,
    GithubOAuthModule,
    DiscordOAuthModule,
  ],
  controllers: [AuthenticationController],
  providers: [ConfigService],
  exports: [],
})
export class AuthenticationModule {}
