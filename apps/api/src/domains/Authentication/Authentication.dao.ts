import { Injectable } from '@nestjs/common';
import { Prisma, type AuthProvider } from '@prisma/client';

import { PrismaService } from '$services/prisma/prisma.service';

@Injectable()
export class AuthenticationDao {
  constructor(private readonly prisma: PrismaService) {}

  byProvider(params: { provider: AuthProvider; providerId: string }) {
    return this.prisma.authentication.findUnique({
      where: {
        provider_providerId: params,
      },
    });
  }

  lastConnectedAuthenticationByUser(userId: number) {
    return this.prisma.authentication.findFirst({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  byUser(userId: number) {
    return this.prisma.user.findUnique({ where: { id: userId } }).authentications();
  }

  all() {
    return this.prisma.authentication.findMany();
  }

  createWithNewUser(
    authentication: Prisma.AuthenticationCreateWithoutUserInput,
    user: Prisma.UserCreateWithoutAuthenticationsInput,
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

  createdWithExistingUser(
    authentication: Prisma.AuthenticationCreateWithoutUserInput,
    userId: number,
  ) {
    return this.prisma.authentication.create({
      data: {
        ...authentication,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
