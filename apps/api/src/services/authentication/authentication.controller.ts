import { Controller, Get, HttpStatus, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthProvider } from '@prisma/client';
import { FastifyReply } from 'fastify';

import { AppRoutes, ConfigService } from '$config/index';

import { DiscordOAuthGuard } from './strategy/discord';
import { FacebookOAuthGuard } from './strategy/facebook';
import { GithubOAuthGuard } from './strategy/github';
import { GoogleOAuthGuard } from './strategy/google';
import { JwtAuthService } from './strategy/jwt';
import { SpotifyOAuthGuard } from './strategy/spotify';

@Controller(AppRoutes.auth.$key())
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
    return res.redirect(302, redirectUrl ?? this.redirectUrl);
  }

  @Get(AppRoutes.auth.logout.$key())
  async logout(@Query('redirectUrl') redirectUrl: string, @Res() res: FastifyReply) {
    const { name } = this.config.get().cookies.session;
    return res
      .clearCookie(name)
      .status(200)
      .redirect(302, redirectUrl ?? this.redirectUrl);
  }

  @Get(AppRoutes.auth.oauth.$key())
  oauth(
    @Query('redirectUrl') redirectUrl: string,
    @Query('provider') provider: AuthProvider = AuthProvider.google,
    @Res() res: FastifyReply,
  ) {
    this.redirectUrl = redirectUrl;
    res.redirect(302, `${AppRoutes.auth.oauth.$path({ separator: '/' })}/${provider}`);
  }

  @Get(AppRoutes.auth.oauth.google.$path({ depth: 1, separator: '/' }))
  @UseGuards(GoogleOAuthGuard)
  async google() {
    return HttpStatus.OK;
  }

  @Get(AppRoutes.auth.oauth.google.redirect.$path({ depth: 2, separator: '/' }))
  @UseGuards(GoogleOAuthGuard)
  googleRedirect(@Req() req, @Res() res) {
    this.login(req, res);
  }

  @Get(AppRoutes.auth.oauth.facebook.$path({ depth: 1, separator: '/' }))
  @UseGuards(FacebookOAuthGuard)
  async facebook() {
    return HttpStatus.OK;
  }

  @Get(AppRoutes.auth.oauth.facebook.redirect.$path({ depth: 2, separator: '/' }))
  @UseGuards(FacebookOAuthGuard)
  async facebookRedirect(@Req() req, @Res() res) {
    this.login(req, res);
  }

  @Get(AppRoutes.auth.oauth.github.$path({ depth: 1, separator: '/' }))
  @UseGuards(GithubOAuthGuard)
  async github() {
    return HttpStatus.OK;
  }

  @Get(AppRoutes.auth.oauth.github.redirect.$path({ depth: 2, separator: '/' }))
  @UseGuards(GithubOAuthGuard)
  async githubRedirect(@Req() req, @Res() res) {
    this.login(req, res);
  }

  @Get(AppRoutes.auth.oauth.discord.$path({ depth: 1, separator: '/' }))
  @UseGuards(DiscordOAuthGuard)
  async discord(@Res() res) {
    res.redirect(302, this.config.get().oauth.discord.generatedURL);
  }

  @Get(AppRoutes.auth.oauth.discord.redirect.$path({ depth: 2, separator: '/' }))
  @UseGuards(DiscordOAuthGuard)
  async discordRedirect(@Req() req, @Res() res) {
    this.login(req, res);
  }

  @Get(AppRoutes.auth.oauth.spotify.$path({ depth: 1, separator: '/' }))
  @UseGuards(SpotifyOAuthGuard)
  async spotify() {
    return HttpStatus.OK;
  }

  @Get(AppRoutes.auth.oauth.spotify.redirect.$path({ depth: 2, separator: '/' }))
  @UseGuards(SpotifyOAuthGuard)
  async spotifyRedirect(@Req() req, @Res() res) {
    this.login(req, res);
  }
}
