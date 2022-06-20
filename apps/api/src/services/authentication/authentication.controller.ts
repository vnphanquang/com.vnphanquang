import { Controller, Get, HttpStatus, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthProvider } from '@prisma/client';

import { ConfigService } from '$config/index';

import { DiscordOAuthGuard } from './strategy/discord';
import { FacebookOAuthGuard } from './strategy/facebook';
import { GithubOAuthGuard } from './strategy/github';
import { GoogleOAuthGuard } from './strategy/google';
import { JwtAuthService } from './strategy/jwt';
import { SpotifyOAuthGuard } from './strategy/spotify';

@Controller('oauth')
export class AuthenticationController {
  private redirectUrl: string;
  constructor(private readonly config: ConfigService, private readonly jwtService: JwtAuthService) {
    this.redirectUrl = this.config.get().urls.web;
  }

  private login(req, res) {
    const { accessToken } = this.jwtService.sign(req.user);
    const { name, ...options } = this.config.get().cookies.session;
    res.cookie(name, accessToken, {
      ...options,
      path: '/',
    });
    const redirectUrl = this.redirectUrl;
    this.redirectUrl = this.config.get().urls.web;
    res.redirect(302, redirectUrl);
  }

  @Get('/')
  oauth(
    @Query('redirectUrl') redirectUrl: string,
    @Query('provider') provider: AuthProvider = AuthProvider.google,
    @Res() res,
  ) {
    this.redirectUrl = redirectUrl;
    res.redirect(302, `/oauth/${provider}`);
  }

  @Get('/google')
  @UseGuards(GoogleOAuthGuard)
  async google() {
    return HttpStatus.OK;
  }

  @Get('/google/redirect')
  @UseGuards(GoogleOAuthGuard)
  googleRedirect(@Req() req, @Res() res) {
    this.login(req, res);
  }

  @Get('/facebook')
  @UseGuards(FacebookOAuthGuard)
  async facebook() {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(FacebookOAuthGuard)
  async facebookRedirect(@Req() req, @Res() res) {
    this.login(req, res);
  }

  @Get('/github')
  @UseGuards(GithubOAuthGuard)
  async github() {
    return HttpStatus.OK;
  }

  @Get('/github/redirect')
  @UseGuards(GithubOAuthGuard)
  async githubRedirect(@Req() req, @Res() res) {
    this.login(req, res);
  }

  @Get('/discord')
  @UseGuards(DiscordOAuthGuard)
  async discord(@Res() res) {
    res.redirect(302, this.config.get().oauth.discord.generatedURL);
  }

  @Get('/discord/redirect')
  @UseGuards(DiscordOAuthGuard)
  async discordRedirect(@Req() req, @Res() res) {
    this.login(req, res);
  }

  @Get('/spotify')
  @UseGuards(SpotifyOAuthGuard)
  async spotify() {
    return HttpStatus.OK;
  }

  @Get('/spotify/redirect')
  @UseGuards(SpotifyOAuthGuard)
  async spotifyRedirect(@Req() req, @Res() res) {
    this.login(req, res);
  }
}
