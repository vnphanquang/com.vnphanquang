import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthenticationService } from './authentication.service';

@Controller('oauth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    /*  */
  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authenticationService.loginWithGoogle(req);
  }
}
