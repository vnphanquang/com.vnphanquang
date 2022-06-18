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

import { PostDAO } from './post.dao';
import { PostDTO } from './post.dto';

@InputType()
class UpdatePostInput {
  @Field({ nullable: true })
  title?: string;
}

@Resolver(() => PostDTO)
export class PostResolver {
  constructor(private readonly postDAO: PostDAO) {}

  @ResolveField()
  comments(@Root() post: PostDTO) {
    return this.postDAO.findUnique({ id: post.id }).comments();
  }

  @Query(() => [PostDTO])
  posts() {
    return this.postDAO.findMany({});
  }

  @Mutation(() => PostDTO, { nullable: true })
  updatePost(@Args('id') id: number, @Args('data') data: UpdatePostInput) {
    return this.postDAO.update({
      where: { id },
      data: data,
    });
  }

  @Mutation(() => PostDTO, { nullable: true })
  setPostPublication(@Args('id') id: number, @Args('published') published: boolean) {
    return this.postDAO.update({
      where: { id },
      data: {
        published,
      },
    });
  }

  @Query(() => PostDTO, { nullable: true })
  userById(@Args('id') id: number) {
    return this.postDAO.findUnique({ id });
  }
}
