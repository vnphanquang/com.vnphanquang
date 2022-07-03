import { Module } from '@nestjs/common';

import { PrismaService } from '$services/prisma/prisma.service';

import { UserDao } from './User.dao';

@Module({
  imports: [],
  providers: [PrismaService, UserDao],
  exports: [UserDao],
})
export class UserDomainModule {}
