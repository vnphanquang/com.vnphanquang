import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '$services/prisma';

@Injectable()
export class PostLocaleDao {
  constructor(private readonly prisma: PrismaService) {}

  bySlug(slug: string) {
    return this.prisma.postLocale.findUnique({
      where: { slug },
    });
  }

  all() {
    return this.prisma.postLocale.findMany();
  }

  getPublished() {
    return this.prisma.postLocale.findMany({
      where: {
        publishedAt: {
          not: null,
        },
      },
    });
  }

  create(postId: number, data: Prisma.PostLocaleCreateWithoutPostInput) {
    return this.prisma.postLocale.create({
      data: {
        ...data,
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });
  }

  update(id: number, data: Prisma.PostLocaleUpdateInput) {
    return this.prisma.postLocale.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.postLocale.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
