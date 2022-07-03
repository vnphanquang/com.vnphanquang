import { Module } from '@nestjs/common';

import { PrismaService } from '$services/prisma/prisma.service';

import { PostLocaleDao } from './PostLocale.dao';

@Module({
  imports: [],
  providers: [PrismaService, PostLocaleDao],
  exports: [PostLocaleDao],
})
export class PostLocaleDomainModule {}
