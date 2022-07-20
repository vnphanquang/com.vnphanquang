export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

/** Open authentication (OAuth) provider */
export enum AuthProvider {
  Discord = 'discord',
  Facebook = 'facebook',
  Github = 'github',
  Google = 'google',
  Spotify = 'spotify'
}

/** User authentication provider record */
export type AuthenticationDto = {
  __typename?: 'AuthenticationDto';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  provider: AuthProvider;
  providerId: Scalars['String'];
  user: UserDto;
};

/** Comment for blog post */
export type CommentDto = {
  __typename?: 'CommentDto';
  author: UserDto;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  post: PostDto;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CreateCommentInput = {
  content: Scalars['String'];
};

export type CreatePostInput = {
  category: PostCategory;
  tags?: InputMaybe<Array<PostTag>>;
};

export type CreatePostLocaleInput = {
  locale: Locale;
  published?: InputMaybe<Scalars['Boolean']>;
  slug: Scalars['String'];
  summary: Scalars['String'];
  title: Scalars['String'];
};

export type CreateTestimonialInput = {
  author: Scalars['String'];
  avatarUrl: Scalars['String'];
  published?: InputMaybe<Scalars['Boolean']>;
  quote: Scalars['String'];
  ref: Scalars['String'];
  title: Scalars['String'];
  x: Scalars['String'];
  y: Scalars['String'];
};

/** Locale */
export enum Locale {
  En = 'en',
  Vi = 'vi'
}

export type Mutation = {
  __typename?: 'Mutation';
  createComment: CommentDto;
  createPost?: Maybe<PostDto>;
  createPostLocale: PostLocaleDto;
  createTestimonial: TestimonialDto;
  deleteComment?: Maybe<CommentDto>;
  deletePost?: Maybe<PostDto>;
  deletePostLocale: PostLocaleDto;
  deleteTestimonial?: Maybe<TestimonialDto>;
  deleteUser?: Maybe<UserDto>;
  setPostLocalePublication: PostLocaleDto;
  setTestimonialPublication?: Maybe<TestimonialDto>;
  updateComment?: Maybe<CommentDto>;
  updatePost?: Maybe<PostDto>;
  updatePostLocale: PostLocaleDto;
  updateTestimonial?: Maybe<TestimonialDto>;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreatePostLocaleArgs = {
  input: CreatePostLocaleInput;
  postId: Scalars['Int'];
};


export type MutationCreateTestimonialArgs = {
  input: CreateTestimonialInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePostLocaleArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteTestimonialArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationSetPostLocalePublicationArgs = {
  id: Scalars['Int'];
  published: Scalars['Boolean'];
};


export type MutationSetTestimonialPublicationArgs = {
  id: Scalars['Int'];
  published: Scalars['Boolean'];
};


export type MutationUpdateCommentArgs = {
  data: UpdateCommentInput;
  id: Scalars['Int'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  input: UpdatePostInput;
};


export type MutationUpdatePostLocaleArgs = {
  id: Scalars['Int'];
  input: UpdatePostLocaleInput;
};


export type MutationUpdateTestimonialArgs = {
  id: Scalars['Int'];
  input: UpdateTestimonialInput;
};

/** Post category */
export enum PostCategory {
  Code = 'code',
  Life = 'life'
}

/** Blog post */
export type PostDto = {
  __typename?: 'PostDto';
  category: PostCategory;
  comments: Array<CommentDto>;
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  locale: PostLocaleDto;
  tags: Array<PostTag>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


/** Blog post */
export type PostDtoLocaleArgs = {
  locale?: InputMaybe<Locale>;
};

/** Blog post locale (site) */
export type PostLocaleDto = {
  __typename?: 'PostLocaleDto';
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  locale: Locale;
  post: PostDto;
  published: Scalars['Boolean'];
  publishedAt?: Maybe<Scalars['DateTime']>;
  slug: Scalars['String'];
  summary: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** Post tag */
export enum PostTag {
  Bicycle = 'bicycle',
  Typescript = 'typescript'
}

export type Query = {
  __typename?: 'Query';
  authentications: Array<AuthenticationDto>;
  commentById?: Maybe<CommentDto>;
  comments: Array<CommentDto>;
  me: UserDto;
  postById?: Maybe<PostDto>;
  postLocaleBySlug?: Maybe<PostLocaleDto>;
  postLocales: Array<PostLocaleDto>;
  posts: Array<PostDto>;
  testimonialById: TestimonialDto;
  testimonials: Array<TestimonialDto>;
  userById?: Maybe<UserDto>;
  users: Array<UserDto>;
};


export type QueryCommentByIdArgs = {
  id: Scalars['Int'];
};


export type QueryPostByIdArgs = {
  id: Scalars['Int'];
};


export type QueryPostLocaleBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryPostLocalesArgs = {
  locale?: InputMaybe<Locale>;
};


export type QueryTestimonialByIdArgs = {
  id: Scalars['Int'];
};


export type QueryUserByIdArgs = {
  id: Scalars['Int'];
};

/** User role */
export enum Role {
  Admin = 'admin',
  User = 'user'
}

/** Display coordinate of testimonial in 2D plane (pixel or percentage) */
export type TestimonialCoordinateDto = {
  __typename?: 'TestimonialCoordinateDto';
  x: Scalars['String'];
  y: Scalars['String'];
};

/** Testimonial */
export type TestimonialDto = {
  __typename?: 'TestimonialDto';
  author: Scalars['String'];
  avatarUrl: Scalars['String'];
  coordinate: TestimonialCoordinateDto;
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  published: Scalars['Boolean'];
  publishedAt?: Maybe<Scalars['DateTime']>;
  quote: Scalars['String'];
  ref: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UpdateCommentInput = {
  content?: InputMaybe<Scalars['String']>;
};

export type UpdatePostInput = {
  category?: InputMaybe<PostCategory>;
  tags?: InputMaybe<Array<PostTag>>;
};

export type UpdatePostLocaleInput = {
  locale?: InputMaybe<Locale>;
  published?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateTestimonialInput = {
  author?: InputMaybe<Scalars['String']>;
  avatarUrl?: InputMaybe<Scalars['String']>;
  published?: InputMaybe<Scalars['Boolean']>;
  quote?: InputMaybe<Scalars['String']>;
  ref?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  x?: InputMaybe<Scalars['String']>;
  y?: InputMaybe<Scalars['String']>;
};

export type UserDto = {
  __typename?: 'UserDto';
  authentications?: Maybe<Array<AuthenticationDto>>;
  comments: Array<CommentDto>;
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastConnectedAuthenticationProvider: AuthProvider;
  lastName: Scalars['String'];
  role: Role;
  updatedAt?: Maybe<Scalars['DateTime']>;
};
