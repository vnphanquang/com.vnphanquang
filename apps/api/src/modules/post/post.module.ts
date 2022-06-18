import { Module } from '@nestjs/common';

import { PrismaService } from '$services/prisma/prisma.service';

import { PostDAO } from './post.dao';

@Module({
  imports: [],
  providers: [PrismaService],
  exports: [PostDAO],
})
export class PostModule {}
