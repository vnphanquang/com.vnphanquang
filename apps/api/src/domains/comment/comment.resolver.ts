import { UseGuards } from '@nestjs/common';
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
import { User } from '@prisma/client';

import { CommentDao } from '$domains/comment/comment.dao';
import { CommentDto } from '$domains/comment/comment.dto';
import { PostDao } from '$domains/post';
import { UserDao } from '$domains/user';
import { GraphQlAuthGuard, GraphQlCurrentUser } from '$services/authentication/strategy/graphql';
import { ResourceOwnerGuard } from '$services/authorization';

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
  @UseGuards(GraphQlAuthGuard)
  createComment(
    @GraphQlCurrentUser() user: User,
    @Args('data') data: CreateCommentInput,
    @Args('postId') postId: number,
  ) {
    return this.commentDao.create({ authorId: user.id, data, postId });
  }

  @Mutation(() => CommentDto, { nullable: true })
  @UseGuards(GraphQlAuthGuard, ResourceOwnerGuard({ resource: 'comment' }))
  updateComment(@Args('id') id: number, @Args('data') data: UpdateCommentInput) {
    return this.commentDao.update(id, data);
  }

  @Mutation(() => CommentDto, { nullable: true })
  @UseGuards(GraphQlAuthGuard, ResourceOwnerGuard({ resource: 'comment' }))
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
