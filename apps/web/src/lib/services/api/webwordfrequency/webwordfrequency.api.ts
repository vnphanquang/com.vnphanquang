import type { PaginationOptions, WebWordFrequencyRecentResponse, WebWordFrequencyScrapeResponse, WebWordFrequencySearchResponse } from './webwordfrequency.types';

import { AppConfig } from '$config';

const ENDPOINT = AppConfig.urls.api.webWordFrequency;

export async function webWordFrequencyRecent() {
  const response = await fetch(`${ENDPOINT}/recent`);
  return await response.json() as WebWordFrequencyRecentResponse;
}

export async function webWordFrequencySearch(query: string, options: Partial<PaginationOptions> = {}) {
  const { perPage, page } = {
    perPage: 10,
    page: 1,
    ...options,
  };
  const response = await fetch(`${ENDPOINT}/search?query=${query}&per_page=${perPage}&page=${page}`);
  return await response.json() as WebWordFrequencySearchResponse;
}

export async function webWordFrequencyScrape(url: string, options: Partial<PaginationOptions> = {}) {
  const { perPage, page } = {
    perPage: 1000,
    page: 1,
    ...options,
  };

  const response = await fetch(`${ENDPOINT}/scrape?url=${url}&per_page=${perPage}&page=${page}`);
  if (response.status.toString().startsWith('40')) {
    throw new Error((await response.json()).error);
  }
  return await response.json() as WebWordFrequencyScrapeResponse;
}
