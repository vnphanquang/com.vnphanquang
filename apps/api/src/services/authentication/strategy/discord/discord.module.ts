import { Module } from '@nestjs/common';

import { ConfigService } from '$config/index';
import { OAuthModule } from '$services/authentication/oauth';

import { DiscordOAuthStrategy } from './discord.strategy';

@Module({
  imports: [OAuthModule],
  providers: [ConfigService, DiscordOAuthStrategy],
})
export class DiscordOAuthModule {}
