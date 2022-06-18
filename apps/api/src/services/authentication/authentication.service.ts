import { Injectable } from '@nestjs/common';

import { UserDAO } from '$domains/user';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userDAO: UserDAO) {}

  loginWithGoogle(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
