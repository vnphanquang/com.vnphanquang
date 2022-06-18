import { ResolveField, Resolver, Root, Query, Args, Mutation } from '@nestjs/graphql';

import { AuthenticationDao } from '$domains/authentication/authentication.dao';
import { CommentDao } from '$domains/comment';
import { UserDao } from '$domains/user/user.dao';
import { UserDto } from '$domains/user/user.dto';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(
    private readonly userDao: UserDao,
    private readonly authenticationDao: AuthenticationDao,
    private readonly commentDao: CommentDao,
  ) {}

  @ResolveField()
  comments(@Root() user: UserDto) {
    return this.commentDao.byUser(user.id);
  }

  @ResolveField()
  authentications(@Root() user: UserDto) {
    return this.authenticationDao.byUser(user.id);
  }

  @Query(() => [UserDto])
  users() {
    return this.userDao.all();
  }

  @Mutation(() => UserDto, { nullable: true })
  deleteUser(@Args('id') id: number) {
    return this.userDao.delete(id);
  }

  @Query(() => UserDto, { nullable: true })
  userById(@Args('id') id: number) {
    return this.userDao.byId(id);
  }
}
