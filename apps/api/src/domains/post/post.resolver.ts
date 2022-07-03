import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Role, User } from '@prisma/client';

import { CommentDao } from '$domains/comment';
import { PostDao } from '$domains/post/post.dao';
import { PostDto } from '$domains/post/post.dto';
import { GraphQlAuthGuard, GraphQlCurrentUser } from '$services/authentication/graphql';
import { Roles } from '$services/authorization';

import { CreatePostInput, UpdatePostInput } from './post.inputs';

@Resolver(() => PostDto)
export class PostResolver {
  constructor(private readonly postDao: PostDao, private readonly commentDao: CommentDao) {}

  @ResolveField()
  comments(@Root() post: PostDto) {
    return this.commentDao.byPost(post.id);
  }

  @Query(() => [PostDto])
  posts(@GraphQlCurrentUser() user?: User) {
    if (user?.role === 'admin') {
      return this.postDao.all();
    } else {
      return this.postDao.onlyPublished();
    }
  }

  @Roles(Role.admin)
  @UseGuards(GraphQlAuthGuard)
  @Mutation(() => PostDto, { nullable: true })
  createPost(@Args('input') input: CreatePostInput) {
    return this.postDao.create(input);
  }

  @Roles(Role.admin)
  @UseGuards(GraphQlAuthGuard)
  @Mutation(() => PostDto, { nullable: true })
  updatePost(@Args('id') id: number, @Args('input') input: UpdatePostInput) {
    return this.postDao.update(id, input);
  }

  @Roles(Role.admin)
  @UseGuards(GraphQlAuthGuard)
  @Mutation(() => PostDto, { nullable: true })
  deletePost(@Args('id') id: number) {
    return this.postDao.delete(id);
  }

  @Roles(Role.admin)
  @UseGuards(GraphQlAuthGuard)
  @Mutation(() => PostDto, { nullable: true })
  setPostPublication(@Args('id') id: number, @Args('published') published: boolean) {
    return this.postDao.update(id, { published });
  }

  @Query(() => PostDto, { nullable: true })
  postById(@Args('id') id: number) {
    return this.postDao.byId(id);
  }
}
