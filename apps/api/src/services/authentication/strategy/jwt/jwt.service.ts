import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  jwt(user: User) {
    return {
      accessToken: this.jwtService.sign({
        ...user,
        sub: user.id,
      }),
    };
  }
}
