import type * as Types from './types.gq';

import { writable } from "svelte/store"
import { g } from '$lib/services/graphql/g'
import type { GFetchReturnWithErrors, GGetParameters } from '@leveluptuts/g-query'
import gql from 'graphql-tag';
export type TestimonialsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TestimonialsQuery = { __typename?: 'Query', testimonials: Array<{ __typename?: 'TestimonialDto', id: number, published: boolean, quote: string, ref: string, title: string, author: string, avatarUrl: string, updatedAt?: any | null, createdAt: any, deletedAt?: any | null, coordinate: { __typename?: 'TestimonialCoordinateDto', x: string, y: string } }> };


type SubscribeWrapperArgs<T> = {
	variables?: T,
}

interface CacheFunctionOptions {
	update?: boolean
}


export const TestimonialsDoc = gql`
    query testimonials {
  testimonials {
    id
    published
    quote
    ref
    title
    author
    avatarUrl
    coordinate {
      x
      y
    }
    updatedAt
    createdAt
    deletedAt
  }
}
    `;

export const testimonials = writable<GFetchReturnWithErrors<TestimonialsQuery>>({
	errors: [],
	gQueryStatus: 'LOADING',
})

// Cached
export async function getTestimonials({ fetch, variables }: GGetParameters<TestimonialsQueryVariables>, options?: CacheFunctionOptions) {
	const data = await g.fetch<TestimonialsQuery>({
		queries: [{ query: TestimonialsDoc, variables }],
		fetch
	})
	testimonials.set({ ...data, errors: data?.errors, gQueryStatus: 'LOADED' })
	return data
}

