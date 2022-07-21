import { Field, InputType } from '@nestjs/graphql';
import { PostCategory, PostTag } from '@prisma/client';

@InputType()
export class CreatePostInput {
  @Field(() => PostCategory)
  category: PostCategory;

  @Field(() => [PostTag], { nullable: true })
  tags: PostTag[];

  @Field()
  slug: string;
}

@InputType()
export class UpdatePostInput {
  @Field(() => PostCategory, { nullable: true })
  category?: PostCategory;

  @Field(() => [PostTag], { nullable: true })
  tags?: PostTag[];

  @Field({ nullable: true })
  slug?: string;
}
