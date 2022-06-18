import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '$services/prisma/prisma.service';

@Injectable()
export class UserDao {
  constructor(private readonly prisma: PrismaService) {}

  byId(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  byEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  byCommentId(commentId: number) {
    return this.prisma.comment.findUnique({ where: { id: commentId } }).author();
  }

  byAuthenticationId(authenticationId: string) {
    return this.prisma.authentication.findUnique({ where: { id: authenticationId } }).user();
  }

  all() {
    return this.prisma.user.findMany();
  }

  update(id: number, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
