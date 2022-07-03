import { UseGuards } from '@nestjs/common';
import { ResolveField, Resolver, Root, Query, Args, Mutation } from '@nestjs/graphql';
import { AuthProvider, User } from '@prisma/client';

import { AuthenticationDao } from '$domains/Authentication/Authentication.dao';
import { AuthenticationDto } from '$domains/Authentication/Authentication.dto';
import { CommentDao, CommentDto } from '$domains/Comment';
import { UserDao } from '$domains/User/User.dao';
import { UserDto } from '$domains/User/User.dto';
import { GraphQlAuthGuard, GraphQlCurrentUser } from '$services/authentication/graphql';
import { authenticated, ResourceOwnerGuard } from '$services/authorization';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(
    private readonly userDao: UserDao,
    private readonly authenticationDao: AuthenticationDao,
    private readonly commentDao: CommentDao,
  ) {}

  @ResolveField(() => [CommentDto])
  comments(@Root() user: UserDto) {
    return this.commentDao.byUserId(user.id);
  }

  @ResolveField()
  deleted(@Root() user: UserDto) {
    return !!user.deletedAt;
  }

  @ResolveField(() => AuthProvider)
  async lastConnectedAuthenticationProvider(@Root() user: UserDto) {
    return (await this.authenticationDao.lastConnectedAuthenticationByUser(user.id))?.provider;
  }

  @ResolveField(() => [AuthenticationDto], {
    middleware: [authenticated],
  })
  authentications(@Root() user: UserDto) {
    return this.authenticationDao.byUser(user.id);
  }

  @Query(() => [UserDto])
  users() {
    return this.userDao.all();
  }

  @Mutation(() => UserDto, { nullable: true })
  @UseGuards(GraphQlAuthGuard, ResourceOwnerGuard())
  deleteUser(@Args('id') id: number) {
    return this.userDao.delete(id);
  }

  @Query(() => UserDto, { nullable: true })
  userById(@Args('id') id: number) {
    return this.userDao.byId(id);
  }

  @Query(() => UserDto)
  @UseGuards(GraphQlAuthGuard)
  me(@GraphQlCurrentUser() user: User) {
    return this.userDao.byId(user.id);
  }
}
