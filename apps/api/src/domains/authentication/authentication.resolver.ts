import { UseGuards } from '@nestjs/common';
import { Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Role } from '@prisma/client';

import { UserDao } from '$domains/user';
import { GraphQlAuthGuard } from '$services/authentication/graphql';
import { Roles, RolesGuard } from '$services/authorization';

import { AuthenticationDao } from './authentication.dao';
import { AuthenticationDto } from './authentication.dto';

@Resolver(() => AuthenticationDto)
export class AuthenticationResolver {
  constructor(
    private readonly authenticationDao: AuthenticationDao,
    private readonly userDao: UserDao,
  ) {}

  @ResolveField()
  @UseGuards(GraphQlAuthGuard)
  user(@Root() authentication: AuthenticationDto) {
    return this.userDao.byAuthenticationId(authentication.id);
  }

  @Roles(Role.admin)
  @Query(() => [AuthenticationDto])
  @UseGuards(GraphQlAuthGuard, RolesGuard)
  authentications() {
    return this.authenticationDao.all();
  }
}
