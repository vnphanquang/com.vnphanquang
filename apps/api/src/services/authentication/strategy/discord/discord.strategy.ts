import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { Strategy, StrategyOptions, Profile } from 'passport-discord';

import { AppRoutes, ConfigService } from '$config/index';
import { OAuthService } from '$services/authentication/oauth';

@Injectable()
export class DiscordOAuthStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private readonly config: ConfigService, private readonly oauthService: OAuthService) {
    const {
      oauth: { discord },
      urls: { api },
    } = config.get();
    const options: StrategyOptions = {
      ...discord,
      callbackURL: `${api}${AppRoutes.oauth.discord.redirect.$path({ separator: '/' })}`,
    };
    super({
      ...options,
      scope: ['identify', 'email'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    const { email, id, username, avatar } = profile;
    const user = {
      email,
      firstName: username,
      avatarUrl: this.generateDiscordUserAvatarUrl(id, avatar),
    };
    const authentication: Prisma.AuthenticationCreateWithoutUserInput = {
      provider: 'discord',
      providerId: id,
    };

    return this.oauthService.login(user, authentication);
  }

  private generateDiscordUserAvatarUrl(userId: string, userAvatarHash: string) {
    // https://discord.com/developers/docs/reference#image-formatting
    return `https://cdn.discordapp.com/avatars/${userId}/${userAvatarHash}.png`;
  }
}
