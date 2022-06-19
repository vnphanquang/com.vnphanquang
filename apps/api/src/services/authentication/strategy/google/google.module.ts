import { Module } from '@nestjs/common';

import { ConfigService } from '$config/index';
import { OAuthModule } from '$services/authentication/oauth';

import { GoogleOAuthStrategy } from './google.strategy';

@Module({
  imports: [OAuthModule],
  providers: [ConfigService, GoogleOAuthStrategy],
})
export class GoogleOAuthModule {}
