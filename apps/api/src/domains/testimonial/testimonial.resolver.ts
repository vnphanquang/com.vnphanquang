import { UseGuards } from '@nestjs/common';
import { ResolveField, Resolver, Root, Query, Args, Mutation } from '@nestjs/graphql';
import { Role } from '@prisma/client';

import { GraphQlAuthGuard } from '$services/authentication/graphql';
import { Roles } from '$services/authorization';

import { TestimonialDao } from './testimonial.dao';
import { TestimonialCoordinateDto, TestimonialDto } from './testimonial.dto';
import { CreateTestimonialInput, UpdateTestimonialInput } from './testimonial.inputs';

@Resolver(() => TestimonialDto)
export class TestimonialResolver {
  constructor(private readonly testimonialDao: TestimonialDao) {}

  @ResolveField(() => TestimonialCoordinateDto)
  coordinate(@Root() testimonial: TestimonialDto) {
    const { x, y } = testimonial;
    return { x, y };
  }

  @Query(() => [TestimonialDto])
  testimonials() {
    return this.testimonialDao.all();
  }

  @Query(() => TestimonialDto)
  testimonialById(@Args('id') id: number) {
    return this.testimonialDao.byId(id);
  }

  @Roles(Role.admin)
  @UseGuards(GraphQlAuthGuard)
  @Mutation(() => TestimonialDto)
  createTestimonial(@Args('input') input: CreateTestimonialInput) {
    return this.testimonialDao.create(input);
  }

  @Roles(Role.admin)
  @UseGuards(GraphQlAuthGuard)
  @Mutation(() => TestimonialDto, { nullable: true })
  updateTestimonial(@Args('id') id: number, @Args('input') input: UpdateTestimonialInput) {
    return this.testimonialDao.update(id, input);
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
    return this.testimonialDao.update(id, { published });
  }
}
