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
  updatedAt: Date | null;
  @Field({ nullable: true })
  deletedAt: Date | null;

  @Field(() => UserDto)
  author: UserDto;

  @Field(() => PostDto)
  post: PostDto;
}
