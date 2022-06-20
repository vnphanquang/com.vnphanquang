import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { OAuth2Strategy, Profile, IOAuth2StrategyOption } from 'passport-google-oauth';

import { ConfigService } from '$config/index';
import { OAuthService } from '$services/authentication/oauth';

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(OAuth2Strategy, 'google') {
  constructor(private readonly config: ConfigService, private readonly oauthService: OAuthService) {
    const options: IOAuth2StrategyOption = {
      ...config.get().oauth.google,
    };
    super({
      ...options,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    const { name, emails, photos, id } = profile;
    const user = {
      email: emails?.[0]?.value,
      firstName: name.givenName,
      lastName: name.familyName,
      avatarUrl: photos?.[0]?.value,
    };
    const authentication: Prisma.AuthenticationCreateWithoutUserInput = {
      provider: 'google',
      providerId: id,
    };

    return this.oauthService.login(user, authentication);
  }
}
