import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { Strategy, StrategyOptions, Profile } from 'passport-spotify';

import { AppRoutes, ConfigService } from '$config/index';
import { OAuthService } from '$services/authentication/oauth';

@Injectable()
export class SpotifyOAuthStrategy extends PassportStrategy(Strategy, 'spotify') {
  constructor(private readonly config: ConfigService, private readonly oauthService: OAuthService) {
    const {
      oauth: { spotify },
      urls: { api },
    } = config.get();
    const options: StrategyOptions = {
      ...spotify,
      callbackURL: `${api}${AppRoutes.auth.oauth.spotify.redirect.$path({ separator: '/' })}`,
    };
    super({
      ...options,
      scope: ['user-read-email'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    const { emails, photos, id, displayName } = profile;
    const user = {
      email: emails?.[0]?.value,
      firstName: displayName,
      avatarUrl: (photos?.[0] as any)?.value,
    };
    const authentication: Prisma.AuthenticationCreateWithoutUserInput = {
      provider: 'spotify',
      providerId: id,
    };

    return this.oauthService.login(user, authentication);
  }
}
