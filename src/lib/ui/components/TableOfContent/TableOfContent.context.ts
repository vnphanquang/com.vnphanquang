import { getContext, setContext } from 'svelte';

import type { createTableOfContentStore } from './TableOfContent.store';

type TableOfContentContext = ReturnType<typeof createTableOfContentStore>;

const ID = 'TABLE_OF_CONTENT';

export const TableOfContentContext = {
  get: () => getContext<TableOfContentContext>(ID),
  set: (context: TableOfContentContext) => setContext<TableOfContentContext>(ID, context),
};
