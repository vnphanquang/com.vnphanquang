import { Module } from '@nestjs/common';

import { PrismaService } from '$services/prisma/prisma.service';

import { PostDao } from './post.dao';

@Module({
  imports: [],
  providers: [PrismaService, PostDao],
  exports: [PostDao],
})
export class PostDomainModule {}
