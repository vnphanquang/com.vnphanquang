import { Module } from '@nestjs/common';

import { PrismaService } from '$services/prisma/prisma.service';

import { UserDAO } from './user.dao';
import { UserResolver } from './user.resolver';

@Module({
  imports: [],
  providers: [PrismaService, UserDAO, UserResolver],
  exports: [UserDAO, UserResolver],
})
export class UserModule {}
