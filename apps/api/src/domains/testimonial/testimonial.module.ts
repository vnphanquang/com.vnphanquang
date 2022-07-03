import { Module } from '@nestjs/common';

import { PrismaService } from '$services/prisma/prisma.service';

import { TestimonialDao } from './testimonial.dao';

@Module({
  imports: [],
  providers: [PrismaService, TestimonialDao],
  exports: [TestimonialDao],
})
export class TestimonialDomainModule {}
