import { ResolveField, Resolver, Root, Query, Mutation, Args } from '@nestjs/graphql';
import { Locale, User } from '@prisma/client';

import { PostDao } from '$domains/Post';
import { GraphQlCurrentUser } from '$services/authentication/graphql';

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

  @Mutation(() => PostLocaleDto)
  createPostLocale(@Args('postId') postId: number, @Args('input') input: CreatePostLocaleInput) {
    const { published, ...others } = input;
    return this.postLocaleDao.create(postId, {
      ...others,
      publishedAt: published ? new Date() : null,
    });
  }

  @Mutation(() => PostLocaleDto)
  updatePostLocale(@Args('id') id: number, @Args('input') input: UpdatePostLocaleInput) {
    const { published, ...others } = input;
    return this.postLocaleDao.update(id, {
      ...others,
      publishedAt: published ? new Date() : null,
    });
  }

  @Mutation(() => PostLocaleDto)
  setPostLocalePublication(@Args('id') id: number, @Args('published') published: boolean) {
    return this.postLocaleDao.update(id, {
      publishedAt: published ? new Date() : null,
    });
  }

  @Mutation(() => PostLocaleDto)
  deletePostLocale(@Args('id') id: number) {
    return this.postLocaleDao.delete(id);
  }
}
