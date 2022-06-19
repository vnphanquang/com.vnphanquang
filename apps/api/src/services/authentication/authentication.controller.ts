import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';

import { ConfigService } from '$config/index';

import { FacebookOAuthGuard } from './strategy/facebook';
import { GoogleOAuthGuard } from './strategy/google';
import { JwtAuthService } from './strategy/jwt';

@Controller('oauth')
export class AuthenticationController {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtAuthService,
  ) {}

  @Get('/google')
  @UseGuards(GoogleOAuthGuard)
  async google() {
    return HttpStatus.OK;
  }

  @Get('/google/redirect')
  @UseGuards(GoogleOAuthGuard)
  googleRedirect(@Req() req, @Res() res) {
    const { accessToken } = this.jwtService.sign(req.user);
    const { name, ...options } = this.config.get().cookies.session;
    res.cookie(name, accessToken, {
      ...options,
      path: '/',
    });

    res.redirect(302, this.config.get().urls.web);
  }

  @Get('/facebook')
  @UseGuards(FacebookOAuthGuard)
  async facebook() {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(FacebookOAuthGuard)
  async facebookRedirect(@Req() req, @Res() res) {
    const { accessToken } = this.jwtService.sign(req.user);
    const { name, ...options } = this.config.get().cookies.session;
    res.cookie(name, accessToken, {
      ...options,
      path: '/',
    });

    res.redirect(302, this.config.get().urls.web);
  }
}
