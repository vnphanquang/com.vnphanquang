import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field(() => Boolean, { nullable: true })
  published: boolean;
}

@InputType()
export class UpdatePostInput {
  @Field({ nullable: true })
  title?: string;
}
