import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import type { Role as RoleType } from '@prisma/client';

import { AuthenticationDto } from '$domains/authentication';
import { CommentDto } from '$domains/comment';

@ObjectType()
export class UserDto {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => Role)
  role: RoleType;

  @Field()
  email?: string;

  @Field()
  createdAt: Date;
  @Field({ nullable: true })
  updatedAt: Date | null;
  @Field({ nullable: true })
  deletedAt: Date | null;

  @Field(() => [CommentDto])
  comments: CommentDto[];

  @Field(() => [AuthenticationDto])
  authentications: AuthenticationDto[];
}
