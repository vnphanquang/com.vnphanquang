import { UseGuards } from '@nestjs/common';
import { ResolveField, Resolver, Root, Query, Args, Mutation } from '@nestjs/graphql';
import { Role, User } from '@prisma/client';

import { GraphQlAuthGuard, GraphQlCurrentUser } from '$services/authentication/graphql';
import { Roles } from '$services/authorization';

import { TestimonialDao } from './Testimonial.dao';
import { TestimonialCoordinateDto, TestimonialDto } from './Testimonial.dto';
import { CreateTestimonialInput, UpdateTestimonialInput } from './Testimonial.inputs';

@Resolver(() => TestimonialDto)
export class TestimonialResolver {
  constructor(private readonly testimonialDao: TestimonialDao) {}

  @ResolveField(() => TestimonialCoordinateDto)
  coordinate(@Root() testimonial: TestimonialDto) {
    const { x, y } = testimonial;
    return { x, y };
  }

  @ResolveField()
  deleted(@Root() testimonial: TestimonialDto) {
    return !!testimonial.deletedAt;
  }

  @ResolveField()
  published(@Root() testimonial: TestimonialDto) {
    return !!testimonial.publishedAt;
  }

  @Query(() => [TestimonialDto])
  testimonials(@GraphQlCurrentUser() user?: User) {
    if (user?.role === 'admin') {
      return this.testimonialDao.all();
    } else {
      return this.testimonialDao.onlyPublished();
    }
  }

  @Query(() => TestimonialDto)
  testimonialById(@Args('id') id: number) {
    return this.testimonialDao.byId(id);
  }

  @Roles(Role.admin)
  @UseGuards(GraphQlAuthGuard)
  @Mutation(() => TestimonialDto)
  createTestimonial(@Args('input') input: CreateTestimonialInput) {
    const { published, ...others } = input;
    return this.testimonialDao.create({
      ...others,
      publishedAt: published ? new Date() : null,
    });
  }

  @Roles(Role.admin)
  @UseGuards(GraphQlAuthGuard)
  @Mutation(() => TestimonialDto, { nullable: true })
  updateTestimonial(@Args('id') id: number, @Args('input') input: UpdateTestimonialInput) {
    const { published, ...others } = input;
    return this.testimonialDao.update(id, {
      ...others,
      publishedAt: published ? new Date() : null,
    });
  }

  @Roles(Role.admin)
  @UseGuards(GraphQlAuthGuard)
  @Mutation(() => TestimonialDto, { nullable: true })
  deleteTestimonial(@Args('id') id: number) {
    return this.testimonialDao.delete(id);
  }

  @Roles(Role.admin)
  @UseGuards(GraphQlAuthGuard)
  @Mutation(() => TestimonialDto, { nullable: true })
  setTestimonialPublication(@Args('id') id: number, @Args('published') published: boolean) {
    return this.testimonialDao.update(id, { publishedAt: published ? new Date() : null });
  }
}
