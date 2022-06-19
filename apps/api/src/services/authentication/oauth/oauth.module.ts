import { Module } from '@nestjs/common';

import { AuthenticationDomainModule } from '$domains/authentication';
import { UserDomainModule } from '$domains/user';

import { OAuthService } from './oauth.service';

@Module({
  imports: [AuthenticationDomainModule, UserDomainModule],
  providers: [OAuthService],
  exports: [OAuthService],
})
export class OAuthModule {}
