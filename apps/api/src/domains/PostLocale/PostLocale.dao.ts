import { Injectable } from '@nestjs/common';
import { Locale, Prisma } from '@prisma/client';

import { PrismaService } from '$services/prisma';

@Injectable()
export class PostLocaleDao {
  constructor(private readonly prisma: PrismaService) {}

  bySlug(slug: string) {
    return this.prisma.postLocale.findUnique({
      where: { slug },
    });
  }

  byPostId(postId: number, locale: Locale) {
    return this.prisma.postLocale.findFirst({
      where: {
        postId,
        locale,
      },
    });
  }

  all(locale?: Locale) {
    return this.prisma.postLocale.findMany({
      where: {
        ...(locale && { locale }),
      },
    });
  }

  getPublished(locale?: Locale) {
    return this.prisma.postLocale.findMany({
      where: {
        publishedAt: {
          not: null,
        },
        ...(locale && { locale }),
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
