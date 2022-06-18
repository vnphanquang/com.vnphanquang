import { Module } from '@nestjs/common';

import { PrismaService } from '$services/prisma/prisma.service';

import { PostDAO } from './post.dao';
import { PostResolver } from './post.resolver';

@Module({
  imports: [],
  providers: [PrismaService, PostDAO, PostResolver],
  exports: [PostDAO, PostResolver],
})
export class PostModule {}
