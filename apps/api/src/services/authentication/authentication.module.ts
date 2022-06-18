import { Module } from '@nestjs/common';

import { ConfigService } from '$config/index';
import { UserModule } from '$domains/user';
import { PrismaService } from '$services/prisma';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationDAO } from './authentication.dao';
import { AuthenticationService } from './authentication.service';
import { GoogleStrategy } from './strategy';

@Module({
  imports: [UserModule],
  controllers: [AuthenticationController],
  providers: [
    PrismaService,
    ConfigService,
    AuthenticationService,
    GoogleStrategy,
    AuthenticationDAO,
  ],
  exports: [],
})
export class AuthenticationModule {}
