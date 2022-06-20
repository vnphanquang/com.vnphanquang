import { Module } from '@nestjs/common';

import { ConfigService } from '$config/index';
import { OAuthModule } from '$services/authentication/oauth';

import { SpotifyOAuthStrategy } from './spotify.strategy';

@Module({
  imports: [OAuthModule],
  providers: [ConfigService, SpotifyOAuthStrategy],
})
export class SpotifyOAuthModule {}
