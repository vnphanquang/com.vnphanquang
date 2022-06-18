import { ObjectType, Field, Int } from '@nestjs/graphql';

import { CommentDTO } from '$modules/comment/comment.dto';

@ObjectType()
export class PostDTO {
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

  @Field(() => [CommentDTO])
  comments: CommentDTO[];
}
