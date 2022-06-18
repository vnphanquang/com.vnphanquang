import { ObjectType, Field, Int } from '@nestjs/graphql';

import { CommentDto } from '$domains/comment';

@ObjectType()
export class PostDto {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => Boolean)
  published: boolean;

  @Field()
  createdAt: Date;
  @Field({ nullable: true })
  updatedAt: Date | null;
  @Field({ nullable: true })
  deletedAt: Date | null;

  @Field(() => [CommentDto])
  comments: CommentDto[];
}
