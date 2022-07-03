import { Field, Int, ObjectType, HideField } from '@nestjs/graphql';

@ObjectType({
  description: 'Display coordinate of testimonial in 2D plane (pixel or percentage)',
})
export class TestimonialCoordinateDto {
  @Field()
  x: string;
  @Field()
  y: string;
}

@ObjectType({
  description: 'Testimonial',
})
export class TestimonialDto {
  @Field(() => Int)
  id: number;

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

  @HideField()
  x: string;

  @HideField()
  y: string;

  @Field(() => Boolean)
  published: boolean;

  @Field(() => TestimonialCoordinateDto)
  coordinate: TestimonialCoordinateDto;

  @Field()
  createdAt: Date;
  @Field({ nullable: true })
  updatedAt?: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
  @Field()
  deleted: boolean;
}
