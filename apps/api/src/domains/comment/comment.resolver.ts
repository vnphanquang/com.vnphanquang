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

import { PostDAO } from '$domains/post';
import { UserDAO } from '$domains/user';

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
  constructor(
    private readonly commentDAO: CommentDAO,
    private readonly postDAO: PostDAO,
    private readonly userDAO: UserDAO,
  ) {}

  @Mutation(() => CommentDTO)
  createComment(
    @Args('data') data: CreateCommentInput,
    @Args('authorId') authorId: number,
    @Args('postId') postId: number,
  ) {
    return this.commentDAO.create({ authorId, data, postId });
  }

  @Mutation(() => CommentDTO, { nullable: true })
  updateComment(@Args('id') id: number, @Args('data') data: UpdateCommentInput) {
    return this.commentDAO.update(id, data);
  }

  @Mutation(() => CommentDTO, { nullable: true })
  deleteComment(@Args('id') id: number) {
    return this.commentDAO.delete(id);
  }

  @Query(() => [CommentDTO])
  comments() {
    return this.commentDAO.all();
  }

  @Query(() => CommentDTO, { nullable: true })
  commentById(@Args('id') id: number) {
    return this.commentDAO.byId(id);
  }

  @ResolveField()
  post(@Root() comment: CommentDTO) {
    return this.postDAO.byCommentId(comment.id);
  }

  @ResolveField()
  author(@Root() comment: CommentDTO) {
    return this.userDAO.byCommentId(comment.id);
  }
}
