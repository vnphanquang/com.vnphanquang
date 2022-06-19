import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  sign(user: User) {
    const accessToken = this.jwtService.sign({
      ...user,
      sub: user.id,
    });
    return {
      accessToken,
    };
  }

  verfiy(token) {
    const payload = this.jwtService.verify(token);
    return payload;
  }
}
