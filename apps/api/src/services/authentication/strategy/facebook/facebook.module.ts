import { Module } from '@nestjs/common';

import { ConfigService } from '$config/index';
import { OAuthModule } from '$services/authentication/oauth';

import { FacebookOAuthStrategy } from './facebook.strategy';

@Module({
  imports: [OAuthModule],
  providers: [ConfigService, FacebookOAuthStrategy],
})
export class FacebookOAuthModule {}
