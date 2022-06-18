import { Injectable } from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';

import { PrismaService } from '$services/prisma/prisma.service';

@Injectable()
export class CommentDAO {
  constructor(private readonly prisma: PrismaService) {}

  findUnique(commentWhereUniqueInput: Prisma.CommentWhereUniqueInput) {
    return this.prisma.comment.findUnique({
      where: commentWhereUniqueInput,
    });
  }

  findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CommentWhereUniqueInput;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput;
  }) {
    return this.prisma.comment.findMany(params);
  }

  create(data: Prisma.CommentCreateInput) {
    return this.prisma.comment.create({ data });
  }

  update(params: {
    where: Prisma.CommentWhereUniqueInput;
    data: Prisma.CommentUpdateInput;
  }): Promise<Comment> {
    return this.prisma.comment.update(params);
  }

  delete(where: Prisma.CommentWhereUniqueInput) {
    return this.prisma.comment.delete({ where });
  }
}
