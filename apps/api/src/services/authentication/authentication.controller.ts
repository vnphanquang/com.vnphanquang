import { Controller, Get, HttpStatus, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthProvider } from '@prisma/client';

import { AppRoutes, ConfigService } from '$config/index';

import { DiscordOAuthGuard } from './strategy/discord';
import { FacebookOAuthGuard } from './strategy/facebook';
import { GithubOAuthGuard } from './strategy/github';
import { GoogleOAuthGuard } from './strategy/google';
import { JwtAuthService } from './strategy/jwt';
import { SpotifyOAuthGuard } from './strategy/spotify';

@Controller(AppRoutes.oauth.$key())
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

  @Get('')
  oauth(
    @Query('redirectUrl') redirectUrl: string,
    @Query('provider') provider: AuthProvider = AuthProvider.google,
    @Res() res,
  ) {
    this.redirectUrl = redirectUrl;
    res.redirect(302, `${AppRoutes.oauth.$path({ separator: '/' })}/${provider}`);
  }

  @Get(AppRoutes.oauth.google.$key())
  @UseGuards(GoogleOAuthGuard)
  async google() {
    return HttpStatus.OK;
  }

  @Get(AppRoutes.oauth.google.redirect.$path({ depth: 1, separator: '/' }))
  @UseGuards(GoogleOAuthGuard)
  googleRedirect(@Req() req, @Res() res) {
    this.login(req, res);
  }

  @Get(AppRoutes.oauth.facebook.$key())
  @UseGuards(FacebookOAuthGuard)
  async facebook() {
    return HttpStatus.OK;
  }

  @Get(AppRoutes.oauth.facebook.redirect.$path({ depth: 1, separator: '/' }))
  @UseGuards(FacebookOAuthGuard)
  async facebookRedirect(@Req() req, @Res() res) {
    this.login(req, res);
  }

  @Get(AppRoutes.oauth.github.$key())
  @UseGuards(GithubOAuthGuard)
  async github() {
    return HttpStatus.OK;
  }

  @Get(AppRoutes.oauth.github.redirect.$path({ depth: 1, separator: '/' }))
  @UseGuards(GithubOAuthGuard)
  async githubRedirect(@Req() req, @Res() res) {
    this.login(req, res);
  }

  @Get(AppRoutes.oauth.discord.$key())
  @UseGuards(DiscordOAuthGuard)
  async discord(@Res() res) {
    res.redirect(302, this.config.get().oauth.discord.generatedURL);
  }

  @Get(AppRoutes.oauth.discord.redirect.$path({ depth: 1, separator: '/' }))
  @UseGuards(DiscordOAuthGuard)
  async discordRedirect(@Req() req, @Res() res) {
    this.login(req, res);
  }

  @Get(AppRoutes.oauth.spotify.$key())
  @UseGuards(SpotifyOAuthGuard)
  async spotify() {
    return HttpStatus.OK;
  }

  @Get(AppRoutes.oauth.spotify.redirect.$path({ depth: 1, separator: '/' }))
  @UseGuards(SpotifyOAuthGuard)
  async spotifyRedirect(@Req() req, @Res() res) {
    this.login(req, res);
  }
}
