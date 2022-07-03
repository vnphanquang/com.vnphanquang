import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTestimonialInput {
  @Field()
  quote: string;
  @Field()
  author: string;
  @Field()
  title: string;
  @Field()
  ref: string;
  @Field()
  avatarUrl: string;
  @Field(() => Boolean, { nullable: true })
  published?: boolean;
  @Field()
  x: string;
  @Field()
  y: string;
}

@InputType()
export class UpdateTestimonialInput {
  @Field({ nullable: true })
  quote?: string;
  @Field({ nullable: true })
  author?: string;
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  ref?: string;
  @Field({ nullable: true })
  avatarUrl?: string;
  @Field(() => Boolean, { nullable: true })
  published?: boolean;
  @Field({ nullable: true })
  x?: string;
  @Field({ nullable: true })
  y?: string;
}
