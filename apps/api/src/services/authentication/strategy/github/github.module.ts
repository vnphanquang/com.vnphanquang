import { Module } from '@nestjs/common';

import { ConfigService } from '$config/index';
import { OAuthModule } from '$services/authentication/oauth';

import { GithubOAuthStrategy } from './github.strategy';

@Module({
  imports: [OAuthModule],
  providers: [ConfigService, GithubOAuthStrategy],
})
export class GithubOAuthModule {}
