import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { OAuth2Strategy, Profile } from 'passport-google-oauth';

import { ConfigService } from '$config/index';
import { UserDAO } from '$domains/user';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy, 'google') {
  constructor(private readonly config: ConfigService, private readonly userDAO: UserDAO) {
    super({
      ...config.get().oauth.google,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { name, emails, photos, id } = profile;
    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };

    return user;
  }
}
