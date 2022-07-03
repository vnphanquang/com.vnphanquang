import { Field, InputType } from '@nestjs/graphql';
import { Locale } from '@prisma/client';

@InputType()
export class CreatePostLocaleInput {
  @Field()
  title: string;
  @Field()
  summary: string;
  @Field()
  slug: string;
  @Field()
  locale: Locale;

  @Field(() => Boolean, { nullable: true })
  published: boolean;
}

@InputType()
export class UpdatePostLocaleInput {
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  summary?: string;
  @Field({ nullable: true })
  slug?: string;
  @Field({ nullable: true })
  locale?: Locale;

  @Field(() => Boolean, { nullable: true })
  published?: boolean;
}
