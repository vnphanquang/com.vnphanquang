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
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  post: PostDto;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CreateCommentInput = {
  content: Scalars['String'];
};

export type CreatePostInput = {
  published?: InputMaybe<Scalars['Boolean']>;
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

export type Mutation = {
  __typename?: 'Mutation';
  createComment: CommentDto;
  createPost?: Maybe<PostDto>;
  createTestimonial: TestimonialDto;
  deleteComment?: Maybe<CommentDto>;
  deletePost?: Maybe<PostDto>;
  deleteTestimonial?: Maybe<TestimonialDto>;
  deleteUser?: Maybe<UserDto>;
  setPostPublication?: Maybe<PostDto>;
  setTestimonialPublication?: Maybe<TestimonialDto>;
  updateComment?: Maybe<CommentDto>;
  updatePost?: Maybe<PostDto>;
  updateTestimonial?: Maybe<TestimonialDto>;
};


export type MutationCreateCommentArgs = {
  data: CreateCommentInput;
  postId: Scalars['Float'];
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateTestimonialArgs = {
  input: CreateTestimonialInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteTestimonialArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float'];
};


export type MutationSetPostPublicationArgs = {
  id: Scalars['Float'];
  published: Scalars['Boolean'];
};


export type MutationSetTestimonialPublicationArgs = {
  id: Scalars['Float'];
  published: Scalars['Boolean'];
};


export type MutationUpdateCommentArgs = {
  data: UpdateCommentInput;
  id: Scalars['Float'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['Float'];
  input: UpdatePostInput;
};


export type MutationUpdateTestimonialArgs = {
  id: Scalars['Float'];
  input: UpdateTestimonialInput;
};

/** Blog post */
export type PostDto = {
  __typename?: 'PostDto';
  comments: Array<CommentDto>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  published: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  authentications: Array<AuthenticationDto>;
  commentById?: Maybe<CommentDto>;
  comments: Array<CommentDto>;
  me: UserDto;
  postById?: Maybe<PostDto>;
  posts: Array<PostDto>;
  testimonialById: TestimonialDto;
  testimonials: Array<TestimonialDto>;
  userById?: Maybe<UserDto>;
  users: Array<UserDto>;
};


export type QueryCommentByIdArgs = {
  id: Scalars['Float'];
};


export type QueryPostByIdArgs = {
  id: Scalars['Float'];
};


export type QueryTestimonialByIdArgs = {
  id: Scalars['Float'];
};


export type QueryUserByIdArgs = {
  id: Scalars['Float'];
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
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  published: Scalars['Boolean'];
  quote: Scalars['String'];
  ref: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UpdateCommentInput = {
  content?: InputMaybe<Scalars['String']>;
};

export type UpdatePostInput = {
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
  deletedAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastConnectedAuthenticationProvider: AuthProvider;
  lastName: Scalars['String'];
  role: Role;
  updatedAt?: Maybe<Scalars['DateTime']>;
};