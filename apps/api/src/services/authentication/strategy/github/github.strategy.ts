import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { Strategy, StrategyOptions, Profile } from 'passport-github';

import { AppRoutes, ConfigService } from '$config/index';
import { OAuthService } from '$services/authentication/oauth';

@Injectable()
export class GithubOAuthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly config: ConfigService, private readonly oauthService: OAuthService) {
    const {
      oauth: { github },
      urls: { api },
    } = config.get();
    const options: StrategyOptions = {
      ...github,
      callbackURL: `${api}${AppRoutes.oauth.github.redirect.$path({ separator: '/' })}`,
    };
    super({
      ...options,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    const { emails, photos, id, displayName } = profile;
    const user = {
      email: emails?.[0]?.value,
      firstName: displayName,
      avatarUrl: photos?.[0]?.value,
    };
    const authentication: Prisma.AuthenticationCreateWithoutUserInput = {
      provider: 'github',
      providerId: id,
    };

    return this.oauthService.login(user, authentication);
  }
}
