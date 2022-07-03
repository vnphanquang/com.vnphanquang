import { Field, ObjectType } from '@nestjs/graphql';
import { AuthProvider } from '@prisma/client';

import { UserDto } from '$domains/User';

@ObjectType({
  description: 'User authentication provider record',
})
export class AuthenticationDto {
  @Field()
  id: string;

  @Field(() => AuthProvider)
  provider: AuthProvider;

  @Field()
  providerId: string;

  @Field()
  createdAt: Date;

  @Field(() => UserDto)
  user: UserDto;
}
