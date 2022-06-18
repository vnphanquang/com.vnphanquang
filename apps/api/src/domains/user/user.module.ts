import { Module } from '@nestjs/common';

import { PrismaService } from '$services/prisma/prisma.service';

import { UserDAO } from './user.dao';

@Module({
  imports: [],
  providers: [PrismaService, UserDAO],
  exports: [UserDAO],
})
export class UserModule {}
