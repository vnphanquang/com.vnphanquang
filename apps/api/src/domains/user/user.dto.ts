import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AuthProvider, Role } from '@prisma/client';

import { AuthenticationDto } from '$domains/authentication';
import { CommentDto } from '$domains/comment';
import { authenticated } from '$services/authorization';

@ObjectType()
export class UserDto {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => Role)
  role: Role;

  @Field({
    middleware: [authenticated],
    nullable: true,
  })
  email?: string;

  @Field()
  createdAt: Date;
  @Field({ nullable: true })
  updatedAt?: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
  @Field()
  deleted: boolean;

  @Field(() => [CommentDto])
  comments: CommentDto[];

  @Field(() => [AuthenticationDto], {
    nullable: true,
  })
  authentications: AuthenticationDto[];

  @Field(() => AuthProvider)
  lastConnectedAuthenticationProvider: AuthProvider;
}
