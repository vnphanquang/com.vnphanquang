import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';

import { AuthenticationDao } from '$domains/authentication';
import { UserDao } from '$domains/user';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userDao: UserDao,
    private readonly authenticationDao: AuthenticationDao,
    private readonly jwtService: JwtService,
  ) {}

  jwt(user: User) {
    return {
      accessToken: this.jwtService.sign({
        ...user,
        sub: user.id,
      }),
    };
  }

  async oauth(
    user: Prisma.UserCreateWithoutAuthenticationsInput,
    authentication: Prisma.AuthenticationCreateWithoutUserInput,
  ) {
    const { provider, providerId } = authentication;
    const matchedAuthentication = await this.authenticationDao.byProvider({ provider, providerId });
    if (matchedAuthentication) {
      return this.userDao.byAuthenticationId(matchedAuthentication.id);
    } else if (user.email) {
      const matchedUser = await this.userDao.byEmail(user.email);
      if (matchedUser) {
        await this.authenticationDao.createdWithExistingUser(authentication, matchedUser.id);
        return matchedUser;
      }
    }
    const newAuthentication = await this.authenticationDao.createWithNewUser(authentication, user);
    return await this.userDao.byAuthenticationId(newAuthentication.id);
  }
}
