import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '$services/prisma';

@Injectable()
export class TestimonialDao {
  constructor(private readonly prisma: PrismaService) {}

  byId(id: number) {
    return this.prisma.testimonial.findUnique({
      where: { id },
    });
  }

  all() {
    return this.prisma.testimonial.findMany();
  }

  onlyPublished() {
    return this.prisma.testimonial.findMany({
      where: {
        published: true,
      },
    });
  }

  create(data: Prisma.TestimonialCreateInput) {
    return this.prisma.testimonial.create({ data });
  }

  update(id: number, data: Prisma.TestimonialUpdateInput) {
    return this.prisma.testimonial.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.testimonial.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
