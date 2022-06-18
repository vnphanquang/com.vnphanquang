import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '$services/prisma/prisma.service';

@Injectable()
export class PostDAO {
  constructor(private readonly prisma: PrismaService) {}

  findUnique(postWhereUniqueInput: Prisma.PostWhereUniqueInput) {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }) {
    return this.prisma.post.findMany(params);
  }

  create(data: Prisma.PostCreateInput) {
    return this.prisma.post.create({ data });
  }

  update(params: { where: Prisma.PostWhereUniqueInput; data: Prisma.PostUpdateInput }) {
    return this.prisma.post.update(params);
  }

  delete(where: Prisma.PostWhereUniqueInput) {
    return this.prisma.post.delete({ where });
  }
}
