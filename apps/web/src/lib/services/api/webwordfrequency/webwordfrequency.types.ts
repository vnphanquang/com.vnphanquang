export interface PaginationOptions {
  perPage: number;
  page: number;
}

export interface WebWordFrequencySearchResponse {
  query: string;
  per_page: number;
  page: number;
  results: string[];
}

export interface WebWordFrequencyScrapeResponse {
  total: number;
  url: string;
  words: Array<[string, number]>;
  process_time: number;
  from_cached: boolean;
  per_page: number;
  page: number;
  scraped_at: string;
}

export interface WebWordFrequencyRecentResponse {
  urls: string[];
}
