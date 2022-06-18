import { Module } from '@nestjs/common';

import { PrismaService } from '$services/prisma/prisma.service';

import { CommentDAO } from './comment.dao';

@Module({
  imports: [],
  providers: [PrismaService],
  exports: [CommentDAO],
})
export class CommentModule {}
