import { Injectable } from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';

import { PrismaService } from '$services/prisma/prisma.service';

@Injectable()
export class CommentDao {
  constructor(private readonly prisma: PrismaService) {}

  byId(id: number) {
    return this.prisma.comment.findUnique({
      where: { id },
    });
  }

  byUserId(userId: number) {
    return this.prisma.comment.findMany({ where: { authorId: userId } });
  }

  byPostId(postId: number) {
    return this.prisma.comment.findMany({ where: { postId } });
  }

  all() {
    return this.prisma.comment.findMany();
  }

  create(params: {
    authorId: number;
    data: Omit<Prisma.CommentCreateInput, 'author' | 'post'>;
    postId: number;
  }) {
    const { authorId, data, postId } = params;
    return this.prisma.comment.create({
      data: {
        ...data,
        author: {
          connect: { id: authorId },
        },
        post: {
          connect: { id: postId },
        },
      },
    });
  }

  update(id: number, data: Prisma.CommentUpdateInput): Promise<Comment> {
    return this.prisma.comment.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.comment.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
