import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import { ConfigService } from '$config/index';

import { JwtPayload } from './jwt.types';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly config: ConfigService) {
    const { cookies, jwt } = config.get();
    const { session } = cookies;
    function extractJwtFromCookie(req) {
      let token = null;

      if (req && req.cookies) {
        const cookie = req.cookies[session.name];
        if (cookie && session.signed) {
          const { valid, value } = req.unsignCookie(cookie);
          if (valid) {
            token = value;
          }
        } else {
          token = cookie;
        }
      }
      return token;
    }
    const { secret, issuer, audience } = jwt;
    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: secret,
      audience,
      issuer,
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
