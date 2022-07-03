import { ResolveField, Resolver, Root, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from '@prisma/client';

import { PostDao } from '$domains/post/post.dao';
import { GraphQlCurrentUser } from '$services/authentication/graphql';

import { PostLocaleDao } from './postLocale.dao';
import { PostLocaleDto } from './postLocale.dto';
import { CreatePostLocaleInput, UpdatePostLocaleInput } from './postLocale.inputs';

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
  postLocales(@GraphQlCurrentUser() user?: User) {
    if (user?.role === 'admin') {
      return this.postLocaleDao.all();
    } else {
      return this.postLocaleDao.getPublished();
    }
  }

  @Mutation(() => PostLocaleDto)
  createPostLocale(@Args('postId') postId: number, @Args('input') input: CreatePostLocaleInput) {
    this.postLocaleDao.create(postId, {
      ...input,
      publishedAt: input.published ? new Date() : null,
    });
  }

  @Mutation(() => PostLocaleDto)
  updatePostLocale(@Args('id') id: number, @Args('input') input: UpdatePostLocaleInput) {
    this.postLocaleDao.update(id, {
      ...input,
      publishedAt: input.published ? new Date() : null,
    });
  }

  @Mutation(() => PostLocaleDto)
  setPostLocalePublication(@Args('id') id: number, @Args('published') published: boolean) {
    this.postLocaleDao.update(id, {
      publishedAt: published ? new Date() : null,
    });
  }

  @Mutation(() => PostLocaleDto)
  deletePostLocale(@Args('id') id: number) {
    this.postLocaleDao.delete(id);
  }
}
