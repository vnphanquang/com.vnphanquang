import { ObjectType, Field, Int } from '@nestjs/graphql';

import { PostDto } from '$domains/post';
import { UserDto } from '$domains/user';

@ObjectType({
  description: 'Comment for blog post',
})
export class CommentDto {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field()
  createdAt: Date;
  @Field({ nullable: true })
  updatedAt?: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
  @Field()
  deleted: boolean;

  @Field(() => UserDto)
  author: UserDto;

  @Field(() => PostDto)
  post: PostDto;
}
