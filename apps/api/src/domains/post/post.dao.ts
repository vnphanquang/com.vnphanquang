import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '$services/prisma/prisma.service';

@Injectable()
export class PostDao {
  constructor(private readonly prisma: PrismaService) {}

  byId(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  byCommentId(commentId: number) {
    return this.prisma.comment.findUnique({ where: { id: commentId } }).post();
  }

  all() {
    return this.prisma.post.findMany();
  }

  create(data: Prisma.PostCreateInput) {
    return this.prisma.post.create({ data });
  }

  update(id: number, data: Prisma.PostUpdateInput) {
    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
