import { ObjectType, Field, Int } from '@nestjs/graphql';

import { PostDTO } from '$modules/post';
import { UserDTO } from '$modules/user';

@ObjectType()
export class CommentDTO {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field()
  createdAt: Date;
  @Field({ nullable: true })
  updatedAt: Date | null;
  @Field({ nullable: true })
  deletedAt: Date | null;

  @Field(() => UserDTO)
  author: UserDTO;

  @Field(() => PostDTO)
  post: PostDTO;
}
