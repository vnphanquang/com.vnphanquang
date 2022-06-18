import { Field, ObjectType } from '@nestjs/graphql';
import { AuthProvider } from '@prisma/client';
import type { AuthProvider as AuthProviderType } from '@prisma/client';

import { UserDto } from '$domains/user';

@ObjectType()
export class AuthenticationDto {
  @Field()
  id: string;

  @Field(() => AuthProvider)
  provider: AuthProviderType;

  @Field()
  providerId: string;

  @Field()
  createdAt: Date;

  @Field(() => UserDto)
  user: UserDto;
}
