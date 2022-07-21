import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PostCategory, PostTag } from '@prisma/client';

import { CommentDto } from '$domains/Comment';
import { PostLocaleDto } from '$domains/PostLocale';

@ObjectType({
  description: 'Blog post',
})
export class PostDto {
  @Field(() => Int)
  id: number;

  @Field()
  slug: string;

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

  @Field(() => PostLocaleDto, { nullable: true })
  locale: PostLocaleDto;
}
