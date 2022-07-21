import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Locale } from '@prisma/client';

import { PostDto } from '$domains/Post';

@ObjectType({
  description: 'Blog post locale (site)',
})
export class PostLocaleDto {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;
  @Field()
  summary: string;
  @Field(() => Locale)
  locale: Locale;

  @Field(() => Boolean)
  published: boolean;
  @Field({ nullable: true })
  publishedAt?: Date;

  @Field()
  createdAt: Date;
  @Field({ nullable: true })
  updatedAt?: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
  @Field()
  deleted: boolean;

  @Field(() => PostDto)
  post: PostDto;
}
