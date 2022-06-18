import {
  Args,
  Field,
  InputType,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';

import { CommentDAO } from './comment.dao';
import { CommentDTO } from './comment.dto';

@InputType()
class CreateCommentInput {
  @Field()
  content: string;
}

@InputType()
class UpdateCommentInput {
  @Field({ nullable: true })
  content?: string;
}

@Resolver(() => CommentDTO)
export class CommentResolver {
  constructor(private readonly commentDAO: CommentDAO) {}

  @Mutation(() => CommentDTO)
  createComment(
    @Args('data') data: CreateCommentInput,
    @Args('authorId') authorId: number,
    @Args('postId') postId: number,
  ) {
    return this.commentDAO.create({
      ...data,
      author: {
        connect: { id: authorId },
      },
      post: {
        connect: { id: postId },
      },
    });
  }

  @Mutation(() => CommentDTO, { nullable: true })
  updateComment(@Args('id') id: number, @Args('data') data: UpdateCommentInput) {
    return this.commentDAO.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  @Mutation(() => CommentDTO, { nullable: true })
  deleteComment(@Args('id') id: number) {
    return this.commentDAO.delete({ id });
  }

  @Query(() => [CommentDTO])
  comments() {
    return this.commentDAO.findMany({});
  }

  @Query(() => CommentDTO, { nullable: true })
  commentById(@Args('id') id: number) {
    return this.commentDAO.findUnique({ id });
  }

  @ResolveField()
  post(@Root() comment: CommentDTO) {
    return this.commentDAO.findUnique({ id: comment.id }).post();
  }

  @ResolveField()
  author(@Root() comment: CommentDTO) {
    return this.commentDAO.findUnique({ id: comment.id }).author();
  }
}
