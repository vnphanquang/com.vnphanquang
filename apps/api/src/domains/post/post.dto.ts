import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PostCategory, PostTag } from '@prisma/client';

import { CommentDto } from '$domains/comment';
import { PostLocaleDto } from '$domains/postLocale';

@ObjectType({
  description: 'Blog post',
})
export class PostDto {
  @Field(() => Int)
  id: number;

  @Field(() => PostCategory)
  category: PostCategory;

  @Field(() => [PostTag])
  tags: PostTag[];

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

  @Field(() => [PostLocaleDto])
  locales: PostLocaleDto[];
}
