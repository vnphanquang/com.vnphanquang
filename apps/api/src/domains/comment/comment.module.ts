import { Module } from '@nestjs/common';

import { PrismaService } from '$services/prisma/prisma.service';

import { CommentDAO } from './comment.dao';
import { CommentResolver } from './comment.resolver';

@Module({
  imports: [],
  providers: [PrismaService, CommentDAO, CommentResolver],
  exports: [CommentDAO, CommentResolver],
})
export class CommentModule {}
