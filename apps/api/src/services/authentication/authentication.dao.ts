import { Injectable } from '@nestjs/common';
import { Prisma, type AuthProvider } from '@prisma/client';

import { PrismaService } from '$services/prisma/prisma.service';

@Injectable()
export class AuthenticationDAO {
  constructor(private readonly prisma: PrismaService) {}

  byProvider(provider: AuthProvider, providerId: string) {
    return this.prisma.authentication.findFirst({
      where: { provider, providerId },
    });
  }

  create(
    authentication: Prisma.AuthenticationCreateWithoutUserInput,
    user: Prisma.UserCreateWithoutAuthenticationInput,
  ) {
    return this.prisma.authentication.create({
      data: {
        ...authentication,
        user: {
          create: {
            ...user,
          },
        },
      },
    });
  }
}
