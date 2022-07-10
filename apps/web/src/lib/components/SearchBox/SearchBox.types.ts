export interface SearchResultItem {
  id: string;
  text: string;
}

export type SearchSubmitDetail = SearchResultItem | string;

export type SearchFunctionReturnedType<T> = T[] | string[] | void;
export type SearchFunction<T extends SearchResultItem = SearchResultItem> =
  (query: string) => Promise<SearchFunctionReturnedType<T>> | SearchFunctionReturnedType<T>;
