import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '$services/prisma/prisma.service';

@Injectable()
export class UserDAO {
  constructor(private readonly prisma: PrismaService) {}

  findUnique(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    return this.prisma.user.findMany(params);
  }

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  update(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }) {
    return this.prisma.user.update(params);
  }

  delete(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({ where });
  }
}
