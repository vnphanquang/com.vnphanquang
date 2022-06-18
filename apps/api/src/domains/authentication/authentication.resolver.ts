import { Query, ResolveField, Resolver, Root } from '@nestjs/graphql';

import { UserDao } from '$domains/user';

import { AuthenticationDao } from './authentication.dao';
import { AuthenticationDto } from './authentication.dto';

@Resolver(() => AuthenticationDto)
export class AuthenticationResolver {
  constructor(
    private readonly authenticationDao: AuthenticationDao,
    private readonly userDao: UserDao,
  ) {}

  @ResolveField()
  user(@Root() authentication: AuthenticationDto) {
    return this.userDao.byAuthenticationId(authentication.id);
  }

  @Query(() => [AuthenticationDto])
  authentications() {
    return this.authenticationDao.all();
  }
}
