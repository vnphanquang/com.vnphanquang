import type * as Types from './types.gq';

import { writable } from 'svelte/store';
import { g } from '$lib/services/api/graphql/g';
import type { GFetchReturnWithErrors, GGetParameters } from '@leveluptuts/g-query';
import gql from 'graphql-tag';
export type PostLocalesQueryVariables = Types.Exact<{
  locale?: Types.InputMaybe<Types.Locale>;
}>;

export type PostLocalesQuery = {
  __typename?: 'Query';
  postLocales: Array<{
    __typename?: 'PostLocaleDto';
    id: number;
    locale: Types.Locale;
    slug: string;
    summary: string;
    title: string;
    createdAt: any;
    deleted: boolean;
    deletedAt?: any | null;
    published: boolean;
    publishedAt?: any | null;
    updatedAt?: any | null;
    post: {
      __typename?: 'PostDto';
      category: Types.PostCategory;
      createdAt: any;
      id: number;
      tags: Array<Types.PostTag>;
      updatedAt?: any | null;
      deletedAt?: any | null;
      deleted: boolean;
    };
  }>;
};

type SubscribeWrapperArgs<T> = {
  variables?: T;
};

interface CacheFunctionOptions {
  update?: boolean;
}

export const PostLocalesDoc = gql`
  query postLocales($locale: Locale) {
    postLocales(locale: $locale) {
      id
      locale
      slug
      summary
      title
      post {
        category
        createdAt
        id
        tags
        updatedAt
        deletedAt
        deleted
      }
      createdAt
      deleted
      deletedAt
      published
      publishedAt
      updatedAt
    }
  }
`;

export const postLocales = writable<GFetchReturnWithErrors<PostLocalesQuery>>({
  errors: [],
  gQueryStatus: 'LOADING',
});

// Cached
export async function getPostLocales(
  { fetch, variables }: GGetParameters<PostLocalesQueryVariables>,
  options?: CacheFunctionOptions,
) {
  const data = await g.fetch<PostLocalesQuery>({
    queries: [{ query: PostLocalesDoc, variables }],
    fetch,
  });
  postLocales.set({ ...data, errors: data?.errors, gQueryStatus: 'LOADED' });
  return data;
}
