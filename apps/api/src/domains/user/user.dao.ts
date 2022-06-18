import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '$services/prisma/prisma.service';

@Injectable()
export class UserDAO {
  constructor(private readonly prisma: PrismaService) {}

  byId(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  byCommentId(commentId: number) {
    return this.prisma.comment.findUnique({ where: { id: commentId } }).author();
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
