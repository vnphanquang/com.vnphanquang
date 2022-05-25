import { writable } from 'svelte/store';

export type TableOfContentItem = {
  id: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
};

type TableOfContent = Array<TableOfContentItem>;

export function createTableOfContentStore() {
  const { subscribe, update } = writable<TableOfContent>([]);

  function register(input: TableOfContentItem) {
    update((tableOfContent) => {
      return [...tableOfContent, input];
    });
  }

  return {
    register,
    subscribe,
  };
}
