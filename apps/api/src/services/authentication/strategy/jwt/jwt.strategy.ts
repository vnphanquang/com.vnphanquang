import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import { ConfigService } from '$config/index';

import { JwtPayload } from './jwt.types';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    const { session, secret } = config.get().cookies;
    function extractJwtFromCookie(req) {
      let token = null;

      if (req && req.cookies) {
        token = req.cookies[session.name];
      }
      return token;
    }
    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
