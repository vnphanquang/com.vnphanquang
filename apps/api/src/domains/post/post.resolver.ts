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

import { CommentDao } from '$domains/comment';
import { PostDao } from '$domains/post/post.dao';
import { PostDto } from '$domains/post/post.dto';

@InputType()
class UpdatePostInput {
  @Field({ nullable: true })
  title?: string;
}

@Resolver(() => PostDto)
export class PostResolver {
  constructor(private readonly postDao: PostDao, private readonly commentDao: CommentDao) {}

  @ResolveField()
  comments(@Root() post: PostDto) {
    return this.commentDao.byPost(post.id);
  }

  @Query(() => [PostDto])
  posts() {
    return this.postDao.all();
  }

  @Mutation(() => PostDto, { nullable: true })
  updatePost(@Args('id') id: number, @Args('data') data: UpdatePostInput) {
    return this.postDao.update(id, data);
  }

  @Mutation(() => PostDto, { nullable: true })
  setPostPublication(@Args('id') id: number, @Args('published') published: boolean) {
    return this.postDao.update(id, { published });
  }

  @Query(() => PostDto, { nullable: true })
  postById(@Args('id') id: number) {
    return this.postDao.byId(id);
  }
}
