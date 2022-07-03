import { Module } from '@nestjs/common';

import { PrismaService } from '$services/prisma/prisma.service';

import { AuthenticationDao } from './Authentication.dao';

@Module({
  imports: [],
  providers: [PrismaService, AuthenticationDao],
  exports: [AuthenticationDao],
})
export class AuthenticationDomainModule {}
