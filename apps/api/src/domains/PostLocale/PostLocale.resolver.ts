import { UseGuards } from '@nestjs/common';
import { ResolveField, Resolver, Root, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Locale, Role, User } from '@prisma/client';

import { PostDao } from '$domains/Post';
import { GraphQlAuthGuard, GraphQlCurrentUser } from '$services/authentication/graphql';
import { Roles } from '$services/authorization';

import { PostLocaleDao } from './PostLocale.dao';
import { PostLocaleDto } from './PostLocale.dto';
import { CreatePostLocaleInput, UpdatePostLocaleInput } from './PostLocale.inputs';

@Resolver(() => PostLocaleDto)
export class PostLocaleResolver {
  constructor(private readonly postDao: PostDao, private readonly postLocaleDao: PostLocaleDao) {}

  @ResolveField()
  post(@Root() postLocale: PostLocaleDto) {
    return this.postDao.byPostLocaleId(postLocale.id);
  }

  @ResolveField()
  published(@Root() postLocale: PostLocaleDto) {
    return !!postLocale.publishedAt;
  }

  @ResolveField()
  deleted(@Root() postLocale: PostLocaleDto) {
    return !!postLocale.deletedAt;
  }

  @Query(() => PostLocaleDto, { nullable: true })
  postLocaleBySlug(@Args('slug') slug: string) {
    return this.postLocaleDao.bySlug(slug);
  }

  @Query(() => [PostLocaleDto])
  postLocales(
    @GraphQlCurrentUser() user?: User,
    @Args({
      name: 'locale',
      type: () => Locale,
      nullable: true,
    })
    locale?: Locale,
  ) {
    if (user?.role === 'admin') {
      return this.postLocaleDao.all(locale);
    } else {
      return this.postLocaleDao.getPublished(locale);
    }
  }

  @Roles(Role.admin)
  @UseGuards(GraphQlAuthGuard)
  @Mutation(() => PostLocaleDto)
  createPostLocale(
    @Args('postId', { type: () => Int }) postId: number,
    @Args('input') input: CreatePostLocaleInput,
  ) {
    const { published, ...others } = input;
    return this.postLocaleDao.create(postId, {
      ...others,
      publishedAt: published ? new Date() : null,
    });
  }

  @Mutation(() => PostLocaleDto)
  @Roles(Role.admin)
  @UseGuards(GraphQlAuthGuard)
  updatePostLocale(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdatePostLocaleInput,
  ) {
    const { published, ...others } = input;
    return this.postLocaleDao.update(id, {
      ...others,
      publishedAt: published ? new Date() : null,
    });
  }

  @Mutation(() => PostLocaleDto)
  @Roles(Role.admin)
  @UseGuards(GraphQlAuthGuard)
  setPostLocalePublication(
    @Args('id', { type: () => Int }) id: number,
    @Args('published') published: boolean,
  ) {
    return this.postLocaleDao.update(id, {
      publishedAt: published ? new Date() : null,
    });
  }

  @Mutation(() => PostLocaleDto)
  @Roles(Role.admin)
  @UseGuards(GraphQlAuthGuard)
  deletePostLocale(@Args('id', { type: () => Int }) id: number) {
    return this.postLocaleDao.delete(id);
  }
}
