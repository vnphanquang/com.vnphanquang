import { Module } from '@nestjs/common';

import { ConfigService } from '$config/index';
import { UserModule } from '$domains/user';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { GoogleStrategy } from './strategy';

@Module({
  imports: [UserModule],
  controllers: [AuthenticationController],
  providers: [ConfigService, AuthenticationService, GoogleStrategy],
  exports: [],
})
export class AuthenticationModule {}
