import { UseGuards } from '@nestjs/common';
import { ResolveField, Resolver, Root, Query, Args, Mutation } from '@nestjs/graphql';
import { Role, User } from '@prisma/client';

import { AuthenticationDto } from '$domains/authentication';
import { AuthenticationDao } from '$domains/authentication/authentication.dao';
import { CommentDao, CommentDto } from '$domains/comment';
import { UserDao } from '$domains/user/user.dao';
import { UserDto } from '$domains/user/user.dto';
import { GraphQlAuthGuard, GraphQlCurrentUser } from '$services/authentication/strategy/graphql';
import { authenticated, ResourceOwnerGuard, roles } from '$services/authorization';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(
    private readonly userDao: UserDao,
    private readonly authenticationDao: AuthenticationDao,
    private readonly commentDao: CommentDao,
  ) {}

  @ResolveField(() => [CommentDto])
  comments(@Root() user: UserDto) {
    return this.commentDao.byUser(user.id);
  }

  @ResolveField(() => [AuthenticationDto], {
    middleware: [authenticated, roles(Role.admin)],
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
