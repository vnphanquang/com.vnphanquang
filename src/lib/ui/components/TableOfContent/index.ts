import { default as TableOfContentContext } from './TableOfContent.context.svelte';
import { default as TableOfContentNode } from './TableOfContent.svelte';

export const TableOfContent = {
  Node: TableOfContentNode,
  Context: TableOfContentContext,
};

export type { TableOfContentItem } from './TableOfContent.store';
