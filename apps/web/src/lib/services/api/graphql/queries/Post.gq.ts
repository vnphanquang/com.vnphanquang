import type * as Types from './types.gq';

import { writable } from "svelte/store"
import { g } from '$lib/services/api/graphql/g'
import type { GFetchReturnWithErrors, GGetParameters } from '@leveluptuts/g-query'
import gql from 'graphql-tag';
export type PostForPageQueryVariables = Types.Exact<{
  slug: Types.Scalars['String'];
  locale?: Types.InputMaybe<Types.Locale>;
}>;


export type PostForPageQuery = { __typename?: 'Query', postBySlug?: { __typename?: 'PostDto', category: Types.PostCategory, createdAt: any, deleted: boolean, deletedAt?: any | null, id: number, slug: string, tags: Array<Types.PostTag>, updatedAt?: any | null, comments: Array<{ __typename?: 'CommentDto', content: string, createdAt: any, deleted: boolean, deletedAt?: any | null, id: number, updatedAt?: any | null, author: { __typename?: 'UserDto', firstName: string, lastName: string } }>, locale?: { __typename?: 'PostLocaleDto', createdAt: any, deleted: boolean, deletedAt?: any | null, id: number, locale: Types.Locale, published: boolean, publishedAt?: any | null, summary: string, title: string, updatedAt?: any | null } | null } | null };

export type PostLocalesForBlogIndexQueryVariables = Types.Exact<{
  locale: Types.Locale;
}>;


export type PostLocalesForBlogIndexQuery = { __typename?: 'Query', postLocales: Array<{ __typename?: 'PostLocaleDto', createdAt: any, deleted: boolean, deletedAt?: any | null, id: number, locale: Types.Locale, published: boolean, publishedAt?: any | null, summary: string, title: string, updatedAt?: any | null, post: { __typename?: 'PostDto', category: Types.PostCategory, createdAt: any, deleted: boolean, deletedAt?: any | null, id: number, slug: string, tags: Array<Types.PostTag>, updatedAt?: any | null } }> };


type SubscribeWrapperArgs<T> = {
	variables?: T,
}

interface CacheFunctionOptions {
	update?: boolean
}


export const PostForPageDoc = gql`
    query postForPage($slug: String!, $locale: Locale = en) {
  postBySlug(slug: $slug) {
    category
    comments {
      author {
        firstName
        lastName
      }
      content
      createdAt
      deleted
      deletedAt
      id
      updatedAt
    }
    createdAt
    deleted
    deletedAt
    id
    locale(locale: $locale) {
      createdAt
      deleted
      deletedAt
      id
      locale
      published
      publishedAt
      summary
      title
      updatedAt
    }
    slug
    tags
    updatedAt
  }
}
    `;
export const PostLocalesForBlogIndexDoc = gql`
    query postLocalesForBlogIndex($locale: Locale!) {
  postLocales(locale: $locale) {
    createdAt
    deleted
    deletedAt
    id
    locale
    post {
      category
      createdAt
      deleted
      deletedAt
      id
      slug
      tags
      updatedAt
    }
    published
    publishedAt
    summary
    title
    updatedAt
  }
}
    `;

export const postForPage = writable<GFetchReturnWithErrors<PostForPageQuery>>({
	errors: [],
	gQueryStatus: 'LOADING',
})

// Cached
export async function getPostForPage({ fetch, variables }: GGetParameters<PostForPageQueryVariables>, options?: CacheFunctionOptions) {
	const data = await g.fetch<PostForPageQuery>({
		queries: [{ query: PostForPageDoc, variables }],
		fetch
	})
	postForPage.set({ ...data, errors: data?.errors, gQueryStatus: 'LOADED' })
	return data
}



export const postLocalesForBlogIndex = writable<GFetchReturnWithErrors<PostLocalesForBlogIndexQuery>>({
	errors: [],
	gQueryStatus: 'LOADING',
})

// Cached
export async function getPostLocalesForBlogIndex({ fetch, variables }: GGetParameters<PostLocalesForBlogIndexQueryVariables>, options?: CacheFunctionOptions) {
	const data = await g.fetch<PostLocalesForBlogIndexQuery>({
		queries: [{ query: PostLocalesForBlogIndexDoc, variables }],
		fetch
	})
	postLocalesForBlogIndex.set({ ...data, errors: data?.errors, gQueryStatus: 'LOADED' })
	return data
}

