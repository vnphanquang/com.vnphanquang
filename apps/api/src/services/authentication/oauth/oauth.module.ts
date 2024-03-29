import { Module } from '@nestjs/common';

import { AuthenticationDomainModule } from '$domains/Authentication';
import { UserDomainModule } from '$domains/User';

import { OAuthService } from './oauth.service';

@Module({
  imports: [AuthenticationDomainModule, UserDomainModule],
  providers: [OAuthService],
  exports: [OAuthService],
})
export class OAuthModule {}
