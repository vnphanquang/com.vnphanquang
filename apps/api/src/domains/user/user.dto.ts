import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from '@prisma/client';

import { CommentDTO } from '$domains/comment';

@ObjectType()
export class UserDTO {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Role)
  role: boolean;

  @Field()
  createdAt: Date;
  @Field({ nullable: true })
  updatedAt: Date | null;
  @Field({ nullable: true })
  deletedAt: Date | null;

  @Field(() => [CommentDTO])
  comments: [CommentDTO];
}
