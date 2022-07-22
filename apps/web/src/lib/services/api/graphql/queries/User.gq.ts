import type * as Types from './types.gq';

import { writable } from 'svelte/store';
import { g } from '$lib/services/api/graphql/g';
import type { GFetchReturnWithErrors, GGetParameters } from '@leveluptuts/g-query';
import gql from 'graphql-tag';
export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me: {
    __typename?: 'UserDto';
    id: number;
    role: Types.Role;
    email?: string | null;
    firstName: string;
    lastName: string;
    lastConnectedAuthenticationProvider: Types.AuthProvider;
    createdAt: any;
    updatedAt?: any | null;
    deletedAt?: any | null;
  };
};

type SubscribeWrapperArgs<T> = {
  variables?: T;
};

interface CacheFunctionOptions {
  update?: boolean;
}

export const MeDoc = gql`
  query me {
    me {
      id
      role
      email
      firstName
      lastName
      lastConnectedAuthenticationProvider
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const me = writable<GFetchReturnWithErrors<MeQuery>>({
  errors: [],
  gQueryStatus: 'LOADING',
});

// Cached
export async function getMe(
  { fetch, variables }: GGetParameters<MeQueryVariables>,
  options?: CacheFunctionOptions,
) {
  const data = await g.fetch<MeQuery>({
    queries: [{ query: MeDoc, variables }],
    fetch,
  });
  me.set({ ...data, errors: data?.errors, gQueryStatus: 'LOADED' });
  return data;
}
