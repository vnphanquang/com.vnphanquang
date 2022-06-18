import { Module } from '@nestjs/common';

import { PrismaService } from '$services/prisma/prisma.service';

import { CommentDao } from './comment.dao';

@Module({
  imports: [],
  providers: [PrismaService, CommentDao],
  exports: [CommentDao],
})
export class CommentDomainModule {}
