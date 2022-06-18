import { ResolveField, Resolver, Root, Query, Args, Mutation } from '@nestjs/graphql';

import { UserDAO } from './user.dao';
import { UserDTO } from './user.dto';

@Resolver(() => UserDTO)
export class UserResolver {
  constructor(private readonly userDAO: UserDAO) {}

  @ResolveField()
  comments(@Root() user: UserDTO) {
    return this.userDAO.findUnique({ id: user.id }).comments();
  }

  @Query(() => [UserDTO])
  users() {
    return this.userDAO.findMany({});
  }

  @Mutation(() => UserDTO, { nullable: true })
  deleteUser(@Args('id') id: number) {
    return this.userDAO.delete({ id });
  }

  @Query(() => UserDTO, { nullable: true })
  userById(@Args('id') id: number) {
    return this.userDAO.findUnique({ id });
  }
}
