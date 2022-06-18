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

import { CommentDao } from '$domains/comment/comment.dao';
import { CommentDto } from '$domains/comment/comment.dto';
import { PostDao } from '$domains/post';
import { UserDao } from '$domains/user';

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

@Resolver(() => CommentDto)
export class CommentResolver {
  constructor(
    private readonly commentDao: CommentDao,
    private readonly postDao: PostDao,
    private readonly userDao: UserDao,
  ) {}

  @Mutation(() => CommentDto)
  createComment(
    @Args('data') data: CreateCommentInput,
    @Args('authorId') authorId: number,
    @Args('postId') postId: number,
  ) {
    return this.commentDao.create({ authorId, data, postId });
  }

  @Mutation(() => CommentDto, { nullable: true })
  updateComment(@Args('id') id: number, @Args('data') data: UpdateCommentInput) {
    return this.commentDao.update(id, data);
  }

  @Mutation(() => CommentDto, { nullable: true })
  deleteComment(@Args('id') id: number) {
    return this.commentDao.delete(id);
  }

  @Query(() => [CommentDto])
  comments() {
    return this.commentDao.all();
  }

  @Query(() => CommentDto, { nullable: true })
  commentById(@Args('id') id: number) {
    return this.commentDao.byId(id);
  }

  @ResolveField()
  post(@Root() comment: CommentDto) {
    return this.postDao.byCommentId(comment.id);
  }

  @ResolveField()
  author(@Root() comment: CommentDto) {
    return this.userDao.byCommentId(comment.id);
  }
}
