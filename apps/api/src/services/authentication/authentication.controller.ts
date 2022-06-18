import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ConfigService } from '$config/index';

import { AuthenticationService } from './authentication.service';

@Controller('oauth')
export class AuthenticationController {
  constructor(
    private readonly config: ConfigService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    /*  */
  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    const { accessToken } = this.authenticationService.jwt(req.user);
    const { name, ...options } = this.config.get().cookies.session;
    res.cookie(name, accessToken, {
      ...options,
      path: '/',
    });

    res.redirect(302, this.config.get().urls.web);
  }
}
