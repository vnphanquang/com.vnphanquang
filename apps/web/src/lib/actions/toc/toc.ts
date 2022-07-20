import { onMount, tick } from 'svelte';

import { resolveParameters, restoreTocItems, transformTocItems } from './toc.operations';
import type { TocParameters, TocEventDetails, TocEventItemDetails } from './toc.types';

const cache: Record<string, TocEventItemDetails[]> = {};

export function toc(node: HTMLElement, parameters: Partial<TocParameters> = {}) {
  let resolved = resolveParameters(parameters);

  let elements: Element[];

  function extract() {
    let id = node.getAttribute('data-toc-id') || '';
    let items: TocEventItemDetails[];
    elements = Array.from(node.querySelectorAll(resolved.selector));
    if (id) {
      items = cache[id];
    } else {
      id = crypto.randomUUID();
      items = transformTocItems(elements as HTMLElement[], resolved);
      cache[id] = items;
      node.setAttribute('data-toc-id', id);
    }

    const detail: TocEventDetails = { items, id };
    setTimeout(() => {
      node.dispatchEvent(new CustomEvent('toc', { detail }));
    }, 0);
    return detail;
  }

  function cleanup() {
    restoreTocItems(elements as HTMLElement[], resolved);
  }

  onMount(async () => {
    const { items } = extract();
    if (resolved.stimulateHashNavigation) {
      const hash = location.hash?.substring(1);
      if (hash) {
        let matched: HTMLElement | undefined;
        for (const item of items) {
          if (item.id === hash) {
            matched = item.anchor ?? item.element;
          }
        }
        if (matched) {
          await tick();
          matched.click();
        }
      }
    }
  });

  return {
    update(update: Partial<TocParameters>) {
      const newResolved = resolveParameters(update);
      cleanup();
      resolved = newResolved;
      extract();
    },
    destroy() {
      cleanup();
    },
  };
}
