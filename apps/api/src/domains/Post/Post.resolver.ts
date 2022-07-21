import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Locale, Role } from '@prisma/client';

import { CommentDao } from '$domains/Comment';
import { PostDao } from '$domains/Post/Post.dao';
import { PostDto } from '$domains/Post/Post.dto';
import { PostLocaleDao } from '$domains/PostLocale';
import { GraphQlAuthGuard } from '$services/authentication/graphql';
import { Roles } from '$services/authorization';

import { CreatePostInput, UpdatePostInput } from './Post.inputs';

@Resolver(() => PostDto)
export class PostResolver {
  constructor(
    private readonly postDao: PostDao,
    private readonly commentDao: CommentDao,
    private readonly postLocaleDao: PostLocaleDao,
  ) {}

  @ResolveField()
  comments(@Root() post: PostDto) {
    return this.commentDao.byPostId(post.id);
  }

  @ResolveField()
  deleted(@Root() post: PostDto) {
    return !!post.deletedAt;
  }

  @ResolveField()
  locale(
    @Root() post: PostDto,
    @Args({
      name: 'locale',
      type: () => Locale,
      defaultValue: Locale.en,
    })
    locale: Locale,
  ) {
    return this.postLocaleDao.byPostId(post.id, locale);
  }

  @Query(() => [PostDto])
  posts() {
    return this.postDao.all();
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
  updatePost(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdatePostInput) {
    return this.postDao.update(id, input);
  }

  @Roles(Role.admin)
  @UseGuards(GraphQlAuthGuard)
  @Mutation(() => PostDto, { nullable: true })
  deletePost(@Args('id', { type: () => Int }) id: number) {
    return this.postDao.delete(id);
  }

  @Query(() => PostDto, { nullable: true })
  postById(@Args('id', { type: () => Int }) id: number) {
    return this.postDao.byId(id);
  }

  @Query(() => PostDto, { nullable: true })
  postBySlug(@Args('slug') slug: string) {
    return this.postDao.bySlug(slug);
  }
}
