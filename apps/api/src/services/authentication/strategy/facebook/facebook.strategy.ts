import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { Strategy, StrategyOption, Profile } from 'passport-facebook';

import { AppRoutes, ConfigService } from '$config/config.service';
import { OAuthService } from '$services/authentication/oauth';

@Injectable()
export class FacebookOAuthStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly config: ConfigService, private readonly oauthService: OAuthService) {
    const {
      oauth: { facebook },
      urls: { api },
    } = config.get();
    const options: StrategyOption = {
      ...facebook,
      profileFields: ['id', 'name', 'emails', 'photos'],
      callbackURL: `${api}${AppRoutes.auth.oauth.facebook.redirect.$path({ separator: '/' })}`,
    };
    super({
      ...options,
      scope: ['email'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: Profile) {
    const { name, emails, photos, id } = profile;

    const user = {
      email: emails?.[0]?.value,
      firstName: name.givenName,
      lastName: name.familyName,
      avatarUrl: photos?.[0]?.value,
    };

    const authentication: Prisma.AuthenticationCreateWithoutUserInput = {
      provider: 'facebook',
      providerId: id,
    };

    return this.oauthService.login(user, authentication);
  }
}
