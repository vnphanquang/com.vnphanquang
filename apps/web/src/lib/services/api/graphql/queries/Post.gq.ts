import type * as Types from './types.gq';

import { writable } from "svelte/store"
import { g } from '$lib/services/api/graphql/g'
import type { GFetchReturnWithErrors, GGetParameters } from '@leveluptuts/g-query'
import gql from 'graphql-tag';
export type PostLocaleByIdQueryVariables = Types.Exact<{
  slug: Types.Scalars['String'];
}>;


export type PostLocaleByIdQuery = { __typename?: 'Query', postLocaleBySlug?: { __typename?: 'PostLocaleDto', createdAt: any, deleted: boolean, deletedAt?: any | null, id: number, locale: Types.Locale, published: boolean, publishedAt?: any | null, slug: string, summary: string, title: string, updatedAt?: any | null, post: { __typename?: 'PostDto', category: Types.PostCategory, createdAt: any, deleted: boolean, deletedAt?: any | null, id: number, tags: Array<Types.PostTag>, updatedAt?: any | null, comments: Array<{ __typename?: 'CommentDto', content: string, createdAt: any, deleted: boolean, deletedAt?: any | null, id: number, updatedAt?: any | null, author: { __typename?: 'UserDto', firstName: string, lastName: string } }> } } | null };


type SubscribeWrapperArgs<T> = {
	variables?: T,
}

interface CacheFunctionOptions {
	update?: boolean
}


export const PostLocaleByIdDoc = gql`
    query postLocaleById($slug: String!) {
  postLocaleBySlug(slug: $slug) {
    createdAt
    deleted
    deletedAt
    id
    locale
    post {
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
      tags
      updatedAt
    }
    published
    publishedAt
    slug
    summary
    title
    updatedAt
  }
}
    `;

export const postLocaleById = writable<GFetchReturnWithErrors<PostLocaleByIdQuery>>({
	errors: [],
	gQueryStatus: 'LOADING',
})

// Cached
export async function getPostLocaleById({ fetch, variables }: GGetParameters<PostLocaleByIdQueryVariables>, options?: CacheFunctionOptions) {
	const data = await g.fetch<PostLocaleByIdQuery>({
		queries: [{ query: PostLocaleByIdDoc, variables }],
		fetch
	})
	postLocaleById.set({ ...data, errors: data?.errors, gQueryStatus: 'LOADED' })
	return data
}

