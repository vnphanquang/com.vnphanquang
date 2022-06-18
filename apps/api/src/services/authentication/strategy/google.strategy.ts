import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { OAuth2Strategy, Profile } from 'passport-google-oauth';

import { ConfigService } from '$config/index';

import { AuthenticationService } from '../authentication.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy, 'google') {
  constructor(
    private readonly config: ConfigService,
    private readonly authenticationService: AuthenticationService,
  ) {
    super({
      ...config.get().oauth.google,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { name, emails, photos, id } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      avatarUrl: photos[0].value,
    };
    const authentication: Prisma.AuthenticationCreateWithoutUserInput = {
      provider: 'google',
      providerId: id,
    };

    return this.authenticationService.oauth(user, authentication);
  }
}
